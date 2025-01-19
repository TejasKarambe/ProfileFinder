import { Link } from "react-router"; // Use 'react-router-dom'

const ProfileCard = ({ profile }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 transform hover:scale-105 transition-transform duration-200">
    <img
      src={`http://localhost:5000/public/${profile.photoUrl}`}
      alt={profile.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-700">{profile.name}</h3>
      <p className="text-gray-600 text-sm mt-2">{profile.description}</p>
      <p className="text-gray-500 text-sm mt-1">Location: {profile.location}</p>
      <Link to={`/profilemap`}>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Summary
        </button>
      </Link>
    </div>
  </div>
);

export default ProfileCard;

