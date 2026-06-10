/**
 * Varshini's Portfolio - Complete JavaScript Engine
 * Handles audio playback, navigation, poems, and all interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 00. POEM DATABASE
    // ==========================================================================
    const poems = [
        {
            title: "My Second Home",
            body: "I sat in those very classrooms\nSlipping from the lectures of European trade\nEtching my thoughts into the wall\nLeaving behind a piece of my mind\nIn return for memories that run in my dreams\n\nI wandered in those very classrooms\nTurning my head from side to side\nTo paint the portraits of people\nI lived with during the day\n\nI smile, I cry, I laugh, I try\nIn those very classrooms\nWith all the people who did\nAll those things with me"
        },
        {
            title: "Light, Water, Alas My Faded Colours",
            body: "Painted in colours\nBlack and white\nNeed a new filter to show my mind\nDispersed again spectrum by spectrum\nLost my path, to see, to run\nPainted again, painted a ton\nValue of mine, taken alas\nBy colorless water in a\nColorless glass\nSomething faded,\nPastel they call\nMake my way to a faded heart\nWaters can wash\nColours can too\nAlways be bold"
        },
        {
            title: "Mango Tree",
            body: "The archway's collapsing\nWhen I place foot\nI did what I could\nMade what I should\nParalyzed, still there\nProtecting a yellow fruit\nDidn't know I could be peeled so smooth\nDead\nStill perfect in shape\nI walk my way to a transparent tape\nTried to fall, I lost my sweet,\nBut the tape kept me weep\nThe journey is hard\nI hit the rocks, hit the soil\nGoodness apart\nGrew again, into a mango tree\nPeeled again,\nCarefully\nDon't do what told"
        }
    ];

    // ==========================================================================
    // 01. MOBILE NAVIGATION
    // ==========================================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.add('open');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    }

    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================================================
    // 02. AUDIO PLAYER ENGINE
    // ==========================================================================
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const progressTrack = document.getElementById('progressTrack');
    const progressFill = document.getElementById('progressFill');
    const progressThumb = document.getElementById('progressThumb');
    const volumeSlider = document.getElementById('volumeSlider');
    const vinylDisc = document.getElementById('vinylDisc');
    const visualizerBars = document.querySelectorAll('.visualizer-bar');
    const trackRows = document.querySelectorAll('.track-row');

    let currentTrackIndex = 0;
    let isPlaying = false;

    const tracks = [
        { id: 'fiveO5', file: '505.mp3', title: '505', artist: 'Arctic Monkeys Cover' },
        { id: 'linger', file: 'linger.mp3', title: 'Linger', artist: 'The Cranberries Cover' },
        { id: 'theCure', file: 'thecure.mp3', title: 'The Cure', artist: 'Olivia Rodrigo Cover' }
    ];

    // Format time display
    function formatTime(seconds) {
        if (!isFinite(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Update track display
    function updateTrackDisplay(index) {
        currentTrackIndex = index;
        const track = tracks[index];
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;

        // Update active track row
        trackRows.forEach((row, idx) => {
            row.classList.toggle('active', idx === index);
        });

        // Load audio file
        audioPlayer.src = track.file;
        audioPlayer.load();

        // If was playing, keep playing
        if (isPlaying) {
            audioPlayer.play().catch(() => {
                console.log('Audio file not found. Upload MP3 files to the same folder.');
            });
        }
    }

    // Play/pause toggle
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play().catch(() => {
                alert('Audio file not found.\n\nTo enable playback, add audio files:\n- 505.mp3\n- linger.mp3\n- thecure.mp3\n\nIn the same folder as index.html');
            });
        }
    });

    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        updatePlayIcon();
        vinylDisc.classList.add('spinning');
        animateVisualizer();
    });

    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayIcon();
        vinylDisc.classList.remove('spinning');
        stopVisualizer();
    });

    function updatePlayIcon() {
        if (isPlaying) {
            playIcon.innerHTML = '<path d="M6,4 L6,20 M18,4 L18,20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
        } else {
            playIcon.innerHTML = '<polygon points="5,3 19,12 5,21" fill="currentColor"/>';
        }
    }

    // Next/prev
    nextBtn.addEventListener('click', () => {
        updateTrackDisplay((currentTrackIndex + 1) % tracks.length);
    });

    prevBtn.addEventListener('click', () => {
        updateTrackDisplay((currentTrackIndex - 1 + tracks.length) % tracks.length);
    });

    // Track row click
    trackRows.forEach((row, index) => {
        row.addEventListener('click', (e) => {
            if (!e.target.classList.contains('lyrics-trigger-btn')) {
                updateTrackDisplay(index);
            }
        });
    });

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
    });

    // Time update
    audioPlayer.addEventListener('timeupdate', () => {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
        progressFill.style.width = percent + '%';
        progressThumb.style.left = percent + '%';
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });

    // Progress bar click/drag
    let isProgressDragging = false;

    progressTrack.addEventListener('mousedown', startProgressDrag);
    progressTrack.addEventListener('touchstart', startProgressDrag);

    function startProgressDrag(e) {
        isProgressDragging = true;
        updateProgressFromEvent(e);
    }

    document.addEventListener('mousemove', (e) => {
        if (isProgressDragging) updateProgressFromEvent(e);
    });

    document.addEventListener('touchmove', (e) => {
        if (isProgressDragging) updateProgressFromEvent(e);
    });

    document.addEventListener('mouseup', () => { isProgressDragging = false; });
    document.addEventListener('touchend', () => { isProgressDragging = false; });

    function updateProgressFromEvent(e) {
        const rect = progressTrack.getBoundingClientRect();
        const x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
        const percent = Math.max(0, Math.min(1, x / rect.width));
        audioPlayer.currentTime = percent * audioPlayer.duration;
    }

    // ==========================================================================
    // 03. VISUALIZER ANIMATION
    // ==========================================================================
    let visualizerAnimationId;

    function animateVisualizer() {
        function animate() {
            visualizerBars.forEach((bar, index) => {
                const randomHeight = Math.random() * 75 + 15;
                bar.style.height = randomHeight + '%';
                bar.style.transitionDuration = Math.random() * 0.3 + 0.15 + 's';
            });
            visualizerAnimationId = setTimeout(animate, 300);
        }
        animate();
    }

    function stopVisualizer() {
        clearTimeout(visualizerAnimationId);
        visualizerBars.forEach(bar => {
            bar.style.height = '15%';
        });
    }

    // ==========================================================================
    // 04. POETRY NOTEBOOK ENGINE
    // ==========================================================================
    const poemTitle = document.getElementById('poemTitle');
    const poemBody = document.getElementById('poemBody');
    const currentSheetPage = document.getElementById('currentSheetPage');
    const totalPoems = document.getElementById('totalPoems');
    const prevPoemBtn = document.getElementById('prevPoemBtn');
    const nextPoemBtn = document.getElementById('nextPoemBtn');

    let currentPoemIndex = 0;
    totalPoems.textContent = poems.length;

    function displayPoem(index) {
        currentPoemIndex = index;
        const poem = poems[index];

        // Add fade animation
        poemBody.parentElement.classList.remove('poem-fade');
        void poemBody.parentElement.offsetWidth; // Trigger reflow
        poemBody.parentElement.classList.add('poem-fade');

        poemTitle.textContent = poem.title;
        poemBody.textContent = poem.body;
        currentSheetPage.textContent = index + 1;
    }

    prevPoemBtn.addEventListener('click', () => {
        displayPoem((currentPoemIndex - 1 + poems.length) % poems.length);
    });

    nextPoemBtn.addEventListener('click', () => {
        displayPoem((currentPoemIndex + 1) % poems.length);
    });

    // Initialize first poem
    displayPoem(0);

    // ==========================================================================
    // 05. STELLAR ATLAS - STAR TELEMETRY
    // ==========================================================================
    const starNodes = document.querySelectorAll('.star-node');
    const starDetailPanel = document.getElementById('starDetailPanel');
    const panelCloseBtn = document.getElementById('panelCloseBtn');
    const starDetailTitle = document.getElementById('starDetailTitle');
    const starDetailContent = document.getElementById('starDetailContent');

    const starData = {
        sirius: {
            title: 'Sirius Telemetry',
            content: 'Coordinates: Alpha Canis Majoris // Luminosity: 25.4x Solar // System Structure: Binary main sequence configuration log. Distance: 8.6 light-years. A beacon in the night sky.'
        },
        vega: {
            title: 'Vega Telemetry',
            content: 'Coordinates: Alpha Lyrae // Trajectory Metrics: Rapid rotation distortion axis // Debris disk tracking active. Spectral Type: A0V. One of the brightest stars visible from Earth.'
        },
        polaris: {
            title: 'Polaris Telemetry',
            content: 'Coordinates: Alpha Ursae Minoris // Navigation Marker: Celestial North hub anchor // Multiple star cluster telemetry verified. The North Star guides travelers and dreamers alike.'
        }
    };

    starNodes.forEach(node => {
        node.addEventListener('click', () => {
            const star = node.getAttribute('data-star');
            const data = starData[star];

            starDetailTitle.textContent = data.title;
            starDetailContent.textContent = data.content;
            starDetailPanel.classList.add('active');
        });
    });

    panelCloseBtn.addEventListener('click', () => {
        starDetailPanel.classList.remove('active');
    });

    // ==========================================================================
    // 06. OVERLAY DRAWER - NOTES & LYRICS
    // ==========================================================================
    const drawer = document.getElementById('overlayDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerTitle = document.getElementById('drawerTitle');
    const drawerMainText = document.getElementById('drawerMainText');
    const drawerBadge = document.getElementById('drawerBadge');
    const drawerMeta = document.getElementById('drawerMeta');
    const chordsBox = document.getElementById('chordsBox');

    const songNotes = {
        fiveO5: {
            title: '505 Notes',
            badge: 'Electric Guitar & Vocals',
            meta: 'ARCTIC MONKEYS COVER',
            chords: ['Em', 'A', 'D', 'G', 'Em7', 'Am7'],
            notes: 'Mapping electric alternative distortions, standard chords configs, and balancing higher vocal frequencies. Focus on the delay effects during the chorus and the clean, intimate verses. The song demands emotional restraint—let the silence speak as much as the notes. Play with space and dynamics.'
        },
        linger: {
            title: 'Linger Notes',
            badge: 'Acoustic Guitar & Vocals',
            meta: 'THE CRANBERRIES COVER',
            chords: ['Am', 'F', 'C', 'G', 'Dm', 'Em'],
            notes: 'Classic acoustic tuning rhythm structures. Focusing on clean transitions and smooth sustain strings variations. This song is about subtlety and restraint. Let each note ring. The arpeggios in the intro set the tone—delicate but deliberate. Build emotion through layering, not volume.'
        },
        theCure: {
            title: 'The Cure Notes',
            badge: 'Melodic & Production',
            meta: 'OLIVIA RODRIGO COVER',
            chords: ['C#m', 'A', 'E', 'B', 'F#m', 'D#m'],
            notes: 'Melodic vocal arrangement breakdown with custom syncopated picking patterns. The key to this arrangement is the interplay between vocals and guitar. Experiment with fingerpicking variations and subtle dynamics shifts. The bridge demands a shift in energy—build it carefully.'
        }
    };

    // Music notes buttons
    document.querySelectorAll('.lyrics-trigger-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const song = btn.getAttribute('data-song');
            const notes = songNotes[song];

            drawerTitle.textContent = notes.title;
            drawerMeta.textContent = notes.meta;
            drawerBadge.textContent = notes.badge;
            drawerMainText.textContent = notes.notes;
            chordsBox.style.display = 'block';

            // Display chords
            const chordsList = document.getElementById('chordsList');
            chordsList.innerHTML = notes.chords.map(chord =>
                `<span class="chord-tag">${chord}</span>`
            ).join('');

            drawer.classList.add('active');
        });
    });

    // Book notes links
    document.querySelectorAll('.notes-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const bookTitle = link.closest('.book-card').querySelector('.book-title-cover').textContent;

            drawerTitle.textContent = `${bookTitle} Review`;
            drawerMeta.textContent = 'READING NOTES';
            drawerBadge.textContent = 'Personal Reflection';
            drawerMainText.textContent = `Personal log entries, progress notes, character analysis updates, and narrative structural highlights for ${bookTitle}. This book resonated with me because of its [character development / storytelling / themes]. Key moments that stuck with me include... I'd rate this book highly for [reasons].`;
            chordsBox.style.display = 'none';

            drawer.classList.add('active');
        });
    });

    // Close drawer
    closeDrawerBtn.addEventListener('click', () => drawer.classList.remove('active'));
    drawerBackdrop.addEventListener('click', () => drawer.classList.remove('active'));

    // Escape key to close drawer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            drawer.classList.remove('active');
        }
    });

    // ==========================================================================
    // 07. CONTACT FORM SUBMISSION
    // ==========================================================================
    const contactForm = document.getElementById('minimalForm');
    const successAlert = document.getElementById('formSuccessAlert');

    if (contactForm && successAlert) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const message = document.getElementById('formMessage').value;

            // Log to console (in production, you'd send to a server)
            console.log('Form submitted:', { name, email, message });

            // Reset form
            contactForm.reset();

            // Show success message
            successAlert.classList.remove('hidden');

            // Hide after 4 seconds
            setTimeout(() => {
                successAlert.classList.add('hidden');
            }, 4000);
        });
    }

    // ==========================================================================
    // 08. DESKTOP CURSOR TRACKER
    // ==========================================================================
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Hide custom cursor on mouse leave
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
        });
    }

    // ==========================================================================
    // 09. BACK TO TOP FUNCTIONALITY
    // ==========================================================================
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 10. SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only handle if it's a real section
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const element = document.querySelector(href);
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================================================
    // 11. LAZY LOAD IMPROVEMENTS & ACCESSIBILITY
    // ==========================================================================
    // Keyboard navigation for music player
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && (e.target === document.body || e.target === playBtn)) {
            e.preventDefault();
            playBtn.click();
        }
    });

    // Focus management for the drawer
    drawer.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            drawer.classList.remove('active');
            document.activeElement.blur();
        }
    });

    console.log('✨ Varshini\'s Portfolio loaded successfully!');
});

// ==========================================================================
// CHORD DISPLAY STYLES (injected dynamically)
// ==========================================================================
const style = document.createElement('style');
style.textContent = `
    .chord-tag {
        display: inline-block;
        background: rgba(0,0,0,.08);
        border: 1px solid rgba(0,0,0,.12);
        border-radius: 6px;
        padding: 4px 10px;
        margin: 4px 6px 4px 0;
        font-family: 'Space Grotesk', monospace;
        font-size: 0.8rem;
        font-weight: 500;
        color: #1a1a1a;
    }
    
    .chord-tag:hover {
        background: rgba(0,0,0,.12);
    }
`;
document.head.appendChild(style);