// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const profileRoutes = require("./routes/profileRoutes");


// const app = express();


// // Middleware
// app.use(bodyParser.json());
// app.use(cors());


// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/profilesdb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.error("Connection error:", err));

// app.use("/api/profiles", profileRoutes);


// // Start the server
// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import locationRoutes from './routes/locationRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// Routes
app.use('/api/locations', locationRoutes);

// MongoDB Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/locationsDB'; // Replace with your MongoDB URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err.message));

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
