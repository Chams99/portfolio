// Main JavaScript for IT Business Website

class ITBusinessWebsite {
    constructor() {
        this.content = null;
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        await this.loadContent();
        this.setupNavigation();
        this.setupContactForm();
        this.setupPortfolioFilters();
        this.setupScrollEffects();
        this.setupAnimations();
        this.updateContent();
    }

    async loadContent() {
        try {
            // Try to load from local JSON file for static hosting
            const response = await fetch('data/content.json');
            this.content = await response.json();
        } catch (error) {
            console.error('Error loading content:', error);
            // Fallback to default content if API fails
            this.content = this.getDefaultContent();
        }
    }

    getDefaultContent() {
        return {
            home: {
                hero: {
                    title: "Innovative IT Solutions for Modern Businesses",
                    subtitle: "We help businesses transform their digital presence with cutting-edge technology solutions",
                    cta: "Get Started"
                },
                features: [
                    {
                        title: "Web Development",
                        description: "Custom websites and web applications built with modern technologies",
                        icon: "computer"
                    },
                    {
                        title: "Cloud Solutions",
                        description: "Scalable cloud infrastructure and migration services",
                        icon: "cloud"
                    },
                    {
                        title: "Cybersecurity",
                        description: "Comprehensive security solutions to protect your business",
                        icon: "shield"
                    },
                    {
                        title: "IT Consulting",
                        description: "Strategic technology consulting to drive business growth",
                        icon: "bar-chart"
                    }
                ]
            }
        };
    }

    updateContent() {
        if (!this.content) return;

        // Update hero section
        if (this.content.home?.hero) {
            const hero = this.content.home.hero;
            document.getElementById('hero-title').textContent = hero.title;
            document.getElementById('hero-subtitle').textContent = hero.subtitle;
            document.getElementById('hero-cta').textContent = hero.cta;
        }

        // Update features
        if (this.content.home?.features) {
            this.renderFeatures(this.content.home.features);
        }

        // Update services
        if (this.content.services) {
            document.getElementById('services-title').textContent = this.content.services.title;
            document.getElementById('services-subtitle').textContent = this.content.services.subtitle;
            this.renderServices(this.content.services.items);
        }

        // Update about section
        if (this.content.about) {
            document.getElementById('about-title').textContent = this.content.about.title;
            document.getElementById('about-subtitle').textContent = this.content.about.subtitle;
            document.getElementById('about-story').textContent = this.content.about.story;
            document.getElementById('about-mission').textContent = this.content.about.mission;
            this.renderValues(this.content.about.values);
            this.renderTeam(this.content.about.team);
        }

        // Update portfolio
        if (this.content.portfolio) {
            document.getElementById('portfolio-title').textContent = this.content.portfolio.title;
            document.getElementById('portfolio-subtitle').textContent = this.content.portfolio.subtitle;
            this.renderPortfolio(this.content.portfolio.projects);
        }

        // Update contact
        if (this.content.contact) {
            document.getElementById('contact-title').textContent = this.content.contact.title;
            document.getElementById('contact-subtitle').textContent = this.content.contact.subtitle;
            if (this.content.contact.info) {
                document.getElementById('contact-address').textContent = this.content.contact.info.address;
                document.getElementById('contact-phone').textContent = this.content.contact.info.phone;
                document.getElementById('contact-email').textContent = this.content.contact.info.email;
                document.getElementById('contact-hours').textContent = this.content.contact.info.hours;
            }
        }
    }

    renderFeatures(features) {
        const container = document.getElementById('features-grid');
        if (!container) return;

        container.innerHTML = features.map(feature => `
            <div class="feature-card">
                <div class="feature-icon">${feature.icon}</div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `).join('');
    }

    renderServices(services) {
        const container = document.getElementById('services-grid');
        if (!container) return;

        container.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">${service.icon}</div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
                <ul class="service-features">
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    renderValues(values) {
        const container = document.getElementById('values-grid');
        if (!container) return;

        container.innerHTML = values.map(value => `
            <div class="value-card">
                <h4 class="value-title">${value.title}</h4>
                <p class="value-description">${value.description}</p>
            </div>
        `).join('');
    }

    renderTeam(team) {
        const container = document.getElementById('team-grid');
        if (!container) return;

        container.innerHTML = team.map(member => `
            <div class="team-card">
                <div class="team-image">
                    ${member.name.charAt(0)}
                </div>
                <h4 class="team-name">${member.name}</h4>
                <p class="team-position">${member.position}</p>
                <p class="team-bio">${member.bio}</p>
            </div>
        `).join('');
    }

    renderPortfolio(projects) {
        const container = document.getElementById('portfolio-grid');
        if (!container) return;

        this.portfolioProjects = projects;
        this.filterPortfolio();
    }

    filterPortfolio() {
        const container = document.getElementById('portfolio-grid');
        if (!container || !this.portfolioProjects) return;

        const filteredProjects = this.currentFilter === 'all' 
            ? this.portfolioProjects 
            : this.portfolioProjects.filter(project => project.category === this.currentFilter);

        container.innerHTML = filteredProjects.map(project => `
            <div class="portfolio-item" data-category="${project.category}">
                <div class="portfolio-image">
                    ${getIcon(project.icon || 'briefcase')}
                </div>
                <div class="portfolio-content">
                    <h3 class="portfolio-title">${project.title}</h3>
                    <p class="portfolio-description">${project.description}</p>
                    <div class="portfolio-technologies">
                        ${project.technologies.map(tech => `<span class="technology-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.getElementById('navbar');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                message: formData.get('message')
            };

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // For static hosting, we'll use a simple mailto link
                // or you can use a form service like Formspree
                const mailtoLink = `mailto:hello@itbusiness.com?subject=Contact Form: ${data.name}&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone || 'Not provided'}%0D%0ACompany: ${data.company || 'Not provided'}%0D%0A%0D%0AMessage:%0D%0A${data.message}`;
                
                window.location.href = mailtoLink;
                
                // Show success message
                this.showMessage('Thank you for your message! We will get back to you soon.', 'success');
                form.reset();
                
            } catch (error) {
                console.error('Contact form error:', error);
                this.showMessage('Sorry, there was an error. Please try again or email us directly.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#10b981';
        } else {
            messageDiv.style.backgroundColor = '#ef4444';
        }
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    setupPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Update current filter and re-render
                this.currentFilter = button.getAttribute('data-filter');
                this.filterPortfolio();
            });
        });
    }

    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    setupAnimations() {
        // Add animation classes to elements
        const animatedElements = document.querySelectorAll('.feature-card, .service-card, .value-card, .team-card, .portfolio-item');
        
        animatedElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ITBusinessWebsite();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .feature-card,
    .service-card,
    .value-card,
    .team-card,
    .portfolio-item {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Icon mapping utility
const iconMap = {
    'computer': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    'cloud': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    'shield': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    'bar-chart': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
    'smartphone': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>`,
    'trending-up': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>`,
    'shopping-cart': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    'stethoscope': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 12 0V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg>`,
    'gamepad-2': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16H14.17a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258A4 4 0 0 0 17.32 5z"/></svg>`,
    'sword': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m5.5 14.5-3 3L2 22l4.5-1.5 3-3"/><path d="m13.5 6.5 4 4"/><path d="m2 2 5 5"/><path d="m7 7 5 5"/></svg>`,
    'briefcase': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
};

function getIcon(name) {
    return iconMap[name] || iconMap['briefcase'];
} 