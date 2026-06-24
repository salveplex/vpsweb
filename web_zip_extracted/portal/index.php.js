(function () {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const toggleButton = document.getElementById('sound-toggle');
    const refreshSelect = document.getElementById('refresh-seconds');
    const volumeInput = document.getElementById('sound-volume');
    const volumeValue = document.getElementById('sound-volume-value');
    const themePreferenceKey = 'taxiportalen-board-theme';
    const soundPreferenceKey = 'taxiportalen-board-sound-enabled';
    const refreshPreferenceKey = 'taxiportalen-board-refresh-seconds';
    const volumePreferenceKey = 'taxiportalen-board-sound-volume';
    const scrollPreferenceKey = 'taxiportalen-board-scroll';
    const boardTabPreferenceKey = 'taxiportalen-board-tab';
    const boardViewPreferenceKey = 'taxiportalen-board-view';
    const lastColumnPreferenceKey = 'taxiportalen-board-last-column';
    const openDetailsPreferenceKey = 'taxiportalen-board-open-details';
    const openMessagesPreferenceKey = 'taxiportalen-board-open-messages';
    const senderSoundPath = document.body.dataset.senderSound || '';
    const forsentSoundPath = document.body.dataset.forsentSound || '';
    const forsentSoundFallbackPath = document.body.dataset.forsentSoundFallback || '';
    const testUtropMode = (new URLSearchParams(window.location.search).get('test_utrop') || '').toLowerCase();
    const hasUtropTestMode = testUtropMode !== '';

    function getBoardPanel() {
        return document.querySelector('.board-panel');
    }

    function getActiveTableShell() {
        return document.querySelector('.board-tab-panel.is-active .table-shell[data-status-snapshot]')
            || document.querySelector('.table-shell[data-status-snapshot]');
    }

    function readSnapshotFromDom() {
        const currentTable = getActiveTableShell();
        if (!currentTable) return {};

        try {
            return JSON.parse(currentTable.dataset.statusSnapshot || '{}');
        } catch (_error) {
            return {};
        }
    }

    let snapshot = readSnapshotFromDom();

    let statuses = Object.values(snapshot);
    let hasUtrop = statuses.includes('Utrop');
    let hasForsent = statuses.includes('Forsent');

    let sendingTimer = null;
    let forsentTimer = null;
    let refreshTimer = null;
    let utropHighlightTimer = null;
    let senderAudio = null;
    let forsentAudio = null;
    const sendingAlertIntervalMs = 30000;
    const forsentAlertIntervalMs = 30000;

    function saveScrollState() {
        const currentTable = getActiveTableShell();
        const payload = {
            windowX: window.scrollX || 0,
            windowY: window.scrollY || 0,
            tableX: currentTable ? currentTable.scrollLeft || 0 : 0,
            tableY: currentTable ? currentTable.scrollTop || 0 : 0,
        };
        sessionStorage.setItem(scrollPreferenceKey, JSON.stringify(payload));
    }

    function restoreScrollState() {
        const raw = sessionStorage.getItem(scrollPreferenceKey);
        if (!raw) return;

        try {
            const payload = JSON.parse(raw);
            const applyScroll = function () {
                const currentTable = getActiveTableShell();
                window.scrollTo(payload.windowX || 0, payload.windowY || 0);
                if (currentTable) {
                    currentTable.scrollLeft = payload.tableX || 0;
                    currentTable.scrollTop = payload.tableY || 0;
                }
            };

            applyScroll();
            window.requestAnimationFrame(applyScroll);
            window.setTimeout(applyScroll, 60);
            window.setTimeout(applyScroll, 180);
        } catch (_error) {
        } finally {
            window.setTimeout(function () {
                sessionStorage.removeItem(scrollPreferenceKey);
            }, 300);
        }
    }

    function currentTheme() {
        return localStorage.getItem(themePreferenceKey) || 'dark';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (!themeToggle) return;
        const labels = {
            dark: 'Tema: Mørkt',
            light: 'Tema: Lyst',
            auto: 'Tema: Auto',
        };
        themeToggle.textContent = labels[theme] || labels.dark;
    }

    function nextTheme(theme) {
        if (theme === 'dark') return 'light';
        if (theme === 'light') return 'auto';
        return 'dark';
    }

    function soundEnabled() {
        return localStorage.getItem(soundPreferenceKey) !== 'off';
    }

    function currentRefreshSeconds() {
        const fallback = document.body.dataset.refreshDefault || '20';
        return localStorage.getItem(refreshPreferenceKey) || fallback;
    }

    function currentVolumeLevel() {
        const stored = Number.parseInt(localStorage.getItem(volumePreferenceKey) || '7', 10);
        if (!Number.isFinite(stored)) return 7;
        return Math.min(10, Math.max(1, stored));
    }

    function volumeGain() {
        return currentVolumeLevel() / 10;
    }

    function updateToggleButton() {
        if (!toggleButton) return;
        toggleButton.textContent = soundEnabled() ? 'Lyd: På' : 'Lyd: Av';
    }

    function updateRefreshSelect() {
        if (!refreshSelect) return;
        refreshSelect.value = currentRefreshSeconds();
    }

    function updateVolumeUi() {
        const level = String(currentVolumeLevel());
        if (volumeInput) volumeInput.value = level;
        if (volumeValue) volumeValue.textContent = level;
    }

    function initializeBoardDom() {
        snapshot = readSnapshotFromDom();
        statuses = Object.values(snapshot);
        hasUtrop = statuses.includes('Utrop');
        hasForsent = statuses.includes('Forsent');
        applyBoardTab(currentBoardTab());
        applyBoardView(currentBoardView());
        applyLastColumnMode(currentLastColumnMode());
        restoreOpenDetails();
        restoreOpenMessages();
        bindBoardControls();
        bindCompactRows();
        bindMessageToggles();
        startUtropHighlightTimer();
    }

    function updateHeroMetaFromDocument(doc) {
        const currentMeta = document.querySelectorAll('.hero .meta .meta-chip');
        const nextMeta = doc.querySelectorAll('.hero .meta .meta-chip');
        if (currentMeta.length >= 2 && nextMeta.length >= 2) {
            currentMeta[0].innerHTML = nextMeta[0].innerHTML;
            currentMeta[1].innerHTML = nextMeta[1].innerHTML;
        }
    }

    function flashRefreshIndicator() {
        const updatedChip = document.querySelectorAll('.hero .meta .meta-chip')[1];
        if (!updatedChip) return;
        updatedChip.style.transition = 'opacity 180ms ease, filter 180ms ease';
        updatedChip.style.opacity = '0.38';
        updatedChip.style.filter = 'brightness(1.18)';
        window.setTimeout(function () {
            updatedChip.style.opacity = '1';
            updatedChip.style.filter = 'brightness(1)';
        }, 220);
    }

    function refreshBoardData() {
        const boardPanel = getBoardPanel();
        if (!boardPanel) {
            window.location.reload();
            return;
        }

        saveScrollState();
        fetch(window.location.href, {
            method: 'GET',
            credentials: 'same-origin',
            cache: 'no-store',
            headers: {
                'X-Requested-With': 'fetch',
            },
        })
            .then(function (response) {
                if (!response.ok) throw new Error('refresh_failed');
                return response.text();
            })
            .then(function (html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const nextBoardPanel = doc.querySelector('.board-panel');
                if (!nextBoardPanel) throw new Error('missing_board_panel');

                boardPanel.innerHTML = nextBoardPanel.innerHTML;
                updateHeroMetaFromDocument(doc);
                initializeBoardDom();
                restoreScrollState();
                flashRefreshIndicator();
            })
            .catch(function () {
                window.location.reload();
            });
    }

    function currentBoardTab() {
        return localStorage.getItem(boardTabPreferenceKey) || 'active';
    }

    function currentBoardView() {
        return localStorage.getItem(boardViewPreferenceKey) || 'full';
    }

    function currentLastColumnMode() {
        return localStorage.getItem(lastColumnPreferenceKey) || 'name';
    }

    function currentOpenDetails() {
        try {
            const raw = localStorage.getItem(openDetailsPreferenceKey);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (_error) {
            return [];
        }
    }

    function saveOpenDetails(keys) {
        localStorage.setItem(openDetailsPreferenceKey, JSON.stringify(keys));
    }

    function restoreOpenDetails() {
        const openKeys = new Set(currentOpenDetails());
        document.querySelectorAll('.board-table tbody tr[data-trip-key]').forEach(function (row) {
            if (row.classList.contains('board-detail-row')) return;
            const key = row.dataset.tripKey || '';
            row.classList.toggle('details-open', key !== '' && openKeys.has(key));
        });
    }

    function currentOpenMessages() {
        try {
            const raw = localStorage.getItem(openMessagesPreferenceKey);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (_error) {
            return [];
        }
    }

    function saveOpenMessages(keys) {
        localStorage.setItem(openMessagesPreferenceKey, JSON.stringify(keys));
    }

    function setMessageOpen(row, isOpen) {
        if (!row || row.classList.contains('board-detail-row')) return;
        const detailRow = row.nextElementSibling;
        if (!detailRow || !detailRow.classList.contains('board-detail-row')) return;
        if (!detailRow.querySelector('[data-detail-message="true"]')) return;

        row.classList.toggle('message-open', isOpen);
        const toggle = row.querySelector('[data-message-toggle="true"]');
        if (toggle) {
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            toggle.textContent = isOpen ? 'Skjul melding' : 'Melding';
        }

        const key = row.dataset.tripKey || '';
        if (!key) return;

        const openKeys = new Set(currentOpenMessages());
        if (isOpen) {
            openKeys.add(key);
        } else {
            openKeys.delete(key);
        }
        saveOpenMessages(Array.from(openKeys));
    }

    function restoreOpenMessages() {
        const openKeys = new Set(currentOpenMessages());
        document.querySelectorAll('.board-table tbody tr[data-trip-key]').forEach(function (row) {
            if (row.classList.contains('board-detail-row')) return;
            const key = row.dataset.tripKey || '';
            setMessageOpen(row, key !== '' && openKeys.has(key));
        });
    }

    function applyBoardTab(tabName) {
        document.querySelectorAll('[data-board-tab]').forEach(function (button) {
            const isActive = button.dataset.boardTab === tabName;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        document.querySelectorAll('[data-board-panel]').forEach(function (panel) {
            panel.classList.toggle('is-active', panel.dataset.boardPanel === tabName);
        });
    }

    function applyBoardView(viewName) {
        root.setAttribute('data-board-view', viewName);
        document.querySelectorAll('[data-board-view]').forEach(function (button) {
            const isActive = button.dataset.boardView === viewName;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        if (viewName !== 'compact') {
            document.querySelectorAll('.board-table tbody tr.details-open').forEach(function (row) {
                row.classList.remove('details-open');
            });
        } else {
            restoreOpenDetails();
        }
    }

    function applyLastColumnMode(mode) {
        root.setAttribute('data-last-column-mode', mode);
        document.querySelectorAll('[data-last-column-mode]').forEach(function (button) {
            const isActive = button.dataset.lastColumnMode === mode;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        document.querySelectorAll('[data-last-column-header]').forEach(function (header) {
            header.textContent = mode === 'fra' ? 'Frå' : 'Navn';
        });

        document.querySelectorAll('.table-shell').forEach(function (shell) {
            const width = mode === 'fra' ? shell.dataset.colWidthFra : shell.dataset.colWidthName;
            if (width) {
                shell.style.setProperty('--col-navn-width', width + 'ch');
            }
        });

        document.querySelectorAll('.last-column-value').forEach(function (element) {
            element.classList.toggle('is-hidden', element.dataset.lastColumn !== mode);
        });

        document.querySelectorAll('.board-detail-row').forEach(function (row) {
            const slotA = row.querySelector('[data-detail-slot="a"]');
            const slotB = row.querySelector('[data-detail-slot="b"]');
            if (!slotA || !slotB) return;

            const slotALabel = slotA.querySelector('.board-detail-label');
            const slotAValue = slotA.querySelector('.board-detail-value');
            const slotBLabel = slotB.querySelector('.board-detail-label');
            const slotBValue = slotB.querySelector('.board-detail-value');
            if (!slotALabel || !slotAValue || !slotBLabel || !slotBValue) return;

            if (mode === 'fra') {
                slotALabel.textContent = 'Til';
                slotAValue.textContent = row.dataset.detailTil || '-';
                slotBLabel.textContent = 'Navn';
                slotBValue.textContent = row.dataset.detailNavn || '-';
            } else {
                slotALabel.textContent = 'Frå';
                slotAValue.textContent = row.dataset.detailFra || '-';
                slotBLabel.textContent = 'Til';
                slotBValue.textContent = row.dataset.detailTil || '-';
            }
        });
    }

    function bindBoardControls() {
        document.querySelectorAll('[data-board-tab]').forEach(function (button) {
            if (button.dataset.boundClick === 'true') return;
            button.dataset.boundClick = 'true';
            button.addEventListener('click', function () {
                const tabName = button.dataset.boardTab || 'active';
                localStorage.setItem(boardTabPreferenceKey, tabName);
                applyBoardTab(tabName);
                saveScrollState();
            });
        });

        document.querySelectorAll('[data-board-view]').forEach(function (button) {
            if (button.dataset.boundClick === 'true') return;
            button.dataset.boundClick = 'true';
            button.addEventListener('click', function () {
                const viewName = button.dataset.boardView || 'full';
                localStorage.setItem(boardViewPreferenceKey, viewName);
                applyBoardView(viewName);
                saveScrollState();
            });
        });

        document.querySelectorAll('[data-last-column-mode]').forEach(function (button) {
            if (button.dataset.boundClick === 'true') return;
            button.dataset.boundClick = 'true';
            button.addEventListener('click', function () {
                const mode = button.dataset.lastColumnMode || 'name';
                localStorage.setItem(lastColumnPreferenceKey, mode);
                applyLastColumnMode(mode);
                saveScrollState();
            });
        });
    }

    function bindCompactRows() {
        document.querySelectorAll('.board-table tbody tr[data-trip-key]').forEach(function (row) {
            if (row.classList.contains('board-detail-row')) return;
            if (row.dataset.boundRowClick === 'true') return;

            row.dataset.boundRowClick = 'true';
            row.addEventListener('click', function (event) {
                if (root.getAttribute('data-board-view') !== 'compact') return;
                if (event.target.closest('button, a, input, select, textarea, label')) return;
                toggleCompactRowDetails(row);
            });
        });
    }

    function bindMessageToggles() {
        document.querySelectorAll('[data-message-toggle="true"]').forEach(function (button) {
            if (button.dataset.boundClick === 'true') return;
            button.dataset.boundClick = 'true';
            button.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                const row = button.closest('tr[data-trip-key]');
                if (!row || row.classList.contains('board-detail-row')) return;

                if (root.getAttribute('data-board-view') === 'compact' && !row.classList.contains('details-open')) {
                    toggleCompactRowDetails(row);
                }

                setMessageOpen(row, !row.classList.contains('message-open'));
                saveScrollState();
            });
        });
    }

    function toggleCompactRowDetails(row) {
        if (!row || root.getAttribute('data-board-view') !== 'compact') return;

        const detailRow = row.nextElementSibling;
        if (!detailRow || !detailRow.classList.contains('board-detail-row')) return;

        row.classList.toggle('details-open');
        const openKeys = new Set(currentOpenDetails());
        const key = row.dataset.tripKey || '';
        if (key) {
            if (row.classList.contains('details-open')) {
                openKeys.add(key);
            } else {
                openKeys.delete(key);
            }
            saveOpenDetails(Array.from(openKeys));
        }
    }

    function startRefreshTimer() {
        if (refreshTimer !== null) {
            window.clearTimeout(refreshTimer);
            refreshTimer = null;
        }
        const seconds = Number.parseInt(currentRefreshSeconds(), 10);
        if (!Number.isFinite(seconds) || seconds <= 0) return;
        refreshTimer = window.setTimeout(function () {
            refreshBoardData();
            startRefreshTimer();
        }, seconds * 1000);
    }

    function canUseLiveUtropState(row) {
        if (
            row.classList.contains('row-status-koyrd') ||
            row.classList.contains('row-status-tildelt') ||
            row.classList.contains('row-status-ferdig') ||
            row.classList.contains('row-status-klar-for-fakturering') ||
            row.classList.contains('row-status-ja-svar') ||
            row.classList.contains('row-status-avbestilt') ||
            row.classList.contains('row-status-kansellert') ||
            row.classList.contains('row-status-forsent') ||
            row.classList.contains('row-status-feil')
        ) {
            return false;
        }

        return true;
    }

    function getTestUtropState(row) {
        if (!hasUtropTestMode) return 'none';
        const rows = Array.from(document.querySelectorAll('.board-tab-panel.is-active .board-table tbody tr[data-trip-key]'))
            .filter(function (candidate) {
                return !candidate.classList.contains('board-detail-row') && canUseLiveUtropState(candidate);
            });
        const index = rows.indexOf(row);
        if (index < 0) return 'none';
        if (index < 2) return 'critical';
        if (index < 4) return 'warning';
        return 'none';
    }

    function shouldHighlightUtropRow(row, now) {
        const testState = getTestUtropState(row);
        if (testState === 'critical') return true;
        if (testState === 'warning') return false;
        const utropAt = row.dataset.utropAt || '';
        if (!utropAt) return false;
        if (!canUseLiveUtropState(row)) return false;

        const utropTime = Date.parse(utropAt);
        if (!Number.isFinite(utropTime)) return false;

        const startTime = utropTime - (2 * 60 * 1000);
        const endTime = utropTime + (3 * 60 * 1000);
        return now >= startTime && now <= endTime;
    }

    function syncUtropHighlights() {
        const rows = document.querySelectorAll('.board-table tbody tr[data-trip-key]');
        if (!rows.length) return;

        const now = Date.now();
        let hasLiveUtrop = false;
        rows.forEach(function (row) {
            if (row.classList.contains('board-detail-row')) return;
            const isUtropSoon = shouldHighlightUtropRow(row, now);
            row.classList.toggle('row-utrop-soon', isUtropSoon);
            syncUtropPills(row, isUtropSoon, now);
            if (shouldPlaySendingAlertForRow(row, now)) {
                hasLiveUtrop = true;
            }
        });
        syncSendingAlertState(hasLiveUtrop);
    }

    function shouldWarnUtropPill(row, now) {
        const testState = getTestUtropState(row);
        if (testState === 'critical') return false;
        if (testState === 'warning') return true;
        const utropAt = row.dataset.utropAt || '';
        if (!utropAt) return false;
        if (!canUseLiveUtropState(row)) return false;

        const utropTime = Date.parse(utropAt);
        if (!Number.isFinite(utropTime)) return false;

        const startTime = utropTime - (3 * 60 * 1000);
        const endTime = utropTime - (2 * 60 * 1000);
        return now >= startTime && now < endTime;
    }

    function hasAssignedTaxi(text) {
        const clean = String(text || '').trim();
        if (clean === '' || clean === '-') return false;
        return !/venter/i.test(clean);
    }

    function rowHasAssignedTaxi(row) {
        if (!row) return false;
        if (row.dataset.hasAssignedTaxi === 'true') return true;
        const taxiCell = row.querySelector('td.col-taxi');
        return hasAssignedTaxi(taxiCell ? taxiCell.textContent : '');
    }

    function shouldPlaySendingAlertForRow(row, now) {
        return shouldHighlightUtropRow(row, now) && !rowHasAssignedTaxi(row);
    }

    function isSendingStatus(statusClass) {
        return ['status-under-behandling', 'status-sending'].includes(statusClass);
    }

    function resetPillClasses(element, classes) {
        if (!element) return;
        element.classList.remove.apply(element.classList, classes);
        element.classList.remove('pill-attention');
    }

    function syncUtropPills(row, isUtropSoon, now) {
        const statusPill = row.querySelector('td.col-status .status-pill');
        const utropPill = row.querySelector('td.col-utrop .time-pill');
        const oppmotePill = row.querySelector('td.col-oppmote .time-pill');
        const behandlingstidPill = row.querySelector('td.col-behandlingstid .time-pill');
        const taxiCell = row.querySelector('td.col-taxi');
        const taxiPill = ensureTaxiPill(taxiCell);
        let isDone = false;
        const shouldWarnUtrop = shouldWarnUtropPill(row, now);
        const taxiText = (taxiCell ? taxiCell.textContent : '') || '';
        const assignedTaxi = hasAssignedTaxi(taxiText);
        row.dataset.hasAssignedTaxi = assignedTaxi ? 'true' : 'false';

        if (statusPill) {
            if (!statusPill.dataset.originalLabel) {
                statusPill.dataset.originalLabel = statusPill.textContent || '';
            }
            if (!statusPill.dataset.originalStatusClass) {
                const originalStatusClass = Array.from(statusPill.classList).find(function (className) {
                    return className.startsWith('status-') && className !== 'status-pill';
                });
                statusPill.dataset.originalStatusClass = originalStatusClass || '';
            }
            const originalLabel = statusPill.dataset.originalLabel;
            const originalStatusClass = statusPill.dataset.originalStatusClass;
            const isAssignedStatus = originalStatusClass === 'status-tildelt';
            isDone = originalStatusClass === 'status-koyrd';
            const slugPrefix = 'status-';
            Array.from(statusPill.classList).forEach(function (className) {
                if (className.startsWith(slugPrefix) && className !== 'status-pill') {
                    statusPill.classList.remove(className);
                }
            });
            resetPillClasses(statusPill, ['status-pill-choose', 'status-pill-assigned', 'status-pill-done', 'status-pill-utrop-warning', 'status-pill-utrop-critical']);

            if (isDone) {
                statusPill.textContent = originalLabel;
                statusPill.classList.add('status-pill-done', 'status-koyrd');
            } else if (isAssignedStatus) {
                statusPill.textContent = originalLabel;
                statusPill.classList.add(originalStatusClass);
            } else if (shouldWarnUtrop) {
                statusPill.textContent = 'Snart';
                statusPill.classList.add('status-pill-utrop-warning');
            } else if (isUtropSoon && assignedTaxi) {
                statusPill.textContent = 'Utrop!!';
                statusPill.classList.add('status-pill-utrop-critical', 'status-velg-bil', 'pill-attention-soft');
            } else if (isUtropSoon) {
                statusPill.textContent = 'Utrop!!';
                statusPill.classList.add('status-pill-utrop-critical', 'status-velg-bil', 'pill-attention-soft');
            } else {
                statusPill.textContent = originalLabel;
                if (originalStatusClass) {
                    statusPill.classList.add(originalStatusClass);
                }
            }
        }

        if (utropPill) {
            const originalStatusClass = statusPill && statusPill.dataset.originalStatusClass ? statusPill.dataset.originalStatusClass : '';
            [utropPill, oppmotePill, behandlingstidPill].forEach(function (pill) {
                resetPillClasses(pill, ['time-pill-choose', 'time-pill-assigned', 'time-pill-done', 'time-pill-utrop-critical']);

                if (!pill) return;

                if (isDone) {
                    pill.classList.add('time-pill-done');
                } else if (pill === utropPill && isUtropSoon) {
                    pill.classList.add('time-pill-utrop-critical', 'pill-attention-soft');
                }
            });

            if (utropPill) {
                utropPill.classList.toggle('time-pill-utrop-warning', shouldWarnUtrop);
            }
        }

        if (taxiPill) {
            resetPillClasses(taxiPill, ['taxi-pill-choose', 'taxi-pill-assigned', 'taxi-pill-done', 'taxi-pill-has-car', 'taxi-pill-wait']);

            if (assignedTaxi) {
                taxiPill.classList.add('taxi-pill-has-car');
            } else if (/venter/i.test(taxiText)) {
                taxiPill.classList.add('taxi-pill-wait');
            }

            if (isDone) {
                taxiPill.classList.add('taxi-pill-done');
            } else if (isUtropSoon && assignedTaxi) {
                taxiPill.classList.add('taxi-pill-assigned', 'pill-attention');
            } else if (isUtropSoon) {
                taxiPill.classList.add('taxi-pill-choose', 'pill-attention');
            }
        }
    }

    function ensureTaxiPill(taxiCell) {
        if (!taxiCell) return null;

        let taxiPill = taxiCell.querySelector('.taxi-pill');
        if (taxiPill) {
            return taxiPill;
        }

        const text = (taxiCell.textContent || '').trim();
        if (!text) return null;

        taxiCell.textContent = '';
        taxiPill = document.createElement('span');
        taxiPill.className = 'taxi-pill';
        taxiPill.dataset.originalLabel = text;
        if (/\d/.test(text) && !/venter/i.test(text)) {
            taxiPill.classList.add('taxi-pill-has-car');
        } else if (/venter/i.test(text)) {
            taxiPill.classList.add('taxi-pill-wait');
        }
        taxiPill.textContent = text;
        taxiCell.appendChild(taxiPill);
        return taxiPill;
    }

    function startUtropHighlightTimer() {
        syncUtropHighlights();
        if (utropHighlightTimer !== null) {
            window.clearInterval(utropHighlightTimer);
        }
        utropHighlightTimer = window.setInterval(syncUtropHighlights, 15000);
    }

    function addAudioFallback(audio, fallbackPath) {
        if (!audio || !fallbackPath) return;
        audio.addEventListener('error', function () {
            if (audio.dataset.fallbackApplied === 'true') return;
            audio.dataset.fallbackApplied = 'true';
            audio.src = fallbackPath;
            audio.load();
        });
    }

    function getAudio(kind) {
        const path = kind === 'sender' ? senderSoundPath : forsentSoundPath;
        if (!path) return null;

        if (kind === 'sender' && !senderAudio) {
            senderAudio = new Audio(path);
            senderAudio.preload = 'auto';
        }
        if (kind === 'forsent' && !forsentAudio) {
            forsentAudio = new Audio(path);
            forsentAudio.preload = 'auto';
            addAudioFallback(forsentAudio, forsentSoundFallbackPath);
        }

        const audio = kind === 'sender' ? senderAudio : forsentAudio;
        audio.volume = volumeGain();
        return audio;
    }

    function playAudioFile(kind) {
        const audio = getAudio(kind);
        if (!audio) return false;

        try {
            audio.pause();
            audio.currentTime = 0;
            audio.volume = volumeGain();
            const result = audio.play();
            if (result && typeof result.catch === 'function') {
                result.catch(function () {});
            }
            return true;
        } catch (_error) {
            return false;
        }
    }

    function playSendingAlert() {
        playAudioFile('sender');
    }

    function playForsentAlert() {
        if (!isForsentAlertWindow()) {
            if (forsentTimer !== null) {
                window.clearInterval(forsentTimer);
                forsentTimer = null;
            }
            return false;
        }
        return playAudioFile('forsent');
    }

    function stopAlerts() {
        if (sendingTimer !== null) {
            window.clearInterval(sendingTimer);
            sendingTimer = null;
        }
        if (forsentTimer !== null) {
            window.clearInterval(forsentTimer);
            forsentTimer = null;
        }
    }

    function refreshStatuses() {
        statuses = Object.values(snapshot);
        hasUtrop = hasLiveUtropAlerts(Date.now()) || statuses.includes('Utrop!!');
        hasForsent = statuses.includes('Forsent');
    }

    function hasLiveUtropAlerts(now) {
        return Array.from(document.querySelectorAll('.board-table tbody tr[data-trip-key]')).some(function (row) {
            if (row.classList.contains('board-detail-row')) return false;
            return shouldPlaySendingAlertForRow(row, now);
        });
    }

    function isForsentAlertWindow() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        if (hour >= 7) return false;
        if (hour === 0 && minute < 1) return false;
        return true;
    }

    function syncSendingAlertState(hasLiveUtrop) {
        if (!soundEnabled()) {
            if (sendingTimer !== null) {
                window.clearInterval(sendingTimer);
                sendingTimer = null;
            }
            return;
        }

        if (hasLiveUtrop) {
            if (sendingTimer === null) {
                playSendingAlert();
                sendingTimer = window.setInterval(playSendingAlert, sendingAlertIntervalMs);
            }
            return;
        }

        if (sendingTimer !== null) {
            window.clearInterval(sendingTimer);
            sendingTimer = null;
        }
    }

    function startAlerts() {
        stopAlerts();
        refreshStatuses();
        if (!soundEnabled()) return;
        if (hasUtrop) {
            playSendingAlert();
            sendingTimer = window.setInterval(playSendingAlert, sendingAlertIntervalMs);
        }
        if (hasForsent && isForsentAlertWindow()) {
            playForsentAlert();
            forsentTimer = window.setInterval(playForsentAlert, forsentAlertIntervalMs);
        }
    }

    function armOnFirstInteraction(callback) {
        const start = function () {
            window.removeEventListener('pointerdown', start);
            window.removeEventListener('keydown', start);
            callback();
        };
        window.addEventListener('pointerdown', start, { once: true });
        window.addEventListener('keydown', start, { once: true });
    }

    function eventElementTarget(event) {
        if (!event) return null;
        const target = event.target;
        if (!target) return null;
        if (typeof target.closest === 'function') return target;
        return target.parentElement || null;
    }

    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    applyTheme(currentTheme());
    initializeBoardDom();
    restoreScrollState();

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const theme = nextTheme(currentTheme());
            localStorage.setItem(themePreferenceKey, theme);
            applyTheme(theme);
        });
    }

    if (toggleButton) {
        updateToggleButton();
        toggleButton.addEventListener('click', function () {
            if (soundEnabled()) {
                localStorage.setItem(soundPreferenceKey, 'off');
                stopAlerts();
            } else {
                localStorage.removeItem(soundPreferenceKey);
                startAlerts();
            }
            updateToggleButton();
        });
    }

    if (volumeInput) {
        updateVolumeUi();
        volumeInput.addEventListener('input', function () {
            localStorage.setItem(volumePreferenceKey, volumeInput.value);
            updateVolumeUi();
            if (senderAudio) senderAudio.volume = volumeGain();
            if (forsentAudio) forsentAudio.volume = volumeGain();
        });
    }

    if (refreshSelect) {
        updateRefreshSelect();
        refreshSelect.addEventListener('change', function () {
            localStorage.setItem(refreshPreferenceKey, refreshSelect.value);
            startRefreshTimer();
        });
        startRefreshTimer();
    }

    if (getActiveTableShell()) {
        armOnFirstInteraction(startAlerts);
    }

    document.addEventListener('click', function (event) {
        const target = eventElementTarget(event);
        if (!target) return;

        const boardTabButton = target.closest('[data-board-tab]');
        if (boardTabButton) {
            const tabName = boardTabButton.dataset.boardTab || 'active';
            localStorage.setItem(boardTabPreferenceKey, tabName);
            applyBoardTab(tabName);
            saveScrollState();
            return;
        }

        const boardViewButton = target.closest('[data-board-view]');
        if (boardViewButton) {
            const viewName = boardViewButton.dataset.boardView || 'full';
            localStorage.setItem(boardViewPreferenceKey, viewName);
            applyBoardView(viewName);
            saveScrollState();
            return;
        }

        const lastColumnButton = target.closest('[data-last-column-mode]');
        if (lastColumnButton) {
            const mode = lastColumnButton.dataset.lastColumnMode || 'name';
            localStorage.setItem(lastColumnPreferenceKey, mode);
            applyLastColumnMode(mode);
            saveScrollState();
            return;
        }

    });

    window.addEventListener('beforeunload', saveScrollState);
    window.addEventListener('pagehide', saveScrollState);
})();
