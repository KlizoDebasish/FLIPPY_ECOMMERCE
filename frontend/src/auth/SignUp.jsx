import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "../shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";
import toast from "react-hot-toast";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const { loading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const file = watch("file"); // Watch the file input

  const onSubmit = async (data) => {
    // console.log(data);

    // Append form fields to FormData
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("role", data.role);
    if (file && file.length > 0) {
      formData.append("file", file[0]);
    }

    // console.log([...formData.entries()]);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URI}/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(res);
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (event) => {
    if (event.key === " " || event.key === "Tab") {
      event.preventDefault();
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto bg-slate-200 shadow-lg rounded-lg overflow-hidden md:mt-10">
        <div className="hero-content flex-col">
          <motion.div
            className="text-center lg:text-left"
            initial={{ y: "-50px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-slate-900 mb-4">
              Register now!
            </h1>
            <p className="text-gray-600 text-sm">
              Create your account to get started.
            </p>
          </motion.div>
        </div>
        <div className="px-6 py-4 text-start">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("username", {
                  required: "Name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Name cannot be just whitespace",
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="number"
                placeholder="0000-0000-00"
                maxLength={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("phone", {
                  required: "Phone Number is required",
                  maxLength: {
                    value: 10,
                    message: "Phone Number cannot exceed 10 characters",
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone Number must be exactly 10 digits",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                      message:
                        "Password must contain at least one uppercase letter, one number, and one special character",
                    },
                  })}
                  onFocus={() => setFocused(true)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              {/* Password Suggestions */}
              {focused && (
                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                  <li
                    className={`flex items-center ${
                      watch("password")?.length >= 8
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {watch("password")?.length >= 8 ? "✔" : "✖"} At least 8
                    characters
                  </li>
                  <li
                    className={`flex items-center ${
                      /[A-Z]/.test(watch("password"))
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {/[A-Z]/.test(watch("password")) ? "✔" : "✖"} One uppercase
                    letter
                  </li>
                  <li
                    className={`flex items-center ${
                      /[0-9]/.test(watch("password"))
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {/[0-9]/.test(watch("password")) ? "✔" : "✖"} One number
                  </li>
                  <li
                    className={`flex items-center ${
                      /[!@#$%^&*]/.test(watch("password"))
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {/[!@#$%^&*]/.test(watch("password")) ? "✔" : "✖"} One
                    special character
                  </li>
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 my-5">
                <div className="flex items-center space-x-2 mr-2">
                  <input
                    type="radio"
                    id="r1"
                    value="customer"
                    {...register("role", { required: "Role is required" })}
                    className="cursor-pointer"
                    defaultChecked
                  />
                  <label htmlFor="r1">Customer</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="r2"
                    value="admin"
                    {...register("role", { required: "Role is required" })}
                    className="cursor-pointer"
                  />
                  <label htmlFor="r2">Admin</label>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-14">
                <label>Profile</label>
                <input
                  accept="image/*"
                  type="file"
                  {...register("file")}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="mb-6">
              {loading ? (
                <div className="form-control mt-6">
                  <button className="flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 md:px-4 md:py-2 font-bold bg-gradient-to-r from-pink-700 to-slate-900 text-white rounded-lg shadow-md text-sm sm:text-base md:text-lg">
                    <span className="loading loading-bars loading-sm mr-2"></span>
                    please wait ...
                  </button>
                </div>
              ) : (
                <div className="form-control mt-6">
                  <Button text="SignUp" />
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
