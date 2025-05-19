import React from 'react';
import { Link } from 'react-router';
import { FiCalendar, FiUser, FiTag, FiArrowRight } from 'react-icons/fi';

const LatestBlog = ({ blog, formatDate }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-4 text-sm mb-3">
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <FiCalendar className="w-4 h-4" />
                {formatDate(blog.date)}
              </span>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <FiUser className="w-4 h-4" />
                {blog.author}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-gray-200 line-clamp-2 mb-4">
              {blog.excerpt}
            </p>
            <Link
              to={`/post/${blog.slug}`}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              Read Full Story
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                Featured Post
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <FiTag className="w-4 h-4" />
                {blog.category}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Latest from Our Blog
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Discover our most recent and engaging content. This featured post represents the latest insights and stories from our community.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{blog.author}</p>
                <p className="text-xs">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FiCalendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{formatDate(blog.date)}</p>
                <p className="text-xs">Published Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlog; 