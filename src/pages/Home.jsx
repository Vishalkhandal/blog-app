import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const dummyBlogs = [
  {
    id: 1,
    title: 'Mastering React Router',
    category: 'React',
    excerpt: 'Learn about dynamic routing, nested routes, and data APIs.',
    date: '2025-04-20',
    image: 'https://images.unsplash.com/photo-1743930286867-acbd47f58e8b?q=80&w=1489&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Understanding JavaScript Closures',
    category: 'JavaScript',
    excerpt: 'Closures are one of the most powerful features in JavaScript.',
    date: '2025-04-18',
    image: 'https://source.unsplash.com/random/600x400?javascript',
  },
  {
    id: 3,
    title: 'Tailwind CSS Tips & Tricks',
    category: 'CSS',
    excerpt: 'Make your design workflow faster with Tailwind utilities.',
    date: '2025-04-15',
    image: 'https://source.unsplash.com/random/600x400?tailwind',
  },
  {
    id: 4,
    title: 'Building a Blog with React + PHP',
    category: 'Fullstack',
    excerpt: 'Combine React for frontend and PHP backend for dynamic blogs.',
    date: '2025-04-10',
    image: 'https://source.unsplash.com/random/600x400?blog',
  },
  {
    id: 5,
    title: 'Dark Mode in React Made Easy',
    category: 'React',
    excerpt: 'Let users toggle between dark and light modes seamlessly.',
    date: '2025-04-09',
    image: 'https://source.unsplash.com/random/600x400?darkmode',
  },
];

const Home = () => {
  const [search, setSearch] = useState('');

  const filteredBlogs = dummyBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase())
  );

  const latestBlogs = [...dummyBlogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      {/* Search */}
      <div className='flex flex-col sm:flex-row items-center gap-3 mb-10'>
        <input
          type='text'
          placeholder='Search blog or category...'
          className='w-full sm:w-[500px] p-3 rounded-full border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 shadow-md transition'>
          <FiSearch />
        </button>
      </div>

      {/* Latest Blogs */}
      <section className='mb-14'>
        <h2 className='text-3xl font-bold mb-6 text-blue-900'>✨ Latest Blogs</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8'>
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      {/* All Blogs */}
      <section>
        <h2 className='text-3xl font-bold mb-6 text-blue-900'>📚 All Blogs</h2>
        {filteredBlogs.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
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
const BlogCard = ({ blog }) => {
  return (
    <div className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
      <img
        src={blog.image}
        alt={blog.title}
        className='w-full h-48 object-cover'
      />
      <div className='p-5 flex flex-col gap-2'>
        <span className='text-xs font-semibold text-white bg-blue-500 w-fit px-3 py-1 rounded-full'>
          {blog.category}
        </span>
        <h3 className='text-lg font-bold text-gray-900'>{blog.title}</h3>
        <p className='text-xs text-gray-400 mt-auto'>📅 {blog.date}</p>
        <p className='text-gray-600 text-sm'>{blog.excerpt}</p>
        <p className="text-sm text-gray-600">{blog.author}</p>
      </div>
    </div>
  );
};

export default Home;
