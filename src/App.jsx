import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router'
import './App.css'
import { Footer, Header } from './components'
import authService from './appwrite/auth';
import {login, logout} from "./features/auth/authSlice";
import { useDispatch } from 'react-redux';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
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
