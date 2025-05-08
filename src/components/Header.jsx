import React, { useState } from 'react';
import { FiGithub, FiMoon, FiSun, FiTag, FiX, FiMenu, FiSearch } from 'react-icons/fi';
import { Link, NavLink } from 'react-router';
import Button from './ui_components/Button';
import Container from './ui_components/container/Container';
import Logo from './ui_components/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../features/theme/themeSlice';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()
  const [currentTheme, setCurrentTheme] = useState(theme);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme))
    setCurrentTheme(newTheme)

    document.getElementsByTagName('html')[0].classList.toggle("dark");     
  }

  return (
    <header className='bg-blue-100 dark:bg-gray-900 transition-colors duration-200' role="banner">
      <Container>
        <nav className='flex items-center justify-between py-4' role="navigation" aria-label="Main navigation">
          {/* Logo & Nav */}
          <div className='flex items-center justify-between w-full md:w-auto'>
            <Link to="/" className="flex items-center" aria-label="Home">
              <Logo className='text-3xl md:text-5xl font-bold dark:text-white'>
                Blog
              </Logo>
            </Link>

            {/* Desktop Navigation */}
            <ul className='hidden md:ml-4 md:flex items-center gap-4 text-xl' role="menubar">
              <li role="none">
                <NavLink to="/" className='hover:text-blue-900 dark:hover:text-blue-300 hover:border-b-2 cursor-pointer dark:text-white' role="menuitem">Home</NavLink>
              </li>
              <li role="none">
                <NavLink to="about" className='hover:text-blue-900 dark:hover:text-blue-300 hover:border-b-2 cursor-pointer dark:text-white' role="menuitem">About</NavLink>
              </li>
              <li role="none">
                <NavLink to="contact" className='hover:text-blue-900 dark:hover:text-blue-300 hover:border-b-2 cursor-pointer dark:text-white' role="menuitem">Contact</NavLink>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className='md:hidden text-2xl dark:text-white'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Right Controls */}
          <div className='hidden md:flex items-center gap-4'>
            <button
              className='cursor-pointer flex items-center gap-2 text-xl pr-2 border-r-4 dark:text-white dark:border-gray-700'
              aria-label="View tags"
            >
              <span aria-hidden="true"><FiTag /></span>
              <span>Tags</span>
            </button>

            <ul className='md:flex items-center text-xl' role="list">
              <li>
                <button
                  onClick={handleThemeToggle}
                  className='hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded p-3 cursor-pointer transition-colors duration-200'
                  aria-label={currentTheme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {currentTheme === 'light' ? (
                    <FiMoon aria-hidden="true" className="text-gray-700" />
                  ) : (
                    <FiSun aria-hidden="true" className="text-yellow-400" />
                  )}
                </button>
              </li>
            </ul>

            <div className='md:flex items-center gap-2'>
              <NavLink to="/auth/login">
                <Button className='hover:bg-blue-400 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600' bgColor='bg-blue-300' textColor='text-black dark:text-white'>
                  Login
                </Button>
              </NavLink>
              <NavLink to="/auth/register">
                <Button className='hover:bg-blue-400 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600' bgColor='bg-blue-300' textColor='text-black dark:text-white'>
                  Register
                </Button>
              </NavLink>
            </div>
          </div>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className='md:hidden px-4 pb-4 dark:bg-gray-900'
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className='flex flex-col gap-2 text-xl' role="menu">
            <li role="none">
              <NavLink to="/" className='hover:text-blue-900 dark:hover:text-blue-300 cursor-pointer dark:text-white' role="menuitem">Home</NavLink>
            </li>
            <li role="none">
              <NavLink to="about" className='hover:text-blue-900 dark:hover:text-blue-300 cursor-pointer dark:text-white' role="menuitem">About</NavLink>
            </li>
            <li role="none">
              <NavLink to="contact" className='hover:text-blue-900 dark:hover:text-blue-300 cursor-pointer dark:text-white' role="menuitem">Contact</NavLink>
            </li>
          </ul>

          <div className='flex flex-col gap-4 mt-4'>
            <div className='flex items-center gap-2 text-xl pb-2 dark:text-white'>
              <FiTag aria-hidden="true" />
              <p>Tags</p>
            </div>
            <ul className='flex gap-2 text-xl' role="list">
              <li>
                <button
                  onClick={handleThemeToggle}
                  className='hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded p-3 transition-colors duration-200'
                  aria-label={currentTheme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {currentTheme === 'light' ? (
                    <FiMoon aria-hidden="true" className="text-gray-700" />
                  ) : (
                    <FiSun aria-hidden="true" className="text-yellow-400" />
                  )}
                </button>
              </li>
            </ul>
            <div className='flex gap-2'>
              <NavLink to="/auth/login">
                <Button className='hover:bg-blue-400 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600' bgColor='bg-blue-300' textColor='text-black dark:text-white'>
                  Login
                </Button>
              </NavLink>
              <NavLink to="/auth/register">
                <Button className='hover:bg-blue-400 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600' bgColor='bg-blue-300' textColor='text-black dark:text-white'>
                  Register
                </Button>
              </NavLink>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
