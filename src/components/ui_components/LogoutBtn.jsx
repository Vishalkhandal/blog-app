import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../features/auth/authSlice'

function LogoutBtn({
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  const dispatch = useDispatch()
  const logoutHandler = async () => {
    try {
      console.log('button clicked')
      await authService.logout().then(() => {
          dispatch(logout())
        })
      } catch(error) {
        console.log("Logout error: ", error);
      }
    // try {
    //   const currentUser = await authService.getCurrentUser();
    //   console.log(currentUser)
    //   if (!currentUser) {
    //     console.warn("User already logged out.");
    //     dispatch(logout());
    //     return;
    //   }
    //   await authService.logout().then(() => {
    //     dispatch(logout())
    //   })
    // } catch (error) {
    //   console.error("Logout error:", error);
    // }
  }
  return (
    <>
      <button
        className={`px-4 py-2 rounded ${bgColor} ${textColor} ${className}`} {...props}
        onClick={logoutHandler}
      >Logout</button>
    </>
  )
}

export default LogoutBtn