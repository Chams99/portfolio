// Sample wallpaper data
const wallpapers = [
    {
        id: 1,
        title: "Mountain Landscape",
        category: "nature",
        resolution: "3840x2160",
        downloads: 1250,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["mountain", "landscape", "nature", "4k"]
    },
    {
        id: 2,
        title: "Abstract Waves",
        category: "abstract",
        resolution: "2560x1440",
        downloads: 890,
        image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
        tags: ["abstract", "waves", "colorful"]
    },
    {
        id: 3,
        title: "Galaxy Stars",
        category: "space",
        resolution: "3840x2160",
        downloads: 2100,
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
        tags: ["space", "galaxy", "stars", "4k"]
    },
    {
        id: 4,
        title: "Minimal Geometric",
        category: "minimal",
        resolution: "1920x1080",
        downloads: 750,
        image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop",
        tags: ["minimal", "geometric", "clean"]
    },
    {
        id: 5,
        title: "Circuit Board",
        category: "technology",
        resolution: "2560x1440",
        downloads: 1100,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
        tags: ["technology", "circuit", "digital"]
    },
    {
        id: 6,
        title: "Wolf Portrait",
        category: "animals",
        resolution: "3840x2160",
        downloads: 1800,
        image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&h=600&fit=crop",
        tags: ["wolf", "animals", "portrait", "4k"]
    }
];

let currentFilter = 'all';
let currentCategory = 'all';
let searchQuery = '';
let displayedWallpapers = 6;

// DOM Elements
const wallpaperGrid = document.getElementById('wallpaperGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const categoryItems = document.querySelectorAll('.category-item');
const loadMoreBtn = document.getElementById('loadMore');
const modal = document.getElementById('wallpaperModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalResolution = document.getElementById('modalResolution');
const downloadBtn = document.getElementById('downloadBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const closeModal = document.querySelector('.close');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderWallpapers();
    setupEventListeners();
    setupScrollAnimations();
    setupHeaderScroll();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            displayedWallpapers = 6;
            renderWallpapers();
        });
    });

    // Category items
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            currentCategory = this.dataset.category;
            displayedWallpapers = 6;
            renderWallpapers();
            document.getElementById('wallpapers').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Load more button
    loadMoreBtn.addEventListener('click', function() {
        displayedWallpapers += 6;
        renderWallpapers();
    });

    // Modal functionality
    closeModal.addEventListener('click', closeWallpaperModal);
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeWallpaperModal();
        }
    });

    // Download button
    downloadBtn.addEventListener('click', function() {
        const wallpaperId = this.dataset.wallpaperId;
        downloadWallpaper(wallpaperId);
    });

    // Favorite button
    favoriteBtn.addEventListener('click', function() {
        const wallpaperId = this.dataset.wallpaperId;
        toggleFavorite(wallpaperId);
    });
}

// Handle search
function handleSearch() {
    searchQuery = searchInput.value.toLowerCase().trim();
    displayedWallpapers = 6;
    renderWallpapers();
}

// Filter wallpapers based on current filters
function getFilteredWallpapers() {
    let filtered = wallpapers;

    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(w => w.category === currentCategory);
    }

    // Filter by resolution/type
    if (currentFilter !== 'all') {
        if (currentFilter === '4k') {
            filtered = filtered.filter(w => w.tags.includes('4k'));
        } else if (currentFilter === 'mobile') {
            filtered = filtered.filter(w => w.resolution.includes('1080') || w.resolution.includes('1440'));
        } else if (currentFilter === 'desktop') {
            filtered = filtered.filter(w => w.resolution.includes('1920') || w.resolution.includes('2560') || w.resolution.includes('3840'));
        }
    }

    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter(w => 
            w.title.toLowerCase().includes(searchQuery) ||
            w.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
    }

    return filtered;
}

// Render wallpapers
function renderWallpapers() {
    const filtered = getFilteredWallpapers();
    const toShow = filtered.slice(0, displayedWallpapers);
    
    wallpaperGrid.innerHTML = '';
    
    toShow.forEach(wallpaper => {
        const wallpaperElement = createWallpaperElement(wallpaper);
        wallpaperGrid.appendChild(wallpaperElement);
    });
    
    // Show/hide load more button
    if (filtered.length <= displayedWallpapers) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
    
    // Show no results message
    if (filtered.length === 0) {
        wallpaperGrid.innerHTML = '<div style="text-align: center; grid-column: 1 / -1; padding: 2rem; color: #64748b;"><h3>No wallpapers found</h3><p>Try adjusting your search or filters</p></div>';
    }
}

// Create wallpaper element
function createWallpaperElement(wallpaper) {
    const div = document.createElement('div');
    div.className = 'wallpaper-item';
    div.innerHTML = `
        <div class="wallpaper-image-container">
            <img src="${wallpaper.image}" alt="${wallpaper.title}" loading="lazy">
            <div class="wallpaper-overlay">
                <button class="preview-btn" type="button">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="download-btn" type="button">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        </div>
        <div class="wallpaper-info">
            <h4>${wallpaper.title}</h4>
            <div class="wallpaper-meta">
                <span>${wallpaper.resolution}</span>
                <div class="download-count">
                    <i class="fas fa-download"></i>
                    <span>${wallpaper.downloads}</span>
                </div>
            </div>
        </div>
    `;
    
    const previewBtn = div.querySelector('.preview-btn');
    const downloadBtn = div.querySelector('.download-btn');
    
    // Add click event listeners
    previewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openWallpaperModal(wallpaper);
    });
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        downloadWallpaper(wallpaper.id);
    });
    
    return div;
}

// Open wallpaper modal
function openWallpaperModal(wallpaper) {
    // Set modal content
    modalImage.src = wallpaper.image;
    modalTitle.textContent = wallpaper.title;
    modalResolution.textContent = wallpaper.resolution;
    
    // Set wallpaper ID for download and favorite buttons
    downloadBtn.dataset.wallpaperId = wallpaper.id;
    favoriteBtn.dataset.wallpaperId = wallpaper.id;
    
    // Check if wallpaper is favorited
    const isFavorited = localStorage.getItem(`favorite_${wallpaper.id}`) === 'true';
    favoriteBtn.innerHTML = isFavorited ? 
        '<i class="fas fa-heart"></i> Favorited' : 
        '<i class="far fa-heart"></i> Favorite';
    
    // Show modal with animation
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    document.body.style.overflow = 'hidden';
    
    // Trigger animation
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.classList.add('show');
    });
}

// Close wallpaper modal
function closeWallpaperModal() {
    // Hide modal with animation
    modal.style.opacity = '0';
    modal.classList.remove('show');
    
    // Wait for animation to complete
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Download wallpaper with animation
async function downloadWallpaper(wallpaperId) {
    const wallpaper = wallpapers.find(w => w.id === wallpaperId);
    if (!wallpaper) return;

    try {
        // Show loading state
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        downloadBtn.disabled = true;

        // Fetch the image
        const response = await fetch(wallpaper.image);
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${wallpaper.title.toLowerCase().replace(/\s+/g, '-')}-${wallpaper.resolution}.jpg`;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Update download count
        wallpaper.downloads++;
        
        // Show success message
        showNotification('Wallpaper downloaded successfully!', 'success');
    } catch (error) {
        console.error('Download failed:', error);
        showNotification('Failed to download wallpaper. Please try again.', 'error');
    } finally {
        // Reset button state
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
        downloadBtn.disabled = false;
    }
}

// Toggle favorite with animation
function toggleFavorite(wallpaperId) {
    const isFavorited = localStorage.getItem(`favorite_${wallpaperId}`) === 'true';
    const newState = !isFavorited;
    
    localStorage.setItem(`favorite_${wallpaperId}`, newState);
    
    // Update button appearance
    favoriteBtn.innerHTML = newState ? 
        '<i class="fas fa-heart"></i> Favorited' : 
        '<i class="far fa-heart"></i> Favorite';
    
    // Show notification
    showNotification(
        newState ? 'Added to favorites!' : 'Removed from favorites!',
        newState ? 'success' : 'info'
    );
}

// Show notification with animation
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Setup scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.category-item, .wallpaper-item').forEach(el => {
        observer.observe(el);
    });
}

// Setup header scroll effect
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}