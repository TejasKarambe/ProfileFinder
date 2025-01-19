import { Routes, Route } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import AdminApp from "./pages/AdminApp";
import InsertForm from "./components/InsertForm";
import UpdateForm from "./components/UpdateForm";
import DeleteLocation from "./components/DeleteLocation";
import ProfileMapPage from "./pages/ProfileMapPage";
import Summary from "./components/Summary";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profilemap" element={<ProfileMapPage />} />
      <Route path="/allmap" element={<Summary />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/insert" element={<InsertForm />} />
      <Route path="/update" element={<UpdateForm />} />
      <Route path="/delete" element={<DeleteLocation />} />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
};

export default App;
