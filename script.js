/* ==========================================================================
   AKSHAY DILIP BARMATE - MARRIAGE PROFILE INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAgeCalculator();
    initScrollEffects();
    initTabsNav();
    initGalleryFilter();
    initAmbientCanvas();
    initMobileMenu();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Night Mode Only)
   -------------------------------------------------------------------------- */
function initTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('ab_profile_theme', 'dark');
}

/* --------------------------------------------------------------------------
   1b. Mobile Navigation Drawer Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    }
}

/* --------------------------------------------------------------------------
   2. Dynamic Age Calculator
   -------------------------------------------------------------------------- */
function initAgeCalculator() {
    const dob = new Date(1996, 8, 23); // Month is 0-indexed: Sept = 8
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    const ageEl = document.getElementById('calculated-age');
    if (ageEl) {
        ageEl.textContent = age;
    }
}

/* --------------------------------------------------------------------------
   3. Scroll Effects & Header Highlight
   -------------------------------------------------------------------------- */
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section-container, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const tabBtns = document.querySelectorAll('.tab-btn');

    window.addEventListener('scroll', () => {
        // Sticky Header Shadow
        if (window.scrollY > 40) {
            navbar.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Active Link Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });

            tabBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-target') === currentSectionId) {
                    btn.classList.add('active');
                }
            });
        }
    });
}

/* --------------------------------------------------------------------------
   4. Sticky Tabs Navigation Click
   -------------------------------------------------------------------------- */
function initTabsNav() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   5. Photo Gallery Category Filter
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   6. Lightbox Modal
   -------------------------------------------------------------------------- */
function openLightbox(imgSrc, caption) {
    const modal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/* --------------------------------------------------------------------------
   7. Generic Modal Controls
   -------------------------------------------------------------------------- */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function closeModalOnBackdrop(event, modalId) {
    if (event.target.id === modalId) {
        closeModal(modalId);
    }
}

/* --------------------------------------------------------------------------
   8. One-Click Copy Biodata for WhatsApp / Email
   -------------------------------------------------------------------------- */
function copyBiodataText() {
    const biodataText = `💍 MARRIAGE BIODATA - AKSHAY DILIP BARMATE

👤 PERSONAL DETAILS
• Full Name: Akshay Dilip Barmate
• Date of Birth: 23 September 1996
• Hometown: Hudkeshwar Road, Nagpur – 440034
• Qualification: B.E. – Mechanical Engineering (2019 Batch)
• Profession: Software Developer
• Job Location: Pune
• Package: ₹7.8 Lakhs P.A. (Approx. ₹65,000 / month)
• Contact / WhatsApp: +91 7756909607

👨‍👩‍👦 FAMILY DETAILS
• Father: Mr. Dilip Barmate
• Mother: Late Mrs. Suwarna Barmate
• Elder Brother: Mr. Saurabh Barmate (Civil Engineer, Married)
• Sister-in-law: Mrs. Roshni Barmate

❤️ VALUES: Family • Respect • Understanding • Honesty • Growth • Togetherness
🌹 LOOKING FOR: A well-educated, kind-hearted & understanding life partner to build a beautiful life together.

📍 Hometown: Nagpur | Job Location: Pune | Contact: +91 7756909607`;

    navigator.clipboard.writeText(biodataText).then(() => {
        showToast('Biodata copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy. Please try again.');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
        toastMsg.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/* --------------------------------------------------------------------------
   9. Ambient Shimmer Canvas Background
   -------------------------------------------------------------------------- */
function initAmbientCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.floor(width / 35); // Responsive particle density

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5,
            color: Math.random() > 0.5 ? 'rgba(245, 158, 11, ' : 'rgba(217, 119, 6, ',
            alpha: Math.random() * 0.5 + 0.1,
            speedY: - (Math.random() * 0.4 + 0.1),
            speedX: (Math.random() - 0.5) * 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
            if (p.x < -10 || p.x > width + 10) {
                p.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}
