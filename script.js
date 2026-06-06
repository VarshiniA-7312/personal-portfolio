/**
 * Varshini's Portfolio Core Engine mechanics
 * Fully optimized layout tracker & component modules
 */
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 01. DESKTOP MECHANICS CUSTOM CURSOR TRACKER
    // ==========================================================================
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // ==========================================================================
    // 02. TRACK SELECTOR ENGINE FOR MUSIC PLAYER PANEL
    // ==========================================================================
    const trackRows = document.querySelectorAll('.track-row');
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');

    trackRows.forEach(row => {
        row.addEventListener('click', function (e) {
            // Prevent track changing actions if specifically clicking the inner "Notes" button
            if (e.target.classList.contains('lyrics-trigger-btn')) return;

            trackRows.forEach(r => r.classList.remove('active'));
            this.classList.add('active');

            // Handle switching text labels smoothly in the live workspace widget
            const trackType = this.getAttribute('data-track');
            if (trackType === 'fiveO5') {
                trackTitle.textContent = '505';
                trackArtist.textContent = 'Arctic Monkeys Cover';
            } else if (trackType === 'linger') {
                trackTitle.textContent = 'Linger';
                trackArtist.textContent = 'The Cranberries Cover';
            } else if (trackType === 'theCure') {
                trackTitle.textContent = 'The Cure';
                trackArtist.textContent = 'Olivia Rodrigo Cover';
            }
        });
    });

    // ==========================================================================
    // 03. UNIVERSAL INTERACTIVE OVERLAY DRAWER MODULE SYSTEM
    // ==========================================================================
    const drawer = document.getElementById('overlayDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerTitle = document.getElementById('drawerTitle');
    const drawerMainText = document.getElementById('drawerMainText');
    const chordsBox = document.getElementById('chordsBox');

    // Handle interactive "Notes" popups on the Music Track section
    const musicNotesButtons = document.querySelectorAll('.lyrics-trigger-btn');
    musicNotesButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop parent row click trigger
            const song = btn.getAttribute('data-song');
            drawer.classList.add('active');
            chordsBox.style.display = 'block'; // Make guitar chords guide view visible

            if (song === 'fiveO5') {
                drawerTitle.textContent = '505 Notes';
                drawerMainText.textContent = 'Mapping electric alternative distortions, standard chords configs, and balancing higher vocal frequencies.';
            } else if (song === 'linger') {
                drawerTitle.textContent = 'Linger Notes';
                drawerMainText.textContent = 'Classic acoustic tuning rhythm structures. Focusing on clean transitions and smooth sustain strings variations.';
            } else if (song === 'theCure') {
                drawerTitle.textContent = 'The Cure Notes';
                drawerMainText.textContent = 'Melodic vocal arrangement breakdown with custom syncopated picking patterns.';
            }
        });
    });

    // Handle interactive "Notes" anchor popups on the Reading Journal cards
    const bookNotesLinks = document.querySelectorAll('.notes-link');
    bookNotesLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const bookTitleElement = link.closest('.book-card').querySelector('.book-title-cover');
            const bookTitle = bookTitleElement ? bookTitleElement.textContent : 'Book Selection';

            drawer.classList.add('active');
            chordsBox.style.display = 'none'; // Hide guitar chords panel layout for books

            drawerTitle.textContent = `${bookTitle} Review`;
            drawerMainText.textContent = `Personal log entries, progress notes, character analysis updates, and narrative structural highlights for ${bookTitle}.`;
        });
    });

    // Modal close routines
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => drawer.classList.remove('active'));
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => drawer.classList.remove('active'));

    // ==========================================================================
    // 04. STELLAR ATLAS ASTROPHYSICS TELEMETRY INTERPOLATOR
    // ==========================================================================
    const starNodes = document.querySelectorAll('.star-node');
    const telemetryPanel = document.getElementById('starDetailPanel');
    const panelCloseBtn = document.getElementById('panelCloseBtn');
    const telemetryTitle = document.getElementById('starDetailTitle');
    const telemetryContent = document.getElementById('starDetailContent');

    starNodes.forEach(node => {
        node.addEventListener('click', () => {
            const star = node.getAttribute('data-star');
            telemetryPanel.classList.add('active');

            if (star === 'sirius') {
                telemetryTitle.textContent = 'Sirius Telemetry';
                telemetryContent.textContent = 'Coordinates: Alpha Canis Majoris // Luminosity: 25.4x Solar // System Structure: Binary main sequence configuration log.';
            } else if (star === 'vega') {
                telemetryTitle.textContent = 'Vega Telemetry';
                telemetryContent.textContent = 'Coordinates: Alpha Lyrae // Trajectory Metrics: Rapid rotation distortion axis // Debris disk tracking active.';
            } else if (star === 'polaris') {
                telemetryTitle.textContent = 'Polaris Telemetry';
                telemetryContent.textContent = 'Coordinates: Alpha Ursae Minoris // Navigation Marker: Celestial North hub anchor // Multiple star cluster telemetry verified.';
            }
        });
    });

    if (panelCloseBtn) {
        panelCloseBtn.addEventListener('click', () => {
            telemetryPanel.classList.remove('active');
        });
    }

    // ==========================================================================
    // 05. CONTACT SUBMISSION HOOK
    // ==========================================================================
    const contactForm = document.getElementById('minimalForm');
    const successAlert = document.getElementById('formSuccessAlert');

    if (contactForm && successAlert) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.reset();
            successAlert.classList.remove('hidden');
            setTimeout(() => {
                successAlert.classList.add('hidden');
            }, 4000);
        });
    }
});