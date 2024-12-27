import React, { useEffect } from "react";
import Button from "../shared/Button";
import flippyBannerTwo from "../utils/flippy-banner-two.jpg";
import ScrollReveal from "scrollreveal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function BannerTwo() {
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    ScrollReveal().reveal(".scroll-element", {
      delay: 300, // Delay in milliseconds
      distance: "100px", // Moves 100px during the animation
      origin: "right", // Animation starts from the left
      duration: 1000, // Duration of animation in milliseconds
      easing: "ease-in-out",
      opacity: 0,
    });
  }, []);

  return (
    <>
      {user?.role === "customer" ? (
        <div
          className="hero bg-base-200 min-h-96 "
          style={{
            backgroundImage:
              'url("https://img.freepik.com/premium-psd/background-pattern-design-best-quality-hyper-realistic-wallpaper-image-banner-template_643360-409205.jpg?w=360")',
          }}
        >
          <div className="hero-content flex-col lg:flex-row-reverse ">
            <img
              src={flippyBannerTwo}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-2xl scroll-element"
            />

            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-white bg-clip-text text-transparent">
                fliPPy The No.1 Ecommerce
              </h1>
              <p className="py-6 text-slate-400">
                fliPPy, the #1 e-commerce platform, brings simplicity to online
                shopping. Discover top-quality products from the latest fashion
                to cutting-edge electronics and unique home decor all in one
                place. With a seamless, user-friendly experience, fliPPy makes
                finding what you need easy, enjoyable, and effortlessly
                convenient. Shop smart, shop fliPPy!
              </p>
              <Link to="/flippyStoreAllProducts">
                <Button text="fliPPy Store" className="shine-effect"></Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default BannerTwo;
