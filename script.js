document.addEventListener('DOMContentLoaded', () => {
    const words = ["Developer", "Engineer", "Creator"];
    const typingTextElement = document.querySelector('.typing-text');

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Deleting
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Deleting speed
        } else {
            // Typing
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Word complete, pause before deleting
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            // Deletion complete, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing loop
    if (typingTextElement) {
        type();
    }

    // Advanced Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed if you want it to trigger only once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach((el) => revealObserver.observe(el));

    // Parallax Effect for Hero Section
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;

        // Move hero content slightly slower than scroll (Parallax)
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollValue * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrollValue / 700);
        }

        // Active Link Highlighting (Scroll Spy)
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Back to Top Button Visibility
        const backToTopBtn = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll('.btn, .social-links a, .back-to-top');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Strength of the magnet
            btn.style.transform = `translate(${x / 3}px, ${y / 3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            // Ensure any hover scale effects are respected or reset cleanly
            // For social links that have scale(1.1) on hover in CSS, we might need a specific handling if we want to combine them.
            // But usually translate overrides transform, so let's check CSS.
        });
    });

    // 3D Tilt Effect
    const cards = document.querySelectorAll('.about-card, .skill-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Remove transition during hover to make the JS update instant/smooth
            card.style.transition = 'none';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            // Restore transition for smooth reset
            card.style.transition = 'all 0.5s ease';
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle Nav
            navLinksContainer.classList.toggle('nav-active');
            hamburger.classList.toggle('active');

            // Animate Links
            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `fadeInRight 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('nav-active');
            hamburger.classList.remove('active');

            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // --- Advanced Visual Effects ---

    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    });

    // 2. Particle Background System
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        // Handle Resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        // Mouse Interactivity
        const mouse = {
            x: null,
            y: null,
            radius: 150
        }

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Size: Smaller stars for distance effect (0.5 to 2px)
                this.size = Math.random() * 1.5 + 0.5;

                // Opacity: Random opacity for depth (fainter = further)
                this.opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8

                // Speed: Very slow drift, linked to size for parallax (larger/closer moves slightly faster)
                const speedFactor = this.size * 0.05;
                this.speedX = (Math.random() * 2 - 1) * speedFactor;
                this.speedY = (Math.random() * 2 - 1) * speedFactor;

                this.color = `rgba(255, 255, 255, ${this.opacity})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges for infinite space feel (instead of bounce)
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;

                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;

                // Subtle mouse parallax (optional - moves stars slightly away/towards mouse)
                // keeping it simple static drift for now as requested "realistic space" often implies vastness
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            // Much higher density for "star field" look
            let numberOfParticles = (canvas.height * canvas.width) / 4000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
        }

        initParticles();
        animateParticles();
    }


});
