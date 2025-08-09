// Performance monitoring - Only run in development
if ('performance' in window && window.location.hostname === 'localhost') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const paintMetrics = performance.getEntriesByType('paint');
            
            console.log('Performance Metrics:');
            console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
            console.log('Load Complete:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            console.log('Total Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            
            if (paintMetrics.length > 0) {
                console.log('First Paint:', paintMetrics.find(p => p.name === 'first-paint')?.startTime, 'ms');
                console.log('First Contentful Paint:', paintMetrics.find(p => p.name === 'first-contentful-paint')?.startTime, 'ms');
            }
        }, 0);
    });
}

// Lazy load GSAP plugins only when needed
let gsapLoaded = false;
let scrollTriggerLoaded = false;
let scrollToPluginLoaded = false;

async function loadGSAPPlugin(pluginName) {
    if (pluginName === 'ScrollTrigger' && !scrollTriggerLoaded) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        scrollTriggerLoaded = true;
    } else if (pluginName === 'ScrollToPlugin' && !scrollToPluginLoaded) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js');
        scrollToPluginLoaded = true;
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Typewriter Effect - Critical functionality
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

// Initialize typewriter immediately
if (typewriter) {
    type();
}

// Initialize particles.js - Only if particles container exists
const particlesContainer = document.getElementById('particles-js');
if (particlesContainer && typeof particlesJS !== 'undefined') {
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
}

// Portfolio items data with optimized responsive images
const projects = [
    { 
        title: 'Energy - Renewable Energy Solutions', 
        description: 'A modern, high-performance website for Energy, a leading provider of renewable energy solutions specializing in solar, wind, and sustainable energy projects across California and beyond.', 
        category: 'web',
        image: 'Images/optimized/energy-small.webp',
        imageSrcSet: 'Images/optimized/energy-small.webp 486w, Images/optimized/energy-medium.webp 972w, Images/optimized/energy-large.webp 1458w',
        imageFallback: 'Images/optimized/energy-fallback.jpg',
        github: 'https://github.com/Chams99/portfolio/tree/main/Energy',
        demo: 'Energy/',
        features: [
            '☀️ Solar & Wind Energy Solutions',
            '📱 Fully Responsive Design',
            '⚡ Next.js 14 Performance',
            '🎨 Modern Professional UI',
            '📊 SEO Optimized',
            '♿ WCAG Accessibility Compliant',
            '📝 Blog & Project Showcase',
            '📞 Lead Generation Forms'
        ],
        tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Renewable Energy', 'Professional']
    },
    { 
        title: 'FitLite - AI Fitness Companion DEMO', 
        description: 'A modern, responsive landing page for FitLite - an AI-powered fitness companion app. Features dynamic theme switching, smooth animations, and mobile-first design with cutting-edge web technologies.', 
        category: 'mobile',
        image: 'Images/optimized/Fitness-small.webp',
        imageSrcSet: 'Images/optimized/Fitness-small.webp 557w, Images/optimized/Fitness-medium.webp 1114w, Images/optimized/Fitness-large.webp 1671w',
        imageFallback: 'Images/optimized/Fitness-fallback.jpg',
        github: 'https://github.com/Chams99/portfolio/tree/main/fitness_app',
        demo: 'fitness_app/',
        features: [
            '🌙 Dynamic Dark/Light Theme',
            '📱 Mobile-First Responsive Design',
            '⚡ Performance Optimized (95+ Lighthouse)',
            '🎨 Modern Glassmorphism UI',
            '🔄 Real-time Image Switching',
            '📊 SEO Optimized'
        ],
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Mobile App', 'AI', 'Performance']
    },
    { 
        title: 'La Cuisine - Fine Dining Restaurant', 
        description: 'A modern, responsive single-page restaurant website built with 2025 best practices, featuring elegant design, smooth animations, and excellent user experience. Complete with interactive menu, reservation system, and professional styling.', 
        category: 'web',
        image: 'Images/optimized/restaurents-small.webp',
        imageSrcSet: 'Images/optimized/restaurents-small.webp 486w, Images/optimized/restaurents-medium.webp 972w, Images/optimized/restaurents-large.webp 1458w',
        imageFallback: 'Images/optimized/restaurents-fallback.jpg',
        github: 'https://github.com/Chams99/portfolio/tree/main/restaurents',
        demo: 'restaurents/',
        features: [
            '🍽️ Interactive Menu System',
            '📱 Mobile-First Responsive Design',
            '⚡ Performance Optimized',
            '🎨 Modern Professional UI',
            '📊 SEO Optimized',
            '♿ WCAG Accessibility Compliant',
            '📝 Reservation Form',
            '📞 Contact Integration'
        ],
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Restaurant', 'Professional', 'Responsive']
    },
    { 
        title: 'Chamsado Messenger DEMO', 
        description: 'Connect and chat seamlessly with this modern and user-friendly messenger application.', 
        category: 'mobile',
        image: 'Images/optimized/chamsado_messenger-small.webp',
        imageSrcSet: 'Images/optimized/chamsado_messenger-small.webp 486w, Images/optimized/chamsado_messenger-medium.webp 972w, Images/optimized/chamsado_messenger-large.webp 1458w',
        imageFallback: 'Images/optimized/chamsado_messenger-fallback.jpg',
        github: 'https://github.com/Chams99/portfolio/tree/main/messenger_app',
        demo: 'messenger_app/',
        features: [
            '💬 Real-time Messaging',
            '🔒 Secure Communication',
            '👤 User Profiles',
            '👥 Group Chats'
        ],
        tags: ['HTML', 'CSS', 'JavaScript', 'Web App', 'Messaging']
    },
    { 
        title: 'E-commerce website DEMO', 
        description: 'A modern e-commerce platform with a sleek user interface, secure authentication, and seamless shopping experience. Features a dynamic cart system and responsive design.', 
        category: 'web',
        image: 'Images/optimized/ecommerce-small.webp',
        imageSrcSet: 'Images/optimized/ecommerce-small.webp 544w, Images/optimized/ecommerce-medium.webp 1088w, Images/optimized/ecommerce-large.webp 1632w',
        imageFallback: 'Images/optimized/ecommerce-fallback.jpg',
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
        title: 'LolChat', 
        description: 'A League of Legends themed chat interface that combines modern web design with the game\'s aesthetic. Features champion data integration and responsive design.', 
        category: 'web',
        image: 'Images/optimized/lol-small.webp',
        imageSrcSet: 'Images/optimized/lol-small.webp 486w, Images/optimized/lol-medium.webp 972w, Images/optimized/lol-large.webp 1458w',
        imageFallback: 'Images/optimized/lol-fallback.jpg',
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
        title: 'Epic Chicken Adventure - Next.js', 
        description: 'A modern Next.js application featuring the Epic Chicken Adventure game with enhanced UI, responsive design, and professional styling. Built with React, Tailwind CSS, and modern web technologies.', 
        category: ['web', 'game'],
        image: 'Images/optimized/chicken-small.webp',
        imageSrcSet: 'Images/optimized/chicken-small.webp 486w, Images/optimized/chicken-medium.webp 972w, Images/optimized/chicken-large.webp 1458w',
        imageFallback: 'Images/optimized/chicken-fallback.jpg',
        github: 'https://github.com/Chams99/portfolio/tree/main/chicken',
        demo: 'chicken/',
        features: [
            '⚛️ Next.js 14 Framework',
            '🎨 Modern React Components',
            '📱 Responsive Design',
            '🎯 Interactive Game Elements',
            '⚡ Performance Optimized',
            '🎨 Tailwind CSS Styling'
        ],
        tags: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'Web App', 'Game']
    },
    { 
        title: 'Speed Typer', 
        description: 'An interactive typing game that tests your typing speed and accuracy with different difficulty levels.', 
        category: 'game',
        image: 'Images/optimized/typing-game-small.webp',
        imageSrcSet: 'Images/optimized/typing-game-small.webp 553w, Images/optimized/typing-game-medium.webp 1106w, Images/optimized/typing-game-large.webp 1659w',
        imageFallback: 'Images/optimized/typing-game-fallback.jpg',
        github: 'https://github.com/Chams99/portfolio/tree/main/typing game',
        demo: 'typing-game/',
        features: [
            '⌨️ Real-time WPM calculation',
            '🏆 High score tracking',
            '🔤 Multiple difficulty levels',
            '📊 Performance statistics'
        ],
        tags: ['JavaScript', 'HTML5', 'CSS3', 'Web Game']
    },
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
    }
];

// Portfolio filtering functionality - Lazy loaded
let portfolioInitialized = false;

function initializePortfolio() {
    if (portfolioInitialized) return;
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (!portfolioGrid) return;

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
                        ${project.image ? `
                            <picture>
                                <source srcset="${project.imageSrcSet || project.image}" type="image/webp">
                                <img src="${project.imageFallback || project.image}" alt="${project.title}" loading="lazy">
                            </picture>
                        ` : ''}
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
                : projects.filter(project => {
                    // Handle both string and array categories
                    if (Array.isArray(project.category)) {
                        return project.category.includes(filterValue);
                    }
                    return project.category === filterValue;
                });

            // Create and animate filtered items
            createPortfolioItems(filteredProjects);

            // Animate the new items only if GSAP is loaded
            if (typeof gsap !== 'undefined') {
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
            }

            // Ensure contact form remains visible after filtering
            setTimeout(() => {
                const contactForm = document.querySelector('.contact-form');
                const contactInfo = document.querySelector('.contact-info');
                const contactSection = document.getElementById('contact');
                
                if (contactForm) {
                    gsap.set(contactForm, { opacity: 1, x: 0, visibility: 'visible', display: 'block' });
                }
                if (contactInfo) {
                    gsap.set(contactInfo, { opacity: 1, x: 0, visibility: 'visible', display: 'block' });
                }
                if (contactSection) {
                    gsap.set(contactSection, { opacity: 1, visibility: 'visible', display: 'block' });
                }
            }, 100);
        });
    });

    portfolioInitialized = true;
}

// Animate skill cards on scroll - Lazy loaded
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length === 0) return;
    
    const animatedCards = new Set(); // Track which cards have been animated
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedCards.has(entry.target)) {
                // Mark this card as animated
                animatedCards.add(entry.target);
                
                // Set initial state
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                // Animate in
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                
                // Unobserve after animation
                setTimeout(() => {
                    observer.unobserve(entry.target);
                }, 600);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    skillCards.forEach(card => {
        // Ensure cards start visible
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        observer.observe(card);
    });
}

// Function to ensure contact section is always visible
function ensureContactVisibility() {
    const contactForm = document.querySelector('.contact-form');
    const contactInfo = document.querySelector('.contact-info');
    const contactSection = document.getElementById('contact');
    
    if (contactForm && typeof gsap !== 'undefined') {
        gsap.set(contactForm, { opacity: 1, x: 0, visibility: 'visible' });
    }
    if (contactInfo && typeof gsap !== 'undefined') {
        gsap.set(contactInfo, { opacity: 1, x: 0, visibility: 'visible' });
    }
    if (contactSection && typeof gsap !== 'undefined') {
        gsap.set(contactSection, { opacity: 1, visibility: 'visible' });
    }
}

// Contact form handling - Lazy loaded
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
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

// GSAP Animations - Lazy loaded with proper plugin loading
async function initializeGSAPAnimations() {
    // Wait for GSAP core to load
    if (typeof gsap === 'undefined') {
        await new Promise(resolve => {
            const checkGSAP = () => {
                if (typeof gsap !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkGSAP, 100);
                }
            };
            checkGSAP();
        });
    }

    // Load ScrollTrigger plugin only when needed
    await loadGSAPPlugin('ScrollTrigger');

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

    // Contact Section Animation - Modified to prevent disappearing
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactInfo) {
        gsap.from(contactInfo, {
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 75%',
                toggleActions: 'play none none none',
                onLeave: () => {
                    gsap.set(contactInfo, { opacity: 1, x: 0, visibility: 'visible' });
                },
                onEnterBack: () => {
                    gsap.set(contactInfo, { opacity: 1, x: 0, visibility: 'visible' });
                }
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
                toggleActions: 'play none none none',
                onLeave: () => {
                    gsap.set(contactForm, { opacity: 1, x: 0, visibility: 'visible' });
                },
                onEnterBack: () => {
                    gsap.set(contactForm, { opacity: 1, x: 0, visibility: 'visible' });
                }
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

    // Animate Skill Cards on Scroll with GSAP
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        // Set initial state
        gsap.set(skillCards, { opacity: 0, y: 40 });
        
        gsap.to(skillCards, {
            scrollTrigger: {
                trigger: '.skills-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out'
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
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize critical functionality immediately
    initializePortfolio();
    animateSkillCards();
    initializeContactForm();
    ensureContactVisibility();
    
    // Initialize GSAP animations after a short delay to prioritize critical content
    setTimeout(() => {
        initializeGSAPAnimations();
    }, 100);
});

// Ensure contact visibility on scroll events
window.addEventListener('scroll', () => {
    setTimeout(ensureContactVisibility, 100);
});