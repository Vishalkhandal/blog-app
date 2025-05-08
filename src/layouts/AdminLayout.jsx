import React from 'react'
import { Outlet } from 'react-router'
import AdminManu from '../components/admin/AdminManu'
import AdminSidebar from '../components/admin/AdminSidebar'

function AdminLayout() {
    return (
        <div className='flex min-h-screen'>            
            <AdminSidebar />
            <main className="flex-1 bg-gray-100 p-6 lg:ml-0">
                <AdminManu />
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout  