import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import PostForm from "../components/PostForm";
import appwriteService from "../appwrite/config";
import  Container from "../components/ui_components/container/Container";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

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
    <Container>
      <PostForm post={post} />
    </Container>
  );
}

export default EditPost;