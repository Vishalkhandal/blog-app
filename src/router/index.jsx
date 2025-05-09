import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import BlogDetails from "../pages/BlogDetails";
import Login from "../pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register";
import ShowBlogs from "../pages/ShowBlogs";
import Users from "../pages/Users";
import Comments from "../pages/Comments";
import Settings from "../pages/Settings";
import Categories from "../pages/Categories";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "post/:id", element: <BlogDetails /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> }
        ]
    },
    {
        path: "admin",
        // element: (
        //     <ProtectedRoute>
        //         <AdminLayout />
        //     </ProtectedRoute>
        // ),
        element: <AdminLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "create", element: <CreateBlog /> },
            { path: "edit/:id", element: <EditBlog /> },
            { path: "categories", element: <Categories /> },
            { path: "posts", element: <ShowBlogs /> },
            { path: "users", element: <Users /> },
            { path: "comments", element: <Comments /> },
            { path: "settings", element: <Settings /> }
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