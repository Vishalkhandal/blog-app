import React, { useState } from 'react'
import { useParams } from 'react-router'

function BlogDetails() {

  const { id } = useParams();
  const [comments, setComments] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [blog, setBlog] = useState({
    title: "blog app",
    author: "Vishal khandal",
    content: "content",
  })

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: commentInput,
        },
      ])
      setCommentInput("");
    }
  }

  if (!blog) {
    return <p className="text-center mt-10 text-xl">Blog not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-6">By {blog.author}</p>
      <div
        className="prose prose-lg mb-10"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-6 space-y-4">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border p-3 rounded"
            rows={3}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </form>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="p-4 bg-gray-100 rounded">
                {c.text}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default BlogDetails