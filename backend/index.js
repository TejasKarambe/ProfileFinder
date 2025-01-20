import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import locationRoutes from './routes/locationRoutes.js';
import path from 'path';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.resolve('public'))); // Serve static files

// Routes
app.use('/api/locations', locationRoutes);

// MongoDB Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/locationsDB'; // Replace with your MongoDB URI
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err.message));

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
