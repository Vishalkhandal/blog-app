import React from 'react'
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="bg-blue-100 text-black mt-10">
      <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand + Description */}
        <div>
          <h2 className="text-3xl font-bold mb-3">Blog.</h2>
          <p className="text-gray-700 leading-relaxed">
            A place to share knowledge, stories, and ideas with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-blue-900 hover:underline cursor-pointer">Home</li>
            <li className="hover:text-blue-900 hover:underline cursor-pointer">About</li>
            <li className="hover:text-blue-900 hover:underline cursor-pointer">Contact</li>
            <li className="hover:text-blue-900 hover:underline cursor-pointer">Tags</li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-blue-900 hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-900 hover:underline cursor-pointer">Terms of Service</li>
            <li className="hover:text-blue-900 hover:underline cursor-pointer">Cookie Policy</li>
            <li className="hover:text-blue-900 hover:underline cursor-pointer">Disclaimer</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-5 text-2xl text-gray-700">
            <a href="#" className="hover:text-blue-900 transition-all"><FiGithub /></a>
            <a href="#" className="hover:text-blue-900 transition-all"><FiTwitter /></a>
            <a href="#" className="hover:text-blue-900 transition-all"><FiLinkedin /></a>
            <a href="mailto:someone@example.com" className="hover:text-blue-900 transition-all"><FiMail /></a>
          </div>
        </div>
      </div>

      <div className="bg-blue-200 text-center py-4 text-sm text-gray-800 border-t border-blue-300">
        © {new Date().getFullYear()} Blog. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
