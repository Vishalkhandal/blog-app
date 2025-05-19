import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import Card from '../components/ui_components/Card';
import service from '../appwrite/config';
import { Query } from 'appwrite';
import { FiBook, FiLock, FiArrowRight, FiChevronDown, FiCheckCircle, FiClock, FiPauseCircle, FiXCircle } from 'react-icons/fi';

function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('active');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const postsPerPage = 6;
  const userData = useSelector((state) => state.auth.userData);

  const statusOptions = [
    { value: 'active', label: 'Active Posts', icon: <FiCheckCircle className="w-4 h-4" /> },
    { value: 'inactive', label: 'Inactive Posts', icon: <FiXCircle className="w-4 h-4" /> },
    { value: 'draft', label: 'Draft Posts', icon: <FiClock className="w-4 h-4" /> },
    { value: 'all', label: 'All Posts', icon: <FiBook className="w-4 h-4" /> }
  ];

  useEffect(() => {
    if (userData) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [currentPage, userData, statusFilter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Prepare queries based on status filter
      const queries = [];
      if (statusFilter !== 'all') {
        queries.push(Query.equal("status", statusFilter));
      }

      // Get total count of posts
      const totalResponse = await service.getPosts(queries);
      const totalPosts = totalResponse?.total || 0;
      setTotalPages(Math.ceil(totalPosts / postsPerPage));

      // Get paginated posts
      const response = await service.getPosts([
        ...queries,
        Query.limit(postsPerPage),
        Query.offset((currentPage - 1) * postsPerPage),
        Query.orderDesc('$createdAt')
      ]);

      if (response) {
        const formattedPosts = response.documents.map(post => ({
          id: post.$id,
          title: post.title,
          excerpt: post.excerpt,
          image: post.featuredImage ? service.getFileView(post.featuredImage) : null,
          category: post.category,
          author: post.authorName,
          date: post.$createdAt,
          slug: post.slug,
          status: post.status
        }));
        setPosts(formattedPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'draft':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FiLock className="w-16 h-16 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="pt-20 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome to Our Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Join our community to explore amazing stories, share your thoughts, and connect with other writers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/auth/login"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
            >
              Sign In
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-blue-500 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200"
            >
              Create Account
              <FiBook className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
              <FiBook className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Discover stories from our community
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Posts</h1>
        
        {/* Status Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <span className="text-gray-700 dark:text-gray-300">
              {statusOptions.find(option => option.value === statusFilter)?.label}
            </span>
            <FiChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-10">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setStatusFilter(option.value);
                    setIsDropdownOpen(false);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    statusFilter === option.value ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                  }`}
                >
                  <span className={getStatusColor(option.value)}>{option.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {posts.map((post) => (
          <Card key={post.id} post={post} formatDate={formatDate} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              } transition`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ShowPosts;