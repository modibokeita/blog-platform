import db from "../db.js";
import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";

// Get User Profile
export const getUser = (req, res) => {
  const userId = req.params.id;

  const q = "SELECT id, username, email, img FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");
    return res.status(200).json(data[0]);
  });
};

// Update User Profile 
export const updateUser = (req, res) => {
  const userId = req.params.id;

  // Ensure the user is updating their own profile 
  if (userId !== req.user.id) {
    return res.status(403).json("You can only update your own profile");
  }

  const { username, email, password } = req.body;
  let query = "UPDATE users SET username = ?, email = ?";
  const values = [username, email];

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    query += ", password = ?";
    values.push(hash);
  }

  query += " WHERE id = ?";

  db.query(query, [...values, userId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User profile updated successfully");
  });
};

// Delete User Profile
export const deleteUser = (req, res) => {
  const userId = req.params.id;

  // Ensure the user is deleting their own profile
  if (userId !== req.user.id) {
    return res.status(403).json("You can only delete your own profile");
  }

  const q = "DELETE FROM users WHERE id = ?";
  db.query(q, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User deleted successfully");
  });
};
