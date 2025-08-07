import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import { dataContext } from "../context/UserContext.jsx";
import { Link, Navigate } from "react-router-dom";

const Signup = () => {
  const { serverUrl, setUserData, getUserdata } = useContext(dataContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [frontendimage, setFrontendImage] = useState("");
  const [backendimage, setBackendImage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    let image = URL.createObjectURL(file);
    setFrontendImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !userName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    if (backendimage) {
      formData.append("profileImage", backendimage);
    }

    try {
      const { data } = await axios.post(`${serverUrl}/api/signup`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await getUserdata();
      setUserData(data.user);
      setRedirect(true);

      // Clear all input fields
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
      setFrontendImage("");
      setBackendImage(null);

      // Clear the file input using ref
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      console.log("Signup successful:", data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error);

      if (error.response?.data?.message) {
        alert(`Signup failed: ${error.response.data.message}`);
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg p-8 sm:p-10 text-white">
        {/* Avatar Image Upload */}
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer w-20 h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden group">
            {frontendimage ? (
              <img
                src={frontendimage}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-white text-3xl" />
            )}

            {/* Overlay icon on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <FaCamera className="text-white text-xl" />
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 w-full h-full opacity-0"
              ref={fileInputRef}
            />
          </label>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <div className="flex items-center border border-white/30 rounded-md px-3 py-2">
              <FaUser className="mr-2 text-white" />
              <input
                type="text"
                placeholder="First Name"
                className="bg-transparent outline-none w-full text-white placeholder-white/70"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <div className="flex items-center border border-white/30 rounded-md px-3 py-2">
              <FaUser className="mr-2 text-white" />
              <input
                type="text"
                placeholder="Last Name"
                className="bg-transparent outline-none w-full text-white placeholder-white/70"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm mb-1">Username</label>
            <div className="flex items-center border border-white/30 rounded-md px-3 py-2">
              <FaUser className="mr-2 text-white" />
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent outline-none w-full text-white placeholder-white/70"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 rounded-xl font-semibold transition"
          >
            SIGN UP
          </button>
        </form>

        {/* Redirect Link */}
        <p className="text-sm mt-6 text-center text-white/70">
          Already have an account?{" "}
          <Link to ="/login" className="text-white underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
