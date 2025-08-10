# Lava - Premium E-commerce Platform

![Lava Logo](https://img.shields.io/badge/Lava-E--commerce-000000?style=for-the-badge&logo=shopping-cart)

A modern, full-stack e-commerce platform built with Node.js, Express, MySQL, and vanilla JavaScript. Features a beautiful responsive UI with advanced shopping functionality.

## 🚀 Features

### 🛍️ **Shopping Experience**
- **Product Catalog**: Browse products across multiple categories
- **Advanced Search**: Real-time product search with filters
- **Product Categories**: Electronics, Fashion, Beauty, Home & Living, Accessories
- **Product Details**: Detailed product pages with ratings and reviews
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 🛒 **Shopping Cart & Wishlist**
- **Shopping Cart**: Add/remove items with quantity management
- **Wishlist**: Save favorite products for later
- **Cart Persistence**: Local storage for cart and wishlist data
- **Real-time Updates**: Dynamic cart and wishlist counters

### 👤 **User Authentication**
- **User Registration**: Secure user registration with validation
- **User Login**: Email/username login with password hashing
- **Session Management**: Express sessions for user state
- **Profile Management**: User profile and order history
- **Secure Logout**: Proper session cleanup

### 💳 **Order Management**
- **Checkout Process**: Complete order flow with shipping details
- **Order History**: View past orders and their status
- **Payment Integration**: Support for multiple payment methods
- **Order Tracking**: Track order status and delivery

### 🎨 **Admin Panel**
- **Product Management**: Add, edit, and delete products
- **Inventory Control**: Stock management and updates
- **Order Management**: Process and update order status
- **User Management**: View and manage user accounts

### 🔍 **Advanced Features**
- **Product Search**: Real-time search with category and price filters
- **Product Carousels**: Interactive product sliders
- **Rating System**: Product ratings and review display
- **Newsletter Subscription**: Email subscription functionality
- **Responsive Navigation**: Mobile-friendly navigation menu

## 🛠️ Technology Stack

### **Backend**
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MySQL**: Relational database management
- **bcryptjs**: Password hashing and security
- **express-session**: Session management
- **CORS**: Cross-origin resource sharing

### **Frontend**
- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: No framework dependencies
- **Remix Icons**: Beautiful icon library

### **Database**
- **MySQL**: Primary database
- **Connection Pooling**: Efficient database connections
- **JSON Storage**: Flexible data storage for orders

## 📁 Project Structure

```
Lava/
├── config/
│   └── database.js          # Database configuration and initialization
├── controller/
│   ├── authController.js     # User authentication logic
│   ├── orderController.js    # Order management
│   └── productController.js  # Product management
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── order.js             # Order routes
│   └── product.js           # Product routes
├── Public/
│   ├── admin/
│   │   └── admin.html       # Admin panel
│   ├── auth/
│   │   ├── login.html       # Login page
│   │   ├── profile.html     # User profile
│   │   └── register.html    # Registration page
│   ├── categories/
│   │   ├── accesiore.html   # Accessories category
│   │   ├── beauty.html      # Beauty category
│   │   ├── electronics.html # Electronics category
│   │   ├── home&living.html # Home & Living category
│   │   ├── men.html         # Men's fashion
│   │   ├── newAriviales.html # New arrivals
│   │   ├── sale.html        # Sale items
│   │   └── woman.html       # Women's fashion
│   ├── core/
│   │   ├── Images/
│   │   │   └── lava.jpg     # Hero banner image
│   │   └── index.html       # Homepage
│   ├── css/
│   │   └── style.css        # Custom styles
│   ├── js/
│   │   └── shared-nav.js    # Shared navigation
│   └── shopping/
│       ├── cart.html         # Shopping cart
│       ├── checkout.html     # Checkout page
│       ├── orders.html       # Order history
│       ├── product.html      # Product details
│       └── wishlist.html     # Wishlist
├── images/                   # Product images
├── scripts/
│   ├── add_products.sql     # Database seeding
│   └── populate_products.js # Product initialization
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager
- 
## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Black and white with amber accents
- **Typography**: Inter for body text, Pacifico for branding
- **Icons**: Remix Icons for consistent iconography
- **Responsive**: Mobile-first design approach

### Interactive Elements
- **Product Carousels**: Smooth sliding animations
- **Hover Effects**: Subtle animations on interactive elements
- **Loading States**: Skeleton loading for better UX
- **Toast Notifications**: User feedback for actions

### Navigation
- **Sticky Header**: Always accessible navigation
- **Search Bar**: Real-time product search
- **Category Menu**: Easy category navigation
- **User Menu**: Quick access to profile and cart

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **Session Management**: Secure session handling
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Proper cross-origin handling

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**
- **Flexible grid layouts**
- **Touch-friendly interactions**
- **Optimized images**
- **Readable typography on all devices**

## 🚀 Performance Features

- **Connection Pooling**: Efficient database connections
- **Static File Serving**: Optimized asset delivery
- **Lazy Loading**: Images load as needed
- **Minimal Dependencies**: Lightweight and fast

## 🧪 Testing

To test the application:

1. **Start the server**: `npm run dev`
2. **Register a new account** at `/auth/register.html`
3. **Browse products** on the homepage
4. **Add items to cart** and test checkout flow
5. **Test admin panel** at `/admin/admin.html`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **Remix Icons** for the beautiful icon library
- **Express.js** for the web framework
- **MySQL** for the database system

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common issues

---

**Built with ❤️ using modern web technologies** 
