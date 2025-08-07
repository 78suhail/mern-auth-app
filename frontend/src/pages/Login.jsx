import React, { useState, useContext } from "react";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { dataContext } from "../context/UserContext.jsx";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const { serverUrl, setUserData, getUserdata } = useContext(dataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/login`,
        { email, password },
        { withCredentials: true }
      );

      await getUserdata(); 
      setUserData(data.user);   

      console.log("Login successful:", data);
      alert("Login successful!");

      // Clear form
      setEmail("");
      setPassword("");
      // Redirect to /home
      setRedirect(true);
    } catch (error) {
      console.error(error?.response?.data?.message || "Login failed");
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  // Redirect component-based
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg p-8 sm:p-10 text-white">
        {/* Avatar Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <FaUserCircle className="text-white text-3xl" />
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email ID</label>
            <div className="flex items-center border border-white/30 rounded-md px-3 py-2">
              <FaEnvelope className="mr-2 text-white" />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none w-full text-white placeholder-white/70"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center border border-white/30 rounded-md px-3 py-2">
              <FaLock className="mr-2 text-white" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full text-white placeholder-white/70"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-sm text-white/70 mt-1">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox bg-white/20 mr-2" />
              Remember me
            </label>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 rounded-xl font-semibold transition"
          >
            LOGIN
          </button>
        </form>

        {/* Redirect Link */}
        <p className="text-sm mt-6 text-center text-white/70">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-white underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
