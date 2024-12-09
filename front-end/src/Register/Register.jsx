import { Link, useNavigate } from "react-router-dom"
import "./register.css"
import { useState} from "react";
import axios from "axios";


function Register() {
  const [input, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs(prev =>({...prev, [e.target.name]: e.target.value}))
  };
  const chandleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:8800/api/auth/register", input);
      console.log(res.data);
      navigate("/login");
    }catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "An error occurred during registration.");
    }

  };
    return (
        <div className="auth">
          <h1>Register</h1>
          <form>
            <input
              required
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              required
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={chandleSubmit}>Register</button>
            {error && <p className="error">{error}</p>} {/* Show error message */}
            <span>
              Do you have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      );
    };


export default Register
