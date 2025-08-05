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
    // Determine current page location to set correct relative paths
    const currentPath = window.location.pathname;
    let basePath = '';
    
    // Determine the base path based on current location
    if (currentPath.includes('/auth/')) {
      basePath = '../';
    } else if (currentPath.includes('/shopping/')) {
      basePath = '../';
    } else if (currentPath.includes('/categories/')) {
      basePath = '../';
    } else if (currentPath.includes('/admin/')) {
      basePath = '../';
    } else if (currentPath.includes('/core/')) {
      basePath = '../';
    } else {
      // If we're in the root Public directory
      basePath = '';
    }

    // Update all logo elements
    const logos = document.querySelectorAll('.logo, .brand-logo');
    logos.forEach(logo => {
      if (logo.textContent.toLowerCase().includes('lava') || logo.textContent.toLowerCase().includes('logo')) {
        logo.textContent = 'Lava';
        logo.className = 'brand-logo';
        logo.href = basePath + 'core/index.html';
      }
    });

    // Update navigation links to ensure proper connectivity
    const navLinks = {
      'Home': basePath + 'core/index.html',
      'New Arrivals': basePath + 'categories/newAriviales.html',
      'Women': basePath + 'categories/woman.html',
      'Men': basePath + 'categories/men.html',
      'Accessories': basePath + 'categories/accesiore.html',
      'Beauty': basePath + 'categories/beauty.html',
      'Electronics': basePath + 'categories/electronics.html',
      'Home & Living': basePath + 'categories/home&living.html',
      'Sale': basePath + 'categories/sale.html'
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

    // Update shopping-related links (cart, wishlist, orders)
    const shoppingLinks = {
      'cart': basePath + 'shopping/cart.html',
      'wishlist': basePath + 'shopping/wishlist.html',
      'orders': basePath + 'shopping/orders.html',
      'checkout': basePath + 'shopping/checkout.html',
      'product': basePath + 'shopping/product.html'
    };

    // Update shopping navigation elements
    Object.entries(shoppingLinks).forEach(([key, href]) => {
      const links = document.querySelectorAll(`a[href*="${key}"]`);
      links.forEach(link => {
        if (link.href.includes(key)) {
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
    // Determine base path for auth links
    const currentPath = window.location.pathname;
    let basePath = '';
    
    if (currentPath.includes('/auth/') || currentPath.includes('/shopping/') || 
        currentPath.includes('/categories/') || currentPath.includes('/admin/') || 
        currentPath.includes('/core/')) {
      basePath = '../';
    } else {
      basePath = '';
    }

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
        userProfileLink.href = basePath + 'auth/profile.html';
        userNameSpan.textContent = data.username.charAt(0).toUpperCase();
        userNameSpan.classList.remove('hidden');
        
        const userIcon = userProfileLink.querySelector('.ri-user-line, .ri-user-fill');
        if (userIcon) {
          userIcon.classList.remove('ri-user-line');
          userIcon.classList.add('ri-user-fill');
        }
      } else {
        userProfileLink.href = basePath + 'auth/login.html';
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