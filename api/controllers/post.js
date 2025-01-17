import db from "../db.js";
import jwt from "jsonwebtoken";

// Fetch all posts or posts by category
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat = ?"
    : "SELECT * FROM posts";
  
  const params = req.query.cat ? [req.query.cat] : [];
  db.query(q, params, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json(data);
  });
};

// Fetch a single post by ID
export const getPost = (req, res) => {
  const q = `
    SELECT
      p.id,
      u.username,
      p.title,
      p.description,
      p.img,
      u.img AS userImg,
      p.cat,
      p.created_at
    FROM users u
    JOIN posts p ON u.id = p.user_id
    WHERE p.id = ?`;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    if (data.length === 0)
      return res.status(404).json({ error: "Post not found." });

    return res.status(200).json(data[0]);
  });
};

// Add a new post
export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Not authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET || "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Token is not valid!" });

    const q = `
      INSERT INTO posts (title, description, img, cat, created_at, user_id)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat || null, // Allow NULL for category
      new Date(), 
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(201).json({ message: "Post has been created." });
    });
  });
};

// Delete a post
export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Not authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET || "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Token is not valid!" });

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE id = ? AND user_id = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json({ error: err.message });

      if (data.affectedRows === 0)
        return res.status(403).json({ error: "You can delete only your own posts!" });

      return res.status(200).json({ message: "Post has been deleted!" });
    });
  });
};

// Update a post
export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Not authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET || "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Token is not valid!" });

    const postId = req.params.id;
    const q = `
      UPDATE posts
      SET title = ?, description = ?, img = ?, cat = ?
      WHERE id = ? AND user_id = ?`;

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat || null, 
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json({ error: err.message });

      if (data.affectedRows === 0)
        return res.status(403).json({ error: "You can update only your own posts!" });

      return res.status(200).json({ message: "Post has been updated." });
    });
  });
};
