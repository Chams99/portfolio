const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool without database first
const pool = mysql.createPool(dbConfig);

// Create a new pool with database after it's created
let dbPool = null;

function getDbPool() {
    if (!dbPool) {
        const dbConfigWithDb = {
            ...dbConfig,
            database: process.env.DB_NAME || 'chamsshop'
        };
        dbPool = mysql.createPool(dbConfigWithDb);
    }
    return dbPool;
}

// Test database connection and create database if needed
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        
        // Check if database exists
        const dbName = process.env.DB_NAME || 'chamsshop';
        const [databases] = await connection.execute(`SHOW DATABASES LIKE '${dbName}'`);
        
        if (databases.length === 0) {
            console.log('📦 Creating database...');
            await connection.execute(`CREATE DATABASE ${dbName}`);
            console.log('Database created successfully');
        } else {
            console.log('Database exists');
        }
        
        connection.release();
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        return false;
    }
}

// Initialize database tables
async function initializeDatabase() {
    try {
        const connection = await getDbPool().getConnection();
        
        // Create users table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(255) PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create products table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS products (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                category VARCHAR(100) NOT NULL,
                image VARCHAR(500),
                stock INT DEFAULT 0,
                rating DECIMAL(3,2) DEFAULT 0,
                reviews INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create orders table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS orders (
                id VARCHAR(255) PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                items JSON NOT NULL,
                shipping_address JSON NOT NULL,
                payment_method VARCHAR(100) NOT NULL,
                total_amount DECIMAL(10,2) NOT NULL,
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Create order_items table for better normalization
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id VARCHAR(255) NOT NULL,
                product_id VARCHAR(255) NOT NULL,
                product_name VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                quantity INT NOT NULL,
                subtotal DECIMAL(10,2) NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
            )
        `);

        connection.release();
        console.log(' Database tables created successfully');
        return true;
    } catch (error) {
        console.error('Database initialization failed:', error.message);
        return false;
    }
}

module.exports = {
    pool: getDbPool,
    testConnection,
    initializeDatabase
}; 