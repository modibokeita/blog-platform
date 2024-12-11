import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

// Get User Profile
router.get("/:id",  getUser);

// Update User Profile
router.put("/:id",  updateUser);

// Delete User Profile
router.delete("/:id",  deleteUser);

export default router;

