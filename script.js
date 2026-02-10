// 💝 VALENTINE'S DAY LANDING PAGE - FINAL OPTIMIZED
// Animations ciblées et performantes uniquement

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // 🎨 INITIALIZE LUCIDE ICONS
    // ========================================
    lucide.createIcons();

    // ========================================
    // 🔗 SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // 💥 HEART EXPLOSION - SEULEMENT SUR CTA
    // ========================================

    function createHeartExplosion(x, y) {
        const heartCount = 15; // Réduit pour performance
        const heartEmojis = ['💖', '💗', '💕', '💝', '❤️'];
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

            const angle = (Math.PI * 2 * i) / heartCount;
            const velocity = 80 + Math.random() * 80;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            heart.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: ${20 + Math.random() * 20}px;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                animation: explodeHeart ${0.8 + Math.random() * 0.3}s ease-out forwards;
                --tx: ${tx}px;
                --ty: ${ty}px;
                --rotation: ${Math.random() * 360}deg;
            `;

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1100);
        }

        // Flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 150px;
            height: 150px;
            margin-left: -75px;
            margin-top: -75px;
            background: radial-gradient(circle, rgba(255, 20, 147, 0.5) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: flashExplosion 0.4s ease-out forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 400);
    }

    // ========================================
    // 🎯 CTA BUTTONS WITH EFFECTS
    // ========================================

    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        // Mini hearts on hover (réduit de 5 à 3)
        button.addEventListener('mouseenter', function () {
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const miniHeart = document.createElement('div');
                    miniHeart.innerHTML = '💕';
                    miniHeart.style.cssText = `
                        position: fixed;
                        left: ${x + (Math.random() - 0.5) * 80}px;
                        top: ${y}px;
                        font-size: 18px;
                        pointer-events: none;
                        z-index: 9999;
                        animation: popUp 0.5s ease-out forwards;
                    `;
                    document.body.appendChild(miniHeart);
                    setTimeout(() => miniHeart.remove(), 500);
                }, i * 80);
            }
        });
    });

    // ========================================
    // 🛒 ORDER BUTTONS - MEGA CELEBRATION
    // ========================================

    const orderButtons = document.querySelectorAll('#orderButton, #finalOrderButton');

    orderButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Double explosion (réduit de 3 à 2)
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    createHeartExplosion(x, y);
                }, i * 150);
            }

            // Confetti (réduit de 30 à 15)
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.innerHTML = ['🎉', '🎊', '✨', '💝'][Math.floor(Math.random() * 4)];
                    confetti.style.cssText = `
                        position: fixed;
                        left: ${x + (Math.random() - 0.5) * 200}px;
                        top: ${y - 80}px;
                        font-size: ${18 + Math.random() * 15}px;
                        pointer-events: none;
                        z-index: 9999;
                        animation: confettiFall ${1.5 + Math.random() * 0.5}s ease-out forwards;
                    `;
                    document.body.appendChild(confetti);
                    setTimeout(() => confetti.remove(), 2000);
                }, i * 40);
            }

            // Success message
            setTimeout(() => {
                const message = document.createElement('div');
                message.innerHTML = `
                    <div style="font-size: 1.5rem; font-weight: bold;">Merci pour votre commande !</div>
                    <div style="font-size: 1.2rem; margin-top: 0.5rem;">Votre peluche sera livrée avant la Saint-Valentin 💝</div>
                `;
                message.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    background: linear-gradient(135deg, #FF1493, #DC143C);
                    color: white;
                    padding: 3rem;
                    border-radius: 30px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                    z-index: 99999;
                    text-align: center;
                    animation: popIn 0.5s ease-out forwards;
                `;
                document.body.appendChild(message);

                setTimeout(() => {
                    message.style.animation = 'popOut 0.3s ease-in forwards';
                    setTimeout(() => message.remove(), 300);
                }, 2500);
            }, 500);
        });
    });

    // ========================================
    // 🎨 SCROLL REVEAL ANIMATIONS
    // ========================================

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Performance: stop observing after reveal
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // ========================================
    // 🌊 PARALLAX EFFECT (OPTIMISÉ)
    // ========================================

    let ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const scrolled = window.pageYOffset;
                const heroSection = document.querySelector('.hero-section');

                if (heroSection && scrolled < window.innerHeight) {
                    heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
                }

                ticking = false;
            });

            ticking = true;
        }
    });

    // ========================================
    // ⏰ URGENCY COUNTER (OPTIONAL)
    // ========================================

    function updateUrgencyCounter() {
        const urgencyMessage = document.querySelector('.urgency-message span');
        if (urgencyMessage) {
            const count = Math.floor(Math.random() * 5) + 8;
            urgencyMessage.textContent = `Plus que ${count} peluches disponibles à ce prix !`;
        }
    }

    // Update every 30 seconds
    setInterval(updateUrgencyCounter, 30000);

    // ========================================
    // 💫 ANIMATION STYLES
    // ========================================

    const style = document.createElement('style');
    style.textContent = `
        @keyframes explodeHeart {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.2) rotate(var(--rotation));
                opacity: 0;
            }
        }
        
        @keyframes flashExplosion {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1.8);
                opacity: 0;
            }
        }
        
        @keyframes popUp {
            0% {
                transform: translateY(0) scale(0);
                opacity: 1;
            }
            50% {
                transform: translateY(-40px) scale(1.1);
            }
            100% {
                transform: translateY(-80px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(80vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes popIn {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.05);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes popOut {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('💖 Valentine Landing Page - Final Optimized Version! 💖');
});