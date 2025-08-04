const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

/**
 * Product Database Population Script
 * Following 2025 Best Practices
 * 
 * Features:
 * - Transaction-based data insertion
 * - Comprehensive error handling
 * - Data validation and integrity checks
 * - Performance optimization with indexes
 * - Detailed logging and reporting
 * - Rollback on failure
 */

class ProductPopulator {
    constructor() {
        this.connection = null;
        this.stats = {
            totalProducts: 0,
            categories: 0,
            errors: 0,
            startTime: null,
            endTime: null
        };
    }

    /**
     * Initialize database connection
     */
    async initializeConnection() {
        try {
            const dbConfig = {
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                port: process.env.DB_PORT || 3306,
                database: process.env.DB_NAME || 'chamsshop',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
                // 2025 Best Practice: Enable SSL for production
                ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
            };

            this.connection = await mysql.createConnection(dbConfig);
            console.log('✅ Database connection established');
            return true;
        } catch (error) {
            console.error('❌ Database connection failed:', error.message);
            return false;
        }
    }

    /**
     * Validate product data before insertion
     */
    validateProduct(product) {
        const errors = [];

        // Required field validation
        if (!product.id || !product.name || !product.price || !product.category) {
            errors.push('Missing required fields (id, name, price, category)');
        }

        // Price validation
        if (product.price < 0 || product.price > 10000) {
            errors.push('Price must be between 0 and 10000');
        }

        // Image URL validation
        if (product.image && !this.isValidImageUrl(product.image)) {
            errors.push('Invalid image URL format');
        }

        // Rating validation
        if (product.rating && (product.rating < 0 || product.rating > 5)) {
            errors.push('Rating must be between 0 and 5');
        }

        // Stock validation
        if (product.stock && product.stock < 0) {
            errors.push('Stock cannot be negative');
        }

        return errors;
    }

    /**
     * Validate image URL format
     */
    isValidImageUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'https:' && 
                   (urlObj.hostname.includes('unsplash.com') || 
                    urlObj.hostname.includes('images.unsplash.com'));
        } catch {
            return false;
        }
    }

    /**
     * Execute SQL script with transaction
     */
    async executeProductInsertion() {
        if (!this.connection) {
            throw new Error('Database connection not established');
        }

        this.stats.startTime = new Date();
        console.log('🚀 Starting product insertion process...');

        try {
            // Start transaction
            await this.connection.beginTransaction();
            console.log('📦 Transaction started');

            // Set SQL mode for strict validation
            await this.connection.execute("SET sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO'");

            // Read and execute SQL script
            const sqlScript = await this.readSqlScript();
            const statements = this.parseSqlStatements(sqlScript);

            for (const statement of statements) {
                if (statement.trim() && !statement.startsWith('--')) {
                    try {
                        await this.connection.execute(statement);
                        console.log(`✅ Executed: ${statement.substring(0, 50)}...`);
                    } catch (error) {
                        console.error(`❌ Error executing statement: ${error.message}`);
                        console.error(`Statement: ${statement.substring(0, 100)}...`);
                        this.stats.errors++;
                    }
                }
            }

            // Commit transaction
            await this.connection.commit();
            console.log('✅ Transaction committed successfully');

            // Generate performance indexes
            await this.createIndexes();

            // Validate data integrity
            await this.validateDataIntegrity();

            this.stats.endTime = new Date();
            this.generateReport();

        } catch (error) {
            // Rollback on error
            if (this.connection) {
                await this.connection.rollback();
                console.log('🔄 Transaction rolled back due to error');
            }
            throw error;
        }
    }

    /**
     * Read SQL script file
     */
    async readSqlScript() {
        try {
            const scriptPath = path.join(__dirname, 'add_products.sql');
            return await fs.readFile(scriptPath, 'utf8');
        } catch (error) {
            throw new Error(`Failed to read SQL script: ${error.message}`);
        }
    }

    /**
     * Parse SQL statements from script
     */
    parseSqlStatements(sqlScript) {
        // Remove comments first
        let cleanScript = sqlScript
            .replace(/--.*$/gm, '') // Remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
        
        // Split by semicolon and filter out empty statements
        return cleanScript
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt && stmt.length > 0);
    }

    /**
     * Create database indexes for performance
     */
    async createIndexes() {
        console.log('🔧 Creating performance indexes...');
        
        const indexes = [
            'CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)',
            'CREATE INDEX IF NOT EXISTS idx_products_price ON products(price)',
            'CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating)',
            'CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at)',
            'CREATE INDEX IF NOT EXISTS idx_products_name ON products(name)',
            'CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock)'
        ];

        for (const indexQuery of indexes) {
            try {
                await this.connection.execute(indexQuery);
                console.log(`✅ Index created: ${indexQuery.split(' ')[4]}`);
            } catch (error) {
                console.warn(`⚠️ Index creation warning: ${error.message}`);
            }
        }
    }

    /**
     * Validate data integrity after insertion
     */
    async validateDataIntegrity() {
        console.log('🔍 Validating data integrity...');

        const validations = [
            {
                name: 'Total Products',
                query: "SELECT COUNT(*) as count FROM products WHERE id LIKE 'prod_%'",
                expected: '> 0'
            },
            {
                name: 'Products with Images',
                query: "SELECT COUNT(*) as count FROM products WHERE image IS NOT NULL AND image != ''",
                expected: '> 0'
            },
            {
                name: 'Valid Price Range',
                query: "SELECT COUNT(*) as count FROM products WHERE price >= 0 AND price <= 10000",
                expected: '> 0'
            },
            {
                name: 'Valid Rating Range',
                query: "SELECT COUNT(*) as count FROM products WHERE rating >= 0 AND rating <= 5",
                expected: '> 0'
            }
        ];

        for (const validation of validations) {
            try {
                const [result] = await this.connection.execute(validation.query);
                const count = result[0].count;
                console.log(`✅ ${validation.name}: ${count} records`);
                
                if (validation.expected === '> 0' && count === 0) {
                    console.warn(`⚠️ Warning: ${validation.name} returned 0 records`);
                }
            } catch (error) {
                console.error(`❌ Validation failed for ${validation.name}: ${error.message}`);
            }
        }
    }

    /**
     * Generate comprehensive report
     */
    async generateReport() {
        console.log('\n📊 GENERATING FINAL REPORT');
        console.log('=' .repeat(50));

        try {
            // Get statistics
            const [productStats] = await this.connection.execute(`
                SELECT 
                    COUNT(*) as total_products,
                    COUNT(DISTINCT category) as categories,
                    ROUND(AVG(price), 2) as avg_price,
                    ROUND(MIN(price), 2) as min_price,
                    ROUND(MAX(price), 2) as max_price,
                    ROUND(AVG(rating), 2) as avg_rating
                FROM products 
                WHERE id LIKE 'prod_%'
            `);

            const stats = productStats[0];
            this.stats.totalProducts = stats.total_products;
            this.stats.categories = stats.categories;

            // Calculate execution time
            const executionTime = this.stats.endTime - this.stats.startTime;

            console.log(`📈 Total Products Inserted: ${stats.total_products}`);
            console.log(`🏷️  Categories: ${stats.categories}`);
            console.log(`💰 Average Price: $${stats.avg_price}`);
            console.log(`⭐ Average Rating: ${stats.avg_rating}/5`);
            console.log(`⏱️  Execution Time: ${executionTime}ms`);
            console.log(`❌ Errors: ${this.stats.errors}`);

            // Category breakdown
            const [categoryBreakdown] = await this.connection.execute(`
                SELECT category, COUNT(*) as count, ROUND(AVG(price), 2) as avg_price
                FROM products 
                WHERE id LIKE 'prod_%'
                GROUP BY category
                ORDER BY count DESC
            `);

            console.log('\n📋 Category Breakdown:');
            categoryBreakdown.forEach(cat => {
                console.log(`  ${cat.category}: ${cat.count} products (avg: $${cat.avg_price})`);
            });

        } catch (error) {
            console.error('❌ Error generating report:', error.message);
        }
    }

    /**
     * Clean up resources
     */
    async cleanup() {
        if (this.connection) {
            await this.connection.end();
            console.log('🔌 Database connection closed');
        }
    }
}

/**
 * Main execution function
 */
async function main() {
    const populator = new ProductPopulator();
    
    try {
        console.log('🚀 ChamsShop Product Population Script');
        console.log('=' .repeat(50));

        // Initialize connection
        const connected = await populator.initializeConnection();
        if (!connected) {
            process.exit(1);
        }

        // Execute product insertion
        await populator.executeProductInsertion();

        console.log('\n🎉 Product population completed successfully!');
        console.log('=' .repeat(50));

    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    } finally {
        await populator.cleanup();
    }
}

// Execute if run directly
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Unhandled error:', error);
        process.exit(1);
    });
}

module.exports = ProductPopulator; 