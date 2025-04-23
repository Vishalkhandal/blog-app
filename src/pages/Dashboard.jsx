import React from 'react'
import { Link } from 'react-router'
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

// Dummy data for views chart
const viewsData = [
    { day: 'Mon', views: 300 },
    { day: 'Tue', views: 450 },
    { day: 'Wed', views: 380 },
    { day: 'Thu', views: 500 },
    { day: 'Fri', views: 420 },
    { day: 'Sat', views: 600 },
    { day: 'Sun', views: 700 }
]

function Dashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Posts" value="120" color="blue" />
                <StatCard title="Published Posts" value="98" color="green" />
                <StatCard title="Drafts" value="22" color="yellow" />
                <StatCard title="Pending Comments" value="5" color="red" />
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Views Analytics</h2>
                    <ul className="text-gray-700 space-y-1 mb-4">
                        <li>Views Today: <span className="font-bold text-blue-500">543</span></li>
                        <li>This Week: <span className="font-bold text-blue-500">3,240</span></li>
                        <li>This Month: <span className="font-bold text-blue-500">12,487</span></li>
                    </ul>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={viewsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">User Analytics</h2>
                    <ul className="text-gray-700 space-y-1">
                        <li>Total Users: <span className="font-bold text-green-500">1,234</span></li>
                        <li>New Today: <span className="font-bold text-green-500">14</span></li>
                        <li>Active Now: <span className="font-bold text-green-500">7</span></li>
                    </ul>
                </div>
            </div>

            {/* Most Viewed Posts */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Most Viewed Posts</h2>
                <ul className="space-y-2 text-gray-700">
                    <li>🔥 React Router Deep Dive — <span className="text-blue-500 font-semibold">1,245 views</span></li>
                    <li>🔥 JavaScript Tricks — <span className="text-blue-500 font-semibold">1,089 views</span></li>
                    <li>🔥 Tailwind CSS Tips — <span className="text-blue-500 font-semibold">987 views</span></li>
                </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link to="/admin/create" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">➕ New Post</Link>
                    <Link to="/admin/categories" className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700">📁 Manage Categories</Link>
                </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Posts</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-600">
                            <th className="py-2">Title</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        <tr className="border-t">
                            <td className="py-2">Understanding React Router</td>
                            <td className="py-2">Published</td>
                            <td className="py-2">April 20, 2025</td>
                        </tr>
                        <tr className="border-t">
                            <td className="py-2">Using Tailwind with React</td>
                            <td className="py-2">Draft</td>
                            <td className="py-2">April 18, 2025</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Top Categories */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Categories</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>React.js (40 posts)</li>
                    <li>JavaScript (32 posts)</li>
                    <li>Web Design (25 posts)</li>
                </ul>
            </div>
        </div>
    )
}

function StatCard({ title, value, color }) {
    const colorClasses = {
        blue: "text-blue-500",
        green: "text-green-500",
        yellow: "text-yellow-500",
        red: "text-red-500",
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-medium text-gray-600">{title}</h3>
            <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
        </div>
    )
}

export default Dashboard
