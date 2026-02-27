/* ============================================================
   OncoGuard AI — Extended Pages (Step4, Dashboard, Reports, Validation, Add Data)
   ============================================================ */
const PageExtras = {
    step4() {
        const s1 = JSON.parse(localStorage.getItem('screening_step1') || '{}');
        const s2 = JSON.parse(localStorage.getItem('screening_step2') || '{}');
        const s3 = JSON.parse(localStorage.getItem('screening_step3') || '{}');
        function row(l, v) { return `<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border-color)"><span style="color:var(--text-muted);font-size:0.85rem">${l}</span><span style="font-size:0.85rem;font-weight:600">${v || '—'}</span></div>`; }
        const syms = s3.symptomLabels || [];
        let symHTML = syms.length ? `<div style="display:flex;flex-wrap:wrap;gap:0.5rem">${syms.map(s => `<span class="badge badge-red" style="display:flex;align-items:center;gap:4px"><span class="material-symbols-outlined" style="font-size:12px">warning</span>${s}</span>`).join('')}</div>` : '<p style="color:var(--accent-green);font-size:0.85rem;display:flex;align-items:center;gap:4px"><span class="material-symbols-outlined" style="font-size:14px">check_circle</span>No symptoms reported</p>';
        if (s3.otherSymptoms) symHTML += row('Other', s3.otherSymptoms);

        return `<div class="page-container no-bottom-nav">
      ${pageTop('/screening/step3', 'Review & Analyze')}
      ${progressBar(4, 4, 'Step 4 of 4 — Summary & AI Analysis')}
      <div class="space-y-lg">
        <div class="glass-card">
          <div style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;justify-content:space-between;background:rgba(124,58,237,0.05);border-bottom:1px solid var(--border-color)">
            <div style="display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">person</span><h4 style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Patient Information</h4></div>
            <a style="color:var(--accent-primary);font-size:0.75rem;font-weight:700;cursor:pointer" onclick="App.navigate('#/screening/step1')">EDIT</a>
          </div>
          <div style="padding:var(--space-md) var(--space-lg)">${row('Full Name', s1.fullName)}${row('Age', s1.age)}${row('Gender', s1.gender)}${row('Date of Birth', s1.dob)}${row('Contact', s1.contactNumber)}${row('Email', s1.email)}${row('Emergency', s1.emergencyContact)}</div>
        </div>
        <div class="glass-card">
          <div style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;justify-content:space-between;background:rgba(124,58,237,0.05);border-bottom:1px solid var(--border-color)">
            <div style="display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">favorite</span><h4 style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Lifestyle Assessment</h4></div>
            <a style="color:var(--accent-primary);font-size:0.75rem;font-weight:700;cursor:pointer" onclick="App.navigate('#/screening/step2')">EDIT</a>
          </div>
          <div style="padding:var(--space-md) var(--space-lg)">${row('Smoking', s2.smoking)}${row('Alcohol', s2.alcohol + ' drinks/week')}${row('Exercise', s2.exercise)}${row('Diet', s2.diet)}${row('Sleep', s2.sleep + ' hrs/night')}${row('Stress', s2.stress)}${row('Water', s2.water + ' L/day')}</div>
        </div>
        <div class="glass-card">
          <div style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;justify-content:space-between;background:rgba(124,58,237,0.05);border-bottom:1px solid var(--border-color)">
            <div style="display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">checklist</span><h4 style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;font-weight:700">Reported Symptoms</h4></div>
            <a style="color:var(--accent-primary);font-size:0.75rem;font-weight:700;cursor:pointer" onclick="App.navigate('#/screening/step3')">EDIT</a>
          </div>
          <div style="padding:var(--space-md) var(--space-lg)">${symHTML}</div>
        </div>
        <div id="ai-actions">
          <div style="padding:var(--space-md);background:rgba(124,58,237,0.06);border:2px dashed rgba(124,58,237,0.25);border-radius:var(--radius-md);margin-bottom:var(--space-md);display:flex;gap:var(--space-md)">
            <span class="material-symbols-outlined" style="color:var(--accent-primary)">info</span>
            <p style="font-size:0.75rem;line-height:1.6">By running AI analysis, the patient data will be sent to an AI model for health risk assessment. For informational purposes only.</p>
          </div>
          <button class="btn btn-primary btn-block btn-lg" id="btn-analyze"><span class="material-symbols-outlined">psychology</span> Run AI Health Analysis</button>
        </div>
        <div id="ai-loading" style="display:none">
          <div class="glass-card" style="padding:3rem;text-align:center">
            <div style="position:relative;display:inline-flex;align-items:center;justify-content:center;margin-bottom:var(--space-lg)">
              <div style="position:absolute;width:64px;height:64px;border-radius:50%;background:rgba(124,58,237,0.2)" class="pulse-glow"></div>
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(124,58,237,0.1);display:flex;align-items:center;justify-content:center"><span class="material-symbols-outlined spinner" style="color:var(--accent-primary);font-size:1.5rem">progress_activity</span></div>
            </div>
            <h3 style="font-size:1.1rem;margin-bottom:0.25rem">Analyzing Patient Data...</h3>
            <p style="font-size:0.85rem">Our AI is reviewing all submitted information.</p>
          </div>
        </div>
        <div id="ai-results" style="display:none">
          <div class="glass-card" style="border-color:rgba(124,58,237,0.3)">
            <div style="padding:var(--space-lg);background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(59,130,246,0.05));border-bottom:1px solid rgba(124,58,237,0.2);display:flex;align-items:center;gap:var(--space-md)">
              <div style="width:40px;height:40px;border-radius:50%;background:var(--gradient-main);display:flex;align-items:center;justify-content:center"><span class="material-symbols-outlined" style="color:#fff">psychology</span></div>
              <div><h3 style="font-size:1.1rem">AI Health Analysis</h3><p style="font-size:0.7rem;color:var(--text-muted)">Powered by OncoGuard AI Engine</p></div>
            </div>
            <div style="padding:var(--space-lg)" class="ai-result" id="ai-content"></div>
            <div style="padding:var(--space-md);background:rgba(245,158,11,0.06);border-top:1px solid rgba(245,158,11,0.2)">
              <p style="font-size:0.7rem;color:var(--accent-amber);display:flex;align-items:flex-start;gap:var(--space-sm)"><span class="material-symbols-outlined" style="font-size:14px;margin-top:2px">warning</span><span><strong>Disclaimer:</strong> For informational purposes only. Always consult a qualified healthcare professional.</span></p>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg)">
            <button class="btn btn-secondary" style="flex:1" onclick="window.print()"><span class="material-symbols-outlined" style="font-size:16px">print</span> Print</button>
            <button class="btn btn-primary" style="flex:2" onclick="App.navigate('#/dashboard')">View Dashboard <span class="material-symbols-outlined" style="font-size:16px">arrow_forward</span></button>
          </div>
        </div>
      </div>
      <div style="text-align:center;padding:2rem 0"><p style="font-size:0.6rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.15em">CONFIDENTIAL MEDICAL RECORD • HIPAA COMPLIANT • ONCOGUARD AI v4.2</p></div>
    </div>`;
    },

    dashboard() {
        const s1 = JSON.parse(localStorage.getItem('screening_step1') || '{}');
        const s2 = JSON.parse(localStorage.getItem('screening_step2') || '{}');
        const s3 = JSON.parse(localStorage.getItem('screening_step3') || '{}');
        const symptoms = s3.symptomLabels || [];
        let rs = 10;
        const age = parseInt(s1.age) || 30;
        if (age > 60) rs += 20; else if (age > 50) rs += 12; else if (age > 40) rs += 6;
        if (s2.smoking === 'Daily smoker') rs += 25; else if (s2.smoking === 'Occasional smoker') rs += 15; else if (s2.smoking === 'Former smoker') rs += 6;
        const alc = parseInt(s2.alcohol) || 0; if (alc > 14) rs += 15; else if (alc > 7) rs += 8; else if (alc > 3) rs += 3;
        if (s2.exercise?.includes('Rarely')) rs += 10; else if (s2.exercise?.includes('Moderate')) rs += 3;
        const sleep = parseFloat(s2.sleep) || 7; if (sleep < 5) rs += 10; else if (sleep < 6) rs += 5;
        if (s2.stress === 'Very High') rs += 10; else if (s2.stress === 'High') rs += 6;
        const crit = ['Chest Pain', 'Shortness of Breath', 'Weight Changes'], mod = ['Fatigue', 'Fever', 'Joint Pain', 'Nausea'];
        symptoms.forEach(s => { if (crit.includes(s)) rs += 8; else if (mod.includes(s)) rs += 4; else rs += 2; });
        rs = Math.min(rs, 95);
        let rc, rt, rd;
        if (rs <= 25) { rc = '#10b981'; rt = 'Low Risk'; rd = 'Healthy profile. Continue regular checkups.'; }
        else if (rs <= 50) { rc = '#f59e0b'; rt = 'Moderate Risk'; rd = 'Some risk factors. Follow-up recommended.'; }
        else if (rs <= 75) { rc = '#f97316'; rt = 'Elevated Risk'; rd = 'Multiple risk factors. Priority consultation recommended.'; }
        else { rc = '#ef4444'; rt = 'High Risk'; rd = 'Significant risk. Immediate evaluation recommended.'; }
        const off = 552.92 - (552.92 * rs / 100);

        function ind(icon, title, detail, status, sc) { return `<div class="indicator-row"><div class="indicator-icon"><span class="material-symbols-outlined">${icon}</span></div><div style="flex:1"><p style="font-weight:600;font-size:0.9rem">${title}</p><p style="font-size:0.75rem;color:var(--text-muted)">${detail}</p></div><span class="indicator-badge" style="background:${sc}15;color:${sc}">${status}</span></div>`; }

        let ls = 100;
        if (s2.smoking === 'Daily smoker') ls -= 30; else if (s2.smoking === 'Occasional smoker') ls -= 15;
        if (alc > 14) ls -= 20; else if (alc > 7) ls -= 10;
        if (s2.exercise?.includes('Rarely')) ls -= 15; if (sleep < 6) ls -= 10;
        if (s2.stress === 'Very High') ls -= 15; else if (s2.stress === 'High') ls -= 8;
        const water = parseFloat(s2.water) || 2; if (water < 1.5) ls -= 5; ls = Math.max(ls, 5);
        const lsc = ls >= 75 ? '#10b981' : ls >= 50 ? '#f59e0b' : '#ef4444';

        const smokSt = s2.smoking || 'Unknown'; const smokR = smokSt.includes('Daily') ? 'HIGH' : smokSt.includes('Occasional') ? 'MODERATE' : smokSt.includes('Former') ? 'MILD' : 'CLEAR';
        const smokC = smokR === 'HIGH' ? '#ef4444' : smokR === 'MODERATE' ? '#f97316' : smokR === 'MILD' ? '#f59e0b' : '#10b981';
        const symSt = symptoms.length === 0 ? 'CLEAR' : symptoms.length <= 2 ? 'MONITOR' : 'ATTENTION';
        const symC = symptoms.length === 0 ? '#10b981' : symptoms.length <= 2 ? '#f59e0b' : '#ef4444';
        const alcSt = alc > 14 ? 'HIGH' : alc > 7 ? 'MODERATE' : 'NORMAL'; const alcC = alc > 14 ? '#ef4444' : alc > 7 ? '#f59e0b' : '#10b981';

        let symCards = '';
        if (!symptoms.length) symCards = `<p style="color:var(--accent-green);font-size:0.9rem;display:flex;align-items:center;gap:0.5rem"><span class="material-symbols-outlined" style="font-size:16px">check_circle</span>No symptoms — positive indicator</p>`;
        else symCards = `<div style="display:flex;flex-wrap:wrap;gap:0.5rem">${symptoms.map(s => `<span class="badge badge-red" style="display:flex;align-items:center;gap:4px"><span class="material-symbols-outlined" style="font-size:12px">warning</span>${s}</span>`).join('')}</div>`;
        if (s3.otherSymptoms) symCards += `<p style="margin-top:0.75rem;font-size:0.85rem"><strong>Other:</strong> ${s3.otherSymptoms}</p>`;

        return `<div class="page-container">
      ${pageTop('/screening/step4', 'Risk Dashboard')}
      <div class="glass-card" style="padding:var(--space-lg);display:flex;align-items:center;gap:var(--space-lg);margin-bottom:var(--space-xl)">
        <div style="width:48px;height:48px;border-radius:50%;background:var(--gradient-soft);border:1px solid rgba(124,58,237,0.2);display:flex;align-items:center;justify-content:center"><span class="material-symbols-outlined" style="color:var(--accent-primary)">person</span></div>
        <div style="flex:1"><p style="font-weight:700;font-size:1rem">${s1.fullName || 'Unknown'}</p><p style="font-size:0.75rem;color:var(--text-muted)">Age ${s1.age || '?'} • ${s1.gender || '?'}</p></div>
        <span class="indicator-badge" style="background:${rc}20;color:${rc}">${rt}</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;padding:var(--space-xl) 0">
        <div class="gauge-container" style="width:192px;height:192px">
          <svg style="width:100%;height:100%;transform:rotate(-90deg)" viewBox="0 0 192 192">
            <circle cx="96" cy="96" r="88" fill="transparent" stroke="rgba(255,255,255,0.06)" stroke-width="12"></circle>
            <circle cx="96" cy="96" r="88" fill="transparent" stroke="${rc}" stroke-width="12" stroke-dasharray="552.92" stroke-dashoffset="${off}" stroke-linecap="round" class="gauge-animate"></circle>
          </svg>
          <div class="gauge-center"><span class="gauge-value" style="color:${rc}">${rs}%</span><span class="gauge-label" style="color:${rc}">${rt}</span></div>
        </div>
        <p style="margin-top:var(--space-lg);text-align:center;font-size:0.875rem;max-width:300px">${rd}</p>
      </div>
      <h4 style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:var(--space-md)">Risk Factor Breakdown</h4>
      <div class="space-y" style="margin-bottom:var(--space-xl)">
        ${ind('cake', 'Age Factor', age + ' years old', age > 50 ? 'ELEVATED' : 'NORMAL', age > 50 ? '#f97316' : '#10b981')}
        ${ind('smoke_free', 'Tobacco Use', smokSt, smokR, smokC)}
        ${ind('checklist', 'Symptom Count', symptoms.length + ' symptom(s)', symSt, symC)}
        ${ind('local_bar', 'Alcohol', alc + ' drinks/week', alcSt, alcC)}
      </div>
      <h4 style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:var(--space-md)">Lifestyle Score</h4>
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <div class="flex-between mb-md"><span style="font-size:0.85rem;color:var(--text-secondary)">Overall Lifestyle Health</span><span style="font-size:1.5rem;font-weight:800;color:${lsc}">${ls}/100</span></div>
        <div style="width:100%;height:8px;background:rgba(255,255,255,0.06);border-radius:var(--radius-full);overflow:hidden"><div style="height:100%;width:${ls}%;background:${lsc};border-radius:var(--radius-full);transition:width 1s ease"></div></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);margin-top:var(--space-lg);text-align:center;font-size:0.75rem">
          <div><p style="color:var(--text-muted)">Exercise</p><p style="font-weight:700">${s2.exercise?.split('(')[0] || '—'}</p></div>
          <div><p style="color:var(--text-muted)">Sleep</p><p style="font-weight:700">${sleep}h</p></div>
          <div><p style="color:var(--text-muted)">Diet</p><p style="font-weight:700">${s2.diet || '—'}</p></div>
        </div>
      </div>
      <h4 style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:var(--space-md)">Reported Symptoms</h4>
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">${symCards}</div>
      <h4 style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:var(--space-md)">Recommended Actions</h4>
      <div class="space-y" style="margin-bottom:var(--space-xl)">
        <div style="display:flex;gap:var(--space-lg);padding:var(--space-lg);background:rgba(124,58,237,0.06);border:1px solid rgba(124,58,237,0.2);border-radius:var(--radius-md)">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--gradient-main);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span class="material-symbols-outlined" style="color:#fff">calendar_today</span></div>
          <div><p style="font-weight:700">Schedule Follow-up</p><p style="font-size:0.85rem;margin-top:0.25rem">${rs > 50 ? 'Priority consultation within 1-2 weeks.' : 'Routine checkup within 3-6 months.'}</p>
          <button class="btn btn-primary btn-sm" style="margin-top:0.5rem">Book Now</button></div>
        </div>
        <div style="display:flex;gap:var(--space-lg);padding:var(--space-lg);background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md)">
          <div style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span class="material-symbols-outlined" style="color:var(--text-muted)">repeat</span></div>
          <div><p style="font-weight:700">Re-screen</p><p style="font-size:0.85rem;margin-top:0.25rem">Run again in ${rs > 50 ? '3' : '6'} months.</p>
          <button class="btn btn-outline btn-sm" style="margin-top:0.5rem" onclick="App.navigate('#/screening/step1')">New Screening</button></div>
        </div>
      </div>
    </div>${bottomNav('/dashboard')}`;
    },

    reports() {
        const cancers = [{ name: 'Breast Cancer', acc: 99.2, color: '#ec4899' }, { name: 'Lung Cancer', acc: 97.8, color: '#6366f1' }, { name: 'Colorectal', acc: 98.1, color: '#f59e0b' }, { name: 'Prostate', acc: 98.9, color: '#10b981' }, { name: 'Skin Melanoma', acc: 96.4, color: '#f97316' }, { name: 'Liver Cancer', acc: 97.2, color: '#ef4444' }];
        const versions = [{ v: 'v2.4', date: 'Feb 2026', change: 'Added lifestyle factor weighting', badge: 'CURRENT' }, { v: 'v2.3', date: 'Dec 2025', change: 'Improved lung cancer sensitivity' }, { v: 'v2.2', date: 'Oct 2025', change: 'Symptom correlation analysis' }, { v: 'v2.1', date: 'Jul 2025', change: 'Initial fusion model' }];
        return `<div class="page-container">
      ${pageTop('/dashboard', 'Model Report')}
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-lg)">
          <div style="width:40px;height:40px;background:var(--gradient-soft);border:1px solid rgba(124,58,237,0.2);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center"><span class="material-symbols-outlined" style="color:var(--accent-primary)">psychology</span></div>
          <div><h3 style="font-size:1rem">OncoGuard Diagnostics v2.4</h3><p style="font-size:0.75rem;color:var(--text-muted)">Multi-modal cancer risk classification</p></div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md);text-align:center">
          ${[{ v: '98.4%', l: 'Accuracy' }, { v: '96.7%', l: 'Sensitivity' }, { v: '99.1%', l: 'Specificity' }].map(m => `<div style="background:rgba(255,255,255,0.03);border-radius:var(--radius-sm);padding:var(--space-md)"><p style="font-size:1.75rem;font-weight:800" class="gradient-text">${m.v}</p><p style="font-size:0.6rem;color:var(--text-muted);text-transform:uppercase;font-weight:700;margin-top:4px">${m.l}</p></div>`).join('')}
        </div>
      </div>
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <h4 style="font-size:0.9rem;margin-bottom:var(--space-lg);display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">bar_chart</span>Performance by Cancer Type</h4>
        <div class="space-y">${cancers.map(c => `<div><div class="flex-between" style="margin-bottom:4px"><span style="font-size:0.85rem">${c.name}</span><span style="font-size:0.85rem;font-weight:700;color:${c.color}">${c.acc}%</span></div><div style="width:100%;height:8px;background:rgba(255,255,255,0.06);border-radius:var(--radius-full);overflow:hidden"><div class="perf-bar bar-animate" style="width:${c.acc}%;background:${c.color}"></div></div></div>`).join('')}</div>
      </div>
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <h4 style="font-size:0.9rem;margin-bottom:var(--space-lg);display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">grid_on</span>Confusion Matrix</h4>
        <table style="width:100%;font-size:0.85rem;border-collapse:collapse"><thead><tr style="background:rgba(255,255,255,0.03)"><th style="padding:0.5rem;text-align:left;font-size:0.75rem;color:var(--text-muted)">Actual \\ Predicted</th><th style="padding:0.5rem;text-align:center;font-size:0.75rem">Positive</th><th style="padding:0.5rem;text-align:center;font-size:0.75rem">Negative</th></tr></thead>
        <tbody><tr style="border-top:1px solid var(--border-color)"><td style="padding:0.5rem;font-weight:600;font-size:0.75rem">Positive</td><td style="padding:0.5rem;text-align:center"><span class="badge badge-green">4,280</span></td><td style="padding:0.5rem;text-align:center"><span class="badge badge-red">145</span></td></tr>
        <tr style="border-top:1px solid var(--border-color)"><td style="padding:0.5rem;font-weight:600;font-size:0.75rem">Negative</td><td style="padding:0.5rem;text-align:center"><span class="badge badge-red">39</span></td><td style="padding:0.5rem;text-align:center"><span class="badge badge-green">4,536</span></td></tr></tbody></table>
      </div>
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <h4 style="font-size:0.9rem;margin-bottom:var(--space-lg);display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">storage</span>Training Data</h4>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-md)">${[{ v: '47,892', l: 'Total Samples' }, { v: '234', l: 'Features Used' }, { v: '14.2h', l: 'Training Time' }, { v: 'Feb 2026', l: 'Last Updated' }].map(d => `<div style="background:rgba(255,255,255,0.03);border-radius:var(--radius-sm);padding:var(--space-md);text-align:center"><p style="font-size:0.8rem;color:var(--text-muted)">${d.l}</p><p style="font-size:1.25rem;font-weight:800;margin-top:4px">${d.v}</p></div>`).join('')}</div>
      </div>
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <h4 style="font-size:0.9rem;margin-bottom:var(--space-lg);display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">history</span>Version History</h4>
        <div class="space-y">${versions.map(v => `<div style="display:flex;align-items:flex-start;gap:var(--space-md);padding-left:var(--space-lg);position:relative"><div class="timeline-dot" style="position:absolute;left:0;top:4px;background:${v.badge ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}"></div><div style="flex:1"><div style="display:flex;align-items:center;gap:var(--space-sm)"><span style="font-weight:700;font-size:0.85rem">${v.v}</span>${v.badge ? `<span class="badge badge-purple" style="font-size:0.6rem">${v.badge}</span>` : ''}<span style="font-size:0.7rem;color:var(--text-muted);margin-left:auto">${v.date}</span></div><p style="font-size:0.75rem;margin-top:2px">${v.change}</p></div></div>`).join('')}</div>
      </div>
    </div>${bottomNav('/reports')}`;
    },

    validation() {
        const phases = [{ name: 'Phase I — Lab Validation', desc: 'In-vitro testing', pct: 100, icon: 'science', status: 'COMPLETE', color: '#10b981' }, { name: 'Phase II — Clinical Trial', desc: '200-patient single-center', pct: 85, icon: 'clinical_notes', status: '85%', color: '#3b82f6' }, { name: 'Phase III — Multi-center', desc: '1000-patient multi-site', pct: 42, icon: 'local_hospital', status: '42%', color: '#f59e0b' }, { name: 'Phase IV — Regulatory', desc: 'FDA 510k & CE Mark', pct: 10, icon: 'gavel', status: 'PENDING', color: '#94a3b8' }];
        const reviews = [{ name: 'Dr. Sarah Chen', role: 'Oncology Lead', status: 'Approved', av: 'S', color: '#10b981' }, { name: 'Dr. James Wright', role: 'Pathologist', status: 'Approved', av: 'J', color: '#10b981' }, { name: 'Dr. Maria Gonzalez', role: 'Biostatistician', status: 'Under Review', av: 'M', color: '#f59e0b' }, { name: 'Dr. Robert Kim', role: 'Radiologist', status: 'Pending', av: 'R', color: '#94a3b8' }];
        const certs = [{ name: 'HIPAA', status: 'Compliant', icon: 'shield', color: '#10b981' }, { name: 'FDA 510(k)', status: 'In Progress', icon: 'gavel', color: '#f59e0b' }, { name: 'CE Mark', status: 'Pending', icon: 'public', color: '#94a3b8' }, { name: 'ISO 13485', status: 'Certified', icon: 'workspace_premium', color: '#10b981' }];
        const overallPct = Math.round(phases.reduce((s, p) => s + p.pct, 0) / phases.length);
        return `<div class="page-container">
      ${pageTop('/reports', 'Validation')}
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <div class="flex-between mb-lg"><h4 style="font-size:0.9rem;display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">verified</span>Clinical Validation</h4><span class="badge badge-amber" style="font-size:0.6rem">IN PROGRESS</span></div>
        <div class="flex-between mb-md"><span style="font-size:0.85rem;color:var(--text-secondary)">Overall</span><span style="font-weight:700;color:var(--accent-primary)">${overallPct}%</span></div>
        <div style="width:100%;height:8px;background:rgba(255,255,255,0.06);border-radius:var(--radius-full);overflow:hidden"><div style="height:100%;width:${overallPct}%;background:var(--accent-primary);border-radius:var(--radius-full);transition:width 1s ease"></div></div>
      </div>
      <h4 style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:var(--space-md)">Validation Phases</h4>
      <div class="space-y" style="margin-bottom:var(--space-xl)">${phases.map(p => `<div class="glass-card" style="padding:var(--space-lg)"><div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md)"><div style="width:40px;height:40px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;background:${p.color}15"><span class="material-symbols-outlined" style="color:${p.color}">${p.icon}</span></div><div style="flex:1"><p style="font-weight:600;font-size:0.9rem">${p.name}</p><p style="font-size:0.7rem;color:var(--text-muted)">${p.desc}</p></div><span class="indicator-badge" style="background:${p.color}15;color:${p.color}">${p.status}</span></div><div style="width:100%;height:6px;background:rgba(255,255,255,0.06);border-radius:var(--radius-full);overflow:hidden"><div style="height:100%;width:${p.pct}%;background:${p.color};border-radius:var(--radius-full);transition:width 1s ease"></div></div></div>`).join('')}</div>
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <h4 style="font-size:0.9rem;margin-bottom:var(--space-lg);display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">group</span>Peer Review Board</h4>
        <div class="space-y">${reviews.map(r => `<div style="display:flex;align-items:center;gap:var(--space-md);padding:var(--space-sm) 0"><div style="width:40px;height:40px;border-radius:50%;background:var(--gradient-soft);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent-primary)">${r.av}</div><div style="flex:1"><p style="font-weight:600;font-size:0.85rem">${r.name}</p><p style="font-size:0.7rem;color:var(--text-muted)">${r.role}</p></div><span class="indicator-badge" style="background:${r.color}15;color:${r.color}">${r.status}</span></div>`).join('')}</div>
      </div>
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <h4 style="font-size:0.9rem;margin-bottom:var(--space-lg);display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">workspace_premium</span>Compliance</h4>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-md)">${certs.map(c => `<div style="background:rgba(255,255,255,0.03);border-radius:var(--radius-sm);padding:var(--space-md);display:flex;align-items:center;gap:var(--space-md)"><span class="material-symbols-outlined" style="color:${c.color}">${c.icon}</span><div><p style="font-size:0.85rem;font-weight:700">${c.name}</p><p style="font-size:0.65rem;color:${c.color};font-weight:600">${c.status}</p></div></div>`).join('')}</div>
      </div>
      <div class="glass-card" style="padding:var(--space-lg)">
        <h4 style="font-size:0.9rem;margin-bottom:var(--space-lg);display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">rate_review</span>Submit Note</h4>
        <form id="form-note" onsubmit="return false" class="space-y">
          <select class="form-input form-select" id="note-phase" required><option value="">Select Phase...</option><option value="Phase I">Phase I</option><option value="Phase II">Phase II</option><option value="Phase III">Phase III</option><option value="Phase IV">Phase IV</option></select>
          <textarea class="form-input form-textarea" id="note-text" required rows="2" placeholder="Enter validation note..." style="min-height:60px"></textarea>
          <button class="btn btn-primary btn-block" type="submit"><span class="material-symbols-outlined" style="font-size:16px">send</span> Submit</button>
        </form>
        <div id="notes-list" class="space-y" style="margin-top:var(--space-lg)"></div>
      </div>
    </div>${bottomNav('/validation')}`;
    },

    addData() {
        return `<div class="page-container">
      ${pageTop('/validation', 'Add Data')}
      <div class="glass-card" style="padding:var(--space-lg);margin-bottom:var(--space-xl)">
        <div class="flex-between mb-lg"><h4 style="font-size:0.9rem;display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary);font-size:18px">folder_open</span>Saved Records</h4><span style="font-size:0.75rem;font-weight:700;color:var(--accent-primary)" id="rec-count">0</span></div>
        <div id="saved-list" class="space-y"></div>
      </div>
      <div class="glass-card" style="margin-bottom:var(--space-xl)">
        <div style="padding:var(--space-md) var(--space-lg);background:rgba(124,58,237,0.05);border-bottom:1px solid var(--border-color);display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">add_circle</span><h4 style="font-size:0.9rem;font-weight:700">New Record</h4></div>
        <form id="form-add" onsubmit="return false" style="padding:var(--space-lg)" class="space-y">
          <div class="form-group"><label>Record Type *</label><select class="form-input form-select" id="rec-type" required><option value="">Select...</option>${['Lab Result', 'Imaging Report', 'Biopsy', 'Biomarker', 'Pathology', 'Prescription', 'Other'].map(o => `<option value="${o}">${o}</option>`).join('')}</select></div>
          <div class="form-group"><label>Title *</label><input class="form-input" id="rec-title" required placeholder="e.g. Complete Blood Count — Jan 2026"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md)">
            <div class="form-group"><label>Date *</label><input class="form-input" id="rec-date" type="date" required></div>
            <div class="form-group"><label>Facility</label><input class="form-input" id="rec-facility" placeholder="Hospital name"></div>
          </div>
          <div class="form-group"><label>Values / Results</label><textarea class="form-input form-textarea" id="rec-values" rows="2" placeholder="Enter test values..." style="min-height:60px"></textarea></div>
          <div class="form-group"><label>Clinical Notes</label><textarea class="form-input form-textarea" id="rec-notes" rows="2" placeholder="Optional notes..." style="min-height:50px"></textarea></div>
          <div class="form-group"><label>Priority</label><div style="display:flex;gap:var(--space-sm)" id="priority-btns">
            <button type="button" class="priority-pill selected-normal" data-val="Normal" onclick="Bind.setPriority(this)">Normal</button>
            <button type="button" class="priority-pill" data-val="Urgent" onclick="Bind.setPriority(this)">Urgent</button>
            <button type="button" class="priority-pill" data-val="Critical" onclick="Bind.setPriority(this)">Critical</button>
          </div></div>
          <button class="btn btn-primary btn-block" type="submit"><span class="material-symbols-outlined" style="font-size:16px">save</span> Save Record</button>
        </form>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md)">
        <div class="glass-card" style="padding:var(--space-lg);cursor:pointer;display:flex;align-items:center;gap:var(--space-md)" onclick="App.navigate('#/screening/step1')">
          <span class="material-symbols-outlined" style="color:var(--accent-primary)">assignment_ind</span>
          <div><p style="font-weight:600;font-size:0.85rem">New Screening</p><p style="font-size:0.7rem;color:var(--text-muted)">Start fresh</p></div>
        </div>
        <div class="glass-card" style="padding:var(--space-lg);cursor:pointer;display:flex;align-items:center;gap:var(--space-md)" onclick="App.navigate('#/dashboard')">
          <span class="material-symbols-outlined" style="color:var(--accent-primary)">dashboard</span>
          <div><p style="font-weight:600;font-size:0.85rem">Dashboard</p><p style="font-size:0.7rem;color:var(--text-muted)">View results</p></div>
        </div>
      </div>
    </div>${bottomNav('/add-data')}`;
    }
};
