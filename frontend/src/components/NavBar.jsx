import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex space-x-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `hover:underline transition duration-200 ${
            isActive ? "font-semibold border-b-2 border-white" : ""
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/upload"
        className={({ isActive }) =>
          `hover:underline transition duration-200 ${
            isActive ? "font-semibold border-b-2 border-white" : ""
          }`
        }
      >
        Upload Files
      </NavLink>

      <NavLink
        to="/view-porfolios"
        className={({ isActive }) =>
          `hover:underline transition duration-200 ${
            isActive ? "font-semibold border-b-2 border-white" : ""
          }`
        }
      >
        View Porfolios
      </NavLink>

      <NavLink
        to="/student-upload"
        className={({ isActive }) =>
          `hover:underline transition duration-200 ${
            isActive ? "font-semibold border-b-2 border-white" : ""
          }`
        }
      >
        Student Upload
      </NavLink>

      <NavLink
        to="/parent-upload"
        className={({ isActive }) =>
          `hover:underline transition duration-200 ${
            isActive ? "font-semibold border-b-2 border-white" : ""
          }`
        }
      >
        Parent Upload
      </NavLink>

      <NavLink
        to="/parent-portfolio-view"
        className={({ isActive }) =>
          `hover:underline transition duration-200 ${
            isActive ? "font-semibold border-b-2 border-white" : ""
          }`
        }
      >
        Parent Portfolio View
      </NavLink>
    </nav>
  );
}

export default NavBar;
