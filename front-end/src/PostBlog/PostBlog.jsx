import ReactQuill from "react-quill";
import  { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./postBlog.css"
function PostBlog() {
  const [value, setValue] = useState("");
  console.log(value)
  return (
    <div className="add">
      <div className="content">
        <input type="text" name="" id="" placeholder="Title"/>
        <div className="editorContainer">
        <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input type="file" name="" id="file" />
          <label htmlFor="file">Uplod Image</label>
          <div className="buttons">
            <button>Save As Draft</button>
            <button>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <input type="radio" name="cat" id="art" value="art" />
          <label htmlFor="art">Art</label>
          <input type="radio" name="cat" id="science" value="science" />
          <label htmlFor="science">Science</label>
          <input type="radio" name="cat" id="technology" value="technology" />
          <label htmlFor="technology">Technology</label>
          <input type="radio" name="cat" id="design" value="design" />
          <label htmlFor="design">Design</label>
        </div>
      </div>

    </div>
  );
}

export default PostBlog;
