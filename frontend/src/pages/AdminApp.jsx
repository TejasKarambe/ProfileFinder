import { Routes, Route } from "react-router";
import Sidebar from "../components/Sidebar";
import MapDisplay from "../components/MapDisplay";
import InsertForm from "../components/InsertForm";
import UpdateForm from "../components/UpdateForm";
import DeleteLocation from "../components/DeleteLocation";

export default function AdminApp() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<MapDisplay />} />
          <Route path="/insert" element={<InsertForm />} />
          <Route path="/update" element={<UpdateForm />} />
          <Route path="/delete" element={<DeleteLocation />} />
        </Routes>
      </div>
    </div>
  );
}
