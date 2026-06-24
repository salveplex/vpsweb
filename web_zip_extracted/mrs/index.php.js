(function () {
    const storageKey = 'taxiportalen-theme';
    const root = document.documentElement;
    const button = document.getElementById('theme-toggle');
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function systemTheme() {
        return media.matches ? 'dark' : 'light';
    }

    function currentMode() {
        return localStorage.getItem(storageKey) || 'system';
    }

    function applyTheme(mode) {
        if (mode === 'light') root.setAttribute('data-theme', 'light');
        else if (mode === 'dark') root.setAttribute('data-theme', 'dark');
        else root.removeAttribute('data-theme');
        updateButton();
    }

    function updateButton() {
        if (!button) return;
        const mode = currentMode();
        const labels = { system: 'Tema: Auto', light: 'Tema: Lyst', dark: 'Tema: Mørkt' };
        button.textContent = labels[mode];
        button.title = 'Aktivt tema: ' + (mode === 'system' ? systemTheme() : mode);
    }

    function nextMode(mode) {
        if (mode === 'system') return 'light';
        if (mode === 'light') return 'dark';
        return 'system';
    }

    applyTheme(currentMode());

    if (button) {
        button.addEventListener('click', function () {
            const mode = nextMode(currentMode());
            if (mode === 'system') localStorage.removeItem(storageKey);
            else localStorage.setItem(storageKey, mode);
            applyTheme(mode);
        });
    }

    if (media.addEventListener) {
        media.addEventListener('change', function () {
            if (currentMode() === 'system') applyTheme('system');
        });
    }
})();
