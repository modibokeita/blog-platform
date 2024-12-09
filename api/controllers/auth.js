import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
//import cookie from "cookie-parser"
export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json({ error: "User already exists" });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`email`, `username`, `password`) VALUES(?, ?, ?)";
        const values = [
            req.body.email,
            req.body.username,
            hash,
        ];

        db.query(q, values, (err) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json({ message: "User has been created" });
        });
    });
};

export const login = (req, res) => {
    //CHECK USER

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");

      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");

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
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };
