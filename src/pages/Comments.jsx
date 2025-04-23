import React, { useState } from 'react'

// Dummy comment data
const dummyComments = [
    {
        id: 1,
        author: 'John Doe',
        email: 'john@example.com',
        content: 'Great article! Very helpful.',
        postTitle: 'React Router Deep Dive',
        status: 'pending',
        date: '2025-04-20'
    },
    {
        id: 2,
        author: 'Jane Smith',
        email: 'jane@example.com',
        content: 'Thanks! This solved my problem.',
        postTitle: 'JavaScript Tricks',
        status: 'approved',
        date: '2025-04-18'
    }
]

function Comments() {
    const [comments, setComments] = useState(dummyComments)
    const [search, setSearch] = useState('')

    const filteredComments = comments.filter(comment =>
        comment.content.toLowerCase().includes(search.toLowerCase()) ||
        comment.author.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            setComments(comments.filter(c => c.id !== id))
        }
    }

    const toggleStatus = (id) => {
        setComments(comments.map(comment =>
            comment.id === id
                ? { ...comment, status: comment.status === 'approved' ? 'pending' : 'approved' }
                : comment
        ))
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Manage Comments</h1>

            <input
                type="text"
                placeholder="Search by content or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl shadow-sm"
            />

            <div className="overflow-x-auto">
                <table className="w-full mt-4 bg-white rounded-2xl shadow text-left">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2">Author</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Comment</th>
                            <th className="px-4 py-2">Post</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComments.map(comment => (
                            <tr key={comment.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{comment.author}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">{comment.email}</td>
                                <td className="px-4 py-2">{comment.content}</td>
                                <td className="px-4 py-2 text-blue-500">{comment.postTitle}</td>
                                <td className="px-4 py-2 capitalize">{comment.status}</td>
                                <td className="px-4 py-2 text-sm">{comment.date}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                                        onClick={() => toggleStatus(comment.id)}
                                    >
                                        {comment.status === 'approved' ? 'Unapprove' : 'Approve'}
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(comment.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredComments.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-gray-500">No comments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Comments
