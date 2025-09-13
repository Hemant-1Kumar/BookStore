import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("/user/signup", userInfo);
      if (res.data) {
        toast.success("Signup Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Signup failed";
      toast.error("Error: " + message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {/* modal container */}
      <div className="modal modal-open">
        <div className="modal-box relative">
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>

          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Signup</h3>

            {/* Name */}
            <div className="mt-4 space-y-2">
              <label htmlFor="fullname">Name</label>
              <input
                id="fullname"
                type="text"
                placeholder="Enter your fullname"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-around mt-4">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Signup
              </button>
              <p className="text-xl">
                Have account?{" "}
                <Link to="/login" className="underline text-blue-500 cursor-pointer">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
