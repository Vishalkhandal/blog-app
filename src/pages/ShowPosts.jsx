import React, { useState, useEffect } from 'react';
import Card from '../components/ui_components/Card';
import service from '../appwrite/config';
import { Query } from 'appwrite';

function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Get total count of posts
      const totalResponse = await service.getPosts([]);
      const totalPosts = totalResponse?.total || 0;
      setTotalPages(Math.ceil(totalPosts / postsPerPage));

      // Get paginated posts
      const response = await service.getPosts([
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">All Posts</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-4">
            <Card post={post} formatDate={formatDate} />
            {post.status !== 'active' && (
              <span className="text-xs font-semibold text-white bg-red-500 w-fit px-3 py-1 rounded-full">
                {post.status}
              </span>
            )}
          </div>
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
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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