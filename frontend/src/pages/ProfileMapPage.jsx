import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import Navbar from "../components/Navbar";

// Fix marker icons for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ selectedLocation }) {
  const map = useMap();
  useEffect(() => {
    if (selectedLocation) {
      map.setView([selectedLocation.latitude, selectedLocation.longitude], 13);
    }
  }, [selectedLocation, map]);

  return selectedLocation ? (
    <Marker position={[selectedLocation.latitude, selectedLocation.longitude]} />
  ) : null;
}

export default function ProfileMapPage() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Get location data from your API
    axios.get("http://localhost:5000/api/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  const handleLocationChange = (e) => {
    const location = locations.find((loc) => loc._id === e.target.value);
    setSelectedLocation(location);
  };

  return (
    <div className="flex-1 p-4">
        <Navbar />
      <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
      <select
        className="w-full p-2 border rounded"
        onChange={handleLocationChange}
        required
      >
        <option value="">Select a Profile</option>
        {locations.map((loc) => (
          <option key={loc._id} value={loc._id}>
            {loc.name}
          </option>
        ))}
      </select>

      {selectedLocation && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="flex gap-4 items-center">
            <div>{selectedLocation.photoUrl && (
           <img src={`http://localhost:5000/public/${selectedLocation.photoUrl}`} alt={selectedLocation.name} className="w-fit h-60" />
          )}</div>
            <div className="flex flex-col gap-3 "><p className="text-xl"><strong>Name:</strong> {selectedLocation.name}</p>
          <p className="text-xl"><strong>Description:</strong> {selectedLocation.description}</p>
          <p className="text-xl"><strong>Location:</strong> {selectedLocation.location}</p></div>
          </div>
          

          <div className="w-full h-64 border rounded mt-4">
            <MapContainer
              center={[selectedLocation.latitude, selectedLocation.longitude]}
              zoom={13}
              className="h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationPicker selectedLocation={selectedLocation} />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}

