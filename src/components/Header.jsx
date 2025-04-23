import React, { useState } from 'react';
import { FiGithub, FiMoon, FiSun, FiTag, FiX, FiMenu, FiSearch } from 'react-icons/fi';
import { Link, NavLink } from 'react-router';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='bg-blue-100'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-0'>
        {/* Logo & Nav */}
        <div className='flex items-center justify-between w-full md:w-auto'>
          <h2 className='text-3xl md:text-5xl font-bold'>Blog.</h2>

          {/* Desktop Nav */}
          <ul className='hidden md: ml-4 md:flex items-center gap-4 text-xl'>
            <NavLink to="/" className='hover:text-blue-900 hover:border-b-2 cursor-pointer'>Home</NavLink>
            <NavLink to="about" className='hover:text-blue-900 hover:border-b-2 cursor-pointer'>About</NavLink>
            <NavLink to="contact" className='hover:text-blue-900 hover:border-b-2 cursor-pointer'>Contact</NavLink>
          </ul>
          {/* Hamburger menu for mobile */}
          <button
            className='md:hidden text-2xl'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>



        {/* Right Controls */}
        <div className='hidden md:flex items-center gap-4'>


          <button className='cursor-pointer flex items-center gap-2 text-xl pr-2 border-r-4'><span><FiTag /></span><span>Tags</span></button>

          <ul className='md:flex items-center text-xl'>
            <li className='hover:bg-black hover:text-white rounded p-3 cursor-pointer'><FiMoon /></li>
            <li className='hover:bg-black hover:text-white rounded p-3 cursor-pointer'><FiSun /></li>
          </ul>
          <div className='md:flex items-center gap-2'>
            <NavLink to="/auth/login" className='py-1 px-2 hover:bg-blue-400 bg-blue-300 text-black rounded cursor-pointer'>Login</NavLink>
            <NavLink to="/auth/register" className='py-1 px-2 hover:bg-blue-400 bg-blue-300 text-black rounded cursor-pointer'>Register</NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className='md:hidden px-4 pb-4'>
          <ul className='flex flex-col gap-2 text-xl'>
            <li className='hover:text-blue-900 cursor-pointer'>Home</li>
            <li className='hover:text-blue-900 cursor-pointer'>About</li>
            <li className='hover:text-blue-900 cursor-pointer'>Contact</li>
          </ul>

          <div className='flex flex-col gap-4 mt-4'>
            <div className='flex items-center gap-2 text-xl pb-2'>
              <FiTag />
              <p>Tags</p>
            </div>
            <ul className='flex gap-2 text-xl'>
              <li className='hover:bg-black hover:text-white rounded p-3'><FiMoon /></li>
              <li className='hover:bg-black hover:text-white rounded p-3'><FiSun /></li>
            </ul>
            <div className='flex gap-2'>
              <button className='w-full py-1 px-2 hover:bg-blue-400 bg-blue-300 text-black rounded cursor-pointer'>Login</button>
              <button className='w-full py-1 px-2 hover:bg-blue-400 bg-blue-300 text-black rounded cursor-pointer'>Register</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
