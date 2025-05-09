import React, {useState} from 'react'
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
  const [user, setUser] = useState("")
  const logoutHandler = async (user) => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(() => user = currentUser.name)
      if (!currentUser) {
        console.warn("User already logged out.");
        dispatch(logout());
        return;
      }
      await authService.logout().then(() => {
        dispatch(logout())
      })
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  return (
    <>
      <p>{user}</p>
      <button
        className={`px-4 py-2 rounded ${bgColor} ${textColor} ${className}`} {...props}
        onClick={logoutHandler}
      >Logout</button>
    </>
  )
}

export default LogoutBtn