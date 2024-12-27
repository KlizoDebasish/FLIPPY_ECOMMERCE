import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Banner from "./Banner";
import BannerTwo from "./BannerTwo";  

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <BannerTwo />
      <Footer />
    </>
  );
}

export default Home;
