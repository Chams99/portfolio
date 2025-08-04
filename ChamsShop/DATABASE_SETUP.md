# 🗄️ MySQL Database Setup Guide

## Prerequisites

1. **Install MySQL Server** (if not already installed)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP: https://www.apachefriends.org/

2. **Install MySQL Workbench** (optional but recommended)
   - Download from: https://dev.mysql.com/downloads/workbench/

## 🚀 Quick Setup Steps

### 1. Create Database
```sql
CREATE DATABASE chamsshop;
USE chamsshop;
```

### 2. Create MySQL User (Optional but recommended)
```sql
CREATE USER 'chamsshop_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON chamsshop.* TO 'chamsshop_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Update Environment Variables
Edit the `.env` file in your project root:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root          # or chamsshop_user if you created a user
DB_PASSWORD=          # your MySQL password
DB_NAME=chamsshop
DB_PORT=3306
```

### 4. Start the Server
```bash
npm run dev
```

The server will automatically:
- ✅ Connect to MySQL database
- ✅ Create all required tables
- ✅ Initialize sample products
- ✅ Start the application

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
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
);
```

### Orders Table
```sql
CREATE TABLE orders (
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
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
```

## 🔧 Troubleshooting

### Common Issues:

1. **Connection Refused**
   - Make sure MySQL server is running
   - Check if port 3306 is available
   - Verify credentials in `.env` file

2. **Access Denied**
   - Check MySQL user permissions
   - Verify username/password in `.env`
   - Try using root user for testing

3. **Database Not Found**
   - Create the database: `CREATE DATABASE chamsshop;`
   - Check database name in `.env` file

### Commands to Check MySQL Status:

**Windows:**
```cmd
net start mysql
```

**macOS/Linux:**
```bash
sudo systemctl status mysql
# or
sudo service mysql status
```

## 🎯 Next Steps

After successful setup:
1. ✅ Database tables will be created automatically
2. ✅ Sample products will be loaded
3. ✅ You can register new users
4. ✅ You can browse and manage products
5. ✅ Orders will be stored persistently

## 📝 Notes

- All data is now **persistent** and survives server restarts
- **User sessions** are managed securely
- **Product data** is stored in MySQL
- **Orders** are tracked with full history
- **Search and filtering** work with database queries 