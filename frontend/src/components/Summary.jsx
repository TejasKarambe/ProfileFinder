import { Routes, Route } from "react-router";
import MapDisplay from "./MapDisplay";
import Navbar from "./Navbar";

export default function Summary() {
  return (
    <div className="flex">
     
      <div className="flex-1">
      <Navbar />
        <Routes>
          <Route path="/" element={<MapDisplay />} />
        </Routes>
      </div>
    </div>
  );
}
