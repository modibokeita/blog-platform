import express from 'express';
import postsRoute from "./routes/posts.js"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import cors from "cors";
import cookieParser from 'cookie-parser';
import multer from "multer";
const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }));
const port = 8800;
app.use(express.json());
app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});
app.use("/api/posts", postsRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
