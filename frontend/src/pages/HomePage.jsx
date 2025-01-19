import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard.jsx";

const Home = () => {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/locations");
      setProfiles(response.data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Find Profiles Near You
        </h1>
        <p className="text-gray-600 mt-4">
        view a list of profiles and interactively explore the addresses
        of each profile on a map
        </p>
      </div>

      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Search Locations", "Browse Profiles", "Connect"].map(
              (step, index) => (
                <div key={index} className="p-6 bg-gray-100 rounded shadow">
                  <h3 className="text-lg font-semibold">{`${
                    index + 1
                  }. ${step}`}</h3>
                  <p className="text-gray-600 mt-2">
                    {index === 0 && "Enter a location to find profiles nearby."}
                    {index === 1 && "Explore profiles and learn about them."}
                    {index === 2 &&
                      "Reach out and make meaningful connections."}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Profiles
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {profiles.slice(0,3).map((profile) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            What Our Users Say
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                quote:
                  "Finding profiles near me was a breeze! Highly recommend this service.",
                user: "Alex",
              },
              {
                quote:
                  "I connected with amazing professionals in my area. Great platform!",
                user: "Jamie",
              },
            ].map((testimonial, index) => (
              <div key={index} className="w-72 bg-white p-6 shadow rounded">
                <p className="text-gray-600">{testimonial.quote}</p>
                <p className="mt-4 font-semibold">- {testimonial.user}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-500 text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Start Finding Profiles Today
          </h2>
          <p className="mb-6">Enter a location and explore profiles nearby.</p>
          <Link to={`/admin`}>
          <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950">
            Login as Admin
          </button>
        </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
