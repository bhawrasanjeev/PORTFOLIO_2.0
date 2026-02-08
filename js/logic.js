
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ===== DARK MODE TOGGLE =====
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const icon = darkModeToggle.querySelector("i");

    // Load saved dark mode preference
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode === "enabled") {
        body.classList.add("dark-mode");
        icon.classList.replace("fa-moon", "fa-sun");
    }

    // Toggle dark mode
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        
        if (body.classList.contains("dark-mode")) {
            icon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("dark-mode", "enabled");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("dark-mode", "disabled");
        }
    });

    // ===== NAVIGATION =====
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.getElementById("navbar");

    // Update active link on scroll
    const updateActiveLink = () => {
        let currentSection = "home";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.getAttribute("href").slice(1);
            if (href === currentSection) {
                link.classList.add("active");
            }
        });
    };

    // Smooth scroll on nav link click
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            
            const targetId = link.getAttribute("href").slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });

                // Update active link
                navLinks.forEach((l) => l.classList.remove("active"));
                link.classList.add("active");

                // Close mobile menu if open
                const navLinksContainer = document.querySelector(".nav-links");
                navLinksContainer.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    });

    // Scroll event listener
    let scrollTimeout;
    window.addEventListener("scroll", () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveLink();
            handleNavbarScroll();
            handleBackToTop();
        });
    });

    // Navbar scroll effect
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
            navbar.style.backdropFilter = "blur(15px)";
        } else {
            navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
            navbar.style.backdropFilter = "blur(10px)";
        }
    };

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById("back-to-top");
    
    const handleBackToTop = () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    };

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");

    mobileMenuToggle.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active");
        mobileMenuToggle.classList.toggle("active");
        
        if (navLinksContainer.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!navbar.contains(event.target) && navLinksContainer.classList.contains("active")) {
            navLinksContainer.classList.remove("active");
            mobileMenuToggle.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // ===== SKILLS PROGRESS ANIMATION =====
    const skillItems = document.querySelectorAll(".skill-item");
    
    const animateSkills = () => {
        skillItems.forEach((skillItem) => {
            const progressBar = skillItem.querySelector(".skill-progress");
            const percentElement = skillItem.querySelector(".skill-percent");
            const progressValue = progressBar.getAttribute("data-progress");
            
            if (progressValue) {
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = progressValue + "%";
                    
                    // Animate percentage counter
                    let currentPercent = 0;
                    const increment = progressValue / 30;
                    const interval = setInterval(() => {
                        currentPercent += increment;
                        if (currentPercent >= progressValue) {
                            currentPercent = progressValue;
                            clearInterval(interval);
                        }
                        percentElement.textContent = Math.round(currentPercent) + "%";
                    }, 50);
                }, 200);
            }
        });
    };

    // Intersection Observer for skills animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const skillsCard = document.querySelector(".skills-card");
    if (skillsCard) {
        skillsObserver.observe(skillsCard);
    }

    // ===== PORTFOLIO TEXT ANIMATION =====
    const portfolioText = document.querySelector(".portfolio-text");
    
    if (portfolioText) {
        portfolioText.addEventListener("mouseenter", () => {
            const underline = document.querySelector(".portfolio-underline");
            if (underline) {
                underline.style.width = "100%";
            }
        });

        portfolioText.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ===== PARALLAX EFFECT =====
    const heroSection = document.querySelector(".hero-section");
    const floatingShapes = document.querySelectorAll(".shape");

    window.addEventListener("scroll", () => {
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            floatingShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                shape.style.transform = `translateY(${rate * speed}px)`;
            });
        }
    });

    // ===== CONTACT ITEMS ANIMATION =====
    const contactItems = document.querySelectorAll(".contact-item");
    
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // ===== SOCIAL LINKS INTERACTION =====
    const socialLinks = document.querySelectorAll(".social-link");
    
    socialLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            const icon = link.querySelector("i");
            icon.style.transform = "scale(1.2) rotate(5deg)";
        });
        
        link.addEventListener("mouseleave", () => {
            const icon = link.querySelector("i");
            icon.style.transform = "scale(1) rotate(0deg)";
        });
    });

    // ===== PREVENT DEFAULT FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href !== "#" && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - navbar.offsetHeight;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ===== LOADING ANIMATION =====
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
        
        // Trigger initial animations
        setTimeout(() => {
            updateActiveLink();
        }, 100);
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener("keydown", (event) => {
        // ESC key to close mobile menu
        if (event.key === "Escape" && navLinksContainer.classList.contains("active")) {
            navLinksContainer.classList.remove("active");
            mobileMenuToggle.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // Initial call
    updateActiveLink();
    handleNavbarScroll();
});