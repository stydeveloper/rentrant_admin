import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../utils/auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Add your logic for handling the passwords (e.g., updating the password)
      console.log("New Password:", password);
      console.log("Confirm Password:", confirmPassword);
      const response = await resetPassword(token, password, confirmPassword);
      console.log(response.data);

      toast.success(`${response.data.message}`, { position: "top-right" });
      navigate("/login");
      // Clear the error
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-500 h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Reset Password
          </button>
        </>
      </form>
    </div>
  );
};

export default ResetPassword;
