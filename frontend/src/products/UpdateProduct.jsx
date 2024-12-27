import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetProductById from "../hooks/useGetProductById";
import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "../shared/Button";
import { motion } from "framer-motion";

const UpdateProduct = () => {
  const params = useParams();
  useGetProductById(params.id); // Fetch the product data based on the id
  const navigate = useNavigate();

  const { singleProduct } = useSelector((state) => state.product);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singleProduct) {
      setValue("badge_text", singleProduct.badge_text);
      setValue("compare_at_price", singleProduct.compare_at_price);
      setValue("image", singleProduct.image);
      setValue("price", singleProduct.price);
      setValue("title", singleProduct.title);
      setValue("vendor", singleProduct.vendor);
    }
  }, [singleProduct, setValue]);

  const onSubmit = async (data) => {
    // Process the updated product data
    const updateData = {
      ...data,
      compare_at_price: parseFloat(data.compare_at_price),
      price: parseFloat(data.price),
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URI}/updateProduct/${
          singleProduct._id
        }`,
        updateData
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(
          () => navigate(`/products/viewProductDetails/${singleProduct._id}`),
          500
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (!singleProduct) {
    return <div>Loading...</div>;
  }

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
            Update Product
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
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full mt-1 p-2 border rounded-md text-gray-400"
                    placeholder="Product title"
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">Title is required</p>
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
              <Controller
                name="vendor"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full mt-1 p-2 border rounded-md text-gray-400"
                    placeholder="Vendor name"
                  />
                )}
              />
              {errors.vendor && (
                <p className="text-red-500 text-sm mt-1">Vendor is required</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700">
                Price
              </label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full mt-1 p-2 border rounded-md text-gray-400"
                    placeholder="Product price"
                  />
                )}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">Price is required</p>
              )}
            </div>

            {/* Compare at Price */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700">
                Compare at Price
              </label>
              <Controller
                name="compare_at_price"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full mt-1 p-2 border rounded-md text-gray-400"
                    placeholder="Compare at price"
                  />
                )}
              />
            </div>

            {/* Badge Text */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700">
                Badge Text
              </label>
              <Controller
                name="badge_text"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full mt-1 p-2 border rounded-md text-gray-400"
                    placeholder="Badge text (e.g., 'New', 'Sale')"
                  />
                )}
              />
            </div>

            {/* Image URL */}
            <div>
              {/* Display Product Image Preview */}
              {singleProduct.image && (
                <div className="flex justify-center mt-2">
                  <span className="shine-effect">
                    <img
                      src={singleProduct.image}
                      alt="Product Preview"
                      className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-md"
                    />
                  </span>
                </div>
              )}
              <label className="block text-sm md:text-base font-medium text-gray-700">
                Image URL
              </label>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full mt-1 p-2 border rounded-md text-gray-400"
                    placeholder="Image URL"
                  />
                )}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  Image URL is required
                </p>
              )}
            </div>

            {/* Update Button */}
            <motion.div
              className="flex justify-center"
              initial={{ x: "50px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              <Button text={"Update"} className="w-full md:w-auto px-4 py-2" />
            </motion.div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProduct;
