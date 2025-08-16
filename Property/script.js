// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // DOM Elements - with null checks
const popupGate = document.getElementById('popupGate');
const mainContent = document.getElementById('mainContent');
const gateForm = document.getElementById('gateForm');
const downloadModal = document.getElementById('downloadModal');
const downloadForm = document.getElementById('downloadForm');
const bookCallModal = document.getElementById('bookCallModal');
const bookCallForm = document.getElementById('bookCallForm');
    const portfolioModal = document.getElementById('portfolioModal');
    const investmentGuideModal = document.getElementById('investmentGuideModal');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const testimonialsSlider = document.querySelector('.testimonials-slider');
const dots = document.querySelectorAll('.dot');
const testimonials = document.querySelectorAll('.testimonial');
const progressBars = document.querySelectorAll('.testimonial-progress-bar');

    // Simple form validation
    function validateForm(form) {
        if (!form) return false;
        
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (!input.checked) {
                    isValid = false;
                    input.style.borderColor = '#e53e3e';
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            } else {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e53e3e';
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            }
        });
        
        return isValid;
    }

    // Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    padding: 1.5rem 2rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
                    border: 1px solid rgba(102, 126, 234, 0.1);
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification-content {
            display: flex;
            align-items: center;
                    gap: 0.75rem;
        }
        .notification-success {
                    border-left: 4px solid #48bb78;
        }
        .notification-success i {
                    color: #48bb78;
        }
        .notification-info {
                    border-left: 4px solid #667eea;
        }
        .notification-info i {
                    color: #667eea;
        }
    `;
            document.head.appendChild(style);
        }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Popup Gate Functionality
function showMainContent() {
    if (popupGate) popupGate.style.display = 'none';
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.5s ease';
            mainContent.style.opacity = '1';
        }, 100);
    }
    document.body.style.overflow = 'auto';
    
    // Ensure properties section is visible
    setTimeout(() => {
        const propertiesSection = document.getElementById('properties');
        const propertiesGrid = document.querySelector('.properties-grid');
        const propertyCards = document.querySelectorAll('.property-card');
        
        if (propertiesSection) {
            propertiesSection.style.display = 'block';
            propertiesSection.style.visibility = 'visible';
            propertiesSection.style.opacity = '1';
        }
        
        if (propertiesGrid) {
            propertiesGrid.style.display = 'grid';
            propertiesGrid.style.visibility = 'visible';
        }
        
        propertyCards.forEach(card => {
            card.style.display = 'block';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
        });
        
        console.log('Properties section visibility ensured');
    }, 500);
    
    // Ensure How It Works section is visible
    setTimeout(() => {
        const howItWorksSection = document.getElementById('how-it-works');
        const stepsGrid = document.querySelector('.steps');
        const stepCards = document.querySelectorAll('.step');
        
        if (howItWorksSection) {
            howItWorksSection.style.display = 'block';
            howItWorksSection.style.visibility = 'visible';
            howItWorksSection.style.opacity = '1';
        }
        
        if (stepsGrid) {
            stepsGrid.style.display = 'grid';
            stepsGrid.style.visibility = 'visible';
        }
        
        stepCards.forEach(card => {
            card.style.display = 'block';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
        });
        
        console.log('How It Works section visibility ensured');
    }, 600);
    
    // Ensure testimonials section is visible
    setTimeout(() => {
        const testimonialsSection = document.getElementById('testimonials');
        const testimonialsSlider = document.querySelector('.testimonials-slider');
        const testimonials = document.querySelectorAll('.testimonial');
        const progressBars = document.querySelectorAll('.testimonial-progress-bar');
        
        if (testimonialsSection) {
            testimonialsSection.style.display = 'block';
            testimonialsSection.style.visibility = 'visible';
            testimonialsSection.style.opacity = '1';
        }
        
        if (testimonialsSlider) {
            testimonialsSlider.style.display = 'block';
            testimonialsSlider.style.visibility = 'visible';
        }
        
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'block';
            testimonial.style.visibility = 'visible';
            testimonial.style.opacity = '1';
        });
        
        progressBars.forEach(bar => {
            bar.style.display = 'block';
            bar.style.visibility = 'visible';
            bar.style.opacity = '1';
        });
        
        console.log('Testimonials section visibility ensured');
    }, 700);
    
    // Ensure investment guide button is visible
    setTimeout(() => {
        const openGuideBtn = document.querySelector('.open-guide-btn');
        if (openGuideBtn) {
            openGuideBtn.style.display = 'flex';
            openGuideBtn.style.visibility = 'visible';
            openGuideBtn.style.opacity = '1';
            console.log('Investment guide button visibility ensured');
        } else {
            console.error('Investment guide button not found!');
        }
    }, 800);
}

    // Function to show popup gate again
    function showPopupGate() {
        if (popupGate) {
            popupGate.style.display = 'flex';
            popupGate.style.opacity = '0';
            setTimeout(() => {
                popupGate.style.transition = 'opacity 0.3s ease';
                popupGate.style.opacity = '1';
            }, 50);
        }
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        document.body.style.overflow = 'hidden';
    }

    // Prevent any closing of popup gate except through form submission
    if (popupGate) {
        popupGate.addEventListener('click', function(e) {
            // Allow clicks on form elements (inputs, checkboxes, buttons)
            if (e.target.closest('.popup-content') || e.target.closest('input') || e.target.closest('button') || e.target.closest('label')) {
                return; // Allow these clicks
            }
            // Prevent closing on any other outside click
    e.preventDefault();
            e.stopPropagation();
        });
        
        // Also prevent closing on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popupGate.style.display === 'flex') {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    // Modal Functions
    function openModal(modal) {
        if (!modal) return;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Simple animation
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.transform = 'scale(0.9)';
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.transition = 'all 0.3s ease';
                content.style.transform = 'scale(1)';
                content.style.opacity = '1';
            }, 50);
        }
    }

    function closeModal(modal) {
        if (!modal) return;
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.transform = 'scale(0.9)';
            content.style.opacity = '0';
        }
    
    setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Specific modal functions
function openDownloadForm() {
        openModal(downloadModal);
}

function closeDownloadForm() {
        closeModal(downloadModal);
}

function openBookCallForm() {
        openModal(bookCallModal);
}

function closeBookCallForm() {
        closeModal(bookCallModal);
    }

    function openPortfolioModal() {
        openModal(portfolioModal);
        initializePortfolioFilters();
    }

    function closePortfolioModal() {
        closeModal(portfolioModal);
    }

    // Portfolio Filtering
    function initializePortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                portfolioItems.forEach(item => {
                    const location = item.getAttribute('data-location');
                    if (filter === 'all' || location === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize portfolio interactions
    function initializePortfolioInteractions() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const viewDetailsBtn = item.querySelector('.btn-outline');
            const investNowBtn = item.querySelector('.btn-primary');
            
            if (viewDetailsBtn) {
                viewDetailsBtn.addEventListener('click', (e) => {
    e.preventDefault();
                    const propertyName = item.querySelector('h4')?.textContent || 'Property';
                    showNotification(`Detailed information for ${propertyName} will be sent to your email.`, 'info');
                    setTimeout(() => openDownloadForm(), 1000);
                });
            }
            
            if (investNowBtn) {
                investNowBtn.addEventListener('click', (e) => {
    e.preventDefault();
                    const propertyName = item.querySelector('h4')?.textContent || 'Property';
                    showNotification(`Investment form for ${propertyName} opened.`, 'success');
                    setTimeout(() => openBookCallForm(), 1000);
                });
            }
        });
    }

    // Form Submissions
    function handleFormSubmission(form, successMessage) {
        if (!validateForm(form)) {
        showNotification('Please fill in all required fields.', 'info');
        return;
    }
    
        const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            showNotification(successMessage, 'success');
    
    setTimeout(() => {
                form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
            }, 1500);
        }, 2000);
    }

    // Event Listeners
    if (gateForm) {
        gateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(gateForm, 'Access granted! Welcome to UK Property Investment.');
            setTimeout(() => showMainContent(), 2000);
        });
        
        // Ensure checkbox works properly
        const privacyCheckbox = document.getElementById('gatePrivacy');
        const privacyLabel = document.querySelector('label[for="gatePrivacy"]');
        
        if (privacyCheckbox && privacyLabel) {
            // Allow clicking on the label to toggle checkbox
            privacyLabel.addEventListener('click', function(e) {
                e.stopPropagation();
                privacyCheckbox.checked = !privacyCheckbox.checked;
            });
            
            // Allow clicking on the checkbox itself
            privacyCheckbox.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    if (downloadForm) {
        downloadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(downloadForm, 'Investment guide downloaded successfully! Check your email.');
            setTimeout(() => closeDownloadForm(), 3000);
        });
    }

    if (bookCallForm) {
        bookCallForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(bookCallForm, 'Consultation booked successfully! We\'ll contact you soon.');
            setTimeout(() => closeBookCallForm(), 3000);
        });
    }

    // Remove click-outside-to-close functionality for all modals
    // Users must use the close button (X) to close modals

    // Mobile Navigation
    if (navToggle) {
navToggle.addEventListener('click', function() {
            if (navMenu) {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
            }
});
    }

    if (navLinks.length > 0) {
navLinks.forEach(link => {
    link.addEventListener('click', function() {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            });
        });
    }

    // Testimonials Slider
let currentSlide = 0;
let autoAdvanceInterval;

function showSlide(index) {
        if (!testimonials.length) return;
        
        // Hide all testimonials
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = i === index ? '1' : '0';
            testimonial.classList.toggle('active', i === index);
            
            // Reset progress bars
            const progressBar = testimonial.querySelector('.testimonial-progress-bar');
            if (progressBar) {
                progressBar.style.width = '0%';
                progressBar.classList.remove('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
        
        // Start progress bar animation for current slide
        const currentTestimonial = testimonials[index];
        if (currentTestimonial) {
            const progressBar = currentTestimonial.querySelector('.testimonial-progress-bar');
            if (progressBar) {
                // Reset and start animation
                progressBar.style.width = '0%';
                progressBar.classList.remove('active');
                
                setTimeout(() => {
                    progressBar.classList.add('active');
                    progressBar.style.width = '100%';
                }, 100);
            }
        }
    }

function nextSlide() {
    const nextIndex = (currentSlide + 1) % testimonials.length;
    showSlide(nextIndex);
}

    // Initialize testimonials
    if (testimonials.length > 0) {
        showSlide(0);
        
        // Auto-advance
        autoAdvanceInterval = setInterval(nextSlide, 5000);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(autoAdvanceInterval);
                showSlide(index);
                autoAdvanceInterval = setInterval(nextSlide, 5000);
            });
        });
    }

        // Initialize page
    console.log('Initializing page...');
    
    // Show popup gate
    if (popupGate) {
        popupGate.style.display = 'flex';
    }
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    document.body.style.overflow = 'hidden';
    
    // Initialize portfolio
    initializePortfolioInteractions();
    
    // Debug: Check if properties section is visible
    const propertiesSection = document.getElementById('properties');
    const propertiesGrid = document.querySelector('.properties-grid');
    const propertyCards = document.querySelectorAll('.property-card');
    
    console.log('Properties section:', propertiesSection);
    console.log('Properties grid:', propertiesGrid);
    console.log('Property cards found:', propertyCards.length);
    
    if (propertiesSection) {
        console.log('Properties section display:', propertiesSection.style.display);
        console.log('Properties section visibility:', propertiesSection.style.visibility);
    }
    
    // Debug: Check if How It Works section is visible
    const howItWorksSection = document.getElementById('how-it-works');
    const stepsGrid = document.querySelector('.steps');
    const stepCards = document.querySelectorAll('.step');
    
    console.log('How It Works section:', howItWorksSection);
    console.log('Steps grid:', stepsGrid);
    console.log('Step cards found:', stepCards.length);
    
    if (howItWorksSection) {
        console.log('How It Works section display:', howItWorksSection.style.display);
        console.log('How It Works section visibility:', howItWorksSection.style.visibility);
    }
    
    // Debug: Check if testimonials section is visible
    const testimonialsSectionDebug = document.getElementById('testimonials');
    const testimonialsSliderDebug = document.querySelector('.testimonials-slider');
    const testimonialsDebug = document.querySelectorAll('.testimonial');
    const progressBarsDebug = document.querySelectorAll('.testimonial-progress-bar');
    
    console.log('Testimonials section:', testimonialsSectionDebug);
    console.log('Testimonials slider:', testimonialsSliderDebug);
    console.log('Testimonials found:', testimonialsDebug.length);
    console.log('Progress bars found:', progressBarsDebug.length);
    
    if (testimonialsSectionDebug) {
        console.log('Testimonials section display:', testimonialsSectionDebug.style.display);
        console.log('Testimonials section visibility:', testimonialsSectionDebug.style.visibility);
    }
    
    // Debug: Check if investment guide modal exists
    const investmentGuideModalDebug = document.getElementById('investmentGuideModal');
    console.log('Investment guide modal found on load:', investmentGuideModalDebug);
    if (investmentGuideModalDebug) {
        console.log('Investment guide modal display:', investmentGuideModalDebug.style.display);
        console.log('Investment guide modal z-index:', investmentGuideModalDebug.style.zIndex);
    }
    
    // Add mobile navigation styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
    .nav-menu.active {
            display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            border-top: 1px solid rgba(102, 126, 234, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
    document.head.appendChild(mobileStyles);
    
    console.log('Page initialized successfully!');
});

// Make functions globally available
window.openDownloadForm = function() {
    const downloadModal = document.getElementById('downloadModal');
    if (downloadModal) {
        downloadModal.style.display = 'flex';
        downloadModal.style.zIndex = '10001'; // Higher than portfolio modal
        document.body.style.overflow = 'hidden';
        
        // Reset form and ensure content is visible
        const downloadForm = document.getElementById('downloadForm');
        if (downloadForm) {
            downloadForm.reset();
            // Reset any error styling
            const inputs = downloadForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '#e2e8f0';
            });
        }
        
        // Ensure modal content is visible
        const modalContent = downloadModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }
    }
};

window.closeDownloadForm = function() {
    const downloadModal = document.getElementById('downloadModal');
    if (downloadModal) {
        downloadModal.style.display = 'none';
        downloadModal.style.zIndex = ''; // Reset z-index
        document.body.style.overflow = 'auto';
    }
};

window.openBookCallForm = function() {
    const bookCallModal = document.getElementById('bookCallModal');
    if (bookCallModal) {
        bookCallModal.style.display = 'flex';
        bookCallModal.style.zIndex = '10001'; // Higher than portfolio modal
        document.body.style.overflow = 'hidden';
        
        // Reset form and ensure content is visible
        const bookCallForm = document.getElementById('bookCallForm');
        if (bookCallForm) {
            bookCallForm.reset();
            // Reset any error styling
            const inputs = bookCallForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '#e2e8f0';
            });
        }
        
        // Ensure modal content is visible
        const modalContent = bookCallModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }
    }
};

window.closeBookCallForm = function() {
    const bookCallModal = document.getElementById('bookCallModal');
    if (bookCallModal) {
        bookCallModal.style.display = 'none';
        bookCallModal.style.zIndex = ''; // Reset z-index
        document.body.style.overflow = 'auto';
    }
};

window.openPortfolioModal = function() {
    const portfolioModal = document.getElementById('portfolioModal');
    if (portfolioModal) {
        portfolioModal.style.display = 'flex';
        portfolioModal.style.zIndex = '10000'; // Set portfolio modal z-index
        document.body.style.overflow = 'hidden';
        
        // Ensure modal content is visible
        const modalContent = portfolioModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }
        
        // Initialize portfolio filters when opening
    setTimeout(() => {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            if (filterButtons.length > 0) {
                // Reset to show all items
                filterButtons.forEach(btn => btn.classList.remove('active'));
                const allButton = document.querySelector('.filter-btn[data-filter="all"]');
                if (allButton) allButton.classList.add('active');
                
                portfolioItems.forEach(item => {
                    item.style.display = 'block';
                });
            }
        }, 100);
    }
};

window.closePortfolioModal = function() {
    const portfolioModal = document.getElementById('portfolioModal');
    if (portfolioModal) {
        portfolioModal.style.display = 'none';
        portfolioModal.style.zIndex = ''; // Reset z-index
        document.body.style.overflow = 'auto';
    }
};

// Investment Guide Modal Functions
window.openInvestmentGuide = function() {
    console.log('openInvestmentGuide function called');
    const investmentGuideModal = document.getElementById('investmentGuideModal');
    console.log('Investment guide modal found:', investmentGuideModal);
    
    if (investmentGuideModal) {
        // Ensure modal is visible
        investmentGuideModal.style.display = 'flex';
        investmentGuideModal.style.position = 'fixed';
        investmentGuideModal.style.top = '0';
        investmentGuideModal.style.left = '0';
        investmentGuideModal.style.width = '100%';
        investmentGuideModal.style.height = '100%';
        investmentGuideModal.style.zIndex = '10002';
        investmentGuideModal.style.visibility = 'visible';
        investmentGuideModal.style.opacity = '1';
        document.body.style.overflow = 'hidden';
        
        console.log('Investment guide modal opened');
        console.log('Modal display style:', investmentGuideModal.style.display);
        console.log('Modal z-index:', investmentGuideModal.style.zIndex);
        
        // Initialize calculator
        initializeCalculator();
    } else {
        console.error('Investment guide modal not found!');
    }
};

window.closeInvestmentGuide = function() {
    console.log('closeInvestmentGuide function called');
    const investmentGuideModal = document.getElementById('investmentGuideModal');
    console.log('Investment guide modal found for closing:', investmentGuideModal);
    
    if (investmentGuideModal) {
        investmentGuideModal.style.display = 'none';
        investmentGuideModal.style.zIndex = ''; // Reset z-index
        document.body.style.overflow = 'auto';
        console.log('Investment guide modal closed');
    } else {
        console.error('Investment guide modal not found for closing!');
    }
};

// Calculator functionality
function initializeCalculator() {
    const propertyValueInput = document.getElementById('propertyValue');
    const monthlyRentInput = document.getElementById('monthlyRent');
    const annualYieldElement = document.getElementById('annualYield');
    const annualIncomeElement = document.getElementById('annualIncome');
    
    function updateCalculator() {
        const propertyValue = parseFloat(propertyValueInput.value) || 0;
        const monthlyRent = parseFloat(monthlyRentInput.value) || 0;
        
        if (propertyValue > 0 && monthlyRent > 0) {
            const annualRent = monthlyRent * 12;
            const annualYield = (annualRent / propertyValue) * 100;
            
            annualYieldElement.textContent = annualYield.toFixed(1) + '%';
            annualIncomeElement.textContent = '£' + annualRent.toLocaleString();
        } else {
            annualYieldElement.textContent = '0%';
            annualIncomeElement.textContent = '£0';
        }
    }
    
    if (propertyValueInput && monthlyRentInput) {
        propertyValueInput.addEventListener('input', updateCalculator);
        monthlyRentInput.addEventListener('input', updateCalculator);
        updateCalculator(); // Initialize with default values
    }
}

// Function to reopen popup gate
window.showPopupGate = function() {
    const popupGate = document.getElementById('popupGate');
    const mainContent = document.getElementById('mainContent');
    
    if (popupGate) {
    popupGate.style.display = 'flex';
        popupGate.style.opacity = '0';
    setTimeout(() => {
            popupGate.style.transition = 'opacity 0.3s ease';
            popupGate.style.opacity = '1';
        }, 50);
    }
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    document.body.style.overflow = 'hidden';
}; 