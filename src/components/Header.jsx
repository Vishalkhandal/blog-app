import React from 'react'
import { FiGithub, FiMoon, FiSun, FiTag, FiX } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'

function Header() {
  return (
    <div className='flex items-center justify-between bg-blue-100 p-5'>
      <div className='flex items-center justify-start gap-5'>
        <h2 className='text-5xl font-bold pr-2'>Blog.</h2>
        <ul className='flex items-center gap-4 text-xl'>
          <li className='hover:text-blue-900 hover:border-b-2'>Home</li>
          <li className='hover:text-blue-900 hover:border-b-2'>About</li>
          <li className='hover:text-blue-900 hover:border-b-2'>Contact</li>
        </ul>
      </div>
      <div className='flex items-center justify-center'>
        <form className='flex gap-4 bg-gray-50 p-2 rounded'>
          <input type="text" className='bg-gray-50 border-none outline-0' />
          <button className='text-gray-500'><FiSearch /></button>
        </form>
      </div>
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-2 text-xl pr-2 border-r-4'>
          <FiTag />
          <p>Tags</p>
        </div>
        <div>
          <ul className='flex items-center text-xl'>
            <li className='hover:bg-blue-300 hover:text-black rounded p-3'><FiGithub /></li>
            <li className='hover:bg-blue-300 hover:text-black rounded p-3'><FiX /></li>
            <li className='hover:bg-black hover:text-white rounded p-3'><FiMoon /></li>
            <li className='hover:bg-black hover:text-white rounded p-3'><FiSun /></li>
          </ul>
        </div>
        <div className='flex items-center gap-2'>
          {/* <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="" className='size-8 rounded-full' />
          <p>
            <span>Hi,</span>Vishal
          </p> */}

          <button className='py-1 px-2 hover:bg-blue-400 bg-blue-300 text-black rounded'>Login</button>
          <button className='py-1 px-2 hover:bg-blue-400 bg-blue-300 text-black rounded'>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Header