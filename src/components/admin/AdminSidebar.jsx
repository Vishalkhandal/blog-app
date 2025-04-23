import React from "react"
import { Link, useLocation } from "react-router"
import {
  FaTachometerAlt,
  FaPenFancy,
  FaRegComments,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaPlusSquare,
  FaHome,
} from "react-icons/fa"
import { MdCategory } from 'react-icons/md';

const AdminSidebar = () => {
  const location = useLocation()

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Posts", icon: <FaPenFancy />, path: "/admin/posts" },
    { name: "Create Post", icon: <FaPlusSquare />, path: "/admin/create" },
    {name: "Categories", icon: <MdCategory /> , path: "/admin/categories"},
    { name: "Comments", icon: <FaRegComments />, path: "/admin/comments" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/" }, // or handle logout with logic
  ]

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded mb-2 hover:bg-gray-700 ${location.pathname === item.path ? "bg-gray-700" : ""
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default AdminSidebar
