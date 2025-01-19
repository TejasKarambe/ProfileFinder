import express from 'express';
import multer from 'multer';
import Location from '../models/Location.js';

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
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
        const photoUrl = `/uploads/${req.file.filename}`;
        const newLocation = new Location({ name, description, location, latitude, longitude, photoUrl });
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create location', error: err.message });
    }
});

// Get all locations
app.get("/api/locations/:id", async (req, res) => {
    try {
      const locationId = req.params.id; // Get the ID from the URL
  
      // Query the database for the location by its ObjectId
      const location = await Location.findById(locationId);
  
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
  
      // Send back the location data
      res.json(location);
    } catch (error) {
      console.error("Error fetching location:", error);
      res.status(500).json({ error: "Internal Server Error" });
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
        if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });

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
        if (!deletedLocation) return res.status(404).json({ message: 'Location not found' });

        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete location', error: err.message });
    }
});

export default router;