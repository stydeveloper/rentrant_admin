import React, { useState } from "react";
import { forgotPassword } from "../../utils/auth";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitted email:", email);

      const response = await forgotPassword(email);
      console.log(response.data.token);
      const token = response?.data?.token;
      navigate(`/reset-password/${token}`);
    } catch (error) {
      console.log(error);
    }
    // Add your logic for handling the email (e.g., send a reset password link)
  };

  return (
    <div className="bg-gray-500 h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
