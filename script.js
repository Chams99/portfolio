// Portfolio Script - Optimized 2025 Best Practices
// Removed all duplicate code, unused functions, and glitchy refresh issues

// Performance monitoring (development only)
if ('performance' in window && window.location.hostname === 'localhost') {
    window.addEventListener('load', () => {
        requestIdleCallback(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        });
    });
}

// Global state management
const AppState = {
    isInitialized: false,
    isMobile: window.innerWidth <= 768,
    observers: new Map(),
    timeouts: new Set()
};

// Utility functions
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    cleanup() {
        // Clear all timeouts
        AppState.timeouts.forEach(id => clearTimeout(id));
        AppState.timeouts.clear();
        
        // Disconnect all observers
        AppState.observers.forEach(observer => observer.disconnect());
        AppState.observers.clear();
    }
};

// Viewport height fix for mobile
function initializeViewport() {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', Utils.debounce(setVH, 100));
    window.addEventListener('orientationchange', Utils.debounce(setVH, 100));
}

// Typewriter effect
function initializeTypewriter() {
const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;

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

    type();
}

// Portfolio data
const projects = [
    {
        title: 'Dent - Premium Dental Care & Cosmetic Dentistry',
        description: 'A modern, responsive dental clinic website built with Next.js featuring premium dental care services including teeth whitening, Invisalign, cosmetic dentistry, and dental implants. Professional design with appointment booking system.',
        category: 'web',
        image: 'Images/optimized/white-small.webp',
        imageSrcSet: 'Images/optimized/white-small.webp 486w, Images/optimized/white-medium.webp 972w, Images/optimized/white-large.webp 1458w',
        imageFallback: 'Images/optimized/white-fallback.jpg',
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
        title: 'Sspace - Interactive Star Map',
        description: 'An interactive web-based star map that lets users explore the sky with real-time rendering. Integrates Stellarium Web Engine with NASA/JPL datasets and features a custom "My Stars" system for personal star naming.',
        category: 'web',
        image: 'Images/optimized/sspace-small.webp',
        imageSrcSet: 'Images/optimized/sspace-small.webp 486w, Images/optimized/sspace-medium.webp 972w, Images/optimized/sspace-large.webp 1458w',
        imageFallback: 'Images/optimized/sspace-fallback.jpg',
        github: 'https://github.com/Chams99/portfolio/tree/main/sspace',
        demo: 'https://chames.youssef.tn/sspace',
        features: [
            '<i data-lucide="star"></i> Interactive Star Map with Stellarium Web Engine',
            '<i data-lucide="search"></i> Star Search by Registration Codes',
            '<i data-lucide="bookmark"></i> Custom "My Stars" Personal Naming System',
            '<i data-lucide="save"></i> LocalStorage-based Star Saving',
            '<i data-lucide="camera"></i> Cinematic Zoom and Navigation',
            '<i data-lucide="globe"></i> Real-time Sky Rendering',
            '<i data-lucide="database"></i> NASA/JPL Astronomical Data Integration',
            '<i data-lucide="user"></i> Private Per-Device Star Names'
        ],
        tags: ['JavaScript', 'Stellarium Web Engine', 'NASA/JPL Data', 'LocalStorage', 'Astronomy', 'Interactive Map']
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
        image: 'Images/optimized/wallpaper-small.webp',
        imageSrcSet: 'Images/optimized/wallpaper-small.webp 486w, Images/optimized/wallpaper-medium.webp 972w, Images/optimized/wallpaper-large.webp 1458w',
        imageFallback: 'Images/optimized/wallpaper-fallback.jpg',
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

// Portfolio functionality with search and show more
function initializePortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('projectSearch');

    if (!portfolioGrid) return;

    // State management
    let currentFilter = 'all';
    let currentSearch = '';
    let currentProjects = [...projects];
    let displayedCount = 6;
    const itemsPerPage = 6;

    // Create show more button
    function createShowMoreButton() {
        const existingButton = document.querySelector('.show-more-container');
        if (existingButton) {
            existingButton.remove();
        }

        const remainingCount = currentProjects.length - displayedCount;
        if (remainingCount <= 0) return;

        const showMoreContainer = document.createElement('div');
        showMoreContainer.className = 'show-more-container';
        
        showMoreContainer.innerHTML = `
            <button class="show-more-btn" id="showMoreBtn">
                <i class="fas fa-plus"></i>
                Show More (${remainingCount} more)
            </button>
        `;

        portfolioGrid.parentNode.appendChild(showMoreContainer);

        // Add event listener to show more button
        const showMoreBtn = document.getElementById('showMoreBtn');
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                displayedCount += itemsPerPage;
                renderProjects();
            });
        }
    }

    function createPortfolioItems(projectsToShow, showAll = false) {
        portfolioGrid.innerHTML = '';

        const projectsToDisplay = showAll ? projectsToShow : projectsToShow.slice(0, displayedCount);

        projectsToDisplay.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'portfolio-item';
            item.setAttribute('data-category', project.category);
            item.style.animationDelay = `${index * 0.1}s`;
                
            item.innerHTML = `
                <div class="portfolio-item-inner">
                    <div class="portfolio-image">
                        <picture>
                            <source srcset="${project.imageSrcSet || project.image}" type="image/webp">
                            <img src="${project.imageFallback || project.image}" alt="${project.title}" loading="lazy" decoding="async">
                        </picture>
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
                
            portfolioGrid.appendChild(item);
        });
        
        // Icons will be reinitialized automatically when needed
    }

    function filterProjects() {
        let filtered = [...projects];

        // Apply category filter
        if (currentFilter !== 'all') {
            filtered = filtered.filter(project => {
                if (Array.isArray(project.category)) {
                    return project.category.includes(currentFilter);
                }
                return project.category === currentFilter;
            });
        }

        // Apply search filter
        if (currentSearch.trim()) {
            const searchTerm = currentSearch.toLowerCase().trim();
            filtered = filtered.filter(project => {
                return project.title.toLowerCase().includes(searchTerm) ||
                       project.description.toLowerCase().includes(searchTerm) ||
                       project.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            });
        }

        return filtered;
    }

    function renderProjects() {
        currentProjects = filterProjects();
        displayedCount = Math.min(displayedCount, currentProjects.length);
        createPortfolioItems(currentProjects);
        createShowMoreButton();
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', Utils.debounce((e) => {
            currentSearch = e.target.value;
            displayedCount = 6; // Reset to initial count when searching
            renderProjects();
        }, 300));
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.getAttribute('data-filter');
            displayedCount = 6; // Reset to initial count when filtering
            renderProjects();
        });
    });

    // Initial load
    renderProjects();
}

// Navigation functionality
let navigationInitialized = false;
function initializeNavigation() {
    if (navigationInitialized) return;
    
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    if (!navbar) return;
    
    navigationInitialized = true;
    
    // Mobile-specific navbar initialization
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Ensure navbar is visible and properly positioned on mobile
        navbar.style.transform = 'translateY(0)';
        navbar.style.webkitTransform = 'translateY(0) translateZ(0)';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.zIndex = '1000';
    }

        // Force mobile menu to be hidden on initialization
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.transform = 'translateX(100%)';
        mobileMenu.style.pointerEvents = 'none';
        
            // Check for duplicate close buttons and remove them
            const closeButtons = document.querySelectorAll('.mobile-close');
            if (closeButtons.length > 1) {
                for (let i = 1; i < closeButtons.length; i++) {
                    closeButtons[i].remove();
                }
            }
    }
    
    if (mobileOverlay) {
        mobileOverlay.classList.remove('active');
        mobileOverlay.style.display = 'none';
        mobileOverlay.style.opacity = '0';
        mobileOverlay.style.visibility = 'hidden';
    }
    
    if (navToggle) {
        navToggle.classList.remove('active');
        // Ensure hamburger button is visible by default
        navToggle.style.opacity = '1';
        navToggle.style.visibility = 'visible';
        navToggle.style.pointerEvents = 'auto';
    }
    
    // Reset body overflow and remove any mobile menu classes
    document.body.style.overflow = '';
    document.body.classList.remove('mobile-menu-open');
    document.documentElement.classList.remove('mobile-menu-open');

    let lastScrollY = window.scrollY;

    // Navbar scroll behavior - Enhanced for mobile
    const updateNavbar = Utils.throttle(() => {
        const scrollY = window.scrollY;
        const isMobile = window.innerWidth <= 768;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const scrollDelta = scrollY - lastScrollY;
        
        // On mobile, always keep navbar visible for better UX
        if (isMobile) {
            // On mobile, only hide navbar when scrolling down fast and far
            if (scrollDelta > 10 && scrollY > 300) {
                navbar.style.transform = 'translateY(-100%)';
            } else if (scrollDelta < -5 || scrollY < 150) {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            // Desktop behavior - more aggressive hiding
            if (scrollDelta > 5 && scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else if (scrollDelta < -5 || scrollY < 100) {
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScrollY = scrollY;
    }, 10);

    window.addEventListener('scroll', updateNavbar, { passive: true });
    
    // Handle window resize and orientation changes for mobile
    const handleResize = Utils.throttle(() => {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Ensure navbar is visible on mobile after resize
            navbar.style.transform = 'translateY(0)';
            // Force hardware acceleration
            navbar.style.webkitTransform = 'translateZ(0)';
            navbar.style.transform = 'translateZ(0)';
        }
    }, 100);
    
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    
    // Additional mobile-specific event listeners
    if (isMobile) {
        // Ensure navbar is visible when page becomes visible (e.g., after switching tabs)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                navbar.style.transform = 'translateY(0)';
                navbar.style.webkitTransform = 'translateY(0) translateZ(0)';
            }
        });
        
        // Handle touch events to ensure navbar stays responsive
        navbar.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }

        // Mobile menu functionality with spam protection
        let isMenuTransitioning = false;
        let lastToggleTime = 0;
        
        function toggleMobileMenu(e) {
            // Prevent event bubbling
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            // Prevent rapid toggling during transitions
            if (isMenuTransitioning) {
                return;
            }
            
            // Spam protection - debounce time
            const now = Date.now();
            if (now - lastToggleTime < 200) {
                return;
            }
            lastToggleTime = now;
            
            if (!mobileMenu) {
                return;
            }
            
            const isActive = mobileMenu.classList.contains('active');
            
            // Set transition flag
            isMenuTransitioning = true;
            
            // Clear transition flag after animation
            setTimeout(() => {
                isMenuTransitioning = false;
            }, 300);
            
            // Toggle menu
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

    function openMobileMenu() {
        // Prevent multiple rapid toggles
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            return;
        }
        
        // Transition flag is set in toggleMobileMenu
        
        if (mobileMenu) {
            mobileMenu.style.display = 'flex';
            mobileMenu.classList.add('active');
            mobileMenu.style.opacity = '1';
            mobileMenu.style.visibility = 'visible';
            mobileMenu.style.transform = 'translateX(0)';
            mobileMenu.style.pointerEvents = 'auto';
        }
        if (mobileOverlay) {
            mobileOverlay.style.display = 'block';
            mobileOverlay.classList.add('active');
            mobileOverlay.style.opacity = '1';
            mobileOverlay.style.visibility = 'visible';
        }
        if (navToggle) {
            navToggle.classList.add('active');
            // Keep hamburger button visible as close button
            navToggle.style.opacity = '1';
            navToggle.style.visibility = 'visible';
            navToggle.style.pointerEvents = 'auto';
        }
        
        // Prevent body scroll completely using CSS classes
        document.body.classList.add('mobile-menu-open');
        document.documentElement.classList.add('mobile-menu-open');
        
        // Transition flag is cleared in toggleMobileMenu
    }

    function closeMobileMenu() {
        // Prevent multiple rapid toggles
        if (mobileMenu && !mobileMenu.classList.contains('active')) {
                return;
            }

        // Transition flag is set in toggleMobileMenu
        
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenu.style.opacity = '0';
            mobileMenu.style.visibility = 'hidden';
            mobileMenu.style.transform = 'translateX(100%)';
            mobileMenu.style.pointerEvents = 'none';
                setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        }
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
            mobileOverlay.style.opacity = '0';
            mobileOverlay.style.visibility = 'hidden';
            setTimeout(() => {
                mobileOverlay.style.display = 'none';
            }, 300);
        }
        if (navToggle) {
            navToggle.classList.remove('active');
            // Keep hamburger button visible and functional
            navToggle.style.opacity = '1';
            navToggle.style.visibility = 'visible';
            navToggle.style.pointerEvents = 'auto';
        }
        
        // Restore body scroll
        document.body.classList.remove('mobile-menu-open');
        document.documentElement.classList.remove('mobile-menu-open');
        
        // Transition flag is cleared in toggleMobileMenu
    }

    // Event listeners - prevent duplicates
        if (navToggle && !navToggle.hasAttribute('data-listener-added')) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu(e);
            });
            navToggle.addEventListener('touchstart', (e) => {
                // Only prevent default if not already in progress
                if (e.cancelable) {
                    e.preventDefault();
                }
                e.stopPropagation();
                toggleMobileMenu(e);
            }, { passive: false });
            
            // Add touch end event for better mobile support
            navToggle.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });
            navToggle.setAttribute('data-listener-added', 'true');
        }
    
    // Internal close button is hidden, using animated hamburger instead
    
    if (mobileOverlay && !mobileOverlay.hasAttribute('data-listener-added')) {
        mobileOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
        mobileOverlay.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        }, { passive: false });
        mobileOverlay.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
        mobileOverlay.setAttribute('data-listener-added', 'true');
    }
    
    // Prevent scrolling on mobile menu itself
    if (mobileMenu && !mobileMenu.hasAttribute('data-listener-added')) {
        mobileMenu.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
        mobileMenu.setAttribute('data-listener-added', 'true');
    }
    
    // Close mobile menu when clicking outside (but not on the hamburger button)
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
                e.preventDefault();
                e.stopPropagation();
            closeMobileMenu();
            }
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Check if menu is open and close it first
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        closeMobileMenu();
                        // Wait for menu to close, then scroll
                    setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                        }, 350); // Wait for menu close animation
                    } else {
                        // Menu is not open, scroll immediately
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        });
    });

    // Active section highlighting
    const updateActiveSection = Utils.throttle(() => {
        const scrollPos = window.scrollY + 120;
        
        if (scrollPos < 300) {
            setActiveSection('hero');
            return;
        }

        const sections = document.querySelectorAll('section[id]');
        for (const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop - 50 && scrollPos < sectionTop + sectionHeight - 50) {
                setActiveSection(sectionId);
                return;
            }
                    }
                }, 100);

    function setActiveSection(sectionId) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('data-section') === sectionId;
            link.classList.toggle('active', isActive);
        });
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
}

// Scroll up button - Simple and clean
function initializeScrollUpButton() {
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    if (!scrollUpBtn) return;

    // Show button when user scrolls down 300px
    const toggleButton = Utils.throttle(() => {
        if (window.scrollY > 300) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    }, 100);

    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners
    window.addEventListener('scroll', toggleButton, { passive: true });
    scrollUpBtn.addEventListener('click', scrollToTop);

    // Initial check
    toggleButton();
}

// Contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    let canSubmit = true;

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
                alert('Message sent successfully!');
                contactForm.reset();
                
                canSubmit = false;
                submitBtn.innerHTML = '<i class="fas fa-clock"></i> Wait 5s...';
                
                const timeoutId = setTimeout(() => {
                    canSubmit = true;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 5000);
                AppState.timeouts.add(timeoutId);
            } else {
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

// Image preloading utility
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            console.log(`Preloaded: ${src}`);
            resolve(img);
        };
        img.onerror = reject;
        img.src = src;
    });
}

// Preload critical images
async function preloadCriticalImages() {
    const criticalImages = [
        'Images/optimized/chams-large.webp',
        'Images/optimized/energy-large.webp',
        'Images/optimized/Fitness-large.webp'
    ];
    
    try {
        await Promise.all(criticalImages.map(preloadImage));
    } catch (error) {
        console.warn('Some images failed to preload:', error);
    }
}

// Enhanced lazy loading with intersection observer
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Lucide icons - Prevent multiple initializations
let lucideInitialized = false;
function initializeLucideIcons() {
    if (lucideInitialized) return;
    
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        try {
            lucide.createIcons();
            lucideInitialized = true;
            console.log('Lucide icons initialized successfully');
        } catch (error) {
            console.warn('Error initializing Lucide icons:', error);
        }
    } else {
        // If lucide is not available yet, try again after a short delay
        setTimeout(() => {
            if (!lucideInitialized && typeof lucide !== 'undefined' && lucide.createIcons) {
                try {
                    lucide.createIcons();
                    lucideInitialized = true;
                    console.log('Lucide icons initialized successfully (delayed)');
                } catch (error) {
                    console.warn('Error initializing Lucide icons (delayed):', error);
                }
            }
        }, 100);
    }
}

// Skill cards animation
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.visibility = 'visible';
    });
}

// Resume download
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'cv/Chames_eddine_Dhibi_CV_2025-09-09T14-16-47.pdf';
    link.download = 'Chames_eddine_Dhibi_CV_2025.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Page refresh functionality
function refreshPage() {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.7';
    
            setTimeout(() => {
        window.location.reload(true);
    }, 300);
}

// Error handling
function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.warn('Error caught:', event.error);
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.warn('Promise rejection caught:', event.reason);
        event.preventDefault();
    });
}

// Cleanup on page unload
function setupCleanup() {
    window.addEventListener('beforeunload', () => {
        Utils.cleanup();
    });
}

// Force cache refresh for development
function forceCacheRefresh() {
    // Clear any cached data
    if ('caches' in window) {
        caches.keys().then(names => {
            names.forEach(name => {
                caches.delete(name);
            });
        });
    }
    
    // Force reload if this is a development environment
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        console.log('Development mode: Cache refresh forced at', new Date().toISOString());
        
        // Force service worker update
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => {
                    registration.update();
                });
            });
        }
    }
}

// Main initialization
function initializeApp() {
    if (AppState.isInitialized) return;
    
    forceCacheRefresh();
    setupErrorHandling();
    setupCleanup();
    initializeViewport();
    initializeTypewriter();
    initializeNavigation();
    initializePortfolio();
    animateSkillCards();
    initializeContactForm();
    initializeScrollUpButton();
    initializeLucideIcons();
    preloadCriticalImages();
    setupLazyLoading();
    
    // Mobile menu is now properly initialized above
    
    AppState.isInitialized = true;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Mobile menu initialization is handled in initializeNavigation()

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && AppState.isMobile) {
        setTimeout(initializeApp, 100);
    }
});

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (typeof setVH === 'function') {
            setVH();
        }
        initializeApp();
    }, 100);
});

// Handle page show (back/forward navigation)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        setTimeout(initializeApp, 100);
    }
});

// Global functions for HTML
window.downloadResume = downloadResume;
window.refreshPage = refreshPage;
