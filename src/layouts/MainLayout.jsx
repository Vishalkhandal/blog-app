import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'


function MainLayout() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='container mx-auto px-4 pyy-6'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout   