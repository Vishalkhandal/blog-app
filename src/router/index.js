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
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: MainLayout,
                children: [
                    { index: true, Component: Home },
                    { path: "post/:id", Component: PostDetails },
                    { path: "posts", Component: ShowPosts },
                    {
                        path: "post",
                        children: [
                            { path: "create", Component: CreatePost },
                            { path: "edit/:id", Component: EditPost },
                        ]
                    }
                ]
            },
            {
                path: "auth",
                Component: AuthLayout,
                children: [
                    { path: "login", Component: Login },
                    { path: "register", Component: Register }
                ]
            },
        ]
    }
])