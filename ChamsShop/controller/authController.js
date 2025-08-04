const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const dbPool = pool();

// Register new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const connection = await dbPool.getConnection();

        try {
            // Check if user already exists
            const [existingUsers] = await connection.execute(
                'SELECT * FROM users WHERE email = ? OR username = ?',
                [email, username]
            );

            if (existingUsers.length > 0) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create new user
            const userId = Date.now().toString();
            await connection.execute(
                'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
                [userId, username, email, hashedPassword]
            );

            // Set session
            req.session.userId = userId;
            req.session.username = username;

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: userId,
                    username,
                    email
                }
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Validate input - accept either email or username
        if ((!email && !username) || !password) {
            return res.status(400).json({ error: 'Email/username and password are required' });
        }

        const connection = await dbPool.getConnection();

        try {
            // Find user by email or username
            const [users] = await connection.execute(
                'SELECT * FROM users WHERE email = ? OR username = ?',
                [email || username, username || email]
            );

            if (users.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const user = users[0];

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Set session
            req.session.userId = user.id;
            req.session.username = user.username;

            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Logout user
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: 'Logout successful' });
    });
};

// Check if user is logged in
const checkLogin = async (req, res) => {
    try {
        if (req.session.userId) {
            const connection = await dbPool.getConnection();
            
            try {
                const [users] = await connection.execute(
                    'SELECT id, username, email FROM users WHERE id = ?',
                    [req.session.userId]
                );

                if (users.length > 0) {
                    const user = users[0];
                    return res.json({
                        loggedIn: true,
                        isLoggedIn: true,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    });
                }
            } finally {
                connection.release();
            }
        }
        res.json({ loggedIn: false, isLoggedIn: false });
    } catch (error) {
        console.error('Check login error:', error);
        res.json({ loggedIn: false, isLoggedIn: false });
    }
};

module.exports = {
    register,
    login,
    logout,
    checkLogin
}; 