// import React from 'react'
// import { Outlet } from 'react-router'


// function AuthLayout() {
//     return (
//         <>
//             <div>hello auth layout</div>
//             <Outlet />

//         </>
//     )
// }

// export default AuthLayout


import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'

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
