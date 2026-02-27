/* ============================================================
   OncoGuard AI — Event Bindings for all pages
   ============================================================ */
const Bind = {
    login() {
        const form = document.getElementById('loginForm');
        if (!form) return;
        form.onsubmit = (e) => {
            e.preventDefault();
            const u = document.getElementById('inp-user').value.trim();
            const p = document.getElementById('inp-pass').value;
            const btn = document.getElementById('loginBtn');
            const spinner = document.getElementById('loginSpinner');
            const icon = document.getElementById('loginIcon');
            const txt = document.getElementById('loginBtnText');
            const err = document.getElementById('loginError');
            err.style.display = 'none';
            btn.disabled = true; spinner.style.display = 'inline'; icon.style.display = 'none'; txt.textContent = 'Signing in...';
            setTimeout(() => {
                if (attemptLogin(u, p)) {
                    App.showToast('Welcome back, Doctor!', 'success');
                    App.navigate('#/screening/step1');
                } else {
                    err.style.display = 'flex';
                    document.getElementById('loginCard').classList.add('shake');
                    setTimeout(() => document.getElementById('loginCard').classList.remove('shake'), 500);
                    btn.disabled = false; spinner.style.display = 'none'; icon.style.display = 'inline'; txt.textContent = 'Sign In';
                }
            }, 800);
        };
    },

    step1() {
        const form = document.getElementById('form-step1');
        if (!form) return;
        form.onsubmit = (e) => {
            e.preventDefault();
            const data = {
                fullName: document.getElementById('s1-name').value.trim(),
                age: document.getElementById('s1-age').value,
                gender: document.getElementById('s1-gender').value,
                dob: document.getElementById('s1-dob').value,
                contactNumber: document.getElementById('s1-phone').value.trim(),
                email: document.getElementById('s1-email').value.trim(),
                emergencyContact: document.getElementById('s1-emergency').value.trim(),
            };
            localStorage.setItem('screening_step1', JSON.stringify(data));
            App.showToast('Patient info saved!', 'success');
            App.navigate('#/screening/step2');
        };
    },

    step2() {
        const form = document.getElementById('form-step2');
        if (!form) return;
        // Radio card highlight
        document.querySelectorAll('.radio-card input').forEach(inp => {
            inp.addEventListener('change', () => {
                const name = inp.name;
                document.querySelectorAll(`.radio-card input[name="${name}"]`).forEach(r => r.closest('.radio-card').classList.remove('selected'));
                if (inp.checked) inp.closest('.radio-card').classList.add('selected');
            });
            if (inp.checked) inp.closest('.radio-card').classList.add('selected');
        });
        form.onsubmit = (e) => {
            e.preventDefault();
            const smoking = document.querySelector('input[name="smoking"]:checked');
            const diet = document.querySelector('input[name="diet"]:checked');
            if (!smoking || !diet) { App.showToast('Please fill all required fields', 'error'); return; }
            const data = {
                smoking: smoking.value,
                alcohol: document.getElementById('s2-alcohol').value,
                exercise: document.getElementById('s2-exercise').value,
                diet: diet.value,
                sleep: document.getElementById('s2-sleep').value,
                stress: document.getElementById('s2-stress').value,
                water: document.getElementById('s2-water').value,
            };
            localStorage.setItem('screening_step2', JSON.stringify(data));
            App.showToast('Lifestyle data saved!', 'success');
            App.navigate('#/screening/step3');
        };
    },

    step3() {
        const btn = document.getElementById('btn-step3');
        if (!btn) return;
        // Symptom card toggle
        document.querySelectorAll('.symptom-card input').forEach(cb => {
            if (cb.checked) cb.closest('.symptom-card').classList.add('checked');
        });
        btn.onclick = () => {
            const checked = document.querySelectorAll('.sym-cb:checked');
            const symptoms = []; const symptomLabels = [];
            checked.forEach(cb => { symptoms.push(cb.value); symptomLabels.push(cb.closest('.symptom-card').querySelector('p').textContent); });
            const data = {
                symptoms: symptoms,
                symptomLabels: symptomLabels,
                otherSymptoms: document.getElementById('s3-other').value.trim(),
            };
            localStorage.setItem('screening_step3', JSON.stringify(data));
            App.showToast('Symptoms recorded!', 'success');
            App.navigate('#/screening/step4');
        };
    },

    step4() {
        const btn = document.getElementById('btn-analyze');
        if (!btn) return;
        btn.onclick = () => {
            document.getElementById('ai-actions').style.display = 'none';
            document.getElementById('ai-loading').style.display = 'block';
            // Generate a local fallback analysis
            setTimeout(() => {
                const s1 = JSON.parse(localStorage.getItem('screening_step1') || '{}');
                const s2 = JSON.parse(localStorage.getItem('screening_step2') || '{}');
                const s3 = JSON.parse(localStorage.getItem('screening_step3') || '{}');
                const symptoms = s3.symptomLabels || [];
                const age = parseInt(s1.age) || 30;
                let risk = 'Low';
                if (age > 60 || s2.smoking === 'Daily smoker' || symptoms.length > 3) risk = 'High';
                else if (age > 45 || s2.smoking === 'Occasional smoker' || symptoms.length > 1) risk = 'Moderate';
                const analysis = `
          <h3>🏥 Health Assessment Summary</h3>
          <p><strong>Patient:</strong> ${s1.fullName || 'Unknown'} | <strong>Age:</strong> ${s1.age || '?'} | <strong>Gender:</strong> ${s1.gender || '?'}</p>
          <h4>Overall Risk Level: <span style="color:${risk === 'High' ? 'var(--accent-red)' : risk === 'Moderate' ? 'var(--accent-amber)' : 'var(--accent-green)'}">${risk.toUpperCase()}</span></h4>
          <h4>Key Risk Factors</h4>
          <ul>
            <li><strong>Tobacco:</strong> ${s2.smoking || 'Not reported'} ${s2.smoking?.includes('Daily') ? '— significant cancer risk factor' : ''}</li>
            <li><strong>Alcohol:</strong> ${s2.alcohol || 0} drinks/week ${parseInt(s2.alcohol) > 14 ? '— above recommended limits' : ''}</li>
            <li><strong>Exercise:</strong> ${s2.exercise || 'Not reported'} ${s2.exercise?.includes('Rarely') ? '— increased sedentary risk' : ''}</li>
            <li><strong>Symptoms:</strong> ${symptoms.length ? symptoms.join(', ') : 'None reported'}</li>
          </ul>
          <h4>Recommendations</h4>
          <ul>
            ${risk !== 'Low' ? '<li><strong>Priority:</strong> Schedule comprehensive screening within 2 weeks</li>' : ''}
            ${s2.smoking?.includes('smoker') ? '<li>Consider smoking cessation program</li>' : ''}
            ${parseInt(s2.alcohol) > 7 ? '<li>Reduce alcohol intake to below 7 units per week</li>' : ''}
            ${s2.exercise?.includes('Rarely') ? '<li>Increase physical activity to at least 150 min/week</li>' : ''}
            <li>Continue annual health checkups</li>
            <li>Maintain balanced diet with adequate hydration (${s2.water || '?'}L current intake)</li>
          </ul>
          <h4>Next Steps</h4>
          <ul>
            <li>Review results with primary care physician</li>
            <li>Consider additional diagnostic tests if indicated</li>
            <li>Schedule follow-up in ${risk === 'High' ? '2 weeks' : risk === 'Moderate' ? '1 month' : '6 months'}</li>
          </ul>
        `;
                document.getElementById('ai-loading').style.display = 'none';
                document.getElementById('ai-results').style.display = 'block';
                document.getElementById('ai-content').innerHTML = analysis;
                App.showToast('AI analysis complete!', 'success');
            }, 2500);
        };
    },

    dashboard() {
        // Gauge animation triggers on load via CSS
    },

    reports() {
        // Bar animations via CSS class
    },

    validation() {
        // Load notes
        function loadNotes() {
            const notes = JSON.parse(localStorage.getItem('validation_notes') || '[]');
            const el = document.getElementById('notes-list');
            if (!el) return;
            if (!notes.length) { el.innerHTML = '<p style="text-align:center;font-size:0.85rem;color:var(--text-muted);font-style:italic;padding:var(--space-md)">No notes yet.</p>'; return; }
            el.innerHTML = notes.map((n, i) => `
        <div style="display:flex;align-items:flex-start;gap:var(--space-md);padding:var(--space-md);background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:var(--radius-sm)">
          <span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:16px;margin-top:2px">note</span>
          <div style="flex:1"><div class="flex-between"><span style="font-size:0.75rem;font-weight:700;color:var(--accent-primary)">${n.phase}</span><span style="font-size:0.65rem;color:var(--text-muted)">${n.date}</span></div><p style="font-size:0.85rem;margin-top:4px">${n.text}</p></div>
          <button onclick="Bind.deleteNote(${i})" style="background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px" title="Delete"><span class="material-symbols-outlined" style="font-size:14px">close</span></button>
        </div>
      `).join('');
        }
        loadNotes();
        const form = document.getElementById('form-note');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const notes = JSON.parse(localStorage.getItem('validation_notes') || '[]');
                notes.unshift({
                    phase: document.getElementById('note-phase').value,
                    text: document.getElementById('note-text').value.trim(),
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                });
                localStorage.setItem('validation_notes', JSON.stringify(notes));
                form.reset();
                loadNotes();
                App.showToast('Note submitted!', 'success');
            };
        }
        // expose for inline delete
        Bind._loadNotes = loadNotes;
    },

    deleteNote(idx) {
        const notes = JSON.parse(localStorage.getItem('validation_notes') || '[]');
        notes.splice(idx, 1);
        localStorage.setItem('validation_notes', JSON.stringify(notes));
        if (Bind._loadNotes) Bind._loadNotes();
    },

    addData() {
        function loadRecords() {
            const recs = JSON.parse(localStorage.getItem('medical_records') || '[]');
            const el = document.getElementById('saved-list');
            const countEl = document.getElementById('rec-count');
            if (!el) return;
            countEl.textContent = recs.length;
            if (!recs.length) { el.innerHTML = '<p style="text-align:center;font-size:0.85rem;color:var(--text-muted);font-style:italic;padding:var(--space-md)">No records yet. Add one below.</p>'; return; }
            const pColors = { Normal: '#10b981', Urgent: '#f59e0b', Critical: '#ef4444' };
            el.innerHTML = recs.map((r, i) => `
        <div style="display:flex;align-items:center;gap:var(--space-md);padding:var(--space-md);background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:var(--radius-sm)">
          <div style="width:36px;height:36px;border-radius:var(--radius-sm);background:var(--gradient-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">description</span></div>
          <div style="flex:1;min-width:0"><p style="font-weight:600;font-size:0.85rem" class="truncate">${r.title}</p><p style="font-size:0.7rem;color:var(--text-muted)">${r.type} • ${r.date}</p></div>
          <span class="indicator-badge" style="background:${pColors[r.priority] || pColors.Normal}15;color:${pColors[r.priority] || pColors.Normal}">${r.priority}</span>
          <button onclick="Bind.deleteRecord(${i})" style="background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button>
        </div>
      `).join('');
        }
        loadRecords();
        const form = document.getElementById('form-add');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const recs = JSON.parse(localStorage.getItem('medical_records') || '[]');
                const selPriority = document.querySelector('#priority-btns .priority-pill[class*="selected-"]');
                recs.unshift({
                    type: document.getElementById('rec-type').value,
                    title: document.getElementById('rec-title').value.trim(),
                    date: document.getElementById('rec-date').value,
                    facility: document.getElementById('rec-facility').value.trim(),
                    values: document.getElementById('rec-values').value.trim(),
                    notes: document.getElementById('rec-notes').value.trim(),
                    priority: selPriority ? selPriority.dataset.val : 'Normal',
                });
                localStorage.setItem('medical_records', JSON.stringify(recs));
                form.reset();
                // Reset priority pills
                document.querySelectorAll('#priority-btns .priority-pill').forEach(b => b.className = 'priority-pill');
                document.querySelector('#priority-btns .priority-pill[data-val="Normal"]').classList.add('selected-normal');
                loadRecords();
                App.showToast('Record saved!', 'success');
            };
        }
        Bind._loadRecords = loadRecords;
    },

    deleteRecord(idx) {
        const recs = JSON.parse(localStorage.getItem('medical_records') || '[]');
        recs.splice(idx, 1);
        localStorage.setItem('medical_records', JSON.stringify(recs));
        if (Bind._loadRecords) Bind._loadRecords();
    },

    setPriority(btn) {
        document.querySelectorAll('#priority-btns .priority-pill').forEach(b => b.className = 'priority-pill');
        const v = btn.dataset.val.toLowerCase();
        btn.classList.add('selected-' + v);
    }
};
