import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dataContext } from "../context/UserContext";

const Home = () => {
  const { userData, setUserData, serverUrl } = useContext(dataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  const handleLogOut = async () => {
    try {
      await axios.post(`${serverUrl}/api/logout`, {}, { withCredentials: true });
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!userData) return null;

  const {
    firstName = "N/A",
    lastName = "N/A",
    userName = "unknown",
    email = "unknown@email.com",
    profileImage = "https://via.placeholder.com/150",
  } = userData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-8 text-center">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
          />
        </div>

        {/* Flat Grid Info */}
        <div className="grid grid-cols-2 gap-4 text-left pl-16 mb-8">
          <div>
            <h4 className="text-gray-500 text-sm mb-1">First Name</h4>
            <p className="text-gray-800 font-semibold">{firstName}</p>
          </div>
          <div>
            <h4 className="text-gray-500 text-sm mb-1">Last Name</h4>
            <p className="text-gray-800 font-semibold">{lastName}</p>
          </div>
          <div>
            <h4 className="text-gray-500 text-sm mb-1">Username</h4>
            <p className="text-gray-800 font-semibold">@{userName}</p>
          </div>
          <div>
            <h4 className="text-gray-500 text-sm mb-1">Email</h4>
            <p className="text-gray-800 font-semibold">{email}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogOut}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
