import React, { useState } from 'react';
import { Link } from 'react-router'; // fix: react-router-dom

function ShowBlogs() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'AI in Healthcare',
      author: 'Vishal Khandal',
      content: 'content',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Web3: The Future?',
      author: 'Vishal Khandal',
      content: 'content',
      status: 'Inactive',
    },
    {
      id: 3,
      title: 'React vs Vue',
      author: 'Vishal Khandal',
      content: 'content',
      status: 'Active',
    },
  ]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">📚 All Blogs</h1>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left text-blue-800">
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Author</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="border-t border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="px-4 py-3">{blog.title}</td>
                <td className="px-4 py-3">{blog.author}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      blog.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>

                <td className="px-4 py-3 space-x-2">
                  <Link
                    to={`/admin/edit/${blog.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button className="text-red-500 hover:underline font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowBlogs;
