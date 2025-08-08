// DOM Elements
const popupGate = document.getElementById('popupGate');
const mainContent = document.getElementById('mainContent');
const gateForm = document.getElementById('gateForm');
const downloadModal = document.getElementById('downloadModal');
const downloadForm = document.getElementById('downloadForm');
const bookCallModal = document.getElementById('bookCallModal');
const bookCallForm = document.getElementById('bookCallForm');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const testimonialsSlider = document.querySelector('.testimonials-slider');
const dots = document.querySelectorAll('.dot');
const testimonials = document.querySelectorAll('.testimonial');
const progressBars = document.querySelectorAll('.testimonial-progress-bar');

// Popup Gate Functionality
function showMainContent() {
    popupGate.style.display = 'none';
    mainContent.style.display = 'block';
    document.body.style.overflow = 'auto';
}

// Gate Form Submission
gateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(gateForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Gate form submitted:', data);
    
    // Show success message and transition to main content
    const submitBtn = gateForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Access Granted';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showMainContent();
        // Reset form
        gateForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Download Modal Functions
function openDownloadForm() {
    downloadModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeDownloadForm() {
    downloadModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Book Call Modal Functions
function openBookCallForm() {
    bookCallModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeBookCallForm() {
    bookCallModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Download Form Submission
downloadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(downloadForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Download form submitted:', data);
    
    // Show success message
    const submitBtn = downloadForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Download Started';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeDownloadForm();
        // Reset form
        downloadForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success notification
        showNotification('Investment guide downloaded successfully!', 'success');
    }, 2000);
});

// Close modal when clicking outside
downloadModal.addEventListener('click', function(e) {
    if (e.target === downloadModal) {
        closeDownloadForm();
    }
});

bookCallModal.addEventListener('click', function(e) {
    if (e.target === bookCallModal) {
        closeBookCallForm();
    }
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Testimonials Slider with Cool Animations
let currentSlide = 0;
let isTransitioning = false;
let autoAdvanceInterval;

function showSlide(index) {
    if (isTransitioning || index === currentSlide) return;
    
    isTransitioning = true;
    const currentTestimonial = testimonials[currentSlide];
    const nextTestimonial = testimonials[index];
    
    // Reset all progress bars
    progressBars.forEach(bar => {
        bar.classList.remove('active');
        bar.style.width = '0%';
    });
    
    // Update dots immediately
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    // Simple fade transition instead of complex slide animations
    currentTestimonial.style.opacity = '0';
    currentTestimonial.classList.remove('active');
    
    setTimeout(() => {
        // Reset all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.style.opacity = '0';
        });
        
        // Show next testimonial
        nextTestimonial.classList.add('active');
        nextTestimonial.style.opacity = '1';
        
        currentSlide = index;
        
        // Start progress bar for new testimonial
        const progressBar = nextTestimonial.querySelector('.testimonial-progress-bar');
        if (progressBar) {
            setTimeout(() => {
                progressBar.classList.add('active');
            }, 50);
        }
        
        // Allow next transition after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }, 200);
}

// Ensure proper looping by handling edge cases
function nextSlide() {
    const nextIndex = (currentSlide + 1) % testimonials.length;
    showSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1;
    showSlide(prevIndex);
}

// Dot navigation with enhanced interaction
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (!isTransitioning) {
            // Reset auto-advance timer
            resetAutoAdvance();
            showSlide(index);
        }
    });
    
    // Add hover effect for better UX
    dot.addEventListener('mouseenter', () => {
        if (!dot.classList.contains('active')) {
            dot.style.transform = 'scale(1.1)';
        }
    });
    
    dot.addEventListener('mouseleave', () => {
        if (!dot.classList.contains('active')) {
            dot.style.transform = 'scale(1)';
        }
    });
});

// Auto-advance functionality with progress indication
function startAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
    }
    autoAdvanceInterval = setInterval(() => {
        if (!isTransitioning) {
            nextSlide();
        }
    }, 5000); // Reduced to 5 seconds for better engagement
}

function resetAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
        startAutoAdvance();
    }
}

// Initialize auto-advance
startAutoAdvance();

// Pause auto-advance on hover
testimonialsSlider.addEventListener('mouseenter', () => {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
    }
});

testimonialsSlider.addEventListener('mouseleave', () => {
    startAutoAdvance();
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

testimonialsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold && !isTransitioning) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
        resetAutoAdvance();
    }
}

// Scroll-based animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.step, .metric, .testimonial');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Add animation class to CSS
const style = document.createElement('style');
style.textContent = `
    .step, .metric, .testimonial {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .step.animate, .metric.animate, .testimonial.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 1rem;
        border-top: 1px solid rgba(52, 152, 219, 0.1);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            padding: 1rem 1.5rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-success {
            border-left: 4px solid #27AE60;
        }
        
        .notification-success i {
            color: #27AE60;
        }
        
        .notification-info {
            border-left: 4px solid #3498DB;
        }
        
        .notification-info i {
            color: #3498DB;
        }
    `;
    document.head.appendChild(notificationStyle);
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Event Listeners
window.addEventListener('scroll', () => {
    animateOnScroll();
    handleNavbarScroll();
});

window.addEventListener('load', () => {
    animateOnScroll();
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            if (!input.checked) {
                isValid = false;
                input.style.borderColor = '#E74C3C';
            } else {
                input.style.borderColor = '#E8F4FD';
            }
        } else {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#E74C3C';
            } else {
                input.style.borderColor = '#E8F4FD';
            }
        }
    });
    
    return isValid;
}

// Book Call Form Submission
bookCallForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm(bookCallForm)) {
        showNotification('Please fill in all required fields.', 'info');
        return;
    }
    
    // Get form data
    const formData = new FormData(bookCallForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Book call form submitted:', data);
    
    // Show success message
    const submitBtn = bookCallForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Booking Confirmed';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeBookCallForm();
        // Reset form
        bookCallForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success notification
        showNotification('Your consultation has been booked! We\'ll contact you soon.', 'success');
    }, 2000);
});

// Add form validation to gate and download forms only
[gateForm, downloadForm].forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            showNotification('Please fill in all required fields.', 'info');
        }
    });
});

// Initialize testimonials slider
if (testimonials.length > 0) {
    showSlide(0);
}

// Add keyboard navigation for better accessibility
document.addEventListener('keydown', (e) => {
    if (!isTransitioning) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoAdvance();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoAdvance();
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    animateOnScroll();
    handleNavbarScroll();
}, 100));

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Show popup gate on page load
    popupGate.style.display = 'flex';
    mainContent.style.display = 'none';
    document.body.style.overflow = 'hidden';
    
    // Add loading animation
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .loading.hidden {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(loadingStyle);
    
    // Remove loading screen after page loads
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => loading.remove(), 500);
        }
    }, 1000);
    
    // Error handling for testimonials slider
    if (testimonials.length > 0) {
        try {
            showSlide(0);
        } catch (error) {
            console.warn('Testimonials slider initialization failed:', error);
            // Fallback: show first testimonial without animation
            testimonials.forEach((testimonial, index) => {
                testimonial.style.opacity = index === 0 ? '1' : '0';
                testimonial.classList.toggle('active', index === 0);
            });
        }
    }
}); 