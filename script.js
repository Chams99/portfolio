// Typewriter Effect
        const typewriter = document.querySelector('.typewriter');
        const texts = ['Web Developer', 'Mobile App Developer', 'Frontend Developer', 'UI/UX Designer', 'Software Engineer'];
        let textIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < texts[textIndex].length) {
                typewriter.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typewriter.textContent = texts[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        }

        // Initialize typewriter
        type();

        // Initialize particles.js
        particlesJS('particles-js', {
            particles: {
                number: { value: 30 },
                color: { value: '#ECDBBA' },
                shape: { type: 'circle' },
                opacity: { value: 0.3 },
                size: { value: 2 },
                move: {
                    enable: true,
                    speed: 1
                }
            }
        });

        // Portfolio items data
        const projects = [
            { 
                title: 'Wallpaper Generator DEMO', 
                description: 'A dynamic wallpaper generator that creates beautiful and customizable wallpapers with interactive elements and modern design patterns.', 
                category: 'web',
                image: 'wallpaper/Capture d\'écran 2025-05-31 092043.png',
                github: 'https://github.com/Chams99/portfolio/tree/main/wallpaper',
                demo: 'wallpaper/',
                features: [
                    '🎨 Dynamic Pattern Generation',
                    '🖼️ Customizable Colors',
                    '💫 Interactive Elements',
                    '📱 Responsive Design'
                ],
                tags: ['HTML', 'CSS', 'JavaScript', 'Web App', 'Design']
            },
            { 
                title: 'Speed Typer', 
                description: 'An interactive typing game that tests your typing speed and accuracy with different difficulty levels.', 
                category: 'game',
                image: 'Images/typing game.png',
                github: 'https://github.com/Chams99/portfolio/tree/main/typing game',
                demo: 'typing game/typing-game',
                features: [
                    '⌨️ Real-time WPM calculation',
                    '🏆 High score tracking',
                    '🔤 Multiple difficulty levels',
                    '📊 Performance statistics'
                ],
                tags: ['JavaScript', 'HTML5', 'CSS3', 'Web Game']
            },
            { 
                title: 'The Ridiculous Quest DEMO', 
                description: 'A humorous adventure game where players battle rubber chickens, collect magic bananas, and dance with sock puppets. Features include inventory management, health potions, and save/load functionality.', 
                category: 'game',
                image: 'Images/chicken.jpg',
                github: 'https://github.com/Chams99/portfolio/tree/main/chicken',
                demo: 'chicken/',
                features: [
                    '🎮 Turn-based combat system',
                    '💾 Save/Load game progress',
                    '🎯 Multiple game mechanics',
                    '🖼️ GUI with Tkinter'
                ],
                tags: ['Python', 'Tkinter', 'Game Dev', 'GUI']
            },
            { 
                title: 'LolChat', 
                description: 'A League of Legends themed chat interface that combines modern web design with the game\'s aesthetic. Features champion data integration and responsive design.', 
                category: 'web',
                image: 'Images/lol.jpg',
                github: 'https://github.com/Chams99/portfolio/tree/main/lolchat',
                demo: 'lolchat/',
                features: [
                    '🎮 League of Legends Theme',
                    '🦸‍♂️ Champion Data Integration',
                    '💬 Chat Interface',
                    '📱 Responsive Design'
                ],
                tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX', 'AI']
            },
            { 
                title: 'E-commerce website DEMO', 
                description: 'A modern e-commerce platform with a sleek user interface, secure authentication, and seamless shopping experience. Features a dynamic cart system and responsive design.', 
                category: 'web',
                image: 'Images/ecommerce.jpg',
                github: 'https://github.com/Chams99/portfolio/tree/main/ChamsShop',
                demo: 'ChamsShop/Public/core/',
                features: [
                    '🛒 Dynamic Shopping Cart',
                    '🔐 User Authentication',
                    '💳 Checkout System',
                    '📱 Responsive Design'
                ],
                tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'E-commerce']
            },
            { 
                title: 'Chamsado Messenger DEMO', 
                description: 'Connect and chat seamlessly with this modern and user-friendly messenger application.', 
                category: 'mobile',
                image: 'Images/chamsado_messenger.jpg',
                github: 'https://github.com/Chams99/portfolio/tree/main/messenger_app',
                demo: 'messenger_app/',
                features: [
                    '💬 Real-time Messaging',
                    '🔒 Secure Communication',
                    '👤 User Profiles',
                    '👥 Group Chats'
                ],
                tags: ['HTML', 'CSS', 'JavaScript', 'Web App', 'Messaging']
            }
            // You can add more projects following this format
        ];

        // Portfolio filtering functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioGrid = document.querySelector('.portfolio-grid');

        // Clear existing portfolio items
        portfolioGrid.innerHTML = '';

        // Function to create and append portfolio items
        function createPortfolioItems(projects) {
            portfolioGrid.innerHTML = ''; // Clear existing items
            projects.forEach(project => {
                const item = document.createElement('div');
                item.className = 'portfolio-item';
                item.setAttribute('data-category', project.category);
                
                let portfolioHTML = `
                    <div class="portfolio-item-inner">
                        <div class="portfolio-image">
                            ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
                            <div class="portfolio-overlay">
                                <div class="portfolio-buttons">
                                    ${project.github ? `<a href="${project.github}" class="portfolio-btn" target="_blank" rel="noopener">GitHub</a>` : ''}
                                    ${project.demo ? `<a href="${project.demo}" class="portfolio-btn demo-btn ${project.category?.includes('game') ? 'game-btn' : ''}">Live Demo</a>` : ''}
                                </div>
                            </div>
                        </div>
                        <div class="portfolio-content">
                            <h3 class="portfolio-title">${project.title}</h3>
                            <p class="portfolio-description">${project.description}</p>
                            ${project.features ? `
                            <div class="portfolio-features">
                                <h4>Key Features:</h4>
                                <ul>
                                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                            ` : ''}
                            ${project.tags ? `
                            <div class="portfolio-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            ` : ''}
                        </div>
                    </div>
                `;
                
                item.innerHTML = portfolioHTML;
                portfolioGrid.appendChild(item);
            });
        }

        // Initial load of all projects
        createPortfolioItems(projects);

        // Add click event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter projects based on category
                const filteredProjects = filterValue === 'all' 
                    ? projects 
                    : projects.filter(project => project.category === filterValue);

                // Create and animate filtered items
                createPortfolioItems(filteredProjects);

                // Animate the new items
                const newItems = document.querySelectorAll('.portfolio-item');
                if (newItems.length > 0) {
                    gsap.from(newItems, {
                        duration: 0.5,
                        y: 20,
                        opacity: 0,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Animate skill bars on scroll
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = entry.target.style.width;
                        entry.target.style.width = '0';
                        setTimeout(() => {
                            entry.target.style.width = width;
                        }, 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            skillBars.forEach(bar => observer.observe(bar));
        }

        // Call the function when the page loads
        document.addEventListener('DOMContentLoaded', animateSkills);

        // Contact form handling
        document.addEventListener('DOMContentLoaded', () => {
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                let canSubmit = true; // Flag to track if form can be submitted

                contactForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    if (!canSubmit) {
                        alert('Please wait 5 seconds before sending another message.');
                        return;
                    }

                    const submitBtn = contactForm.querySelector('.submit-btn');
                    const originalBtnText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;

                    try {
                        const formData = new FormData(contactForm);
                        const response = await fetch('telegram-proxy.php', {
                            method: 'POST',
                            body: formData
                        });

                        const result = await response.json();

                        if (result.success) {
                            // Show success message
                            alert('Message sent successfully!');
                            contactForm.reset();
                            
                            // Disable form submission for 5 seconds
                            canSubmit = false;
                            submitBtn.innerHTML = '<i class="fas fa-clock"></i> Wait 5s...';
                            
                            setTimeout(() => {
                                canSubmit = true;
                                submitBtn.innerHTML = originalBtnText;
                                submitBtn.disabled = false;
                            }, 5000);
                        } else {
                            // Show the specific error message from the server
                            throw new Error(result.error || 'Failed to send message');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert(error.message || 'Sorry, there was an error sending your message. Please try again.');
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }
                });
            }
        });

        // Add this animation code to your existing script
        // GSAP Animations
        document.addEventListener('DOMContentLoaded', () => {
            // Hero Section Animation
            const heroText = document.querySelector('.hero-text');
            if (heroText) {
                gsap.from(heroText, {
                    duration: 1,
                    y: 100,
                    opacity: 0,
                    ease: 'power4.out'
                });
            }

            // About Section Animations
            const aboutContent = document.querySelector('.about-content');
            if (aboutContent) {
                gsap.from(aboutContent, {
                    scrollTrigger: {
                        trigger: aboutContent,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 1,
                    y: 60,
                    opacity: 0,
                    stagger: 0.2
                });
            }

            // Skills Animation
            const skillItems = document.querySelectorAll('.skill-item');
            if (skillItems.length > 0) {
                gsap.from(skillItems, {
                    scrollTrigger: {
                        trigger: '.skills-container',
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 0.8,
                    y: 40,
                    opacity: 0,
                    stagger: 0.1
                });
            }

            // Portfolio Items Animation
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            if (portfolioItems.length > 0) {
                gsap.from(portfolioItems, {
                    scrollTrigger: {
                        trigger: '.portfolio-grid',
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 0.8,
                    y: 50,
                    opacity: 0,
                    stagger: 0.2
                });
            }

            // Contact Section Animation
            const contactInfo = document.querySelector('.contact-info');
            const contactForm = document.querySelector('.contact-form');
            
            if (contactInfo) {
                gsap.from(contactInfo, {
                    scrollTrigger: {
                        trigger: '.contact-container',
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 1,
                    x: -50,
                    opacity: 0
                });
            }

            if (contactForm) {
                gsap.from(contactForm, {
                    scrollTrigger: {
                        trigger: '.contact-container',
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 1,
                    x: 50,
                    opacity: 0
                });
            }

            // Section Titles Animation
            const sectionTitles = document.querySelectorAll('.section-title');
            if (sectionTitles.length > 0) {
                sectionTitles.forEach(title => {
                    gsap.from(title, {
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        duration: 0.8,
                        y: 30,
                        opacity: 0
                    });
                });
            }

            // Parallax Effect for Hero Image
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                gsap.to(heroImage, {
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1
                    },
                    y: 100,
                    ease: 'none'
                });
            }

            // Animate Skill Bars on Scroll
            const skillBars = document.querySelectorAll('.skill-progress');
            if (skillBars.length > 0) {
                skillBars.forEach(bar => {
                    const percent = bar.style.width;
                    bar.style.width = 0;
                    
                    gsap.to(bar, {
                        scrollTrigger: {
                            trigger: bar,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        width: percent,
                        duration: 1.5,
                        ease: 'power4.out'
                    });
                });
            }

           

            // Add hover animations for interactive elements
            const addHoverAnimation = (elements, scale = 1.05) => {
                if (!elements || elements.length === 0) return;
                
                elements.forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        gsap.to(el, {
                            duration: 0.3,
                            scale: scale,
                            ease: 'power2.out'
                        });
                    });
                    
                    el.addEventListener('mouseleave', () => {
                        gsap.to(el, {
                            duration: 0.3,
                            scale: 1,
                            ease: 'power2.out'
                        });
                    });
                });
            };

            // Apply hover animations
            addHoverAnimation(document.querySelectorAll('.portfolio-item'));
            addHoverAnimation(document.querySelectorAll('.game-btn'));
        });