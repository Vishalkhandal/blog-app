// // import React from 'react'

// // function CreateBlog() {
// //   return (
// //     <div>CreateBlog</div>
// //   )
// // }

// // export default CreateBlog

// import React, { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";

// const CreateBlog = () => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTitle("");
//     setAuthor("");
//     setContent("");
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//         />
//         <Editor
//           apiKey="t9efgvxeypkl6u9pp2mqflniqoao020rf2asbgcbpesdvb40" // Optional if you're using TinyMCE Cloud
//           value={content}
//           init={{
//             height: 300,
//             menubar: false,
//             plugins: [
//               "advlist autolink lists link image charmap print preview anchor",
//               "searchreplace visualblocks code fullscreen",
//               "insertdatetime media table paste code help wordcount",
//             ],
//             toolbar:
//               "undo redo | formatselect | bold italic backcolor | \
//               alignleft aligncenter alignright alignjustify | \
//               bullist numlist outdent indent | removeformat | help",
//           }}
//           onEditorChange={(newContent) => setContent(newContent)}
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Publish
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateBlog;


import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Tech");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = { title, author, category, tags, imageUrl, content };
    console.log("Submitting Blog:", blogData);

    // Clear form
    setTitle("");
    setAuthor("");
    setCategory("Tech");
    setTags("");
    setImageUrl("");
    setContent("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="w-full border px-3 py-2 rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Tech</option>
          <option>Lifestyle</option>
          <option>News</option>
        </select>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full border px-3 py-2 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Featured Image URL"
          className="w-full border px-3 py-2 rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Editor
          value={content}
          apiKey="t9efgvxeypkl6u9pp2mqflniqoao020rf2asbgcbpesdvb40" // Optional if you're using TinyMCE Cloud
          init={{
            height: 300,
            menubar: false,
            plugins: ["link", "lists", "code", "media"],
            toolbar:
              "undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
          }}
          onEditorChange={(newContent) => setContent(newContent)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
