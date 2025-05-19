import React, { useState, useEffect } from 'react';
import { FiSearch, FiX, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Card from '../components/ui_components/Card';
import LatestBlog from '../components/LatestBlog';
import service from '../appwrite/config';
import { Query } from 'appwrite';
import UnauthenticatedHome from "../components/UnauthenticatedHome"
import { useSelector } from 'react-redux';

const POSTS_PER_PAGE = 9;

const Home = () => {
  const [search, setSearch] = useState('');
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search changes
  }, [search]);

  const fetchBlogs = async () => {
    try {
      const response = await service.getPosts([Query.equal("status", "active")]);
      if (response) {
        const posts = response.documents.map(post => ({
          id: post.$id,
          title: post.title,
          excerpt: post.excerpt,
          image: post.featuredImage ? service.getFileView(post.featuredImage) : null,
          category: post.category,
          author: post.authorName,
          date: post.$createdAt,
          slug: post.slug
        }));
        setAllBlogs(posts);
        setFilteredBlogs(posts);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setFilteredBlogs(allBlogs);
      return;
    }

    const filtered = allBlogs.filter((blog) =>
      (blog.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (blog.category?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (blog.author?.toLowerCase() || '').includes(search.toLowerCase())
    );
    
    setFilteredBlogs(filtered);
  };

  const clearSearch = () => {
    setSearch('');
    setFilteredBlogs(allBlogs);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  const latestBlog = [...filteredBlogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const otherBlogs = [...filteredBlogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(1)
    .slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
      </div>
    );
  } 

  if(allBlogs.length === 0) {
    return (
      <UnauthenticatedHome />
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      {/* Latest Blog */}
      {latestBlog && (
        <section className='mb-16'>
          <LatestBlog blog={latestBlog} formatDate={formatDate} />
        </section>
      )}

      {/* Search Section */}
      <div className='mb-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
            Discover Amazing Content
          </h2>
          <form onSubmit={handleSearch} className='relative'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search by title, category, or author...'
                className='w-full p-4 pl-12 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-colors duration-300'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500' />
              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300'
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
            <div className='mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
              <div className='flex items-center gap-2'>
                <FiFilter className='w-4 h-4' />
                <span>Filter by: Title, Category, Author</span>
              </div>
              {filteredBlogs.length !== allBlogs.length && (
                <button
                  onClick={clearSearch}
                  className='text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300'
                >
                  Clear Filters
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* All Blogs */}
      <section>
        <h2 className='text-3xl font-bold mb-8 text-gray-900 dark:text-white transition-colors duration-300'>
          More Stories
        </h2>
        {otherBlogs.length > 0 ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {otherBlogs.map((blog) => (
                <Card key={blog.id} post={blog} formatDate={formatDate} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    currentPage === 1
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 rounded-lg transition-colors duration-300 ${
                        currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Next
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500 dark:text-gray-400 text-lg'>
              No blogs found for your search.
            </p>
            <button
              onClick={clearSearch}
              className='mt-4 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300'
            >
              View All Blogs
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
