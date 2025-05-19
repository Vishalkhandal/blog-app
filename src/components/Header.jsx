import React, { useState } from 'react';
import { FiMoon, FiSun, FiX, FiMenu, FiUser } from 'react-icons/fi';
import { Link, NavLink } from 'react-router';
import Container from './ui_components/container/Container';
import Logo from './ui_components/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../features/theme/themeSlice';
import LogoutBtn from './ui_components/LogoutBtn';

function Header() {
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
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
    <header className='sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-all duration-300' role="banner">
      <Container>
        <nav className='flex items-center justify-between py-4' role="navigation" aria-label="Main navigation">
          {/* Logo & Nav */}
          <div className='flex items-center justify-between w-full md:w-auto'>
            <Link to="/" className="flex items-center group" aria-label="Home">
              <Logo className='text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105'>
                Blog
              </Logo>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className='md:hidden text-2xl text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Right Controls */}
          <div className='hidden md:flex items-center gap-6'>
            <ul className='flex items-center gap-3 text-lg' role="list">
              <li>
                <button
                  onClick={handleThemeToggle}
                  className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200'
                  aria-label={currentTheme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {currentTheme === 'light' ? (
                    <FiMoon className="text-gray-700 w-5 h-5" />
                  ) : (
                    <FiSun className="text-yellow-400 w-5 h-5" />
                  )}
                </button>
              </li>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.slug} role="none">
                    <NavLink
                      to={item.slug}
                      className={({ isActive, isPending }) =>
                        `relative px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200
                        ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}
                        ${isPending ? 'opacity-70' : ''}
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400
                        after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                        hover:after:scale-x-100 ${isActive ? 'after:scale-x-100' : ''}`
                      }
                      role="menuitem"
                      aria-label={item.name}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (
                <>
                  <li role="none" className="flex items-center">
                    <Link
                      to={`/profile/${userData?.$id}`}
                      className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <FiUser className="w-5 h-5" />
                      <span className="font-medium">{userData?.name || 'Profile'}</span>
                    </Link>
                  </li>
                  <li role="none">
                    <LogoutBtn
                      type="button"
                      bgColor="bg-blue-600 hover:bg-blue-700"
                      textColor="text-white"
                      className="px-4 py-2 rounded-lg transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className='md:hidden px-4 pb-4 bg-white dark:bg-gray-900 shadow-lg animate-slideDown'
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className='flex flex-col gap-3 text-lg' role="menu">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.slug} role="none">
                  <NavLink
                    to={item.slug}
                    className={({ isActive, isPending }) =>
                      `block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200
                      ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}
                      ${isPending ? 'opacity-70' : ''}`
                    }
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>

          <div className='flex flex-col gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between px-4'>
              <button
                onClick={handleThemeToggle}
                className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                aria-label={currentTheme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
              >
                {currentTheme === 'light' ? (
                  <FiMoon className="text-gray-700 w-5 h-5" />
                ) : (
                  <FiSun className="text-yellow-400 w-5 h-5" />
                )}
              </button>
            </div>
            
            {authStatus && (
              <div className='flex flex-col gap-3'>
                <Link
                  to={`/profile/${userData?.$id}`}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiUser className="w-5 h-5" />
                  <span className="font-medium">{userData?.name || 'Profile'}</span>
                </Link>
                <div className="px-4">
                  <LogoutBtn
                    type="button"
                    bgColor="bg-blue-600 hover:bg-blue-700"
                    textColor="text-white"
                    className="w-full px-4 py-2 rounded-lg transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
                  />
                </div>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
