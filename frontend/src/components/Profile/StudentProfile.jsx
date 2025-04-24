// src/pages/ProfilePage.js
import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetch user profile information
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/v1/user/myprofile", {
        
          withCredentials: true,
        
      });
      console.log(response);
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
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <div className="infoBlock">
        <label>Name:</label>
        <p>{profileUser.name || "N/A"}</p>
      </div>

      <div className="infoBlock">
        <label>Email:</label>
        <p>{profileUser.email || "N/A"}</p>
      </div>

      <div className="infoBlock">
        <label>Phone:</label>
        <p>{profileUser.phone || "N/A"}</p>
      </div>

      <div className="infoBlock">
        <label>Role:</label>
        <p>{profileUser.role || "N/A"}</p>
      </div>

      {profileUser.role === "Student" && (
        <div className="infoBlock">
          <label>Branch:</label>
          <p>{profileUser.branch || "N/A"}</p>
        </div>
      )}

      <div className="infoBlock">
        <label>Enrollment:</label>
        <p>{profileUser.enrollment || "N/A"}</p>
      </div>

      <div className="infoBlock">
        <label>Address:</label>
        <p>{profileUser.address || "N/A"}</p>
      </div>
      <div >
      <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default StudentProfile;
