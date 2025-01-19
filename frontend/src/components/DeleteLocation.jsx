import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteLocation() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  const handleLocationChange = (e) => {
    const location = locations.find((loc) => loc._id === e.target.value);
    setSelectedLocation(location);
  };

  const handleDelete = () => {
    if (!selectedLocation) return;
    axios.delete(`http://localhost:5000/api/locations/${selectedLocation._id}`)
      .then(() => {
        alert("Location deleted successfully");
        setLocations(locations.filter((loc) => loc._id !== selectedLocation._id));
        setSelectedLocation(null);
      })
      .catch((err) => console.error("Error deleting location:", err));
  };

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Delete Location</h2>
      <select
        className="w-full p-2 border rounded"
        onChange={handleLocationChange}
        value={selectedLocation ? selectedLocation._id : ""}
      >
        <option value="">Select a location</option>
        {locations.map((loc) => (
          <option key={loc._id} value={loc._id}>
            {loc.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
        disabled={!selectedLocation}
      >
        Delete Location
      </button>
    </div>
  );
}
