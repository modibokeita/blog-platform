import express from 'express';
import postsRoute from "./routes/posts.js"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import cors from "cors";
import cookieParser from 'cookie-parser';
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
app.use("/api/posts", postsRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
