import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import { login } from '../features/auth/authSlice';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    // For now, we'll simulate a successful login with the form data
    // In a real app, you would make an API call here
    const userData = {
      email: form.email,
      password: form.password,
      // Add any other user data you need
    };
    dispatch(login(userData));
    navigate("/admin");
  }

  return (
    <div>
    <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Login to Blog.</h2>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 text-gray-700">Email</label>
        <input
          type="email"
          name='email'
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700">Password</label>
        <input
          type="password"
          name='password'
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        Login
      </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don't have an account? <Link to="/auth/register" className="text-blue-700 hover:underline">Register</Link>
      </p>
    </form>
    </div>
  )
}

export default LoginForm
