import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router';
import { mockBlogs } from '../data/mockBlogs';
import Card  from '../components/ui_components/Card';

const Home = () => {
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState(mockBlogs);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setBlogs(mockBlogs);
      return;
    }

    const filtered = mockBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.category.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase())
    );
    setBlogs(filtered);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const latestBlogs = [...mockBlogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      {/* Search */}
      <form onSubmit={handleSearch} className='flex flex-col sm:flex-row items-center gap-3 mb-10'>
        <input
          type='text'
          placeholder='Search blog, category or author...'
          className='w-full sm:w-[500px] p-3 rounded-full border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          type="submit"
          className='bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 shadow-md transition'
        >
          <FiSearch />
        </button>
      </form>

      {/* Latest Blogs */}
      <section className='mb-14'>
        <h2 className='text-3xl font-bold mb-6'>Latest Blogs</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8'>
          {latestBlogs.map((blog) => (
            <Card key={blog.id} post={blog} formatDate={formatDate} />
          ))}
        </div>
      </section>

      {/* All Blogs */}
      <section>
        <h2 className='text-3xl font-bold mb-6 text-blue-900'>📚 All Blogs</h2>
        {blogs.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {blogs.map((blog) => (
              // <BlogCard key={blog.id} blog={blog} formatDate={formatDate} />
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

// Card Component
const BlogCard = ({ blog, formatDate }) => {
  return (
    <div className='bg-white rounded shadow overflow-hidden hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300'>
      <img
        src={blog.image}
        alt={blog.title}
        className='w-full h-48 object-cover'
      />
      <div className='p-5 flex flex-col gap-2'>
        <span className='text-xs font-semibold text-white bg-blue-500 w-fit px-3 py-1 rounded-full'>
          {blog.category}
        </span>
        <Link to={`/post/${blog.id}`} className='text-lg font-bold text-gray-900'>{blog.title}</Link>
        <p className='text-xs text-gray-400 mt-auto'>{formatDate(blog.date)}</p>
        <p className='text-gray-600 text-sm'>{blog.excerpt}</p>
        <p className='text-sm text-gray-500'>By {blog.author}</p>
      </div>
    </div>
  );
};

export default Home;
