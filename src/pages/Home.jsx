import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import Card from '../components/ui_components/Card';
import service from '../appwrite/config';
import { Query } from 'appwrite';
import UnauthenticatedHome from "../components/UnauthenticatedHome"

const Home = () => {
  const [search, setSearch] = useState('');
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

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
    console.log(filtered)
  };

  const clearSearch = () => {
    setSearch('');
    setFilteredBlogs(allBlogs);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const latestBlogs = [...filteredBlogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
      {/* Latest Blogs */}
      <section className='mb-14'>
        <h2 className='text-3xl font-bold mb-6'>Latest Blogs</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8'>
          {latestBlogs.map((blog) => (
            <Card key={blog.id} post={blog} formatDate={formatDate} />
          ))}
        </div>
      </section>

      {/* Search */}
      <div className='mb-10'>
        <form onSubmit={handleSearch} className='flex flex-col sm:flex-row items-center gap-3'>
          <div className='relative w-full sm:w-[500px]'>
            <input
              type='text'
              placeholder='Search blog, category or author...'
              className='w-full p-3 rounded-full border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
              >
                <FiX size={20} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className='bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 shadow-md transition'
          >
            <FiSearch />
          </button>
        </form>
        {filteredBlogs.length !== allBlogs.length && (
          <div className='mt-3 text-center'>
            <button
              onClick={clearSearch}
              className='text-blue-500 hover:text-blue-700 font-medium'
            >
              Show All Blogs
            </button>
          </div>
        )}
      </div>

      {/* All Blogs */}
      <section>
        <h2 className='text-3xl font-bold mb-6 text-blue-900'>📚 All Blogs</h2>
        {filteredBlogs.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} post={blog} formatDate={formatDate} />
            ))}
          </div>
        ) : (
          <p className='text-gray-500 italic'>No blogs found for your search.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
