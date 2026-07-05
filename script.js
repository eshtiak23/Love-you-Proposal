// ==================== State ====================
let currentScreen = 1;
let currentSlide = 0;
let thinkyClickCount = 0;
const totalSlides = 3;

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupGalleryDots();
});

// ==================== Screen Navigation ====================
function nextScreen(screenNum) {
    const currentEl = document.getElementById(`screen-${currentScreen}`);
    const nextEl = document.getElementById(`screen-${screenNum}`);

    if (!currentEl || !nextEl) return;

    // Exit animation for current screen
    currentEl.classList.remove('active');
    currentEl.classList.add('exit-left');

    // Enter animation for next screen
    setTimeout(() => {
        currentEl.classList.remove('exit-left');
        nextEl.classList.add('active');
        currentScreen = screenNum;

        // Trigger screen-specific effects
        if (screenNum === 7) {
            startCelebration();
        }
    }, 100);
}

// ==================== Tricky Button ====================
function moveButton() {
    const btn = document.getElementById('thinkyBtn');
    if (!btn) return;

    thinkyClickCount++;

    if (thinkyClickCount >= 3) {
        // Show guilt modal after 3 attempts
        nextScreen(4);
        thinkyClickCount = 0;
        return;
    }

    // Calculate new random position
    const container = btn.parentElement;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = (containerRect.width - btnRect.width) / 2;
    const maxY = 50;

    const randomX = (Math.random() - 0.5) * maxX * 2;
    const randomY = (Math.random() - 0.5) * maxY;

    // Apply transform to move button
    btn.style.transition = 'transform 0.3s ease-out';
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Reset position after delay
    setTimeout(() => {
        btn.style.transform = '';
    }, 500);
}

// ==================== Gallery ====================
function setupGalleryDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateGallery();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateGallery();
}

function goToSlide(index) {
    currentSlide = index;
    updateGallery();
}

function updateGallery() {
    const track = document.getElementById('galleryTrack');
    const dots = document.querySelectorAll('.dot');

    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// ==================== Celebration Effects ====================
function startCelebration() {
    createConfetti();
    createFloatingHearts();
}

function createConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;

    const colors = ['#ff4da6', '#ff69b4', '#ff8fc4', '#ffb3d1', '#ffc2e0', '#ff1493', '#e63996'];
    const emojis = ['💕', '💖', '💗', '💝', '🌸', '✨'];
    const shapes = ['circle', 'square', 'emoji'];

    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';

            const type = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            if (type === 'emoji') {
                piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                piece.style.backgroundColor = 'transparent';
            } else {
                piece.style.backgroundColor = color;
            }

            piece.style.left = `${Math.random() * 100}%`;
            piece.style.animationDuration = `${2 + Math.random() * 2}s`;
            piece.style.animationDelay = `${Math.random() * 0.5}s`;

            if (type === 'circle') {
                piece.style.borderRadius = '50%';
            } else if (type === 'square') {
                piece.style.borderRadius = '3px';
                piece.style.transform = `rotate(${Math.random() * 360}deg)`;
            }

            container.appendChild(piece);

            // Remove piece after animation
            setTimeout(() => piece.remove(), 4000);
        }, i * 40);
    }
}

function createFloatingHearts() {
    const container = document.getElementById('celebrationHearts');
    if (!container) return;

    const hearts = ['❤️', '💕', '💗', '💖', '💝', '💘', '💞', '🌸', '✨'];

    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            heart.style.left = `${5 + Math.random() * 90}%`;
            heart.style.animationDuration = `${3 + Math.random() * 2}s`;
            heart.style.fontSize = `${1.5 + Math.random() * 1}rem`;

            container.appendChild(heart);

            // Remove heart after animation
            setTimeout(() => heart.remove(), 5000);
        }, i * 200);
    }
}

// ==================== Particles Background ====================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const emojis = ['💕', '💖', '💗', '🌸', '✨', '💫', '🦋', '💝', '🌺', '💝'];
    const particleTypes = ['circle', 'heart', 'sparkle'];

    // Create floating circles
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = 4 + Math.random() * 8;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particle.style.animationDuration = `${4 + Math.random() * 4}s`;
        
        container.appendChild(particle);
    }

    // Create floating emoji hearts
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'particle heart';
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.fontSize = `${14 + Math.random() * 12}px`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heart.style.animationDuration = `${5 + Math.random() * 3}s`;
            
            container.appendChild(heart);
            
            // Recreate after animation
            setTimeout(() => {
                heart.remove();
                createSingleHeart(container, emojis);
            }, 8000);
        }, i * 400);
    }

    // Create sparkles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'particle sparkle';
            sparkle.textContent = '✨';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 4}s`;
            
            container.appendChild(sparkle);
        }, i * 500);
    }
}

function createSingleHeart(container, emojis) {
    if (document.querySelectorAll('.particle.heart').length < 15) {
        const heart = document.createElement('div');
        heart.className = 'particle heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${14 + Math.random() * 12}px`;
        heart.style.animationDuration = `${5 + Math.random() * 3}s`;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
            createSingleHeart(container, emojis);
        }, 8000);
    }
}

// ==================== Replay ====================
function replayAll() {
    // Reset state
    currentScreen = 1;
    currentSlide = 0;
    thinkyClickCount = 0;

    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active', 'exit-left');
    });

    // Clear celebration effects
    const confetti = document.getElementById('confetti');
    const hearts = document.getElementById('celebrationHearts');
    if (confetti) confetti.innerHTML = '';
    if (hearts) hearts.innerHTML = '';

    // Show first screen
    const firstScreen = document.getElementById('screen-1');
    if (firstScreen) {
        firstScreen.classList.add('active');
    }

    // Reset gallery
    updateGallery();
}

// ==================== Touch Support ====================
// Prevent zoom on double tap
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - (document.lastTouchEnd || 0) < 300) {
        e.preventDefault();
    }
    document.lastTouchEnd = now;
}, false);

// Prevent pinch zoom
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});
