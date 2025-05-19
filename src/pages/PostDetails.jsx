import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import parse from 'html-react-parser';
import { FiArrowLeft, FiEdit2, FiTrash2, FiCalendar, FiUser, FiTag, FiShare2, FiImage } from 'react-icons/fi';
import Container from '../components/ui_components/container/Container';

function PostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const success = await appwriteService.deletePost(slug);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[60vh] w-full overflow-hidden">
          {post.featuredImage && !imageError ? (
            <img
              src={post.imageUrl || appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <FiImage className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
                No featured image available
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        </div>
      </div>

      <Container>
        {/* Post Header */}
        <div className="max-w-4xl mx-auto -mt-32 relative z-10 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <FiArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              {userData && userData.$id === post.userId && (
                <div className="flex items-center gap-3 ml-auto">
                  <Link
                    to={`/post/edit/${post.slug}`}
                    className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300"
                  >
                    <FiEdit2 className="w-5 h-5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this post?")) {
                        deletePost();
                      }
                    }}
                    className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300"
                  >
                    <FiTrash2 className="w-5 h-5" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="mb-8">
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                <FiTag className="w-4 h-4" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FiUser className="w-4 h-4" />
                {post.authorName}
              </span>
              <span className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FiCalendar className="w-4 h-4" />
                {formatDate(post.$createdAt)}
              </span>
              <button className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ml-auto">
                <FiShare2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-em:text-gray-700 dark:prose-em:text-gray-200
            prose-blockquote:border-l-blue-500 dark:prose-blockquote:border-l-blue-400
            prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50
            prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-200
            prose-img:rounded-xl prose-img:shadow-lg
            prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900
            prose-pre:text-gray-100
            prose-code:text-blue-600 dark:prose-code:text-blue-400
            prose-code:bg-gray-100 dark:prose-code:bg-gray-800
            prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-code:before:content-none prose-code:after:content-none
            prose-ul:list-disc prose-ul:text-gray-600 dark:prose-ul:text-gray-300
            prose-ol:list-decimal prose-ol:text-gray-600 dark:prose-ol:text-gray-300
            prose-li:marker:text-blue-500 dark:prose-li:marker:text-blue-400
            prose-table:border-gray-200 dark:prose-table:border-gray-700
            prose-th:bg-gray-100 dark:prose-th:bg-gray-800
            prose-th:text-gray-900 dark:prose-th:text-white
            prose-td:text-gray-600 dark:prose-td:text-gray-300
            prose-hr:border-gray-200 dark:prose-hr:border-gray-700
          ">
            {parse(post.content)}
          </div>
        </div>

        {/* Author Section */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FiUser className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {post.authorName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Author
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PostDetails;