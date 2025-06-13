import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from './config/db.js';
import User from './models/User.js';
import Order from './models/Order.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug environment variables
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'MongoDB URI is set' : 'MongoDB URI is not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'JWT Secret is set' : 'JWT Secret is not set');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));
app.use(express.json());

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Register route
app.post('/api/auth/register', async (req, res) => {
  console.log('Register request received:', req.body);
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (password will be hashed by the User model's pre-save hook)
    const user = new User({
      username,
      email,
      password, // Pass the plain password, it will be hashed by the model
    });

    await user.save();
    console.log('User registered successfully:', { username, email });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  console.log('Login request received:', req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', { email: user.email, username: user.username });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    console.log('Login successful for:', email);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Order route to save new orders
app.post('/api/orders', async (req, res) => {
    console.log('Order request received:', req.body);
    try {
        // Assuming user authentication middleware is in place and req.user contains user ID
        // const userId = req.user._id; // Uncomment if user is required for orders

        const { items, deliveryDetails, paymentMethod, totalAmount } = req.body;

        // Basic validation (can be expanded)
        if (!items || items.length === 0 || !deliveryDetails || !totalAmount) {
            return res.status(400).json({ message: 'Missing required order data' });
        }

        const newOrder = new Order({
            // user: userId, // Uncomment if user is required
            items,
            deliveryDetails,
            paymentMethod,
            totalAmount
            // orderDate is defaulted in schema
            // status is defaulted in schema
        });

        await newOrder.save();
        console.log('Order saved successfully:', newOrder);

        res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).json({ message: 'Failed to place order' });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
}); 