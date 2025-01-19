import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MapDisplay() {
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState([0,0]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  return (
    <>
    
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">All Locations</h2>
      <MapContainer center={center} zoom={2} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc) => (
          <Marker key={loc._id} position={[loc.latitude, loc.longitude]}>
            <Popup>
              <h3>{loc.name}</h3>
              <img src={`http://localhost:5000/public/${loc.photoUrl}`} alt={loc.name} className="w-full" />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
    <div className="">
    <Footer />
    </div>
    </>
  );
}
