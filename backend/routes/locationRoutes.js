import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Location from '../models/Location.js';

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = path.resolve('public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Create a new location
router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const { name, description, location, latitude, longitude } = req.body;

        if (!name || !description || !latitude || !longitude) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const newLocation = new Location({ name, description, location, latitude, longitude, photoUrl });
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create location', error: err.message });
    }
});

// Get all locations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch locations', error: err.message });
    }
});

// Update a location
router.put('/:id', upload.single('photo'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, location, latitude, longitude } = req.body;

        const updateData = { name, description, location, latitude, longitude };

        if (req.file) {
            updateData.photoUrl = `/uploads/${req.file.filename}`;
        }

        const updatedLocation = await Location.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(updatedLocation);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update location', error: err.message });
    }
});

// Delete a location
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLocation = await Location.findByIdAndDelete(id);
        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete location', error: err.message });
    }
});

export default router;
