const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// Import database configuration
const { testConnection, initializeDatabase } = require('./config/database');
const { initializeProducts } = require('./controller/productController');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Serve static files from Public directory
app.use(express.static(path.join(__dirname, 'Public')));

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

// Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'register.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'cart.html'));
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'checkout.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'profile.html'));
});

app.get('/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'orders.html'));
});

app.get('/wishlist', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'wishlist.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'admin.html'));
});

// Product category routes
app.get('/electronics', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'electronics.html'));
});

app.get('/men', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'men.html'));
});

app.get('/women', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'woman.html'));
});

app.get('/beauty', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'beauty.html'));
});

app.get('/home-living', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'home&living.html'));
});

app.get('/accessories', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'accesiore.html'));
});

app.get('/sale', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'sale.html'));
});

app.get('/new-arrivals', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'newAriviales.html'));
});

app.get('/product/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'product.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start server
async function startServer() {
    try {
        // Test database connection
        const isConnected = await testConnection();
        if (!isConnected) {
            console.error('Failed to connect to database. Please check your MySQL configuration.');
            process.exit(1);
        }

        // Initialize database tables
        await initializeDatabase();
        
        // Initialize sample products
        await initializeProducts();

        // Start server
        app.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`);
            console.log(` Visit http://localhost:${PORT} to view the application`);
            console.log(`  Database connected and initialized successfully`);
        });
    } catch (error) {
        console.error(' Server startup failed:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app; 