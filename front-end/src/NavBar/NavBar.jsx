import { Link } from "react-router-dom";
import "./navBar.css";
import { AuthContext } from "../Context/AuthContext";
import Logo from "../img/logo.png";
import { useContext } from "react";
import DefaultProfile from "../img/user.jpg"; // Import the default profile image

function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>

          {/* Render user profile picture as link to UserProfile */}
          {currentUser ? (
            <Link to="/user-profile">
              <img
                src={currentUser.img ? `/upload/${currentUser.img}` : DefaultProfile}  // Check for user image, use default if not available
                alt="Profile"
                className="profile-pic"
              />
            </Link>
          ) : (
            <span className="loginLink">
              <Link className="link" to="/login">
                Login
              </Link>
            </span>
          )}

          {/* Show logout option if user is logged in */}
          {currentUser && <span onClick={logout}>Logout</span>}

          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
