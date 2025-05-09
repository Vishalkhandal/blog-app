import { createBrowserRouter } from "react-router";
import MainLayout from "../components/ui_layouts/MainLayout";
import Home from "../pages/Home";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import PostDetails from "../pages/PostDetails";
import Login from "../pages/Login";
import AuthLayout from "../components/ui_layouts/AuthLayout";
import Register from "../pages/Register";
import ShowPosts from "../pages/ShowPosts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "post/:id", element: <PostDetails /> },
            { path: "posts", element: <ShowPosts /> },
            {
                path: "post",
                children: [
                    { path: "create", element: <CreatePost /> },
                    { path: "edit/:id", element: <EditPost /> },
                ]
            }
        ]
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> }
        ]
    },
])

export default router;