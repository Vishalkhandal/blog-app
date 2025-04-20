import React from 'react'
import { Link, Outlet } from 'react-router'
import Footer from '../components/Footer'

function AdminLayout() {
    return (
        <div flex min-h-screen>
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <nav className="flex flex-col space-y-2">
                    <Link to="/admin/dashboard" className="hover:text-yellow-300">Dashboard</Link>
                    <Link to="/admin/create" className="hover:text-yellow-300">Create Blog</Link>
                </nav>
            </aside>
            <main className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout  