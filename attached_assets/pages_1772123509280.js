/* ============================================================
   OncoGuard AI — Page Templates (Landing, Portal, Login)
   ============================================================ */
const Pages = {
    landing() {
        return `
    <section class="hero"><div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center">
      <div class="hero-content">
        <div class="hero-tag"><span class="dot"></span> AI-POWERED EARLY DETECTION</div>
        <h1>Detect Cancer <br><span class="gradient-text">Earlier. Smarter.</span></h1>
        <p class="lead">OncoGuard AI uses advanced machine learning to analyze patient data and identify early warning signs, giving clinicians the insight edge they need.</p>
        <div class="hero-buttons">
          <a class="btn btn-primary btn-lg" onclick="App.navigate('#/portal')">Get Started <span class="material-symbols-outlined">arrow_forward</span></a>
          <a class="btn btn-secondary btn-lg" onclick="document.getElementById('how-it-works')?.scrollIntoView({behavior:'smooth'})"><span class="material-symbols-outlined">play_circle</span> See How It Works</a>
        </div>
      </div>
      <div style="display:flex;justify-content:center">
        <div style="position:relative">
          <div style="width:280px;height:280px;background:rgba(124,58,237,0.12);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:pulse-ring 3s ease-in-out infinite">
            <div class="float-anim" style="width:220px;height:220px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:50%;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(20px);box-shadow:var(--shadow-card)">
              <span class="material-symbols-outlined" style="font-size:80px;color:var(--accent-primary);font-variation-settings:'FILL' 1">biotech</span>
            </div>
          </div>
          <div class="float-anim" style="position:absolute;top:-10px;right:-20px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:0.75rem 1rem;display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:600;backdrop-filter:blur(20px);animation-delay:0.5s">
            <span class="material-symbols-outlined" style="color:var(--accent-green)">check_circle</span> 98.4% Accuracy
          </div>
          <div class="float-anim" style="position:absolute;bottom:-10px;left:-20px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:0.75rem 1rem;display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:600;backdrop-filter:blur(20px);animation-delay:1s">
            <span class="material-symbols-outlined" style="color:var(--accent-secondary)">speed</span> 90s Analysis
          </div>
        </div>
      </div>
      <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
    </div></section>

    <section id="stats" class="section" style="border-top:1px solid var(--border-color);border-bottom:1px solid var(--border-color)">
      <div class="container"><div class="stats-bar" style="justify-content:center">
        <div class="stat-item"><p class="stat-value" data-count="98" data-suffix=".4%">0</p><p class="stat-label">Detection Accuracy</p></div>
        <div class="stat-divider"></div>
        <div class="stat-item"><p class="stat-value" data-count="50" data-suffix="K+">0</p><p class="stat-label">Patients Screened</p></div>
        <div class="stat-divider"></div>
        <div class="stat-item"><p class="stat-value" data-count="200" data-suffix="+">0</p><p class="stat-label">Clinical Partners</p></div>
        <div class="stat-divider"></div>
        <div class="stat-item"><p class="stat-value" data-count="4" data-suffix=".2s">0</p><p class="stat-label">Avg. Processing</p></div>
      </div></div>
    </section>

    <section id="features" class="section"><div class="container">
      <div class="section-header"><div class="section-label"><span class="material-symbols-outlined" style="font-size:14px">auto_awesome</span> Core Features</div><h2>Everything You Need</h2><p>From patient screening to AI-powered risk analysis, OncoGuard covers the entire diagnostic pipeline.</p></div>
      <div class="grid-3">
        ${[
                { icon: 'assignment_ind', title: 'Patient Screening', desc: '4-step guided workflow capturing demographics, lifestyle, and symptoms with real-time validation.' },
                { icon: 'psychology', title: 'AI Risk Analysis', desc: 'Advanced AI evaluates all patient data and delivers actionable risk assessments with clinical recommendations.' },
                { icon: 'dashboard', title: 'Clinical Dashboard', desc: 'Real-time risk gauges, biomarker tracking, model accuracy reports, and clinical validation tools.' },
            ].map((f, i) => `<div class="card fade-up delay-${i + 1}" style="position:relative;z-index:1">
          <div class="icon-box"><span class="material-symbols-outlined" style="color:var(--accent-primary)">${f.icon}</span></div>
          <h3 style="margin-bottom:var(--space-sm)">${f.title}</h3>
          <p style="font-size:0.9rem">${f.desc}</p>
        </div>`).join('')}
      </div>
    </div></section>

    <section id="how-it-works" class="section" style="background:var(--bg-secondary)"><div class="container">
      <div class="section-header"><div class="section-label">Simple Process</div><h2>How It Works</h2><p>Four simple steps from patient data to AI-powered health insights.</p></div>
      <div class="grid-4">
        ${['Login', 'Screen', 'Analyze', 'Act'].map((s, i) => `<div class="fade-up delay-${i + 1}" style="text-align:center">
          <div style="width:64px;height:64px;margin:0 auto var(--space-lg);background:var(--gradient-main);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;color:#fff;box-shadow:0 8px 24px rgba(124,58,237,0.3)">${i + 1}</div>
          <h4>${s}</h4>
          <p style="font-size:0.8rem;margin-top:0.25rem">${['Secure authentication for clinicians', 'Capture patient info, lifestyle & symptoms', 'AI processes data for risk insights', 'View dashboard & take clinical action'][i]}</p>
        </div>`).join('')}
      </div>
    </div></section>

    <section class="section"><div class="container"><div style="max-width:800px;margin:0 auto;background:var(--gradient-main);border-radius:var(--radius-xl);padding:4rem;text-align:center;box-shadow:0 20px 60px rgba(124,58,237,0.3)">
      <h2 style="color:#fff;margin-bottom:var(--space-md)">Ready to Start Screening?</h2>
      <p style="color:rgba(255,255,255,0.8);margin-bottom:var(--space-xl);max-width:500px;margin-left:auto;margin-right:auto">Access the full OncoGuard AI platform — from patient intake to AI analysis — right now.</p>
      <a class="btn btn-lg" style="background:#fff;color:var(--accent-primary);font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,0.2)" onclick="App.navigate('#/portal')">Launch OncoGuard AI <span class="material-symbols-outlined">rocket_launch</span></a>
    </div></div></section>

    <footer class="footer"><div class="container"><div class="footer-inner">
      <div style="display:flex;align-items:center;gap:0.5rem"><span class="material-symbols-outlined" style="color:var(--accent-primary)">biotech</span><span style="font-weight:700;color:var(--text-primary)">OncoGuard AI</span></div>
      <p>© 2026 OncoGuard AI Systems. All rights reserved. HIPAA Compliant.</p>
      <div class="footer-badge"><span class="material-symbols-outlined" style="font-size:14px">lock</span> 256-bit Encryption</div>
    </div></div></footer>`;
    },

    portal() {
        return `<div class="page-container no-bottom-nav" style="padding-top:calc(var(--nav-height) + 4rem);max-width:900px;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div class="text-center mb-2xl">
        <h1 style="font-size:2.5rem;margin-bottom:var(--space-md)">Welcome to <span class="gradient-text">OncoGuard AI</span></h1>
        <p style="max-width:500px;margin:0 auto">Select your role to access the appropriate portal. All sessions are encrypted and HIPAA compliant.</p>
      </div>
      <div class="grid-2" style="max-width:700px;width:100%">
        <div class="portal-card" onclick="App.navigate('#/login')">
          <div style="width:72px;height:72px;margin:0 auto var(--space-lg);background:var(--gradient-soft);border:1px solid rgba(124,58,237,0.2);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center">
            <span class="material-symbols-outlined" style="font-size:2.5rem;color:var(--accent-primary)">stethoscope</span>
          </div>
          <h3 style="margin-bottom:var(--space-sm)">Doctor / Clinician</h3>
          <p style="font-size:0.875rem;margin-bottom:var(--space-lg)">Access screening tools, AI analysis, risk dashboards, and clinical validation reports.</p>
          <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-lg)">
            <span class="badge badge-purple">Screening</span><span class="badge badge-blue">AI Analysis</span><span class="badge badge-teal">Reports</span>
          </div>
          <div class="btn btn-primary btn-block">Enter Clinician Portal <span class="material-symbols-outlined" style="font-size:16px">arrow_forward</span></div>
        </div>
        <div class="portal-card disabled">
          <div style="position:absolute;top:1rem;right:1rem"><span class="badge" style="background:rgba(255,255,255,0.06);color:var(--text-muted);font-size:0.65rem">COMING SOON</span></div>
          <div style="width:72px;height:72px;margin:0 auto var(--space-lg);background:rgba(255,255,255,0.04);border:1px solid var(--border-color);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center">
            <span class="material-symbols-outlined" style="font-size:2.5rem;color:var(--text-muted)">person</span>
          </div>
          <h3 style="margin-bottom:var(--space-sm)">Patient</h3>
          <p style="font-size:0.875rem;margin-bottom:var(--space-lg)">View your screening results, health insights, and track your health over time.</p>
          <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-lg)">
            <span class="badge" style="background:rgba(255,255,255,0.04);color:var(--text-muted)">Results</span>
            <span class="badge" style="background:rgba(255,255,255,0.04);color:var(--text-muted)">History</span>
          </div>
          <div class="btn btn-block" style="background:rgba(255,255,255,0.04);color:var(--text-muted);border:1px solid var(--border-color);cursor:not-allowed">Patient Portal <span class="material-symbols-outlined" style="font-size:16px">lock</span></div>
        </div>
      </div>
      <div style="margin-top:3rem;display:flex;gap:2rem;color:var(--text-muted);font-size:0.75rem">
        <span style="display:flex;align-items:center;gap:4px"><span class="material-symbols-outlined" style="font-size:14px;color:var(--accent-green)">verified_user</span>HIPAA</span>
        <span style="display:flex;align-items:center;gap:4px"><span class="material-symbols-outlined" style="font-size:14px;color:var(--accent-green)">lock</span>256-bit SSL</span>
        <span style="display:flex;align-items:center;gap:4px"><span class="material-symbols-outlined" style="font-size:14px;color:var(--accent-green)">shield</span>SOC 2</span>
      </div>
    </div>`;
    },

    login() {
        return `<div class="login-container">
      <div class="login-card" id="loginCard">
        <div style="padding:2rem 2rem 1rem;text-align:center">
          <div style="width:64px;height:64px;margin:0 auto var(--space-lg);background:var(--gradient-soft);border:1px solid rgba(124,58,237,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center">
            <span class="material-symbols-outlined" style="font-size:2rem;color:var(--accent-primary)">shield_with_heart</span>
          </div>
          <h2 style="font-size:1.75rem">OncoGuard AI</h2>
          <p style="font-size:0.875rem;margin-top:0.5rem">Secure Early Detection Portal</p>
        </div>
        <div style="padding:0.5rem 2rem 2rem">
          <h3 style="text-align:center;font-size:1.25rem;margin-bottom:0.25rem">Welcome Back</h3>
          <p style="text-align:center;font-size:0.85rem;margin-bottom:1.5rem">Access your diagnostic dashboard and patient records.</p>
          <div id="loginError" style="display:none;padding:0.75rem;border-radius:var(--radius-sm);background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#f87171;font-size:0.85rem;margin-bottom:1rem;display:none;align-items:center;gap:0.5rem">
            <span class="material-symbols-outlined" style="font-size:16px">error</span> Invalid username or password.
          </div>
          <form id="loginForm" onsubmit="return false">
            <div class="form-group">
              <label>Username</label>
              <div style="position:relative"><span class="material-symbols-outlined" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:20px">person</span>
              <input class="form-input" id="inp-user" type="text" placeholder="e.g. doctor" required style="padding-left:2.5rem"></div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div style="position:relative"><span class="material-symbols-outlined" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:20px">lock</span>
              <input class="form-input" id="inp-pass" type="password" placeholder="••••••••" required style="padding-left:2.5rem;padding-right:2.5rem">
              <button type="button" onclick="const p=document.getElementById('inp-pass');p.type=p.type==='password'?'text':'password'" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-muted);cursor:pointer"><span class="material-symbols-outlined" style="font-size:20px">visibility</span></button></div>
            </div>
            <button class="btn btn-primary btn-block btn-lg" type="submit" id="loginBtn" style="margin-top:var(--space-md)">
              <span id="loginBtnText">Sign In</span>
              <span id="loginSpinner" class="material-symbols-outlined spinner" style="display:none;font-size:18px">progress_activity</span>
              <span id="loginIcon" class="material-symbols-outlined" style="font-size:18px">login</span>
            </button>
          </form>
          <div style="margin-top:1.5rem;padding:0.75rem;border-radius:var(--radius-sm);background:rgba(255,255,255,0.03);border:1px solid var(--border-color);text-align:center">
            <p style="font-size:0.7rem;color:var(--text-muted)"><strong>Demo:</strong> username <code style="background:rgba(124,58,237,0.15);padding:0 4px;border-radius:4px;color:var(--accent-primary);font-weight:700">doctor</code> / password <code style="background:rgba(124,58,237,0.15);padding:0 4px;border-radius:4px;color:var(--accent-primary);font-weight:700">oncoguard2024</code></p>
          </div>
        </div>
        <div style="padding:1rem;border-top:1px solid var(--border-color);text-align:center;display:flex;align-items:center;justify-content:center;gap:0.5rem">
          <span class="material-symbols-outlined" style="font-size:14px;color:var(--accent-green)">verified_user</span>
          <span style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;color:var(--text-muted)">Secure & Encrypted 256-bit SSL</span>
        </div>
      </div>
    </div>`;
    },

    step1() {
        if (!requireAuth()) return '';
        const s = JSON.parse(localStorage.getItem('screening_step1') || 'null');
        return `<div class="page-container no-bottom-nav">
      ${pageTop('/login', 'Patient Screening')}
      ${progressBar(1, 4, 'Step 1 of 4 — Patient Information')}
      <div class="glass-card">
        <div style="padding:var(--space-lg);border-bottom:1px solid var(--border-color);display:flex;align-items:center;gap:var(--space-sm)">
          <span class="material-symbols-outlined" style="color:var(--accent-primary)">person</span>
          <h3 style="font-size:1.1rem">Basic Patient Information</h3>
        </div>
        <form id="form-step1" style="padding:var(--space-lg)" onsubmit="return false">
          <div class="form-group"><label>Full Name *</label><input class="form-input" id="s1-name" required placeholder="Jonathan K. Richards" value="${s?.fullName || ''}"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md)">
            <div class="form-group"><label>Age *</label><input class="form-input" id="s1-age" type="number" min="1" max="120" required placeholder="52" value="${s?.age || ''}"></div>
            <div class="form-group"><label>Gender *</label><select class="form-input form-select" id="s1-gender" required>
              <option value="">Select</option>${['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => `<option value="${g}" ${s?.gender === g ? 'selected' : ''}>${g}</option>`).join('')}
            </select></div>
          </div>
          <div class="form-group"><label>Date of Birth *</label><input class="form-input" id="s1-dob" type="date" required value="${s?.dob || ''}"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md)">
            <div class="form-group"><label>Contact *</label><input class="form-input" id="s1-phone" type="tel" required placeholder="+1 (555) 123-4567" value="${s?.contactNumber || ''}"></div>
            <div class="form-group"><label>Email *</label><input class="form-input" id="s1-email" type="email" required placeholder="patient@example.com" value="${s?.email || ''}"></div>
          </div>
          <div class="form-group"><label>Emergency Contact *</label><input class="form-input" id="s1-emergency" required placeholder="Name — Phone" value="${s?.emergencyContact || ''}"></div>
          <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg)">
            <button class="btn btn-secondary" style="flex:1" onclick="App.navigate('#/login')">Cancel</button>
            <button class="btn btn-primary" style="flex:2" type="submit">Save & Continue <span class="material-symbols-outlined" style="font-size:16px">arrow_forward</span></button>
          </div>
        </form>
      </div>
    </div>`;
    },

    step2() {
        if (!requireAuth()) return '';
        const s = JSON.parse(localStorage.getItem('screening_step2') || 'null');
        const smokingOpts = ['Never smoked', 'Former smoker', 'Occasional smoker', 'Daily smoker'];
        const dietOpts = ['Vegetarian', 'Non-vegetarian', 'Vegan'];
        return `<div class="page-container no-bottom-nav">
      ${pageTop('/screening/step1', 'Lifestyle Assessment')}
      ${progressBar(2, 4, 'Step 2 of 4 — Lifestyle Factors')}
      <form id="form-step2" class="space-y-lg" onsubmit="return false">
        <div class="glass-card" style="padding:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-lg)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">smoke_free</span><h3 style="font-size:1.05rem">Smoking Status *</h3></div>
          <div class="space-y">${smokingOpts.map(o => `<label class="radio-card"><input type="radio" name="smoking" value="${o}" ${s?.smoking === o ? 'checked' : ''} required><span style="font-size:0.9rem;font-weight:500">${o}</span></label>`).join('')}</div>
        </div>
        <div class="glass-card" style="padding:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">local_bar</span><h3 style="font-size:1.05rem">Alcohol Consumption</h3></div>
          <div class="flex-between mb-md"><span style="font-size:0.85rem;color:var(--text-secondary)">Drinks/week</span><span id="alc-val" style="font-size:1.5rem;font-weight:800;color:var(--accent-primary)">${s?.alcohol || 0}</span></div>
          <input id="s2-alcohol" type="range" min="0" max="21" value="${s?.alcohol || 0}" style="width:100%;accent-color:var(--accent-primary)" oninput="document.getElementById('alc-val').textContent=this.value">
          <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:var(--text-muted);margin-top:4px"><span>0</span><span>7</span><span>14</span><span>21+</span></div>
        </div>
        <div class="glass-card" style="padding:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">fitness_center</span><h3 style="font-size:1.05rem">Exercise Frequency</h3></div>
          <select class="form-input form-select" id="s2-exercise" required>
            <option value="">Select</option>${['Rarely (0-1 days/week)', 'Moderate (2-3 days/week)', 'Active (4-5 days/week)', 'Very Active (6-7 days/week)'].map(o => `<option value="${o}" ${s?.exercise === o ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
        <div class="glass-card" style="padding:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">restaurant_menu</span><h3 style="font-size:1.05rem">Diet Type *</h3></div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-sm)">${dietOpts.map(o => `<label class="radio-card" style="flex-direction:column;text-align:center;padding:var(--space-md)"><input type="radio" name="diet" value="${o}" ${s?.diet === o ? 'checked' : ''} required><span style="font-size:0.8rem;font-weight:500">${o}</span></label>`).join('')}</div>
        </div>
        <div class="glass-card" style="padding:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">bedtime</span><h3 style="font-size:1.05rem">Other Factors</h3></div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-md)">
            <div class="form-group"><label>Sleep hrs *</label><input class="form-input" id="s2-sleep" type="number" min="0" max="24" step="0.5" required placeholder="7" value="${s?.sleep || ''}"></div>
            <div class="form-group"><label>Stress *</label><select class="form-input form-select" id="s2-stress" required><option value="">Select</option>${['Low', 'Moderate', 'High', 'Very High'].map(o => `<option value="${o}" ${s?.stress === o ? 'selected' : ''}>${o}</option>`).join('')}</select></div>
            <div class="form-group"><label>Water L/day *</label><input class="form-input" id="s2-water" type="number" min="0" max="15" step="0.5" required placeholder="2.5" value="${s?.water || ''}"></div>
          </div>
        </div>
        <div style="display:flex;gap:var(--space-md)">
          <button class="btn btn-secondary" style="flex:1" type="button" onclick="App.navigate('#/screening/step1')">Back</button>
          <button class="btn btn-primary" style="flex:2" type="submit">Save & Continue <span class="material-symbols-outlined" style="font-size:16px">arrow_forward</span></button>
        </div>
      </form>
    </div>`;
    },

    step3() {
        if (!requireAuth()) return '';
        const SYMPTOMS = [
            { id: 'fatigue', label: 'Fatigue', desc: 'Persistent tiredness or exhaustion', icon: 'battery_alert' },
            { id: 'headache', label: 'Headache', desc: 'Frequent or severe headaches', icon: 'psychology_alt' },
            { id: 'chest_pain', label: 'Chest Pain', desc: 'Pain or pressure in the chest area', icon: 'cardiology' },
            { id: 'shortness_of_breath', label: 'Shortness of Breath', desc: 'Difficulty breathing', icon: 'pulmonology' },
            { id: 'dizziness', label: 'Dizziness', desc: 'Lightheadedness or vertigo', icon: 'blur_on' },
            { id: 'nausea', label: 'Nausea', desc: 'Feeling of sickness', icon: 'sick' },
            { id: 'joint_pain', label: 'Joint Pain', desc: 'Aches in joints or muscles', icon: 'accessibility_new' },
            { id: 'fever', label: 'Fever', desc: 'Elevated body temperature', icon: 'thermometer' },
            { id: 'weight_changes', label: 'Weight Changes', desc: 'Unexplained weight loss or gain', icon: 'monitor_weight' },
            { id: 'mood_changes', label: 'Mood Changes', desc: 'Anxiety, depression, or irritability', icon: 'mood' },
        ];
        const saved = JSON.parse(localStorage.getItem('screening_step3') || 'null');
        const checked = saved?.symptoms || [];
        return `<div class="page-container no-bottom-nav">
      ${pageTop('/screening/step2', 'Symptom Checklist')}
      ${progressBar(3, 4, 'Step 3 of 4 — Symptom Checklist')}
      <div class="glass-card">
        <div style="padding:var(--space-lg);border-bottom:1px solid var(--border-color)">
          <div style="display:flex;align-items:center;gap:var(--space-sm)"><span class="material-symbols-outlined" style="color:var(--accent-primary)">checklist</span><h3 style="font-size:1.1rem">Early Warning Signs</h3></div>
          <p style="font-size:0.85rem;margin-top:0.25rem">Select any symptoms you've experienced recently.</p>
        </div>
        <div style="padding:var(--space-md)" class="space-y" id="symptom-list">
          ${SYMPTOMS.map(s => `<label class="symptom-card ${checked.includes(s.id) ? 'checked' : ''}" onclick="this.classList.toggle('checked')">
            <input type="checkbox" class="sym-cb" value="${s.id}" ${checked.includes(s.id) ? 'checked' : ''} style="accent-color:var(--accent-primary);width:18px;height:18px" onchange="document.getElementById('sym-count').textContent=document.querySelectorAll('.sym-cb:checked').length">
            <span class="material-symbols-outlined symptom-icon">${s.icon}</span>
            <div style="flex:1"><p style="font-size:0.9rem;font-weight:600;color:var(--text-primary)">${s.label}</p><p style="font-size:0.75rem;color:var(--text-muted)">${s.desc}</p></div>
          </label>`).join('')}
        </div>
        <div style="padding:var(--space-lg);border-top:1px solid var(--border-color)">
          <label style="font-size:0.85rem;font-weight:600;color:var(--text-secondary);margin-bottom:var(--space-sm);display:block">Other symptoms</label>
          <textarea class="form-input form-textarea" id="s3-other" placeholder="Describe any other symptoms..." style="min-height:80px">${saved?.otherSymptoms || ''}</textarea>
        </div>
        <div style="padding:var(--space-md) var(--space-lg);border-top:1px solid var(--border-color);display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:0.85rem;color:var(--text-secondary)"><strong style="color:var(--accent-primary)" id="sym-count">${checked.length}</strong> symptom(s) selected</span>
          <span style="font-size:0.6rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em">HIPAA Compliant</span>
        </div>
      </div>
      <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg)">
        <button class="btn btn-secondary" style="flex:1" onclick="App.navigate('#/screening/step2')">Back</button>
        <button class="btn btn-primary" style="flex:2" id="btn-step3">Continue to Summary <span class="material-symbols-outlined" style="font-size:16px">arrow_forward</span></button>
      </div>
    </div>`;
    },

    step4() { if (!requireAuth()) return ''; return PageExtras.step4(); },
    dashboard() { if (!requireAuth()) return ''; return PageExtras.dashboard(); },
    reports() { if (!requireAuth()) return ''; return PageExtras.reports(); },
    validation() { if (!requireAuth()) return ''; return PageExtras.validation(); },
    addData() { if (!requireAuth()) return ''; return PageExtras.addData(); },
};
