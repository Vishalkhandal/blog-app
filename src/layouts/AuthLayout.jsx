import React from 'react'
import { Outlet } from 'react-router'
import { Header } from '../components'


function AuthLayout() {
    return (
        <>
            <Header />            
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AuthLayout
