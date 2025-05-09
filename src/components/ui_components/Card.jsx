import React from 'react'
import { Link } from 'react-router'

function Card({post, formatDate}) {
  return (
    <div className='bg-white rounded shadow overflow-hidden hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300'>
      <img
        src={post.image}
        alt={post.title}
        className='w-full h-48 object-cover'
      />
      <div className='p-5 flex flex-col gap-2'>
        <span className='text-xs font-semibold text-white bg-blue-500 w-fit px-3 py-1 rounded-full'>
          {post.category}
        </span>
        <Link to={`/post/${post.id}`} className='text-lg font-bold text-gray-900'>{post.title}</Link>
        <p className='text-xs text-gray-400 mt-auto'>{formatDate(post.date)}</p>
        <p className='text-gray-600 text-sm'>{post.excerpt}</p>
        <p className='text-sm text-gray-500'>By {post.author}</p>
      </div>
    </div>
  )
}

export default Card