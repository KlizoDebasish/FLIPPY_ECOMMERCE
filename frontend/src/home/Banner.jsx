import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../shared/Button";
import bannerImage from "../utils/flippyBanner.jpg";

function Banner() {
  const { user } = useSelector((store) => store.user);

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          {user?.role === "admin" ? (
            <>
              <h3 className="mb-5 text-2xl font-bold text-white">
                Hello @Admin{" "}
                <span className="text-lg lg:text-3xl font-semibold bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 ease-in-out">
                  {user.username[0].toUpperCase() + user.username.slice(1)}
                </span>
              </h3>
              <p className="mb-4">
                Where shopping meets simplicity! Our platform is designed to
                provide an unparalleled online shopping experience, making it
                easy and enjoyable to find exactly what you need. Whether you're
                searching for the latest fashion trends, cutting-edge
                electronics, or unique home decor, fliPPy has it all.
              </p>
              <Link to="/admin/Dashboard">
                <Button text="DashBoard" className="shine-effect" />
              </Link>
            </>
          ) : (
            <>
              <h3 className="mb-5 text-3xl font-bold text-white">
                Welcome To fliPPy
              </h3>
              <p className="mb-4">
                Where shopping meets simplicity! Our platform is designed to
                provide an unparalleled online shopping experience, making it
                easy and enjoyable to find exactly what you need. Whether you're
                searching for the latest fashion trends, cutting-edge
                electronics, or unique home decor, fliPPy has it all.
              </p>
              <Link to="/products">
                <Button text="fliPPy Special" className="shine-effect" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
