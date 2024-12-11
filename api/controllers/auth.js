import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end/public/upload"); // Folder to store images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, Date.now() + ext); // Use timestamp as filename
  }
});

const upload = multer({ storage: storage });

// Register user and upload profile picture
export const register = (req, res) => {
  upload.single('img')(req, res, (err) => { // 'img' is the key from the form
    if (err) {
      return res.status(500).json({ error: "Image upload failed", details: err });
    }

    const { email, username, password } = req.body;
    const imgPath = req.file ? req.file.filename : null; // Get the uploaded image filename

    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(q, [email, username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json({ error: "User already exists" });

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const insertQuery = "INSERT INTO users (`email`, `username`, `password`, `img`) VALUES(?, ?, ?, ?)";
      const values = [
        email,
        username,
        hash,
        imgPath // Save the image filename to the database
      ];

      db.query(insertQuery, values, (err) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "User has been created" });
      });
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey", { expiresIn: '1h' });
    const { password, ...other } = data[0];

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      sameSite: "lax", // CSRF protection
    }).status(200).json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.");
};
