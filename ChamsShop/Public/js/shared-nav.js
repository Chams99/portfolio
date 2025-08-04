// Shared Navigation Component for Lava E-commerce
class SharedNavigation {
  constructor() {
    this.init();
  }

  init() {
    this.updateNavigation();
    this.setupMobileMenu();
    this.updateActivePage();
  }

  updateNavigation() {
    // Update all logo elements
    const logos = document.querySelectorAll('.logo, .brand-logo');
    logos.forEach(logo => {
      if (logo.textContent.toLowerCase().includes('lava') || logo.textContent.toLowerCase().includes('logo')) {
        logo.textContent = 'Lava';
        logo.className = 'brand-logo';
        logo.href = 'index.html';
      }
    });

    // Update navigation links to ensure proper connectivity
    const navLinks = {
      'Home': 'index.html',
      'New Arrivals': 'newAriviales.html',
      'Women': 'woman.html',
      'Men': 'men.html',
      'Accessories': 'accesiore.html',
      'Beauty': 'beauty.html',
      'Electronics': 'electronics.html',
      'Home & Living': 'home&living.html',
      'Sale': 'sale.html'
    };

    // Update navigation menu items
    Object.entries(navLinks).forEach(([text, href]) => {
      const links = document.querySelectorAll(`a[href*="${text.toLowerCase()}"]`);
      links.forEach(link => {
        if (link.textContent.trim() === text) {
          link.href = href;
        }
      });
    });
  }

  setupMobileMenu() {
    const mobileMenuButton = document.querySelector('[data-mobile-menu]');
    const mobileMenu = document.querySelector('[data-mobile-nav]');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  }

  updateActivePage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (link.href && currentPath.includes(link.href.split('/').pop())) {
        link.classList.add('active');
      }
    });
  }

  // Update cart and wishlist counts
  updateCounts() {
    // This would typically fetch from localStorage or API
    const cartCount = localStorage.getItem('cartCount') || 0;
    const wishlistCount = localStorage.getItem('wishlistCount') || 0;
    
    const cartElements = document.querySelectorAll('[data-cart-count]');
    const wishlistElements = document.querySelectorAll('[data-wishlist-count]');
    
    cartElements.forEach(el => el.textContent = cartCount);
    wishlistElements.forEach(el => el.textContent = wishlistCount);
  }

  // Check and update login status
  checkLoginStatus() {
    fetch('/api/auth/check-login', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      const userProfileLink = document.getElementById('user-profile-link');
      const userNameSpan = document.getElementById('user-name');
      
      if (data.loggedIn && data.username) {
        userProfileLink.href = 'profile.html';
        userNameSpan.textContent = data.username.charAt(0).toUpperCase();
        userNameSpan.classList.remove('hidden');
        
        const userIcon = userProfileLink.querySelector('.ri-user-line, .ri-user-fill');
        if (userIcon) {
          userIcon.classList.remove('ri-user-line');
          userIcon.classList.add('ri-user-fill');
        }
      } else {
        userProfileLink.href = 'login.html';
        userNameSpan.classList.add('hidden');
        
        const userIcon = userProfileLink.querySelector('.ri-user-fill, .ri-user-line');
        if (userIcon) {
          userIcon.classList.remove('ri-user-fill');
          userIcon.classList.add('ri-user-line');
        }
      }
    })
    .catch(error => {
      console.error('Error checking login status:', error);
    });
  }
}

// Initialize shared navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const sharedNav = new SharedNavigation();
  sharedNav.updateCounts();
  sharedNav.checkLoginStatus();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SharedNavigation;
} 