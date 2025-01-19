import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix marker icons for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ selectedLocation, onLocationSelect }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect({ latitude: lat, longitude: lng });
    },
  });

  return selectedLocation ? (
    <Marker position={[selectedLocation.latitude, selectedLocation.longitude]} />
  ) : null;
}

export default function UpdateForm() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // State for map center
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    photo: null,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  const handleLocationChange = (e) => {
    const location = locations.find((loc) => loc._id === e.target.value);
    setSelectedLocation(location);
    setFormData({
      name: location.name,
      description: location.description,
      location: location.location,
      latitude: location.latitude,
      longitude: location.longitude,
      photo: null, // Reset the photo field
    });
    setMapCenter([location.latitude, location.longitude]); // Update map center when location is selected
  };

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
    if (formData.photo) data.append("photo", formData.photo);

    axios.put(`http://localhost:5000/api/locations/${selectedLocation._id}`, data)
      .then(() => alert("Location updated successfully"))
      .catch((err) => console.error("Error updating location:", err));
  };

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Update Location</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full p-2 border rounded"
          onChange={handleLocationChange}
          required
        >
          <option value="">Select a location</option>
          {locations.map((loc) => (
            <option key={loc._id} value={loc._id}>
              {loc.name}
            </option>
          ))}
        </select>
        {selectedLocation && (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              placeholder="Description"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              placeholder="Location"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
            <div className="w-full h-64 border rounded">
              <MapContainer
                center={mapCenter} // Use mapCenter state
                zoom={13}
                className="h-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationPicker
                  selectedLocation={formData}
                  onLocationSelect={handleLocationSelect}
                />
              </MapContainer>
            </div>
            <input
              type="file"
              name="photo"
              className="w-full p-2 border rounded"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Update Location
            </button>
          </>
        )}
      </form>
    </div>
  );
}
