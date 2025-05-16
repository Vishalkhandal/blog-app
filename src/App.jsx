import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router' 
import authService from './appwrite/auth';
import {login, logout, setUser} from "./features/auth/authSlice";
import { useDispatch } from 'react-redux';
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await authService.getCurrentUser();
        console.log("User from App component:", user);
        if (user) {
          dispatch(setUser(user));    
        }
      } catch (error) {
        console.log("No active session found:", error);
        dispatch(setUser(null));
      }
    }
    checkSession();
    setLoading(false);
  }, [])

  return !loading ? (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Outlet />
      </main>
      <Footer />
    </div>) : null
}

export default App
