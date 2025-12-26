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
        // Particle Class (Twinkling Stars)
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5; // Star size
                this.baseOpacity = Math.random() * 0.5 + 0.3; // Base opacity
                this.opacity = this.baseOpacity;
                this.twinkleSpeed = Math.random() * 0.02 + 0.005;
                this.twinkleDir = Math.random() > 0.5 ? 1 : -1;

                // Drift speed
                const speedFactor = this.size * 0.05;
                this.speedX = (Math.random() * 2 - 1) * speedFactor;
                this.speedY = (Math.random() * 2 - 1) * speedFactor;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;

                // Twinkle Effect
                this.opacity += this.twinkleSpeed * this.twinkleDir;
                if (this.opacity > this.baseOpacity + 0.2 || this.opacity < this.baseOpacity - 0.2) {
                    this.twinkleDir *= -1; // Reverse twinkle direction
                }
                // Clamp opacity
                if (this.opacity < 0) this.opacity = 0;
                if (this.opacity > 1) this.opacity = 1;

                // Mouse interaction: Gentle repulsion close to mouse
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (100 - distance) / 100;
                        const directionX = forceDirectionX * force * 0.5; // Gentle push
                        const directionY = forceDirectionY * force * 0.5;
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Shooting Star Class
        class ShootingStar {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * (canvas.height / 2); // Start from top half
                this.len = Math.random() * 80 + 10;
                this.speed = Math.random() * 10 + 6;
                this.size = Math.random() * 1 + 0.1;
                this.angle = 45; // Diagonal
                // To animate, we drift right and down
                this.waitTime = new Date().getTime() + Math.random() * 3000 + 500; // Random wait
                this.active = false;
            }

            update() {
                if (this.active) {
                    this.x -= this.speed;
                    this.y += this.speed;
                    // Reset if out of bounds
                    if (this.x < 0 || this.y > canvas.height) {
                        this.active = false;
                        this.reset();
                    }
                } else {
                    if (new Date().getTime() > this.waitTime) {
                        this.active = true;
                    }
                }
            }

            draw() {
                if (!this.active) return;
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.1) + ')';
                ctx.lineWidth = this.size;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.len, this.y - this.len);
                ctx.stroke();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 6000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        opacityValue = 1 - (distance / 100);
                        ctx.strokeStyle = 'rgba(255, 255, 255,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                let mouseDx = particlesArray[a].x - mouse.x;
                let mouseDy = particlesArray[a].y - mouse.y;
                let mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

                if (mouseDistance < 150) {
                    opacityValue = 1 - (mouseDistance / 150);
                    ctx.strokeStyle = 'rgba(139, 92, 246,' + opacityValue + ')'; // Violet accent for mouse connection
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        let shootingStar = new ShootingStar();
        let shootingStar2 = new ShootingStar();

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }

            shootingStar.update();
            shootingStar.draw();
            shootingStar2.update();
            shootingStar2.draw();
        }

        initParticles();
        animateParticles();
    }

    // Skills 3D Flip System
    const skillData = {
        "Languages": {
            description: "Core programming languages I use to build robust and scalable systems.",
            details: [
                "<strong>Python:</strong> Advanced proficiency. Used for automation, backend development, and scripting.",
                "<strong>C/C++:</strong> Strong foundation in memory management and lower-level systems programming."
            ]
        },
        "Databases": {
            description: "Experience with both SQL and NoSQL databases for various use cases.",
            details: [
                "<strong>MongoDB:</strong> Designing flexible schemas for modern applications.",
                "<strong>MySQL:</strong> Managing relational data with complex queries and transactions.",
                "<strong>Firebase:</strong> Real-time databases for cloud-synced applications."
            ]
        },
        "APIs & Data": {
            description: "Building and consuming APIs to connect services and data.",
            details: [
                "<strong>FastAPI:</strong> Building high-performance, modern APIs with Python.",
                "<strong>JSON:</strong> Data interchange format mastery.",
                "<strong>Auth:</strong> Implementing secure access patterns (JWT, OAuth)."
            ]
        },
        "Concepts": {
            description: "Theoretical foundations that drive my engineering decisions.",
            details: [
                "<strong>DSA:</strong> Optimizing code for time and space complexity.",
                "<strong>OOP:</strong> structuring code for reusability and maintainability.",
                "<strong>DBMS:</strong> Ensuring data integrity and efficient storage."
            ]
        },
        "Tools": {
            description: "The ecosystem of tools that streamline my development workflow.",
            details: [
                "<strong>Git & GitHub:</strong> Version control and collaboration best practices.",
                "<strong>VS Code:</strong> Advanced environment setup for productivity.",
                "<strong>Postman:</strong> Testing and debugging API endpoints."
            ]
        }
    };

    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        const title = card.querySelector('h4').innerText;

        // Create Inner Structure
        const oldContent = card.innerHTML;
        card.innerHTML = ''; // Clear current content

        const inner = document.createElement('div');
        inner.classList.add('skill-card-inner');

        const front = document.createElement('div');
        front.classList.add('skill-card-front');
        front.innerHTML = oldContent; // Restore icon and text to front

        const back = document.createElement('div');
        back.classList.add('skill-card-back');

        // Populate Back Content
        if (skillData[title]) {
            const data = skillData[title];
            let detailsList = "<ul>";
            data.details.forEach(item => {
                detailsList += `<li>${item}</li>`;
            });
            detailsList += "</ul>";

            back.innerHTML = `
                <h4>${title}</h4>
                <p>${data.description}</p>
                ${detailsList}
            `;
        } else {
            back.innerHTML = `<p>Details coming soon...</p>`;
        }

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        // Click to Flip
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        // Optional: Flip back on mouse leave
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('flipped')) {
                setTimeout(() => {
                    card.classList.remove('flipped');
                }, 400); // Small delay for UX
            }
        });
    });

});
