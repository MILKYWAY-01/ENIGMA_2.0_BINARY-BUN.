// ── OncoGuard AI — Authentication Module ──────────────────────
(function () {
    'use strict';

    const CREDENTIALS = { username: 'doctor', password: 'oncoguard2024' };
    const SESSION_KEY = 'oncoguard_session';

    /** Returns true if the user has a valid session */
    window.isAuthenticated = function () {
        return localStorage.getItem(SESSION_KEY) === 'authenticated';
    };

    /** Redirect unauthenticated users to login. Call at top of every protected page. */
    window.requireAuth = function () {
        if (!isAuthenticated()) {
            window.location.href = 'LoginScreen.html';
        }
    };

    /** Attempt login. Returns true on success. */
    window.attemptLogin = function (username, password) {
        if (
            username.trim().toLowerCase() === CREDENTIALS.username &&
            password === CREDENTIALS.password
        ) {
            localStorage.setItem(SESSION_KEY, 'authenticated');
            return true;
        }
        return false;
    };

    /** Clear session and redirect to login */
    window.logout = function () {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem('screening_step1');
        localStorage.removeItem('screening_step2');
        localStorage.removeItem('screening_step3');
        window.location.href = 'LoginScreen.html';
    };
})();
