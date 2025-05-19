import React from 'react';
import { Link } from 'react-router';
import { FiBook, FiUsers, FiEdit, FiHeart } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const UnauthenticatedHome = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Share Your Story with the World
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-colors duration-300">
            Join our community of writers and readers. Share your thoughts, discover amazing stories, and connect with like-minded people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/register"
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Get Started Free
            </Link>
            <Link
              to="/auth/login"
              className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition duration-300">
              <FiBook className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Read Amazing Stories</h3>
              <p className="text-gray-600 dark:text-gray-300">Discover unique perspectives and engaging content from our community.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition duration-300">
              <FiEdit className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Write Your Story</h3>
              <p className="text-gray-600 dark:text-gray-300">Share your thoughts and experiences with our growing community.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition duration-300">
              <FiUsers className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Join the Community</h3>
              <p className="text-gray-600 dark:text-gray-300">Connect with writers and readers who share your interests.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition duration-300">
              <FiHeart className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Get Inspired</h3>
              <p className="text-gray-600 dark:text-gray-300">Find inspiration from diverse voices and perspectives.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">What You're Missing</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">Join now to access all our amazing content</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="h-48 bg-blue-100 dark:bg-gray-700"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Latest Stories</h3>
              <p className="text-gray-600 dark:text-gray-300">Access our latest articles and trending posts.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="h-48 bg-blue-100 dark:bg-gray-700"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Popular Categories</h3>
              <p className="text-gray-600 dark:text-gray-300">Explore content across various topics and interests.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="h-48 bg-blue-100 dark:bg-gray-700"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Community Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">Join discussions and share your perspective.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of writers and readers today!</p>
          <Link
            to="/auth/register"
            className="inline-block px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedHome; 