import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import parse from 'html-react-parser';
import Button from '../components/ui_components/Button';
import Container from '../components/ui_components/container/Container';

function PostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

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

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-gray-600">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-gray-600">Post not found</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
          {userData && userData.$id === post.userId && (
            <>
              <Link to={`/post/edit/${post.slug}`}>
                <Button
                  className="text-blue-500 hover:underline"
                  bgColor="bg-green-500"
                >
                  Edit Post
                </Button>
              </Link>
              <Button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this post?")) {
                    deletePost();
                  }
                }}
                className="text-blue-500 hover:underline"
                bgColor="bg-red-500"
              >
                Delete Post
              </Button>
            </>
          )}
        </div>
        <div className="mb-8">
          {post.featuredImage && (
            <div className="w-full h-[400px] mb-6 overflow-hidden rounded-lg">
              <img
                src={post.imageUrl || appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Error loading image");
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-semibold text-white bg-blue-500 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <p className="text-gray-600">By {post.author_name}</p>
            <p className="text-gray-500 text-sm">{new Date(post.$createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="prose max-w-none">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  );
}

export default PostDetails;