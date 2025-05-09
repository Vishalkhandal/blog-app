import React, { useState } from "react"
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
  FaBars,
  FaTimes,
} from "react-icons/fa"
import { MdCategory } from 'react-icons/md';

const AdminSidebar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Posts", icon: <FaPenFancy />, path: "/admin/posts" },
    { name: "Create Post", icon: <FaPlusSquare />, path: "/admin/create" },
    {name: "Categories", icon: <MdCategory /> , path: "/admin/categories"},
    { name: "Comments", icon: <FaRegComments />, path: "/admin/comments" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" }, // or handle logout with logic
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static bg-gray-900 text-white w-64 min-h-screen p-4 transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded mb-2 hover:bg-gray-700 ${
                  location.pathname === item.path ? "bg-gray-700" : ""
                }`}
                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}

export default AdminSidebar
