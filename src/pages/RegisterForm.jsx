import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import { register } from '../features/auth/authSlice';

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  function handleSubmit(e) {
    e.preventDefault();
    // Create user data object with form values
    const userData = {
      name: form.name,
      email: form.email,
      password: form.password
    };
    dispatch(register(userData));
    navigate('/auth/login');
  }

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Register to Blog.</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            required
          />
        </div>

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
            placeholder="Create a password"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Register
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <Link to="/auth/login" className="text-blue-700 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterForm
