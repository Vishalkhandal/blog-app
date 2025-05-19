import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { FiUser, FiMail, FiCalendar, FiEdit, FiPlus, FiCheckCircle, FiClock, FiArchive, FiCircle } from 'react-icons/fi';
import service from '../appwrite/config';
import { Query } from 'appwrite';
import HorizontalPostCard from '../components/ui_components/HorizontalPostCard';

const Profile = () => {
  const { userId } = useParams();
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.userData);

  useEffect(() => {
    fetchUserBlogs();
  }, [userId]);
  
  const fetchUserBlogs = async () => {
    try {
      const response = await service.getPosts([
        Query.equal("userId", userId)
      ]);
      if (response) {
        const posts = response.documents.map(post => ({
          id: post.$id,
          title: post.title,
          excerpt: post.excerpt,
          image: post.featuredImage ? service.getFileView(post.featuredImage).href : null,
          category: post.category,
          author: post.authorName,
          date: post.$createdAt,
          slug: post.slug,
          status: post.status
        }));
        setUserBlogs(posts);
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    } finally {
      setLoading(false);
    }
  };
  
  console.log(userBlogs)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FiCheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <FiCircle className="w-4 h-4" />;
      case 'draft':
        return <FiClock className="w-4 h-4" />;
      case 'archived':
        return <FiArchive className="w-4 h-4" />;
      default:
        return <FiCheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-red-500';
      case 'draft':
        return 'bg-yellow-500';
      case 'archived':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-xl">
                <FiUser className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
              {currentUser?.$id === userId && (
                <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110">
                  <FiEdit className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left text-white">
              <h1 className="text-4xl font-bold mb-3">
                {currentUser?.name || 'Anonymous User'}
              </h1>
              <p className="text-blue-100 mb-6 max-w-2xl">
                {currentUser?.bio || 'No bio available'}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <FiMail className="w-5 h-5" />
                  <span>{currentUser?.email || 'No email available'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <FiCalendar className="w-5 h-5" />
                  <span>Joined {formatDate(currentUser?.$createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <FiEdit className="w-5 h-5" />
                  <span>{userBlogs.length} Posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User's Blogs */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {currentUser?.name}'s Posts
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getStatusColor('active')}`}></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getStatusColor('inactive')}`}></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getStatusColor('draft')}`}></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Draft</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getStatusColor('archived')}`}></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Archived</span>
              </div>
            </div>
          </div>
          {currentUser?.$id === userId && (
            <NavLink to="/post/create" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl">
              <FiPlus className="w-5 h-5" />
              <span>Create Post</span>
            </NavLink>
          )}
        </div>

        {userBlogs.length > 0 ? (
          <div className="space-y-6">
            {userBlogs.map((blog) => (
              <HorizontalPostCard key={blog.id} post={blog} formatDate={formatDate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FiEdit className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {currentUser?.$id === userId 
                ? "You haven't written any posts yet."
                : "This user hasn't written any posts yet."}
            </p>
            {currentUser?.$id === userId && (
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                <FiPlus className="w-5 h-5" />
                <span>Start Writing</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 