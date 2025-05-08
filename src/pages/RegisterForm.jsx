import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import { login } from '../features/auth/authSlice';
import authService from '../appwrite/auth';
import { Button, Input } from "../components/index"
import { useForm } from 'react-hook-form';

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Register to Blog.</h2>
     

      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
          />
        </div>
        <div>
          <Input type="email" label="Email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
            })}
          />
        </div>

        <div>
          <Input type="password" label="Password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email", {
              required: true,
            })}
          />
        </div>

        <Button
          type='submit'
          bgColor='bg-blue-500'
          textColor='text-white'
          className='w-full hover:bg-blue-600 transition cursor-pointer'
        >
          Create Account
        </Button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <Link to="/auth/login" className="text-blue-700 hover:underline">Login</Link>
        </p>

      </form>
    </div>
  )
}

export default RegisterForm
