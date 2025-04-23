import React, { useState } from 'react'

// Dummy data (replace with API data later)
const dummyUsers = [
    { id: 1, name: 'Vishal Khandal', email: 'vishal@example.com', role: 'admin', joined: '2024-12-01' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'editor', joined: '2025-01-15' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'subscriber', joined: '2025-02-20' },
]

function Users() {
    const [users, setUsers] = useState(dummyUsers)
    const [search, setSearch] = useState('')

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== id))
        }
    }

    const handleRoleToggle = (id) => {
        setUsers(users.map(user =>
            user.id === id
                ? { ...user, role: user.role === 'admin' ? 'subscriber' : 'admin' }
                : user
        ))
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>

            <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl shadow-sm"
            />

            <div className="overflow-x-auto">
                <table className="w-full text-left mt-4 bg-white rounded-2xl shadow">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Joined</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2 capitalize">{user.role}</td>
                                <td className="px-4 py-2">{user.joined}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                                        onClick={() => handleRoleToggle(user.id)}
                                    >
                                        Toggle Role
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
