import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router";

const EditBlog = () => {
  const { id } = useParams(); // blog ID from route
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    category: "Tech",
    tags: "",
    imageUrl: "",
    content: "",
  });

  useEffect(() => {
    // Simulate fetch blog by ID
    setBlog({
      title: "Sample Blog",
      author: "Admin",
      category: "Tech",
      tags: "blog,example",
      imageUrl: "https://placehold.co/600x400",
      content: "<p>This is a sample blog post</p>",
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (newContent) => {
    setBlog((prev) => ({ ...prev, content: newContent }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated blog:", blog);
    alert("Blog updated!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="author"
          value={blog.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="category"
          value={blog.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Tech</option>
          <option>Lifestyle</option>
          <option>News</option>
        </select>
        <input
          name="tags"
          value={blog.tags}
          onChange={handleChange}
          placeholder="Tags"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="imageUrl"
          value={blog.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border px-3 py-2 rounded"
        />
        <Editor
          value={blog.content}
          onEditorChange={handleEditorChange}
          init={{
            height: 300,
            menubar: false,
            plugins: ["link", "lists", "code", "media"],
            toolbar:
              "undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
          }}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
