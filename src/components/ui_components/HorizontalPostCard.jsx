import React from 'react';
import { Link } from 'react-router';
import { FiCalendar, FiUser, FiArrowRight, FiTag, FiImage, FiCheckCircle, FiClock, FiArchive } from 'react-icons/fi';

const HorizontalPostCard = ({ post, formatDate }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FiCheckCircle className="w-4 h-4" />;
      case 'draft':
        return <FiClock className="w-4 h-4" />;
      case 'archived':
        return <FiArchive className="w-4 h-4" />;
      default:
        return <FiCheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-red-500';  
      case 'draft':
        return 'bg-yellow-500';
      case 'archived':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
          {post.image ? (
            <div className="w-full h-full">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover rounded-l-2xl transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-l-2xl flex-col items-center justify-center p-6">
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <FiImage className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Image not available
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-l-2xl flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 shadow-inner">
                <FiImage className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                No image available
              </p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <FiUser className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <FiCalendar className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                <FiTag className="w-3.5 h-3.5" />
                {post.category}
              </span>
              <span className={`flex items-center gap-1.5 px-3 py-1 ${getStatusColor(post.status)} text-white rounded-full text-sm font-medium`}>
                {getStatusIcon(post.status)}
                {post.status}
              </span>
            </div>
          </div>

          {/* Title Section */}
          <Link to={`/post/${post.slug}`} className="block group-hover:translate-x-1 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt Section */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 text-lg">
            {post.excerpt}
          </p>

          {/* Footer Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className={`w-2 h-2 rounded-full ${getStatusColor(post.status)}`}></span>
              <span className="capitalize">{post.status}</span>
            </div>
            <Link
              to={`/post/${post.slug}`}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group-hover:translate-x-1 transition-transform duration-300"
            >
              <span>Read Article</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalPostCard; 