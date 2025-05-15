import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import Input from "./ui_components/Input";
import Button from "./ui_components/Button";
import Select from "./ui_components/Select";
import TextArea from "./ui_components/TextArea";
import RTE from "./ui_components/RTE"

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      featuredImage: post?.featuredImage | "",
      status: post?.status || "active",
      category: post?.category || "news",
      authorName: post?.authorName || "",
      excerpt: post?.excerpt || "",
      tags: post?.tags || ""
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : null);

  const onSubmit = async (data) => {
    setError("");
    setIsSubmitting(true);
    if (!userData || !userData.$id) {
      setError("Please login to create a post");
      navigate('/auth/login');
      return;
    }

    try {
      let fileId = post?.featuredImage;

      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) {
          throw new Error("Failed to upload image");
        }
        fileId = file.$id;

        // Delete the old file if updating
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      const postData = {
        userId: userData.$id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        featuredImage: fileId || null,
        authorName: userData.name,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags
      };

      let result;
      if (post) {
        // Update the post
        result = await appwriteService.updatePost(post.slug, postData);
      } else {
        // Create a new post
        result = await appwriteService.createPost(postData);
      }

      if (result) {
        navigate(`/post/${result.slug}`);
      } else {
        throw new Error("Failed to save post");
      }
    } catch (error) {
      setError(error.message || "An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Transform the name value to a slug format in slug field  
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  // Watch the title field and update the slug field accordingly
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post ? "Edit Blog" : "Create New Blog"}</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Title"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          {...register("slug", { required: "Slug is required" })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <Input
          label="Author"
          placeholder="Author"
          {...register("authorName", { required: "Author is required" })}
        />
        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: "Status is required" })}
        />
        <Select
          options={["news", "fashion", "lifestyle", "travel", "food", "sports", "Education"]}
          label="Category"
          {...register("category", { required: "Category is required" })}
        />
        <Input
          label="Tags"
          placeholder="Enter Tag"
          {...register("tags", { required: "Tag is required" })}
        />
        <TextArea
          label="Summary"
          placeholder="Write a summary for your blog"
          {...register("excerpt", {required: "Summary is required"})}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        <Input
          label="Featured Image (Optional)"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage")}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="w-full mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        <Button 
          type="submit" 
          bgColor={post ? "bg-green-500" : undefined} 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : post ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;