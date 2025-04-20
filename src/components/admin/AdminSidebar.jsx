import React from "react";
import {
  FaTachometerAlt,
  FaPenFancy,
  FaRegComments,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";


const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, page: "dashboard" },
    { name: "Posts", icon: <FaPenFancy />, page: "posts" },
    { name: "Comments", icon: <FaRegComments />, page: "comments" },
    { name: "Users", icon: <FaUsers />, page: "users" },
    { name: "Settings", icon: <FaCog />, page: "settings" },
    { name: "Logout", icon: <FaSignOutAlt />, page: "logout" },
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.page}
            className={`flex items-center gap-3 p-3 rounded cursor-pointer mb-2 hover:bg-gray-700 ${
              currentPage === item.page ? "bg-gray-700" : ""
            }`}
            onClick={() => setCurrentPage(item.page)}
          >
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
