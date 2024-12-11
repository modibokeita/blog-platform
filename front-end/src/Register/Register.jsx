import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [input, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    img: null // Add img to hold the file
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "img") {
      setInputs(prev => ({ ...prev, img: e.target.files[0] }));
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("img", input.img); // Append the image file

    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Necessary for file uploads
        },
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "An error occurred during registration.");
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="file"
          name="img"
          accept="image/*" // Limit to image files
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
