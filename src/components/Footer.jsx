import React from 'react'
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router'

function Footer() {
  const theme = useSelector((state) => state.theme.theme)

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-0 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand + Description */}
        <div>
          <h2 className="text-3xl font-bold mb-3 text-blue-600 dark:text-blue-400">Blog.</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            A place to share knowledge, stories, and ideas with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/"
                className={({ isActive }) => 
                  `text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block
                  ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about"
                className={({ isActive }) => 
                  `text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block
                  ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact"
                className={({ isActive }) => 
                  `text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block
                  ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/tags"
                className={({ isActive }) => 
                  `text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block
                  ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`
                }
              >
                Tags
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Legal</h4>
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/privacy"
                className={({ isActive }) => 
                  `text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block
                  ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`
                }
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/terms"
                className={({ isActive }) => 
                  `text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block
                  ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`
                }
              >
                Terms of Service
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/cookies"
                className={({ isActive }) => 
                  `text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block
                  ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`
                }
              >
                Cookie Policy
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/disclaimer"
                className={({ isActive }) => 
                  `text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block
                  ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`
                }
              >
                Disclaimer
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Follow Us</h4>
          <div className="flex gap-5 text-2xl">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FiTwitter />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a 
              href="mailto:someone@example.com" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        © {new Date().getFullYear()} Blog. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
