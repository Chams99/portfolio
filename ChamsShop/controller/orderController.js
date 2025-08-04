// In-memory order storage (replace with database in production)
let orders = [];

// Get all orders (admin function)
const getAllOrders = (req, res) => {
    try {
        // Check if user is admin (you can implement proper admin check)
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        res.json({
            orders: orders,
            total: orders.length
        });
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ error: 'Failed to get orders' });
    }
};

// Get user's orders
const getUserOrders = (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Please login to view orders' });
        }
        
        const userOrders = orders.filter(order => order.userId === req.session.userId);
        
        res.json({
            orders: userOrders,
            total: userOrders.length
        });
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ error: 'Failed to get user orders' });
    }
};

// Save new order
const saveOrder = (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Please login to place order' });
        }
        
        const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
        
        // Validate input
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Order items are required' });
        }
        
        if (!shippingAddress) {
            return res.status(400).json({ error: 'Shipping address is required' });
        }
        
        if (!paymentMethod) {
            return res.status(400).json({ error: 'Payment method is required' });
        }
        
        if (!totalAmount || totalAmount <= 0) {
            return res.status(400).json({ error: 'Valid total amount is required' });
        }
        
        // Create new order
        const newOrder = {
            id: Date.now().toString(),
            userId: req.session.userId,
            items: items.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity
            })),
            shippingAddress: {
                fullName: shippingAddress.fullName,
                address: shippingAddress.address,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zipCode: shippingAddress.zipCode,
                phone: shippingAddress.phone
            },
            paymentMethod: paymentMethod,
            totalAmount: parseFloat(totalAmount),
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        orders.push(newOrder);
        
        res.status(201).json({
            message: 'Order placed successfully',
            order: {
                id: newOrder.id,
                items: newOrder.items,
                totalAmount: newOrder.totalAmount,
                status: newOrder.status,
                createdAt: newOrder.createdAt
            }
        });
    } catch (error) {
        console.error('Save order error:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
};

// Update order status (admin function)
const updateOrderStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const orderIndex = orders.findIndex(order => order.id === id);
        if (orderIndex === -1) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        // Update order status
        orders[orderIndex].status = status;
        orders[orderIndex].updatedAt = new Date();
        
        res.json({
            message: 'Order status updated successfully',
            order: orders[orderIndex]
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

// Get order by ID
const getOrderById = (req, res) => {
    try {
        const { id } = req.params;
        
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Please login to view order' });
        }
        
        const order = orders.find(o => o.id === id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        // Check if user owns this order or is admin
        if (order.userId !== req.session.userId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        res.json({ order });
    } catch (error) {
        console.error('Get order by ID error:', error);
        res.status(500).json({ error: 'Failed to get order' });
    }
};

module.exports = {
    getAllOrders,
    getUserOrders,
    saveOrder,
    updateOrderStatus,
    getOrderById
}; 