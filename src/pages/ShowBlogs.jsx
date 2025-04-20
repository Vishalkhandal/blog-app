import React, { useState } from 'react'
import { Link } from 'react-router';

function ShowBlogs() {
    const [blogs, setBlog] = useState([{
        id: 1,
        title: "blog app",
        author: "Vishal khandal",
        content: "content",
      },
      {
        id: 2,
        title: "blog app",
        author: "Vishal khandal",
        content: "content",
      },
      {
        id: 3,
        title: "blog app",
        author: "Vishal khandal",
        content: "content",
      }]);


    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">All Blogs</h1>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-2">Title</th>
                        <th className="p-2">Author</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id} className="border-t">
                            <td className="p-2">{blog.title}</td>
                            <td className="p-2">{blog.author}</td>
                            <td className="p-2 space-x-2">
                                <Link
                                    to={`/admin/edit/${blog.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button className="text-red-500 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowBlogs    