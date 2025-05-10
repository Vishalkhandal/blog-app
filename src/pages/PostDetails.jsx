import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components/index';
import parse from 'html-react-parser';

function PostDetails() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
    console.log("userData from PostDetails", userData);

  console.log("Slug from URL:", slug);
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
            console.log("Post data:", post);
          } else {
            console.error("Post not found");
            navigate("/"); // Redirect to home if post is not found
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/"); // Redirect to home on error
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
          {userData && (
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
                onClick={async () => {
                  if (window.confirm("Are you sure you want to delete this post?")) {
                    appwriteService.deletePost(post.$id)
                      .then(() => {
                        navigate("/");
                      })
                      .catch((error) => {
                        console.error("Error deleting post:", error);
                      });
                  }
                }}
                className="text-blue-500 hover:underline"
                bgColor="bg-green-500"
              >
                Delete Post
              </Button>
            </>
          )}
        </div>
        <div className="mb-8">
          {post.featuredImage && (
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-semibold text-white bg-blue-500 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <p className="text-gray-600">By {post.author_name}</p>
            <p className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="browser-css">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : (
    <p className="text-center mt-10 text-xl">Blog not found</p>
  );
}

export default PostDetails;