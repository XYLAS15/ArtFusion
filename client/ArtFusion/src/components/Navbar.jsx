import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user,setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4 px-4 sm:px-6 bg-transparent ">
      {/* Logo Section */}
      <Link to="/">
        <img src={assets.Art_logo} alt="Logo" className="w-28 sm:w-36 lg:w-40 ml-4" />
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {user ? (
          <>
            {/* Credits Button */}
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-1 sm:gap-2 bg-blue-100 px-3 sm:px-5 py-1 sm:py-2 rounded-full hover:scale-105 transition-all duration-300"
            >
              <img
                className="w-4 sm:w-5"
                src={assets.credit_star}
                alt="Credits"
              />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits: {credit}
              </p>
            </button>

            {/* User Greeting (Hidden on Mobile) */}
            <p className="hidden sm:block text-xs sm:text-sm text-gray-600">
              Hi, {user.name}
            </p>

            {/* Profile Dropdown */}
            <div className="relative group">
              <img
                className="w-8 sm:w-10 rounded-full cursor-pointer"
                src={assets.profile_icon}
                alt="Profile"
              />
              <div className="absolute hidden group-hover:block top-full right-0 z-10 bg-white shadow-lg border rounded-md mt-2">
                <ul className="text-sm list-none p-2">
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Pricing Link */}
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer text-xs sm:text-sm text-gray-700 hover:text-blue-600"
            >
              Pricing
            </p>

            {/* Login Button */}
            <button  onClick ={()=>setShowLogin(true) } className="flex items-center gap-2 text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-blue-600 hover:scale-110 transition-all duration-300 hover:text-blue-500 hover:border-blue-800">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
