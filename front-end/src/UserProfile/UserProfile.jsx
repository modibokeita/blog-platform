import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import "./userProfile.css";
import DefaultProfile from "../img/user.jpg";
const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);  // Access currentUser from AuthContext
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get User Profile Data (use currentUser for the logged-in user)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Use the currentUser's ID (or username) for fetching the profile
        const response = await axios.get(`/api/users/${currentUser.id}`);
        setUser(response.data);
        setNewUsername(response.data.username);
        setNewEmail(response.data.email);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user profile");
      }
    };

    if (currentUser?.id) {
      fetchUserProfile();  // Only fetch if currentUser is available
    }
  }, [currentUser]);

  // Update User Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        username: newUsername,
        email: newEmail,
        password: newPassword,
      };
      await axios.put(`/api/users/${currentUser.id}`, updatedData);
      setEditMode(false);
      const response = await axios.get(`/api/users/${currentUser.id}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to update profile");
    }
  };

  // Delete User Profile
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`/api/users/${currentUser.id}`);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Failed to delete account");
    }
  };

  return (
    <div className="info">
      <h2>User Profile</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <img
          src={currentUser.img ? `/upload/${currentUser.img}` : DefaultProfile}
          alt="User"
          className="profile-image"
        />
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>

      {editMode ? (
        <form onSubmit={handleUpdateProfile}>
          <input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Update Profile</button>
        </form>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
      )}

      <button onClick={handleDeleteAccount} className="delete-account">
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;
