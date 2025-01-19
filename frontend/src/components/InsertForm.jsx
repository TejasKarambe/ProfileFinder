import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix marker icons for Leaflet (Leaflet icons are not bundled by default)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ onLocationSelect }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect({ latitude: lat, longitude: lng });
    },
  });
  return null;
}

export default function InsertForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleLocationSelect = (coords) => {
    setFormData({ ...formData, latitude: coords.latitude, longitude: coords.longitude });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("photo", formData.photo);

    axios.post("http://localhost:5000/api/locations", data)
      .then(() => alert("Location added successfully"))
      .catch((err) => console.error("Error adding location:", err));
  };

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Add Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <div className="w-full h-64 border rounded">
          <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[formData.latitude || 51.505, formData.longitude || -0.09]} />
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </MapContainer>
        </div>
        <input
          type="file"
          name="photo"
          className="w-full p-2 border rounded"
          onChange={handleFileChange}
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          Add Location
        </button>
      </form>
      {formData.latitude && formData.longitude && (
        <p className="mt-4">
          Selected Coordinates: Latitude: {formData.latitude}, Longitude: {formData.longitude}
        </p>
      )}
    </div>
  );
}
