import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import { useLayoutContext } from "../../components/Layout/Layout";
const Login = () => {
  // Controlled state for email and password
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUserIsAuthenticated } = useLayoutContext();

  const validatePassword = (password) => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password on submit
    validatePassword(password);

    try {
      // Use the login utility function
      const response = await login(email, password);

      // Save JWT token in local storage on successful login
      localStorage.setItem("token", response.data.token);
      setUserIsAuthenticated(true);

      // Redirect to the home page on successful login
      navigate("/");
    } catch (error) {
      // Error is already handled by the login utility function
      console.log(error);
    }
  };
  return (
    <div className="lg:flex py-2">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        {/* Your login form */}
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold ">
              RENTRANT
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
            Log in
          </h2>
          <div className="mt-12">
            {/* Your login form */}
            <form onSubmit={handleSubmit}>
              {/* Email Address */}
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide text-left">
                  Email Address
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="email"
                  placeholder="mike@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* Password */}
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                </div>
                <input
                  className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                    error ? "border-red-500" : ""
                  }`}
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
                {error && (
                  <div className="flex justify-end mt-2">
                    <p className="text-xs text-red-500">{error}</p>
                  </div>
                )}
                <div className="flex justify-end mt-2">
                  <Link
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              {/* Log In Button */}
              <div className="mt-10">
                <button
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Don't have an account ?{" "}
              <Link
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                to="#"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ borderLeft: "2px solid #eee" }}
        className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-full "
      >
        <img
          src="/assets/undraw_Location_review_d5qn.png"
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Login;
