import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Button from "../shared/Button";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("Product Data:", data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URI}/createProduct`,
        data
      );
      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        // setTimeout(() => {
        //   reset(); // Reset the form fields
        // }, 1000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8"
        style={{
          backgroundImage:
            "url(https://t4.ftcdn.net/jpg/00/57/88/83/360_F_57888323_UfOwb07haVhrN1Z85qHt8oqyYfX4QMil.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          className="text-center lg:text-left mb-4 md:mb-8"
          initial={{ x: "-50px", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <h1 className=" text-2xl md:text-3xl lg:text-3xl font-bold bg-gradient-to-r from-pink-700 to-slate-400 bg-clip-text text-transparent">
            Create Product
          </h1>
        </motion.div>

        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-pink-50 shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label
                className="block text-sm md:text-base font-medium text-gray-700 cursor-pointer"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Product title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Vendor */}
            <div>
              <label
                className="block text-sm md:text-base font-medium text-gray-700 cursor-pointer"
                htmlFor="vendor"
              >
                Vendor
              </label>
              <input
                id="vendor"
                type="text"
                {...register("vendor", { required: "Vendor is required" })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Vendor name"
              />
              {errors.vendor && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vendor.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Product price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Compare at Price */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700">
                Compare at Price
              </label>
              <input
                type="number"
                {...register("compare_at_price")}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Compare at price"
              />
            </div>

            {/* Badge Text */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700">
                Badge Text
              </label>
              <input
                type="text"
                {...register("badge_text")}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Badge text (e.g., 'New', 'Sale')"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                {...register("image", { required: "Image URL is required" })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Image URL"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.div
              className="flex justify-center"
              initial={{ x: "50px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              <Button text={"Create"} className="w-full md:w-auto px-4 py-2" />
            </motion.div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateProduct;
