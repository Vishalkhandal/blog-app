import React from 'react'

function LoginForm() {
  return (
    <div>
    <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Login to Blog.</h2>
    <form className="space-y-5">
      <div>
        <label className="block mb-1 text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
        />
      </div>

      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        Login
      </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don't have an account? <a href="/register" className="text-blue-700 hover:underline">Register</a>
      </p>
    </form>
    </div>
  )
}

export default LoginForm
