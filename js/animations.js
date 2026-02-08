// ===== ANIMATIONS FILE =====

document.addEventListener("DOMContentLoaded", () => {
    
    // ===== TYPING ANIMATION =====
    const typingElement = document.getElementById("typing-text");
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = "";
        typingElement.style.borderRight = "3px solid";
        typingElement.style.animation = "blink 1s infinite";
        
        let index = 0;
        const typingSpeed = 100;
        
        const typeWriter = () => {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Keep cursor blinking after typing is complete
                setTimeout(() => {
                    typingElement.style.borderRight = "none";
                }, 1000);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(() => {
            typeWriter();
        }, 500);
    }

    // Add blink animation for cursor
    const style = document.createElement("style");
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: #ff4400; }
        }
    `;
    document.head.appendChild(style);

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll(".about-card, .project-card, .others-card");
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        revealObserver.observe(element);
    });

    // ===== COUNTER ANIMATION =====
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + "%";
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + "%";
            }
        };
        
        updateCounter();
    };

    // ===== FLOATING ANIMATIONS =====
    const floatingElements = document.querySelectorAll(".floating-badge, .profile-badge");
    
    floatingElements.forEach((element, index) => {
        element.style.animation = `float-badge 3s infinite ease-in-out`;
        element.style.animationDelay = `${index * 0.5}s`;
    });

    // ===== HOVER EFFECTS =====
    const cards = document.querySelectorAll(".about-card, .project-card, .others-card");
    
    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        });
    });

    // ===== PARTICLE EFFECT (OPTIONAL) =====
    const createParticles = () => {
        const heroSection = document.querySelector(".hero-section");
        if (!heroSection) return;

        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 68, 0, 0.5);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                animation: particle-float ${5 + Math.random() * 5}s infinite ease-in-out;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            heroSection.appendChild(particle);
        }
    };

    // Add particle animation style
    const particleStyle = document.createElement("style");
    particleStyle.textContent = `
        @keyframes particle-float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            50% {
                transform: translateY(-100px) translateX(${Math.random() * 50 - 25}px);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Uncomment to enable particles
    // createParticles();

    // ===== SCROLL INDICATOR ANIMATION =====
    const scrollIndicator = document.querySelector(".scroll-indicator");
    
    if (scrollIndicator) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = "0";
                scrollIndicator.style.pointerEvents = "none";
            } else {
                scrollIndicator.style.opacity = "1";
                scrollIndicator.style.pointerEvents = "auto";
            }
        });
    }

    // ===== NAVBAR SCROLL ANIMATION =====
    let lastScroll = 0;
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove("scroll-up");
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
            // Scrolling down
            navbar.classList.remove("scroll-up");
            navbar.classList.add("scroll-down");
        } else if (currentScroll < lastScroll && navbar.classList.contains("scroll-down")) {
            // Scrolling up
            navbar.classList.remove("scroll-down");
            navbar.classList.add("scroll-up");
        }
        
        lastScroll = currentScroll;
    });

    // ===== CURSOR TRAIL EFFECT (OPTIONAL) =====
    let cursorTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener("mousemove", (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    });

    // ===== IMAGE LAZY LOADING =====
    const lazyImages = document.querySelectorAll("img[data-src]");
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => {
        imageObserver.observe(img);
    });

    // ===== PROGRESS BAR ON SCROLL =====
    const createScrollProgress = () => {
        const progressBar = document.createElement("div");
        progressBar.id = "scroll-progress";
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #ff4400, #ff6600);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener("scroll", () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + "%";
        });
    };

    // Enable scroll progress bar
    createScrollProgress();

    // ===== TEXT REVEAL ANIMATION =====
    const textElements = document.querySelectorAll(".card-content p, .project-description");
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "fadeInUp 0.6s ease-out";
                textObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    textElements.forEach((element) => {
        textObserver.observe(element);
    });

    // ===== BUTTON RIPPLE EFFECT =====
    const buttons = document.querySelectorAll(".btn, .btn-primary, .btn-secondary, .btn-download");
    
    buttons.forEach((button) => {
        button.addEventListener("click", function(e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = "relative";
            this.style.overflow = "hidden";
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement("style");
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});