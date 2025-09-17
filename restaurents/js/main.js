// ===== MODERN JAVASCRIPT FOR RESTAURANT WEBSITE =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initNavigation();
    initMenuTabs();
    initSmoothScrolling();
    initBackToTop();
    initFormHandling();
    initAnimations();
    initHeaderScroll();
    initThemeToggle();
    initAdvancedAnimations();
    initLazyLoading();
    initVoiceSearch();
    initLoadingOverlay();
    initChatbot();
});

// ===== LOADING OVERLAY =====
const initLoadingOverlay = () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    if (loadingOverlay) {
        // Hide loading overlay after page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                // Remove from DOM after animation
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 500);
            }, 1000); // Show loading for at least 1 second
        });
    }
};

// ===== NAVIGATION FUNCTIONALITY =====
const initNavigation = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
};

// ===== MENU TABS FUNCTIONALITY =====
const initMenuTabs = () => {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetCategory = tab.getAttribute('data-category');

            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding category
            tab.classList.add('active');
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
};

// ===== SMOOTH SCROLLING =====
const initSmoothScrolling = () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ===== BACK TO TOP BUTTON =====
const initBackToTop = () => {
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        // Show/hide button based on scroll position
        const toggleBackToTop = () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Listen for scroll events
        window.addEventListener('scroll', toggleBackToTop);
    }
};

// ===== FORM HANDLING =====
const initFormHandling = () => {
    const reservationForm = document.getElementById('reservationForm');
    const contactForm = document.getElementById('contactForm');

    // Reservation form handling
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }

    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Set minimum date for reservation form
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
};

const handleReservationSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!validateReservationData(data)) {
        return;
    }

    // Simulate form submission
    showNotification('Reservation submitted successfully! We will contact you soon.', 'success');
    e.target.reset();
};

const handleContactSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!validateContactData(data)) {
        return;
    }

    // Simulate form submission
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    e.target.reset();
};

const validateReservationData = (data) => {
    const requiredFields = ['name', 'email', 'date', 'time', 'guests'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field.`, 'error');
            return false;
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    return true;
};

const validateContactData = (data) => {
    const requiredFields = ['name', 'email', 'message'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field.`, 'error');
            return false;
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    return true;
};

// ===== NOTIFICATION SYSTEM =====
const showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    document.body.appendChild(notification);
};

// ===== ANIMATIONS =====
const initAnimations = () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-content, .menu-item, .contact-item, .feature');
    animateElements.forEach(el => observer.observe(el));
};

// ===== HEADER SCROLL EFFECT =====
const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background based on scroll position
        if (scrollTop > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(26, 26, 46, 0.6) 0%, rgba(26, 26, 46, 0.3) 100%), rgba(26, 26, 46, 0.4)';
        } else {
            header.style.background = 'linear-gradient(135deg, rgba(26, 26, 46, 0.3) 0%, rgba(26, 26, 46, 0.1) 100%), rgba(26, 26, 46, 0.2)';
        }

        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
};

// ===== PERFORMANCE OPTIMIZATIONS =====

// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
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
};

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for menu tabs
document.addEventListener('keydown', (e) => {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const activeTab = document.querySelector('.menu-tab.active');
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIndex = Array.from(menuTabs).indexOf(activeTab);
        let newIndex;
        
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : menuTabs.length - 1;
        } else {
            newIndex = currentIndex < menuTabs.length - 1 ? currentIndex + 1 : 0;
        }
        
        menuTabs[newIndex].click();
        menuTabs[newIndex].focus();
    }
});

// Focus management for mobile menu
const handleFocusTrap = (container) => {
    const focusableElements = container.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    container.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
};

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    // JavaScript error occurred
    // You could send this to an error tracking service
});

// ===== SERVICE WORKER REGISTRATION (FOR PWA FEATURES) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                // Service Worker registered successfully
            })
            .catch((registrationError) => {
                // Service Worker registration failed
            });
    });
}

// ===== ANALYTICS (OPTIONAL) =====
const trackEvent = (eventName, eventData = {}) => {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Custom analytics
    // Event tracked: eventName, eventData
};

// Track form submissions
document.addEventListener('submit', (e) => {
    if (e.target.id === 'reservationForm') {
        trackEvent('reservation_submitted');
    } else if (e.target.id === 'contactForm') {
        trackEvent('contact_form_submitted');
    }
});

// Track menu interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-tab')) {
        trackEvent('menu_category_clicked', {
            category: e.target.getAttribute('data-category')
        });
    }
});

// ===== LAZY LOADING FOR IMAGES =====
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

// Initialize lazy loading
initLazyLoading();

// ===== THEME TOGGLE FUNCTIONALITY =====
const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Function to get system theme preference
    const getSystemTheme = () => {
        try {
            if (window.matchMedia) {
                const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');
                
                if (darkModeQuery.matches) {
                    return 'dark';
                } else if (lightModeQuery.matches) {
                    return 'light';
                } else {
                    // Check for no-preference
                    const noPreferenceQuery = window.matchMedia('(prefers-color-scheme: no-preference)');
                    if (noPreferenceQuery.matches) {
                        return 'light'; // Default to light when no preference
                    }
                }
            }
        } catch (e) {
            // System theme detection not supported
        }
        return 'light';
    };
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    let currentTheme;
    
    if (savedTheme) {
        // Use saved preference
        currentTheme = savedTheme;
    } else {
        // Detect system preference
        currentTheme = getSystemTheme();
        // Save the detected system preference
        localStorage.setItem('theme', currentTheme);
    }
    
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    if (themeIcon) {
        themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            if (themeIcon) {
                themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            // Add transition effect
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleSystemThemeChange = (e) => {
            // Only update if user hasn't manually set a preference
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Update icon
                if (themeIcon) {
                    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
            }
        };
        
        // Add listener for system theme changes
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        
        // Also listen for the older addListener method for better browser support
        if (mediaQuery.addListener) {
            mediaQuery.addListener(handleSystemThemeChange);
        }
    }
    
    // Add global function to reset theme detection (for testing)
    window.resetThemeDetection = () => {
        localStorage.removeItem('theme');
        const systemTheme = getSystemTheme();
        document.documentElement.setAttribute('data-theme', systemTheme);
        localStorage.setItem('theme', systemTheme);
        
        // Update icon
        if (themeIcon) {
            themeIcon.className = systemTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
    };
};

// ===== ADVANCED ANIMATIONS =====
const initAdvancedAnimations = () => {
    // Parallax effect for hero section
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Staggered animation for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                menuObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        menuObserver.observe(item);
    });
    
    // Floating animation for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'float 0.6s ease-in-out';
        });
        
        button.addEventListener('animationend', () => {
            button.style.animation = '';
        });
    });
};

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// ===== RIPPLE EFFECT FOR VOICE BUTTON =====
const createRippleEffect = (button) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: voiceRipple 0.6s linear;
        pointer-events: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
};

// ===== VOICE SEARCH FUNCTIONALITY =====
const initVoiceSearch = () => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        // Add voice search button to navigation
        const navControls = document.querySelector('.nav-controls');
        if (navControls) {
            const voiceButton = document.createElement('button');
            voiceButton.className = 'voice-search-btn';
            voiceButton.innerHTML = '<i class="fas fa-microphone" aria-hidden="true"></i>';
            voiceButton.setAttribute('aria-label', 'Voice search');
            voiceButton.title = 'Voice search';
            
            // Style the voice button
            voiceButton.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: var(--text-light);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition-normal);
                backdrop-filter: blur(10px) saturate(150%);
                -webkit-backdrop-filter: blur(10px) saturate(150%);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                margin-right: 0.5rem;
            `;
            
            voiceButton.addEventListener('mouseenter', () => {
                voiceButton.style.background = 'rgba(255, 255, 255, 0.2)';
                voiceButton.style.transform = 'scale(1.1)';
            });
            
            voiceButton.addEventListener('mouseleave', () => {
                voiceButton.style.background = 'rgba(255, 255, 255, 0.1)';
                voiceButton.style.transform = 'scale(1)';
            });
            
            voiceButton.addEventListener('click', () => {
                if (voiceButton.classList.contains('listening')) {
                    recognition.stop();
                    voiceButton.classList.remove('listening');
                    voiceButton.innerHTML = '<i class="fas fa-microphone" aria-hidden="true"></i>';
                    voiceButton.style.background = 'rgba(255, 255, 255, 0.1)';
                    voiceButton.style.animation = 'none';
                } else {
                    recognition.start();
                    voiceButton.classList.add('listening');
                    voiceButton.innerHTML = '<i class="fas fa-stop" aria-hidden="true"></i>';
                    voiceButton.style.background = 'var(--accent-color)';
                    voiceButton.style.animation = 'pulse 1.5s ease-in-out infinite, listeningGlow 2s ease-in-out infinite';
                    
                    // Add ripple effect
                    createRippleEffect(voiceButton);
                }
            });
            
            navControls.insertBefore(voiceButton, navControls.firstChild);
        }
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            // Voice command processed
            
            // Process voice commands
            if (transcript.includes('menu') || transcript.includes('food')) {
                document.querySelector('a[href="#menu"]')?.click();
            } else if (transcript.includes('reservation') || transcript.includes('book')) {
                document.querySelector('a[href="#reservations"]')?.click();
            } else if (transcript.includes('contact') || transcript.includes('phone')) {
                document.querySelector('a[href="#contact"]')?.click();
            } else if (transcript.includes('about') || transcript.includes('story')) {
                document.querySelector('a[href="#about"]')?.click();
            } else if (transcript.includes('home') || transcript.includes('start')) {
                document.querySelector('a[href="#home"]')?.click();
            }
            
            // Reset button
            const voiceButton = document.querySelector('.voice-search-btn');
            if (voiceButton) {
                voiceButton.classList.remove('listening');
                voiceButton.innerHTML = '<i class="fas fa-microphone" aria-hidden="true"></i>';
                voiceButton.style.background = 'rgba(255, 255, 255, 0.1)';
                voiceButton.style.animation = 'none';
            }
        };
        
        recognition.onerror = (event) => {
            // Speech recognition error occurred
            const voiceButton = document.querySelector('.voice-search-btn');
            if (voiceButton) {
                voiceButton.classList.remove('listening');
                voiceButton.innerHTML = '<i class="fas fa-microphone" aria-hidden="true"></i>';
                voiceButton.style.background = 'rgba(255, 255, 255, 0.1)';
                voiceButton.style.animation = 'none';
            }
        };
    }
};

// ===== AI CHATBOT FUNCTIONALITY =====
const initChatbot = () => {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotOptions = document.getElementById('chatbotOptions');
    const chatbotNotification = document.getElementById('chatbotNotification');

    // Toggle chatbot visibility
    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
            if (chatbotContainer.classList.contains('active')) {
                chatbotNotification.style.display = 'none';
            }
        });

        chatbotClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    }

    // Handle option button clicks
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const option = button.getAttribute('data-option');
            const buttonText = button.textContent;
            
            // Add user message
            addMessage(buttonText, 'user');
            
            // Hide options temporarily
            chatbotOptions.classList.add('hidden');
            
            // Show bot response
            setTimeout(() => {
                const response = generateAIResponse(option);
                addMessage(response, 'bot');
                
                // Show options again after response
                setTimeout(() => {
                    chatbotOptions.classList.remove('hidden');
                }, 1000);
            }, 800);
        });
    });

    // Add message to chat
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        // Add avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (sender === 'bot') {
            avatarDiv.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 18H19.75H19ZM5 14.584H5.75C5.75 14.2859 5.57345 14.016 5.30028 13.8967L5 14.584ZM19 14.584L18.6997 13.8967C18.4265 14.016 18.25 14.2859 18.25 14.584H19ZM15.75 7C15.75 7.41421 16.0858 7.75 16.5 7.75C16.9142 7.75 17.25 7.41421 17.25 7H15.75ZM6.75 7C6.75 7.41421 7.08579 7.75 7.5 7.75C7.91421 7.75 8.25 7.41421 8.25 7H6.75ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM10 22.75C10.4142 22.75 10.75 22.4142 10.75 22C10.75 21.5858 10.4142 21.25 10 21.25V22.75ZM7 4.25C3.82436 4.25 1.25 6.82436 1.25 10H2.75C2.75 7.65279 4.65279 5.75 7 5.75V4.25ZM17 5.75C19.3472 5.75 21.25 7.65279 21.25 10H22.75C22.75 6.82436 20.1756 4.25 17 4.25V5.75ZM9 21.25C8.03599 21.25 7.38843 21.2484 6.90539 21.1835C6.44393 21.1214 6.24643 21.0142 6.11612 20.8839L5.05546 21.9445C5.51093 22.4 6.07773 22.5857 6.70552 22.6701C7.31174 22.7516 8.07839 22.75 9 22.75V21.25ZM4.25 18C4.25 18.9216 4.24841 19.6883 4.32991 20.2945C4.41432 20.9223 4.59999 21.4891 5.05546 21.9445L6.11612 20.8839C5.9858 20.7536 5.87858 20.5561 5.81654 20.0946C5.75159 19.6116 5.75 18.964 5.75 18H4.25ZM18.25 18C18.25 18.964 18.2484 19.6116 18.1835 20.0946C18.1214 20.5561 18.0142 20.7536 17.8839 20.8839L18.9445 21.9445C19.4 21.4891 19.5857 20.9223 19.6701 20.2945C19.7516 19.6883 19.75 18.9216 19.75 18H18.25ZM15 22.75C15.9216 22.75 16.6883 22.7516 17.2945 22.6701C17.9223 22.5857 18.4891 22.4 18.9445 21.9445L17.8839 20.8839C17.7536 21.0142 17.5561 21.1214 17.0946 21.1835C16.6116 21.2484 15.964 21.25 15 21.25V22.75ZM7 5.75C7.2137 5.75 7.42326 5.76571 7.6277 5.79593L7.84703 4.31205C7.57021 4.27114 7.28734 4.25 7 4.25V5.75ZM12 1.25C9.68949 1.25 7.72942 2.7421 7.02709 4.81312L8.44763 5.29486C8.94981 3.81402 10.3516 2.75 12 2.75V1.25ZM7.02709 4.81312C6.84722 5.34352 6.75 5.91118 6.75 6.5H8.25C8.25 6.07715 8.3197 5.67212 8.44763 5.29486L7.02709 4.81312ZM17 4.25C16.7127 4.25 16.4298 4.27114 16.153 4.31205L16.3723 5.79593C16.5767 5.76571 16.7863 5.75 17 5.75V4.25ZM12 2.75C13.6484 2.75 15.0502 3.81402 15.5524 5.29486L16.9729 4.81312C16.2706 2.7421 14.3105 1.25 12 1.25V2.75ZM15.5524 5.29486C15.6803 5.67212 15.75 6.07715 15.75 6.5H17.25C17.25 5.91118 17.1528 5.34352 16.9729 4.81312L15.5524 5.29486ZM5.75 18V14.584H4.25V18H5.75ZM5.30028 13.8967C3.79769 13.2402 2.75 11.7416 2.75 10H1.25C1.25 12.359 2.6705 14.3846 4.69972 15.2712L5.30028 13.8967ZM18.25 14.584L18.25 18H19.75L19.75 14.584H18.25ZM21.25 10C21.25 11.7416 20.2023 13.2402 18.6997 13.8967L19.3003 15.2712C21.3295 14.3846 22.75 12.359 22.75 10H21.25ZM15.75 6.5V7H17.25V6.5H15.75ZM6.75 6.5V7H8.25V6.5H6.75ZM15 21.25H14V22.75H15V21.25ZM10 21.25H9V22.75H10V21.25Z"/>
                    <path d="M5 18H13M19 18H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        } else {
            avatarDiv.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            `;
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        contentDiv.appendChild(p);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    // AI Response Generator with engaging personality
    const generateAIResponse = (option) => {
        const responses = {
            menu: [
                "🍽️ Oh, you're going to love our menu! We have amazing dishes crafted by our talented chefs. From fresh seafood to premium steaks, every dish tells a story. Check out our full menu above - I promise you'll find something absolutely delicious!",
                "✨ Our menu is like a culinary journey! We source the finest ingredients daily and our chefs create magic in the kitchen. Browse our menu above and let me know if you have any questions about specific dishes!"
            ],
            reservation: [
                "📅 Perfect! I'd love to help you secure a table at La Cuisine. We're open Tuesday through Sunday from 5:00 PM to 10:00 PM. You can call us at (555) 123-4567 or use our convenient online reservation form above. How many guests will be joining you?",
                "🎉 Great choice! Let's get you a table at the best restaurant in town. We're open Tuesday through Sunday, 5:00 PM to 10:00 PM. Use our reservation form above or call (555) 123-4567. I can't wait to welcome you!"
            ],
            hours: [
                "🕒 We're open Tuesday through Sunday from 5:00 PM to 10:00 PM. We're closed on Mondays to give our team a well-deserved rest. Would you like to make a reservation for your visit?",
                "⏰ Our doors are open Tuesday through Sunday, 5:00 PM to 10:00 PM. We're closed Mondays but ready to serve you the rest of the week! Perfect timing for a romantic dinner or special celebration!"
            ],
            location: [
                "📍 We're conveniently located at 123 Gourmet Street in the Foodie District, NY 10001. Easy to find with plenty of parking nearby! You can also reach us by public transportation. Check our 'Contact' section above for detailed directions!",
                "🗺️ Find us at 123 Gourmet Street in the heart of the Foodie District! We're in a beautiful location with easy access and parking. Perfect for a special night out. Get detailed directions in our 'Contact' section above!"
            ],
            contact: [
                "📞 I'm here to help! You can reach us at (555) 123-4567 or email info@lacuisine.com. We also have a contact form on our website for any questions. We love hearing from our guests!",
                "💬 We'd love to hear from you! Call us at (555) 123-4567, email info@lacuisine.com, or use our contact form above. Our team is always happy to help make your dining experience perfect!"
            ],
            about: [
                "🌟 La Cuisine has been creating magical dining experiences since 2010! Our passionate chefs use the finest ingredients and innovative techniques. We believe in sustainable sourcing and supporting local farmers. Discover our full story above!",
                "✨ Welcome to our culinary world! Since 2010, we've been crafting unforgettable moments with fresh, locally-sourced ingredients and creative techniques. Every dish is made with love and passion. Learn more about our journey above!"
            ]
        };
        
        const optionResponses = responses[option] || ["I'm here to help! Choose one of the options above to get started, or explore our website sections for more information about La Cuisine."];
        return optionResponses[Math.floor(Math.random() * optionResponses.length)];
    };

    // Show notification after 5 seconds if chatbot hasn't been opened
    setTimeout(() => {
        if (!chatbotContainer.classList.contains('active')) {
            chatbotNotification.style.display = 'flex';
            chatbotNotification.textContent = '1';
        }
    }, 5000);
}; 