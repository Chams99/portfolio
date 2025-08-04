const { pool } = require('../config/database');
const dbPool = pool();

// Sample products data for initialization
const sampleProducts = [
    {
        id: '1',
        name: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        price: 999.99,
        category: 'electronics',
        image: '/images/laptop.jpg',
        stock: 10,
        rating: 4.5,
        reviews: 25
    },
    {
        id: '2',
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        price: 699.99,
        category: 'electronics',
        image: '/images/smartphone.jpg',
        stock: 15,
        rating: 4.3,
        reviews: 18
    },
    {
        id: '3',
        name: 'Sneakers',
        description: 'Comfortable athletic shoes for daily wear',
        price: 89.99,
        category: 'men',
        image: '/images/sneakers.jpg',
        stock: 20,
        rating: 4.2,
        reviews: 12
    },
    {
        id: '4',
        name: 'Jacket',
        description: 'Stylish jacket for cold weather',
        price: 129.99,
        category: 'men',
        image: '/images/jacket.jpg',
        stock: 8,
        rating: 4.4,
        reviews: 9
    },
    {
        id: '5',
        name: 'Perfume',
        description: 'Elegant fragrance for special occasions',
        price: 79.99,
        category: 'beauty',
        image: '/images/perfume.jpg',
        stock: 12,
        rating: 4.6,
        reviews: 15
    },
    {
        id: '6',
        name: 'Skincare Set',
        description: 'Complete skincare routine products',
        price: 149.99,
        category: 'beauty',
        image: '/images/skincare.jpg',
        stock: 6,
        rating: 4.7,
        reviews: 22
    },
    {
        id: '7',
        name: 'Coffee Maker',
        description: 'Automatic coffee maker for home use',
        price: 199.99,
        category: 'home-living',
        image: '/images/coffeemaker.jpg',
        stock: 5,
        rating: 4.1,
        reviews: 8
    },
    {
        id: '8',
        name: 'Blender',
        description: 'High-speed blender for smoothies and cooking',
        price: 89.99,
        category: 'home-living',
        image: '/images/blender.jpg',
        stock: 10,
        rating: 4.3,
        reviews: 14
    },
    {
        id: '9',
        name: 'Dumbbells',
        description: 'Adjustable dumbbells for home workout',
        price: 159.99,
        category: 'accessories',
        image: '/images/dumbbell.jpg',
        stock: 7,
        rating: 4.5,
        reviews: 11
    },
    {
        id: '10',
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat for exercise',
        price: 39.99,
        category: 'accessories',
        image: '/images/yogamat.jpg',
        stock: 25,
        rating: 4.4,
        reviews: 19
    }
];

// Initialize products in database
const initializeProducts = async () => {
    try {
        const connection = await dbPool.getConnection();
        
        try {
            // Check if products exist
            const [existingProducts] = await connection.execute('SELECT COUNT(*) as count FROM products');
            
            if (existingProducts[0].count === 0) {
                // Insert sample products
                for (const product of sampleProducts) {
                    await connection.execute(
                        'INSERT INTO products (id, name, description, price, category, image, stock, rating, reviews) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [product.id, product.name, product.description, product.price, product.category, product.image, product.stock, product.rating, product.reviews]
                    );
                }
                console.log('✅ Sample products initialized in database');
            }
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('❌ Failed to initialize products:', error);
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const { category, sort, limit } = req.query;
        
        const connection = await dbPool.getConnection();
        
        try {
            let query = 'SELECT * FROM products';
            const params = [];
            
            // Filter by category
            if (category) {
                query += ' WHERE category = ?';
                params.push(category);
            }
            
            // Sort products
            if (sort) {
                switch (sort) {
                    case 'price-low':
                        query += ' ORDER BY price ASC';
                        break;
                    case 'price-high':
                        query += ' ORDER BY price DESC';
                        break;
                    case 'rating':
                        query += ' ORDER BY rating DESC';
                        break;
                    case 'newest':
                        query += ' ORDER BY created_at DESC';
                        break;
                }
            }
            
            // Limit results
            if (limit) {
                query += ' LIMIT ?';
                params.push(parseInt(limit));
            }
            
            const [products] = await connection.execute(query, params);
            
            res.json({
                products,
                total: products.length
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Failed to get products' });
    }
};

// Search products
const searchProducts = async (req, res) => {
    try {
        const { q, category, minPrice, maxPrice } = req.query;
        
        if (!q) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        
        const connection = await dbPool.getConnection();
        
        try {
            let query = 'SELECT * FROM products WHERE (name LIKE ? OR description LIKE ?)';
            const params = [`%${q}%`, `%${q}%`];
            
            // Filter by category
            if (category) {
                query += ' AND category = ?';
                params.push(category);
            }
            
            // Filter by price range
            if (minPrice) {
                query += ' AND price >= ?';
                params.push(parseFloat(minPrice));
            }
            
            if (maxPrice) {
                query += ' AND price <= ?';
                params.push(parseFloat(maxPrice));
            }
            
            const [products] = await connection.execute(query, params);
            
            res.json({
                products,
                total: products.length,
                query: q
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Search products error:', error);
        res.status(500).json({ error: 'Search failed' });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;
        
        // Validate input
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const connection = await dbPool.getConnection();
        
        try {
            const productId = Date.now().toString();
            
            await connection.execute(
                'INSERT INTO products (id, name, description, price, category, image, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [productId, name, description, parseFloat(price), category, image || '/images/default.jpg', parseInt(stock)]
            );
            
            const [newProduct] = await connection.execute(
                'SELECT * FROM products WHERE id = ?',
                [productId]
            );
            
            res.status(201).json({
                message: 'Product created successfully',
                product: newProduct[0]
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const connection = await dbPool.getConnection();
        
        try {
            // Check if product exists
            const [existingProducts] = await connection.execute(
                'SELECT * FROM products WHERE id = ?',
                [id]
            );
            
            if (existingProducts.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            
            // Build update query dynamically
            const updateFields = [];
            const updateValues = [];
            
            Object.keys(updates).forEach(key => {
                if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
                    updateFields.push(`${key} = ?`);
                    updateValues.push(updates[key]);
                }
            });
            
            if (updateFields.length === 0) {
                return res.status(400).json({ error: 'No valid fields to update' });
            }
            
            updateValues.push(id);
            
            await connection.execute(
                `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
                updateValues
            );
            
            const [updatedProduct] = await connection.execute(
                'SELECT * FROM products WHERE id = ?',
                [id]
            );
            
            res.json({
                message: 'Product updated successfully',
                product: updatedProduct[0]
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const connection = await dbPool.getConnection();
        
        try {
            // Check if product exists
            const [existingProducts] = await connection.execute(
                'SELECT * FROM products WHERE id = ?',
                [id]
            );
            
            if (existingProducts.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            
            const deletedProduct = existingProducts[0];
            
            await connection.execute(
                'DELETE FROM products WHERE id = ?',
                [id]
            );
            
            res.json({
                message: 'Product deleted successfully',
                product: deletedProduct
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

module.exports = {
    getAllProducts,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    initializeProducts
}; 