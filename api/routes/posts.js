import express from 'express';
import addPost from '../controllers/post.js';
const rouer = express.Router();
rouer.get("/test", addPost);

export default rouer;

