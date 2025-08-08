// Global variables
let allProducts = [];
let filteredProducts = [];
let categories = [];

// DOM elements
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const productsContainer = document.getElementById('productsContainer');
const productsGrid = document.getElementById('productsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const retryBtn = document.getElementById('retryBtn');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);
    retryBtn.addEventListener('click', loadProducts);
    closeModal.addEventListener('click', closeProductModal);
    
    // Close modal when clicking outside
    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !productModal.classList.contains('hidden')) {
            closeProductModal();
        }
    });
}

// Load products from DummyJSON API
async function loadProducts() {
    showLoading();
    hideError();
    
    try {
        const response = await fetch('https://dummyjson.com/products');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        allProducts = data.products; // DummyJSON returns { products: [...] }
        filteredProducts = [...allProducts];
        
        // Extract unique categories
        categories = [...new Set(allProducts.map(product => product.category))];
        
        // Populate category filter
        populateCategoryFilter();
        
        // Render products
        renderProducts();
        showProducts();
        
    } catch (error) {
        console.error('Error loading products:', error);
        showError();
    }
}

// Show loading state
function showLoading() {
    loadingElement.classList.remove('hidden');
    productsContainer.classList.add('hidden');
    errorElement.classList.add('hidden');
}

// Show products
function showProducts() {
    loadingElement.classList.add('hidden');
    productsContainer.classList.remove('hidden');
    errorElement.classList.add('hidden');
}

// Show error state
function showError() {
    loadingElement.classList.add('hidden');
    productsContainer.classList.add('hidden');
    errorElement.classList.remove('hidden');
}

// Hide error state
function hideError() {
    errorElement.classList.add('hidden');
}

// Populate category filter dropdown
function populateCategoryFilter() {
    // Clear existing options except "All Categories"
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    
    // Add category options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });
}

// Filter and sort products
function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedSort = sortFilter.value;
    
    // Filter by category
    if (selectedCategory) {
        filteredProducts = allProducts.filter(product => 
            product.category === selectedCategory
        );
    } else {
        filteredProducts = [...allProducts];
    }
    
    // Sort products
    switch (selectedSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // Keep original order
            break;
    }
    
    renderProducts();
}

// Render products grid
function renderProducts() {
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-gray-500 text-lg">No products found</div>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer';
    card.setAttribute('data-product-id', product.id);
    
    card.innerHTML = `
        <div class="relative">
            <img src="${product.images[0]}" 
                 alt="${product.title}" 
                 class="product-image w-full h-48 object-cover"
                 onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
            <div class="absolute top-2 right-2">
                <span class="category-badge">${product.category}</span>
            </div>
        </div>
        <div class="p-4">
            <h3 class="product-title font-semibold text-gray-900 mb-2 h-12">
                ${product.title}
            </h3>
            <div class="flex items-center justify-between">
                <span class="price">$${product.price.toFixed(2)}</span>
                <div class="flex items-center">
                    ${generateRatingStars(product.rating)}
                    <span class="text-sm text-gray-500 ml-1">(${product.stock} in stock)</span>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to open modal
    card.addEventListener('click', () => openProductModal(product));
    
    return card;
}

// Generate rating stars HTML
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="rating-star">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<span class="rating-star">☆</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="rating-star text-gray-300">☆</span>';
    }
    
    return starsHTML;
}

// Open product modal
function openProductModal(product) {
    // Populate modal content
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalImage').src = product.images[0];
    document.getElementById('modalImage').alt = product.title;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalRating').innerHTML = generateRatingStars(product.rating);
    document.getElementById('modalRatingText').textContent = `${product.rating}/5 (${product.stock} in stock)`;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalDescription').textContent = product.description;
    
    // Show modal with animation
    productModal.classList.remove('hidden');
    productModal.classList.add('modal-backdrop');
    
    // Add animation class
    const modalContent = productModal.querySelector('.bg-white');
    modalContent.classList.add('modal-enter');
    
    // Trigger animation
    setTimeout(() => {
        modalContent.classList.remove('modal-enter');
        modalContent.classList.add('modal-enter-active');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
    const modalContent = productModal.querySelector('.bg-white');
    
    // Remove animation classes
    modalContent.classList.remove('modal-enter-active');
    modalContent.classList.add('modal-enter');
    
    // Hide modal after animation
    setTimeout(() => {
        productModal.classList.add('hidden');
        productModal.classList.remove('modal-backdrop');
        modalContent.classList.remove('modal-enter');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }, 300);
}

// Utility function to format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
    }
}, true); 