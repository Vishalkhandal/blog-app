import React from 'react';
import { Link } from 'react-router';
import { FiCalendar, FiUser, FiTag, FiImage } from 'react-icons/fi';

const Card = ({ post, formatDate }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`w-full h-full ${post.image ? 'hidden' : 'flex'} flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700`}>
          <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 shadow-inner">
            <FiImage className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            No image available
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <FiCalendar className="w-4 h-4" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <FiUser className="w-4 h-4" />
            {post.author}
          </span>
        </div>
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
            <FiTag className="w-4 h-4" />
            {post.category}
          </span>
          <Link
            to={`/post/${post.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Card;