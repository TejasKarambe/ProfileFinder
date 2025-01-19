import React from 'react';
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-xl font-semibold"><NavLink to="/" className="">
              Profile Finder
            </NavLink></h2>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/" className="hover:underline">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="hover:underline">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/allmap" className="hover:underline">
              Map
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:underline">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className=" bg-black text-white px-2 py-2 rounded hover:bg-gray-600">
              ADMIN
            </NavLink>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
