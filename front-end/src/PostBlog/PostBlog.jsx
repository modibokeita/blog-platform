import { useState } from "react";
import "./postBlog.css"
function PostBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("Draft");

  // Handle changes in the title input
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle changes in the content textarea
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle save draft action
  const handleSaveDraft = () => {
    setStatus("Draft");
    console.log("Draft saved:", { title, content, selectedCategory, image });
    // You can add logic to save the draft to local storage or a database here
  };

  // Handle publish action
  const handlePublish = () => {
    setStatus("Published");
    console.log("Post published:", { title, content, selectedCategory, image });
    // Add logic to save the post as published to a database or backend service
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="editorContainer">
          <textarea
            placeholder="Write your post content here..."
            value={content}
            onChange={handleContentChange}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> {status}
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <label className="file" htmlFor="file">
            {image ? image.name : "Upload Image"}
          </label>
          <div className="buttons">
            <button onClick={handleSaveDraft}>Save as a draft</button>
            <button onClick={handlePublish}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              onChange={handleCategoryChange}
              checked={selectedCategory === "art"}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              id="science"
              onChange={handleCategoryChange}
              checked={selectedCategory === "science"}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              id="technology"
              onChange={handleCategoryChange}
              checked={selectedCategory === "technology"}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              id="design"
              onChange={handleCategoryChange}
              checked={selectedCategory === "design"}
            />
            <label htmlFor="design">Design</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostBlog;
