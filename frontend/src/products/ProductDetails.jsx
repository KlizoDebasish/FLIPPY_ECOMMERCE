import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetProductById from "../hooks/useGetProductById";
import { useSelector } from "react-redux";
import "../../src/App.css";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Button from "../shared/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

function ProductDetails() {
  const params = useParams();
  useGetProductById(params.id);
  const navigate = useNavigate();

  const { singleProduct } = useSelector((state) => state.product);
  const { loading } = useSelector((store) => store.user);
  // console.log("singleProduct", singleProduct._id);

  // const handelDelete = async () => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "This action cannot be undone.",
  //     customClass: {
  //       confirmButton:
  //         "px-2 py-1 sm:px-2 sm:py-1 md:px-4 md:py-2 font-bold bg-gradient-to-r from-blue-600 to-slate-900 text-white rounded-lg shadow-md",
  //       cancelButton:
  //         "px-2 py-1 sm:px-2 sm:py-1 md:px-4 md:py-2 font-bold bg-gradient-to-r from-green-600 to-slate-900 text-white rounded-lg shadow-md ",
  //     },
  //     showLoaderOnConfirm: true,
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, Continue!",
  //     cancelButtonText: "No, keep it",
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       const res = await axios.delete(
  //         `${import.meta.env.VITE_API_BASE_URI}/deleteProduct/${
  //           singleProduct._id
  //         }`
  //       );
  //       // console.log(res);

  //       if (res.data.success) {
  //         toast.success(res.data.message);
  //         setTimeout(() => navigate("/flippyStoreAllProducts"), 500);
  //       }
  //     } catch (error) {
  //       toast.error(error?.response?.data?.message);
  //     }
  //   }
  // };

  // if (!singleProduct) {
  //   return <div className="shine-effect"></div>;
  // }

  return (
    <>
      <Navbar />
      {singleProduct ? (
        <div
          style={{
            backgroundImage:
              "url(https://t4.ftcdn.net/jpg/00/57/88/83/360_F_57888323_UfOwb07haVhrN1Z85qHt8oqyYfX4QMil.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col lg:flex-row lg:justify-center items-center p-8 space-y-8 lg:space-y-0 lg:space-x-12 max-w-6xl mx-auto min-h-screen">
            {/* Product Image */}
            <motion.div
              className="p-4 border border-pink-800 shine-effect"
              initial={{ x: "-100px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="rounded-lg shadow-lg w-80 object-cover"
              />
            </motion.div>

            {/* Product Details */}
            <motion.div
              className="w-full lg:w-1/2 p-4"
              initial={{ x: "100px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              {/* Title and Badge */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                {singleProduct.title}
              </h1>
              <span className="inline-block bg-gradient-to-r from-pink-400 to-slate-500 text-white cursor-pointer text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {singleProduct.badge_text}
              </span>

              {/* Price */}
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                <span className="text-lg sm:text-2xl font-bold text-gray-900">
                  {/* Intl:- Internationalization formatting dates, times, numbers, and currencies according to locale-specific rules   
                  en-IN:- English (India)*/}
                  ₹{new Intl.NumberFormat("en-IN").format(singleProduct.price)}
                </span>
                <span className="text-md sm:text-lg line-through text-gray-500">
                  ₹
                  {new Intl.NumberFormat("en-IN").format(
                    singleProduct.compare_at_price
                  )}
                </span>
              </div>

              {/* Vendor Info */}
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm sm:text-base font-semibold text-gray-600">
                  Vendor:
                </span>
                <span className="text-sm sm:text-base text-gray-800">
                  {singleProduct.vendor.toUpperCase()}
                </span>
              </div>

              {/* Launched Date */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm sm:text-base font-semibold text-gray-600">
                  Launched Date:
                </span>
                <span className="text-sm sm:text-base text-gray-500 font-mono">
                  {singleProduct?.updatedAt
                    ? singleProduct.updatedAt.split("T")[0].split("-").join("/")
                    : "N/A"}
                </span>
              </div>

              {/* Button */}
              <div className="flex gap-2">
                <Button text={"Add to Cart"} />
                {/* onClick={handelCart}  */}
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="shine-effect min-h-screen"></div>
      )}
      <Footer />
    </>
  );
}

export default ProductDetails;
