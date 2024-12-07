import { Link } from "react-router-dom";
import "./navBar.css"
function NavBar() {
    return (
        <div className="navbar">
          <div className="container">
            <div className="logo">
              <Link to="/">
              <img src="" />
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
              <span>current user</span>
                <span>Logout</span>
                <Link className="link" to="/login">
                  Login
                </Link>
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

export default NavBar
