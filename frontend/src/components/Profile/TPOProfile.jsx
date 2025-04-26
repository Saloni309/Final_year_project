import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TPOProfile = () => {
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/v1/tpo/me", {
        withCredentials: true,
      });
      setProfileUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/tpo/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userInfo = [
    { label: "Name", value: profileUser.firstname + " " + profileUser.lastname },
    { label: "Email", value: profileUser.email },
    { label: "Phone", value: profileUser.phone },
    { label: "Role", value: "TPO" }, // As TPO role is fixed
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-indigo-100 py-20 px-12 lg:px-24 flex flex-col items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl p-8 md:p-12 transition-all duration-300 hover:shadow-3xl hover:scale-105 transform ease-in-out">
        <div className="flex flex-col items-center space-y-6 mb-12">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-green-500 to-blue-600 flex items-center justify-center text-white text-5xl font-semibold shadow-xl border-4 border-white">
            {profileUser?.name ? profileUser.name[0] : "?"}
          </div>

          <h1 className="text-4xl font-extrabold text-green-700">
            TPO Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and view placement activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {userInfo.map((info, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform ease-in-out"
            >
              <span className="text-sm text-gray-700 font-medium">
                {info.label}:
              </span>
              <span className="text-base font-semibold text-gray-800 truncate">
                {info.value || "N/A"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-12 w-full max-w-4xl flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 transform ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TPOProfile;
