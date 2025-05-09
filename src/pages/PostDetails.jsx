import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { mockBlogs } from '../data/mockBlogs'

function PostDetails() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Find the blog with matching ID
    const foundBlog = mockBlogs.find(blog => blog.id === parseInt(id));
    setBlog(foundBlog);
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: commentInput,
          author: 'Anonymous',
          date: new Date().toISOString()
        },
      ]);
      setCommentInput("");
    }
  };

  if (!blog) {
    return <p className="text-center mt-10 text-xl">Blog not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-semibold text-white bg-blue-500 px-3 py-1 rounded-full">
            {blog.category}
          </span>
          <p className="text-gray-600">By {blog.author}</p>
          <p className="text-gray-500 text-sm">{new Date(blog.date).toLocaleDateString()}</p>
        </div>
      </div>

      <div
        className="prose prose-lg mb-10"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Comments ({comments.length})</h2>
        <form onSubmit={handleCommentSubmit} className="mb-8 space-y-4">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Comment
          </button>
        </form>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default PostDetails;