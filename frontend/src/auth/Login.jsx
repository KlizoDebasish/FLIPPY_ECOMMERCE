import React, { useEffect } from "react";
import Button from "../shared/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setLogin } from "../store/authSlice";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { setLoading, setUser } from "../redux/userSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URI}/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
        toast(res.data.message);
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === " " || event.key === "Tab") {
      event.preventDefault();
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <motion.div
            className="text-center lg:text-left"
            initial={{ x: "-50px", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-slate-900 mb-4">
              Login now!
            </h1>
            <p className="text-gray-600 text-sm">
              Welcome back! Please log in to continue.
            </p>
          </motion.div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-sm">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered"
                  onKeyPress={handleKeyPress}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-sm">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 my-5">
                <div className="flex items-center space-x-2">
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
              <p className="font-semibold text-sm mt-3">
                New user? Please signup{" "}
                <Link to="/signup">
                  <span className="text-blue-500 text-xs underline">
                    Here...
                  </span>
                </Link>
              </p>
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
                    <Button text="Login" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
