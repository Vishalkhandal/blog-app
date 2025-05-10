import React, { useState } from 'react';
import { FiMoon, FiSun, FiX, FiMenu } from 'react-icons/fi';
import { Link, NavLink } from 'react-router';
import Container from './ui_components/container/Container';
import Logo from './ui_components/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../features/theme/themeSlice';
import LogoutBtn from './ui_components/LogoutBtn';

function Header() {
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme)
  const [currentTheme, setCurrentTheme] = useState(theme);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme))
    setCurrentTheme(newTheme)
    document.getElementsByTagName('html')[0].classList.toggle("dark");
  }

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "All Posts",
      slug: "/posts",
      active: true
    },
    {
      name: "Add Post",
      slug: "/post/create",
      active: authStatus
    },
    {
      name: "Login",
      slug: "/auth/login",
      active: !authStatus
    },
    {
      name: "Register",
      slug: "/auth/register",
      active: !authStatus
    },
  ]

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
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.slug} role="none">
                    <NavLink
                      to={item.slug}
                      className='hover:text-blue-900 dark:hover:text-blue-300 cursor-pointer text-black dark:text-white'
                      role="menuitem"
                      aria-label={item.name}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li role="none">
                  <LogoutBtn
                    type="button"
                    bgColor="bg-blue-600"
                    textColor="text-white"
                    className="hover:bg-blue-400 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600"
                  />
                </li>
              )}
            </ul>
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
          </ul>

          <div className='flex flex-col gap-4 mt-4'>
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
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.slug} role="none">
                    <NavLink
                      to={item.slug}
                      className='hover:text-blue-900 dark:hover:text-blue-300 cursor-pointer text-black dark:text-white'
                      role="menuitem"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li role="none">
                  <LogoutBtn
                    type="button"
                    bgColor="bg-blue-600"
                    textColor="text-white"
                    className="hover:bg-blue-400 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600"
                  />
                </li>
              )}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
