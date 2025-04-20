import React from 'react'

function RegisterForm() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Register to Blog.</h2>
    <form className="space-y-5">
      <div>
        <label className="block mb-1 text-gray-700">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />
      </div>

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
          placeholder="Create a password"
        />
      </div>

      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        Register
      </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account? <a href="/login" className="text-blue-700 hover:underline">Login</a>
      </p>
    </form>
    </div>
  )
}

export default RegisterForm
