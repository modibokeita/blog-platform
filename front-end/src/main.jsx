
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React from "react";
import App from './App/App.jsx'
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer/Footer.jsx";
import SinglePage from "./SinglePage/SinglePage.jsx";
import PostBlog from "./PostBlog/PostBlog.jsx";
import UserProfile from "./UserProfile/UserProfile.jsx";
import { AuthContexProvider } from "./Context/AuthContext.jsx";
const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/api/post/:id",
        element: <SinglePage />,
      },
      {
        path: "/write",
        element: <PostBlog />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
    ]
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContexProvider>
      <RouterProvider router={router} />
    </AuthContexProvider>
  </React.StrictMode>
);
