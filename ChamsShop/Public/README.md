# ChamsShop Public Directory Organization

This directory has been reorganized into logical folders based on component similarities and functionality.

## Folder Structure

### 📁 **auth/** - Authentication & User Management
- `login.html` - User login page
- `register.html` - User registration page  
- `profile.html` - User profile management

### 📁 **shopping/** - Shopping Experience
- `cart.html` - Shopping cart functionality
- `checkout.html` - Checkout process
- `wishlist.html` - User wishlist
- `orders.html` - Order history and management
- `product.html` - Individual product pages

### 📁 **categories/** - Product Category Pages
- `men.html` - Men's clothing and accessories
- `woman.html` - Women's clothing and accessories
- `beauty.html` - Beauty and cosmetics
- `electronics.html` - Electronic devices
- `home&living.html` - Home and living products
- `accesiore.html` - Accessories
- `newAriviales.html` - New arrivals
- `sale.html` - Sale and discounted items

### 📁 **admin/** - Administrative Functions
- `admin.html` - Admin panel for product management

### 📁 **core/** - Core Application Pages
- `index.html` - Main homepage

### 📁 **css/** - Stylesheets
- `style.css` - Main stylesheet

### 📁 **js/** - JavaScript Files
- `shared-nav.js` - Shared navigation functionality

### 📁 **Images/** - Image Assets
- Various image files for the application

## Benefits of This Organization

1. **Clear Separation of Concerns**: Each folder has a specific purpose and functionality
2. **Easier Maintenance**: Related files are grouped together
3. **Better Navigation**: Developers can quickly find relevant files
4. **Scalability**: Easy to add new pages to appropriate folders
5. **Logical Structure**: Follows common web application patterns

## File Path Updates

All internal links in HTML files have been updated to reflect the new folder structure:
- Navigation links now use relative paths (e.g., `../auth/login.html`)
- Cross-references between pages maintain proper routing
- CSS and JS file references remain unchanged

## Access Patterns

- **Homepage**: `core/index.html`
- **Authentication**: `auth/login.html`, `auth/register.html`, `auth/profile.html`
- **Shopping**: `shopping/cart.html`, `shopping/checkout.html`, etc.
- **Categories**: `categories/men.html`, `categories/woman.html`, etc.
- **Admin**: `admin/admin.html` 