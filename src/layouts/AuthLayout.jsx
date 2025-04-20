import React from 'react'
import { Outlet } from 'react-router'


function AuthLayout() {
    return (
        <>
            <div>hello auth layout</div>
            <Outlet />
            
        </>
    )
}

export default AuthLayout