import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { FiUser, FiMail, FiCalendar, FiEdit } from 'react-icons/fi';
import service from '../appwrite/config';
import authService from '../appwrite/auth';
import { Query } from 'appwrite';
import Card from '../components/ui_components/Card';

const Profile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.userData);

  useEffect(() => {
    fetchUserProfile();
    fetchUserBlogs();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response) {
        setUserProfile(response.documents);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchUserBlogs = async () => {
    try {
      const response = await service.getPosts([
        Query.equal("userId", userId),
        Query.equal("status", "active")
      ]);
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
        setUserBlogs(posts);
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <FiUser className="w-16 h-16 text-blue-600 dark:text-blue-300" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {userProfile?.name || 'Anonymous User'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {userProfile?.bio || 'No bio available'}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FiMail className="w-4 h-4" />
                  <span>{userProfile?.email || 'No email available'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>Joined {formatDate(userProfile?.$createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiEdit className="w-4 h-4" />
                  <span>{userBlogs.length} Posts</span>
                </div>
              </div>
            </div>

            {/* Edit Profile Button (only show for current user) */}
            {currentUser?.$id === userId && (
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* User's Blogs */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {userProfile?.name}'s Posts
        </h2>
        {userBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userBlogs.map((blog) => (
              <Card key={blog.id} post={blog} formatDate={formatDate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No posts yet. {currentUser?.$id === userId ? 'Start writing your first post!' : 'Check back later for new content.'}
            </p>
            {currentUser?.$id === userId && (
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                Create Post
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 