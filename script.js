// Performance monitoring and optimization - Only run in development
if ('performance' in window && window.location.hostname === 'localhost') {
    window.addEventListener('load', () => {
        requestIdleCallback(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const paintMetrics = performance.getEntriesByType('paint');

            console.log('=== Performance Metrics ===');
            console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
            console.log('Load Complete:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            console.log('Total Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');

            if (paintMetrics.length > 0) {
                console.log('First Paint:', paintMetrics.find(p => p.name === 'first-paint')?.startTime, 'ms');
                console.log('First Contentful Paint:', paintMetrics.find(p => p.name === 'first-contentful-paint')?.startTime, 'ms');
            }

            // Performance optimization suggestions
            if (perfData.loadEventEnd - perfData.fetchStart > 3000) {
                console.warn('⚠️ Slow load time detected. Consider optimizing images and reducing JavaScript bundle size.');
            }
        });
    });
}

// Performance optimizations
function optimizePerformance() {
    // Throttle scroll events for better performance
    let scrollTimeout;
    let isScrolling = false;
    
    const throttleScroll = () => {
        // Removed ensureContactVisibility call - contact section remains visible once loaded
        if (!isScrolling) {
            requestAnimationFrame(() => {
                isScrolling = false;
            });
            isScrolling = true;
        }
    };

    // Use passive listeners for better scroll performance
    window.addEventListener('scroll', throttleScroll, { passive: true });

    // Preload critical images with error handling
    const preloadImages = [
        'Images/optimized/chams-large.webp',
        'Images/optimized/energy-large.webp',
        'Images/optimized/Fitness-large.webp'
    ];

    preloadImages.forEach(src => {
        const img = new Image();
        img.onload = () => console.log(`Preloaded: ${src}`);
        img.onerror = () => console.warn(`Failed to preload: ${src}`);
        img.src = src;
    });

    // Optimize Intersection Observer with better performance
    const observerConfig = {
        threshold: [0, 0.1, 0.5],
        rootMargin: '50px 0px'
    };

    // Enable hardware acceleration for smooth animations
    const animatedElements = document.querySelectorAll('.portfolio-item, .skill-card, .experience-item');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels and roles
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        portfolioGrid.setAttribute('role', 'main');
        portfolioGrid.setAttribute('aria-label', 'Portfolio projects grid');
    }

    // Improve keyboard navigation
    const focusableElements = document.querySelectorAll('button, a, input, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--green)';
            element.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });

    // Add skip links for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Improve color contrast for better accessibility
    const highContrastElements = document.querySelectorAll('.skill-name, .portfolio-title');
    highContrastElements.forEach(element => {
        element.style.color = 'var(--high-contrast-beige)';
    });
}

// Add screen reader only class
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    .sr-only:focus {
        position: static;
        width: auto;
        height: auto;
        padding: 0.5rem;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
        background: var(--dark-gray);
        color: var(--beige);
        border: 2px solid var(--green);
        z-index: 1000;
    }
`;
document.head.appendChild(style);

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

// Initialize particles.js - Lazy loaded for better performance
function initializeParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer && typeof particlesJS !== 'undefined') {
        // Use requestIdleCallback for non-critical initialization
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 25 }, // Reduced for better performance
                        color: { value: '#ECDBBA' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.2 }, // Reduced opacity
                        size: { value: 1.5 }, // Smaller particles
                        move: {
                            enable: true,
                            speed: 0.8 // Slower movement
                        }
                    }
                });
            });
        } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(() => {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 25 },
                        color: { value: '#ECDBBA' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.2 },
                        size: { value: 1.5 },
                        move: {
                            enable: true,
                            speed: 0.8
                        }
                    }
                });
            }, 100);
        }
    }
}

// Portfolio items data with optimized responsive images
const projects = [
    {
        title: 'Dent - Premium Dental Care & Cosmetic Dentistry',
        description: 'A modern, responsive dental clinic website built with Next.js featuring premium dental care services including teeth whitening, Invisalign, cosmetic dentistry, and dental implants. Professional design with appointment booking system.',
        category: 'web',
        image: 'Images/white.png',
        imageSrcSet: 'Images/white.png 486w',
        imageFallback: 'Images/white.png',
        github: 'https://github.com/Chams99/portfolio/tree/main/white',
        demo: 'white/',
        features: [
            '<i data-lucide="smile"></i> Complete Dental Services',
            '<i data-lucide="smartphone"></i> Fully Responsive Design',
            '<i data-lucide="zap"></i> Next.js Performance',
            '<i data-lucide="palette"></i> Modern Professional UI',
            '<i data-lucide="calendar"></i> Appointment Booking System',
            '<i data-lucide="users"></i> Patient Testimonials',
            '<i data-lucide="star"></i> 5-Star Rated Services',
            '<i data-lucide="phone"></i> Contact Integration'
        ],
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Dental Clinic', 'Healthcare', 'Professional']
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
            '<i data-lucide="moon"></i> Dynamic Dark/Light Theme',
            '<i data-lucide="smartphone"></i> Mobile-First Responsive Design',
            '<i data-lucide="zap"></i> Performance Optimized (95+ Lighthouse)',
            '<i data-lucide="layers"></i> Modern Glassmorphism UI',
            '<i data-lucide="refresh-cw"></i> Real-time Image Switching',
            '<i data-lucide="bar-chart-3"></i> SEO Optimized'
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
            '<i data-lucide="utensils-crossed"></i> Interactive Menu System',
            '<i data-lucide="smartphone"></i> Mobile-First Responsive Design',
            '<i data-lucide="zap"></i> Performance Optimized',
            '<i data-lucide="palette"></i> Modern Professional UI',
            '<i data-lucide="bar-chart-3"></i> SEO Optimized',
            '<i data-lucide="accessibility"></i> WCAG Accessibility Compliant',
            '<i data-lucide="calendar"></i> Reservation Form',
            '<i data-lucide="phone"></i> Contact Integration'
        ],
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Restaurant', 'Professional', 'Responsive']
    },
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
            '<i data-lucide="sun"></i> Solar & Wind Energy Solutions',
            '<i data-lucide="smartphone"></i> Fully Responsive Design',
            '<i data-lucide="zap"></i> Next.js 14 Performance',
            '<i data-lucide="palette"></i> Modern Professional UI',
            '<i data-lucide="bar-chart-3"></i> SEO Optimized',
            '<i data-lucide="accessibility"></i> WCAG Accessibility Compliant',
            '<i data-lucide="file-text"></i> Blog & Project Showcase',
            '<i data-lucide="mail"></i> Lead Generation Forms'
        ],
        tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Renewable Energy', 'Professional']
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
            '<i data-lucide="message-circle"></i> Real-time Messaging',
            '<i data-lucide="shield"></i> Secure Communication',
            '<i data-lucide="user"></i> User Profiles',
            '<i data-lucide="users"></i> Group Chats'
        ],
        tags: ['HTML', 'CSS', 'JavaScript', 'Web App', 'Messaging']
    },
    { 
        title: 'Property Investment - Premium Investment Opportunities', 
        description: 'A comprehensive property investment platform showcasing exclusive investment opportunities with proven returns of 8-12% annually. Features lead generation forms, investment guides, and professional property listings.', 
        category: 'web',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=486&h=324&fit=crop&crop=center',
        imageSrcSet: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=486&h=324&fit=crop&crop=center 486w, https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=972&h=648&fit=crop&crop=center 972w, https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1458&h=972&fit=crop&crop=center 1458w',
        imageFallback: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=486&h=324&fit=crop&crop=center',
        github: 'https://github.com/Chams99/portfolio/tree/main/Property',
        demo: 'Property/',
        features: [
            '<i data-lucide="home"></i> Premium Property Listings',
            '<i data-lucide="trending-up"></i> Investment Analytics Dashboard',
            '<i data-lucide="clipboard-list"></i> Lead Generation Forms',
            '<i data-lucide="smartphone"></i> Fully Responsive Design',
            '<i data-lucide="palette"></i> Modern Professional UI',
            '<i data-lucide="calculator"></i> ROI Calculator',
            '<i data-lucide="calendar"></i> Consultation Booking System',
            '<i data-lucide="download"></i> Investment Guide Downloads'
        ],
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Property Investment', 'Real Estate', 'Lead Generation', 'Professional']
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
            '<i data-lucide="shopping-cart"></i> Dynamic Shopping Cart',
            '<i data-lucide="lock"></i> User Authentication',
            '<i data-lucide="credit-card"></i> Checkout System',
            '<i data-lucide="smartphone"></i> Responsive Design'
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
            '<i data-lucide="swords"></i> League of Legends Theme',
            '<i data-lucide="crown"></i> Champion Data Integration',
            '<i data-lucide="message-circle"></i> Chat Interface',
            '<i data-lucide="smartphone"></i> Responsive Design'
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
            '<i data-lucide="atom"></i> Next.js 14 Framework',
            '<i data-lucide="palette"></i> Modern React Components',
            '<i data-lucide="smartphone"></i> Responsive Design',
            '<i data-lucide="crosshair"></i> Interactive Game Elements',
            '<i data-lucide="zap"></i> Performance Optimized',
            '<i data-lucide="layout"></i> Tailwind CSS Styling'
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
            '<i data-lucide="keyboard"></i> Real-time WPM calculation',
            '<i data-lucide="award"></i> High score tracking',
            '<i data-lucide="bar-chart-3"></i> Multiple difficulty levels',
            '<i data-lucide="trending-up"></i> Performance statistics'
        ],
        tags: ['JavaScript', 'HTML5', 'CSS3', 'Web Game']
    },
    {
        title: 'Wallpaper Generator DEMO',
        description: 'A dynamic wallpaper generator that creates beautiful and customizable wallpapers with interactive elements and modern design patterns.',
        category: 'web',
        image: 'wallpaper/Capture%20d%27%C3%A9cran%202025-05-31%20092043.png',
        github: 'https://github.com/Chams99/portfolio/tree/main/wallpaper',
        demo: 'wallpaper/',
        features: [
            '<i data-lucide="palette"></i> Dynamic Pattern Generation',
            '<i data-lucide="image"></i> Customizable Colors',
            '<i data-lucide="mouse-pointer"></i> Interactive Elements',
            '<i data-lucide="smartphone"></i> Responsive Design'
        ],
        tags: ['HTML', 'CSS', 'JavaScript', 'Web App', 'Design']
    }
];

// Portfolio filtering functionality - Optimized for performance
let portfolioInitialized = false;
let portfolioItemsCache = new Map();

function initializePortfolio() {
    if (portfolioInitialized) return;
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (!portfolioGrid) return;

    // Clear existing portfolio items
    portfolioGrid.innerHTML = '';

    // Function to create and append portfolio items with caching
    function createPortfolioItems(projects) {
        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        
        projects.forEach(project => {
            let item;
            
            // Check cache first
            if (portfolioItemsCache.has(project.title)) {
                item = portfolioItemsCache.get(project.title).cloneNode(true);
            } else {
                item = document.createElement('div');
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
                                    ${project.demo ? `<a href="${project.demo}" class="portfolio-btn demo-btn" target="_blank" rel="noopener">Live Demo</a>` : ''}
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
                
                // Cache the item for future use
                portfolioItemsCache.set(project.title, item.cloneNode(true));
            }
            
            fragment.appendChild(item);
        });
        
        // Clear and append all items at once
        portfolioGrid.innerHTML = '';
        portfolioGrid.appendChild(fragment);
    }

    // Initial load of all projects
    createPortfolioItems(projects);

    // Add click event listeners to filter buttons with debouncing
    let filterTimeout;
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Debounce filter operations
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
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

                // Ensure all portfolio items remain visible after filtering
                setTimeout(() => {
                    const allPortfolioItems = document.querySelectorAll('.portfolio-item');
                    allPortfolioItems.forEach(item => {
                        item.style.opacity = '1';
                        item.style.visibility = 'visible';
                    });
                }, 10);

                // Re-initialize Lucide icons after DOM update
                setTimeout(() => {
                    initializeLucideIcons();
                }, 50);

                            // Animate the new items only if GSAP is loaded
                if (typeof gsap !== 'undefined') {
                    const newItems = document.querySelectorAll('.portfolio-item');
                    if (newItems.length > 0) {
                        gsap.from(newItems, {
                            duration: 0.4,
                            y: 20,
                            opacity: 0,
                            stagger: 0.05,
                            ease: 'power2.out',
                            onComplete: () => {
                                // Ensure elements remain visible after animation
                                newItems.forEach(item => {
                                    item.style.opacity = '1';
                                    item.style.visibility = 'visible';
                                });
                            }
                        });
                    }
                }

                // Fix viewport height issues after filtering on mobile
                setTimeout(() => {
                    if (typeof setVH === 'function') {
                        setVH(); // Recalculate viewport height after content change
                    }

                    // Force a reflow to fix any layout issues
                    document.body.offsetHeight;

                    // Additional fix for dynamic content height changes
                    const portfolioSection = document.getElementById('portfolio');
                    if (portfolioSection) {
                        // Temporarily set height to auto to recalculate
                        portfolioSection.style.minHeight = 'auto';
                        setTimeout(() => {
                            portfolioSection.style.minHeight = '';
                        }, 10);
                    }
                }, 100);

                // Contact section remains visible after filtering - no need to force visibility
            }, 50);
        });
    });

    portfolioInitialized = true;
}

// Animate skill cards on scroll - Optimized for performance
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length === 0) return;

    // Ensure all skill cards are visible immediately to prevent disappearing
    skillCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.visibility = 'visible';
    });

    // Disabled intersection observer to prevent conflicts with GSAP animations
    /*
    const animatedCards = new Set();
    let animationFrameId;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedCards.has(entry.target)) {
                animatedCards.add(entry.target);

                // Use requestAnimationFrame for smooth animation
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }

                animationFrameId = requestAnimationFrame(() => {
                    // Only animate if element is not already visible
                    if (getComputedStyle(entry.target).opacity === '0' || entry.target.style.opacity === '0') {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(30px)';
                        entry.target.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';

                        // Trigger animation on next frame
                        requestAnimationFrame(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        });
                    }
                });

                // Unobserve after animation
                setTimeout(() => {
                    observer.unobserve(entry.target);
                }, 400);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    skillCards.forEach(card => {
        observer.observe(card);
    });
    */
}

// Removed ensureContactVisibility function - contact section remains visible once loaded

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
                start: 'top 80%'
            },
            duration: 1,
            y: 60,
            opacity: 0,
            stagger: 0.2,
            onComplete: () => {
                gsap.set(aboutContent, { opacity: 1, y: 0, clearProps: 'transform' });
            }
        });
    }

    // Skills Animation
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
        gsap.from(skillItems, {
            scrollTrigger: {
                trigger: '.skills-container',
                start: 'top 75%'
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            stagger: 0.1,
            onComplete: () => {
                skillItems.forEach(item => {
                    gsap.set(item, { opacity: 1, y: 0, clearProps: 'transform' });
                });
            }
        });
    }

    // Portfolio Items Animation
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (portfolioItems.length > 0) {
        gsap.from(portfolioItems, {
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 75%'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            onComplete: () => {
                // Explicitly ensure elements stay visible after animation
                portfolioItems.forEach(item => {
                    gsap.set(item, { opacity: 1, y: 0, clearProps: 'transform' });
                });
            }
        });
    }

    // Contact Section Animation - Fixed to prevent disappearing
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');

    if (contactInfo) {
        gsap.from(contactInfo, {
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 75%'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            onComplete: () => {
                gsap.set(contactInfo, { opacity: 1, x: 0, clearProps: 'transform' });
            }
        });
    }

    if (contactForm) {
        gsap.from(contactForm, {
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 75%'
            },
            duration: 1,
            x: 50,
            opacity: 0,
            onComplete: () => {
                gsap.set(contactForm, { opacity: 1, x: 0, clearProps: 'transform' });
            }
        });
    }

    // Section Titles Animation
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length > 0) {
        sectionTitles.forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%'
                },
                duration: 0.8,
                y: 30,
                opacity: 0,
                onComplete: () => {
                    gsap.set(title, { opacity: 1, y: 0, clearProps: 'transform' });
                }
            });
        });
    }

    // Parallax Effect for Hero Image - Reduced for better control
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        gsap.to(heroImage, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 30, // Reduced from 100px to 30px for subtle effect
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
                start: 'top 80%'
            },
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out',
            onComplete: () => {
                skillCards.forEach(card => {
                    gsap.set(card, { opacity: 1, y: 0, clearProps: 'transform' });
                });
            }
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

// Magnetic effect for interactive elements
function initializeMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
}

// Enhanced scroll-triggered animations - Optimized
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smooth animation
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe portfolio items with optimized transitions
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
        item.style.willChange = 'transform, opacity';
        observer.observe(item);
    });

    // Observe skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
        card.style.willChange = 'transform, opacity';
        observer.observe(card);
    });

    // Observe experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
        item.style.willChange = 'transform, opacity';
        observer.observe(item);
    });
}

// Enhanced particle interaction
function initializeParticleInteraction() {
    const canvas = document.getElementById('particles-js');
    if (!canvas) return;

    canvas.addEventListener('mousemove', (e) => {
        const particles = window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS;
        if (particles) {
            const rect = canvas.getBoundingClientRect();
            particles.interactivity.mouse.pos_x = e.clientX - rect.left;
            particles.interactivity.mouse.pos_y = e.clientY - rect.top;
        }
    });
}

// Smooth page transitions
function initializePageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if href is just "#" or empty
            if (!href || href === '#') {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                // Add fade effect
                document.body.style.opacity = '0.7';
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    document.body.style.opacity = '1';
                }, 150);
            }
        });
    });
}

// Advanced interactions and page transitions
function initializeAdvancedInteractions() {
    // This function is now simplified - navigation is handled by initializeNavigation()

    // Advanced hover effects for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        let mouseX = 0;
        let mouseY = 0;

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (mouseY - centerY) / 10;
            const rotateY = (centerX - mouseX) / 10;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Interactive skill cards with ripple effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${e.offsetX}px`;
            ripple.style.top = `${e.offsetY}px`;

            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax scrolling effect
    let parallaxElements = document.querySelectorAll('.parallax-element');
    if (parallaxElements.length === 0) {
        // Add parallax class to elements that should have parallax
        document.querySelectorAll('.hero-image, .hero-blob, .section-title').forEach(el => {
            el.classList.add('parallax-element');
        });
        parallaxElements = document.querySelectorAll('.parallax-element');
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach((element, index) => {
            // Reduced parallax rates for more subtle movement
            const baseRate = 0.15; // Reduced from 0.5
            const rate = index === 0 ? baseRate : (index + 1) * baseRate * 0.8;
            element.style.transform = `translateY(${scrolled * rate}px)`;
        });
    });
}


// Professional CV functionality
function downloadResume() {
    // Create a link to download the PDF file
    const link = document.createElement('a');
    link.href = 'cv/Chames_eddine_Dhibi_CV_2025-09-09T14-16-47.pdf'; // Direct link to PDF file
    link.download = 'Chames_eddine_Dhibi_CV_2025.pdf';
    link.target = '_blank';

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Logo click refresh functionality
function refreshPage() {
    // Add a smooth fade out effect before refresh
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.7';
    
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

// Initialize Lucide icons (2025 best practice)
function initializeLucideIcons() {
    const initIcons = () => {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            try {
                lucide.createIcons();
                console.log('Lucide icons initialized successfully');
            } catch (error) {
                console.warn('Error initializing Lucide icons:', error);
            }
        } else {
            console.warn('Lucide library not loaded yet');
        }
    };

    // Try to initialize immediately
    initIcons();

    // Fallback: try again after a short delay in case Lucide loads after DOM
    setTimeout(initIcons, 100);

    // Additional fallback: try again after portfolio is loaded
    setTimeout(initIcons, 500);
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    let lastScrollY = window.scrollY;
    let ticking = false;

    // Optimized scroll behavior for navbar
    let scrollTimeout;
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (simplified)
        if (scrollY > lastScrollY && scrollY > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollY = scrollY;
    }

    // Debounced scroll listener for better performance
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateNavbar, 10);
    }, { passive: true });

    // Mobile menu toggle
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate mobile menu items
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        mobileNavItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    navToggle.addEventListener('click', toggleMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Simplified and smooth active section highlighting
    let activeSectionTimeout;
    let currentActiveSection = 'hero';
    
    function updateActiveSection() {
        const scrollPos = window.scrollY + 120;
        
        // Hero section
        if (scrollPos < 300) {
            if (currentActiveSection !== 'hero') {
                setActiveSection('hero');
                currentActiveSection = 'hero';
            }
            return;
        }

        // Other sections
        const sections = document.querySelectorAll('section[id]');
        for (const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop - 50 && scrollPos < sectionTop + sectionHeight - 50) {
                if (currentActiveSection !== sectionId) {
                    setActiveSection(sectionId);
                    currentActiveSection = sectionId;
                }
                return;
            }
        }
    }

    function setActiveSection(sectionId) {
        // Simple and smooth active state updates
        navLinks.forEach(link => {
            const isActive = link.getAttribute('data-section') === sectionId;
            link.classList.toggle('active', isActive);
        });
        
        // Update mobile navigation
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            const isActive = link.getAttribute('data-section') === sectionId;
            link.classList.toggle('active', isActive);
        });
    }

    // Simplified scroll event handling
    window.addEventListener('scroll', () => {
        updateActiveSection();
    }, { passive: true });

    // Ultra-smooth navigation with native browser scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Simple click feedback
                    link.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        link.style.transform = '';
                    }, 100);
                    
                    // Use native smooth scroll - much smoother than custom
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu
                    if (mobileMenu.classList.contains('active')) {
                        setTimeout(closeMobileMenu, 200);
                    }
                }
            }
        });
    });


    // Initialize active section
    updateActiveSection();
}

// Enhanced navigation animations
function initializeNavigationAnimations() {
    // Staggered fade-in animation for navigation elements
    const navbar = document.getElementById('navbar');
    const brandLink = document.querySelector('.brand-link');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-30px)';
        
        // Animate navbar container
        setTimeout(() => {
            navbar.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
        }, 100);
        
        // Animate brand logo
        if (brandLink) {
            brandLink.style.opacity = '0';
            brandLink.style.transform = 'scale(0.8) rotate(-10deg)';
            
            setTimeout(() => {
                brandLink.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                brandLink.style.opacity = '1';
                brandLink.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }
        
        // Stagger animate navigation items
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 500 + (index * 100));
        });
    }
}

// Initialize everything when DOM is ready - Optimized loading order
document.addEventListener('DOMContentLoaded', () => {
    // Initialize critical functionality immediately
    initializeNavigation();
    initializePortfolio();
    animateSkillCards();
    initializeContactForm();

    // Initialize performance optimizations
    optimizePerformance();
    enhanceAccessibility();

    // Initialize viewport height fix for all devices
    initializeViewportHeightFix();

    // Initialize enhanced features with staggered loading
    requestIdleCallback(() => {
        initializeMagneticEffect();
        initializeScrollAnimations();
        initializeParticleInteraction();
        initializePageTransitions();
        initializeMobileOptimizations();
        initializeAdvancedInteractions();

        // Initialize particles after other features
        initializeParticles();
    });

    // Initialize modern icon system (2025 best practice)
    initializeLucideIcons();

    // Initialize GSAP animations after a short delay to prioritize critical content
    setTimeout(() => {
        initializeGSAPAnimations();
        initializeNavigationAnimations();
    }, 200);
});

// Global viewport height fix function
let setVH;
let portfolioObserver;

function initializeViewportHeightFix() {
    // Add viewport height fix for mobile browsers
    setVH = function() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        // Also update body height to prevent infinite scrolling gap
        document.body.style.minHeight = `calc(${vh}px * 100)`;

        // Force reflow to fix layout issues
        document.body.offsetHeight; // Trigger reflow
    };

    // Initial call
    setVH();

    // Add event listeners with debouncing to prevent excessive calls
    let vhTimeout;
    function debouncedSetVH() {
        clearTimeout(vhTimeout);
        vhTimeout = setTimeout(setVH, 100);
    }

    window.addEventListener('resize', debouncedSetVH);
    window.addEventListener('orientationchange', debouncedSetVH);

    // Also call on load to ensure proper initialization
    window.addEventListener('load', setVH);

    // Set up observer for portfolio content changes
    setupPortfolioObserver();
}

function setupPortfolioObserver() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;

    // Create a MutationObserver to watch for content changes
    portfolioObserver = new MutationObserver((mutations) => {
        let contentChanged = false;

        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                contentChanged = true;
            }
        });

        if (contentChanged) {
            // Content changed, recalculate viewport height after a short delay
            setTimeout(() => {
                if (typeof setVH === 'function') {
                    setVH();

                    // Force layout recalculation
                    document.body.offsetHeight;

                    // Reset portfolio section height calculation
                    const portfolioSection = document.getElementById('portfolio');
                    if (portfolioSection) {
                        portfolioSection.style.minHeight = 'auto';
                        setTimeout(() => {
                            portfolioSection.style.minHeight = '';
                        }, 10);
                    }
                }
            }, 100);
        }
    });

    // Start observing
    portfolioObserver.observe(portfolioGrid, {
        childList: true,
        subtree: false
    });
}

// Mobile-specific enhancements
function initializeMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Add touch-friendly interactions
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            let touchStartY = 0;
            let touchEndY = 0;

            item.addEventListener('touchstart', (e) => {
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            item.addEventListener('touchend', (e) => {
                touchEndY = e.changedTouches[0].screenY;
                const diff = touchStartY - touchEndY;

                // Detect swipe gestures
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        // Swipe up - maybe scroll to next section
                        const nextSection = item.closest('section').nextElementSibling;
                        if (nextSection) {
                            nextSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                } else {
                    // Regular tap - trigger hover effect briefly
                    item.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        item.style.transform = '';
                    }, 150);
                }
            }, { passive: true });
        });

        // Improve mobile scrolling performance
        document.body.style.overscrollBehavior = 'none';
        document.documentElement.style.overscrollBehavior = 'none';

        // Add pull-to-refresh functionality
        let startY = 0;
        let pullDistance = 0;
        const pullThreshold = 80;

        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (window.scrollY === 0) {
                pullDistance = e.touches[0].clientY - startY;
                if (pullDistance > 0) {
                    e.preventDefault();
                    const opacity = Math.min(pullDistance / pullThreshold, 1);
                    document.body.style.transform = `translateY(${pullDistance * 0.5}px)`;
                    // Could add a refresh indicator here
                }
            }
        }, { passive: false });

        document.addEventListener('touchend', () => {
            if (pullDistance > pullThreshold) {
                // Trigger refresh action
                location.reload();
            }
            document.body.style.transform = '';
            pullDistance = 0;
        }, { passive: true });

        // Optimize animations for mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    -webkit-transform: translateZ(0);
                    transform: translateZ(0);
                }

                .portfolio-item, .skill-card, .experience-item {
                    will-change: transform, opacity;
                }

                .hero-blob {
                    display: none; /* Reduce GPU usage on mobile */
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize viewport height fix
    initializeViewportHeightFix();
}

// Global function to ensure all elements stay visible
function ensureAllElementsVisible() {
    // Force visibility for all critical elements
    const elementsToShow = [
        '.portfolio-title',
        '.section-title',
        '.contact-header h3',
        '.skill-name',
        '.experience-title',
        '.about-intro',
        '.portfolio-item',
        '.skill-card',
        '.contact-info',
        '.contact-form',
        '.experience-item'
    ];

    elementsToShow.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.transform = 'none';
        });
    });
}

// Call this function periodically to ensure visibility
setInterval(ensureAllElementsVisible, 1000);

// Cleanup observer on page unload
window.addEventListener('beforeunload', () => {
    if (portfolioObserver) {
        portfolioObserver.disconnect();
    }
});

// Removed scroll handler for contact visibility - contact section should remain visible once loaded