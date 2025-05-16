import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router';
import Card from '../components/ui_components/Card';
import service from '../appwrite/config';
import { Query } from 'appwrite';

const Home = () => {
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState([]);
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
          image: post.featuredImage ? service.getFilePreview(post.featuredImage) : null,
          category: post.category,
          author: post.authorName,
          date: post.$createdAt,
          slug: post.slug
        }));
        setBlogs(posts);
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
      fetchBlogs();
      return;
    }

    const filtered = blogs.filter(
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

  const latestBlogs = [...blogs]
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
