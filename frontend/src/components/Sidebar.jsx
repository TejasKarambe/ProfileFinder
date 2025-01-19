import { Link } from "react-router";

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-1/4 h-screen flex flex-col">
      <h2 className="text-center text-2xl font-bold py-4">Profile Manager</h2>
      <nav className="flex-grow">
        <ul className="space-y-4 text-lg p-4">
          <li>
            <Link to="/admin" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              Display All Profiles on map
            </Link>
          </li>
          <li>
            <Link to="/admin/insert" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              Insert Profile
            </Link>
          </li>
          <li>
            <Link to="/admin/update" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              Update Profile 
            </Link>
          </li>
          <li>
            <Link to="/admin/delete" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              Delete Profile
            </Link>
          </li>
          <li>
            <Link to="/" className="block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-400">
              Logout 
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
