import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URI}/logout`,
        { withCredentials: true }
      );
      dispatch(setUser(null));
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-black to-slate-800 sticky top-0 z-10 px-3">
      {/* Navbar start */}
      <div className="navbar-start">
        {/* Menu icon for small screens */}
        <div className="md:hidden">
          <button
            className="btn btn-ghost text-xl text-pink-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              "X"
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <Link to="/">
          <motion.h1
            className="text-lg sm:text-2xl bg-gradient-to-r from-pink-700 to-white bg-clip-text text-transparent font-bold p-2"
            initial={{ x: "-50px", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            fliPPy
          </motion.h1>
        </Link>
      </div>

      {/* Navbar menu for larger screens */}
      <div className="navbar-end hidden md:flex gap-2">
        {user && user.role === "customer" && (
          <>
            <Link
              to="/products"
              className="text-lg lg:text-xl font-semibold bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 ease-in-out"
            >
              %Special
            </Link>
            <Link
              to="/flippyStoreAllProducts"
              className="btn btn-ghost text-lg lg:text-xl font-semibold bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 ease-in-out"
            >
              Products
            </Link>

            <div className="flex-none mr-3">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <Link to={"/cart"}>
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6 text-white font-semibold hover:scale-125 transition-all duration-300 ease-in-out"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="badge badge-sm indicator-item bg-gradient-to-r from-pink-700 to-slate-900 text-white">8</span>
                    </div>
                  </Link>
                </div>
              </div>{" "}
            </div>
          </>
        )}

        {user && user.role === "admin" && (
          <>
            <Link
              to="/products/createProducts"
              className="text-lg lg:text-xl font-semibold bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 ease-in-out"
            >
              Create
            </Link>
            <Link
              to="/flippyStoreAllProducts"
              className="btn btn-ghost text-lg lg:text-xl font-semibold bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 ease-in-out"
            >
              Modify
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link
              to="/login"
              className="btn btn-ghost px-2 text-lg lg:text-xl font-semibold bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent hover:border hover:border-white transition-all duration-500 ease-in-out"
            >
              Login
            </Link>
            <Link to="/signup">
              <Button text="SignUp">Signup</Button>
            </Link>
          </>
        )}
      </div>

      {/* User profile section */}
      <div className="dropdown dropdown-end ml-3 mr-3">
        <div
          tabIndex={0}
          role="button"
          className={
            user
              ? "btn btn-ghost btn-circle avatar online"
              : "btn btn-ghost btn-circle avatar offline"
          }
        >
          <div className="w-10 rounded-full hover:scale-110 transition-all duration-300 ease-in-out">
            <img
              alt="Profile"
              src={
                user?.profilePhoto // Use optional chaining to access 'profilePhoto'
                  ? user.profilePhoto
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
          </div>
        </div>

        {user ? (
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">{user?.username}</span>
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>

      {/* Small screen menu */}
      {isMenuOpen && (
        <div className="navbar-end md:hidden flex items-center gap-2 rounded-lg shadow-lg">
          <Link
            to="/"
            className="text-sm bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent font-semibold p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link to="/login">
            <Button text="Login" />
          </Link>
          <Link to="/signup">
            <Button text="Signup" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
