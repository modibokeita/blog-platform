import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import EditIcon from "../img/edit.png";
import DeleteIcon from "../img/delete.png";
import DefaultProfile from "../img/user.jpg";
import { AuthContext } from "../Context/AuthContext.jsx";
import "./singlePage.css";
import Menu from "../Menu/Menu.jsx"
const SinglePage = () => {
  const [post, setPost] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // Extract postId from URL
  const postId = location.pathname.split("/")[3]; // `/api/post/:id`, so split[3]

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId) {
          console.error("Post ID is missing from the URL.");
          return;
        }

        const response = await axios.get(`/api/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post data:", err);
        navigate("/404"); // Navigate to a 404 page if the post is not found
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const handleDelete = async () => {
    try {
      if (!postId) {
        console.error("Post ID is missing from the URL.");
        return;
      }

      await axios.delete(`/api/posts/${postId}`);
      navigate("/"); // Redirect to home after deletion
    } catch (err) {
      console.error("Error deleting the post:", err);
    }
  };

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="single-page">
      <div className="content">
        {post.img ? (
          <img className="post-img" src={`/upload/${post.img}`} alt={post.title || "Post"} />
        ) : (
          <div>No image available</div>
        )}
                <h1 className="post-title">{post.title || "Untitled Post"}</h1>
        <p
          className="post-description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description || "No description available."),
          }}
        ></p>
        <div className="user">
          {post.userImg ? (
            <img src={`/upload/${post.userImg}`} alt={post.username || "User"} />
          ) : (
            <img src={DefaultProfile} alt="Default User" />
          )}
          <div className="info">
            <span>Username: {post.username || "Unknown"}</span>
            <p>Posted {moment(post.date).fromNow() || "some time ago"}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit-controls">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={EditIcon} alt="Edit Post" />
              </Link>
              <img onClick={handleDelete} src={DeleteIcon} alt="Delete Post" />
            </div>
          )}
        </div>

      </div>
      <Menu cat={post.cat}/>
    </div>
  );
};

export default SinglePage;
