import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import locationRoutes from './routes/locationRoutes.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();  // Ensure .env file is loaded

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.resolve('public')));

// Routes
app.use('/api/locations', locationRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;  // Retrieve MongoDB URI from .env
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Failed to connect to MongoDB:', err.message));

// Start the Server
const PORT = process.env.PORT || 5000;  // Use environment variable for port or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
