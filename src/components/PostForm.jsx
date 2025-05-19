import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FiUpload, FiX, FiAlertCircle, FiCheckCircle, FiSun, FiMoon } from "react-icons/fi";
import appwriteService from "../appwrite/config";
import Input from "./ui_components/Input";
import Button from "./ui_components/Button";
import Select from "./ui_components/Select";
import TextArea from "./ui_components/TextArea";
import RTE from "./ui_components/RTE";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      category: post?.category || "news",
      excerpt: post?.excerpt || "",
      tags: post?.tags || ""
    },
    mode: "onChange" // Enable real-time validation
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const theme = useSelector((state) => state.theme.theme);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageView, setImageView] = useState(post?.featuredImage ? appwriteService.getFileView(post.featuredImage) : null);
  const [success, setSuccess] = useState("");

  // Apply theme class to html element
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
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
        result = await appwriteService.updatePost(post.slug, postData);
        setSuccess("Post updated successfully!");
      } else {
        result = await appwriteService.createPost(postData);
        setSuccess("Post created successfully!");
      }

      if (result) {
        setTimeout(() => {
          navigate(`/post/${result.slug}`);
        }, 1500);
      } else {
        throw new Error("Failed to save post");
      }
    } catch (error) {
      setError(error.message || "An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageView(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageView(null);
    setValue("image", null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {post ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {post ? "Update your existing blog post" : "Share your thoughts with the world"}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
                <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Title
                </label>
                <Input
                  placeholder="Enter post title"
                  {...register("title", { required: "Title is required" })}
                  error={errors.title?.message} 
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Slug
                </label>
                <Input
                  placeholder="Post URL"
                  {...register("slug", { required: "Slug is required" })}
                  error={errors.slug?.message}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                  }}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.slug.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Status
                </label>
                <Select
                  options={["active", "inactive"]}
                  {...register("status", { required: "Status is required" })}
                  error={errors.status?.message}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white text-base"
                />
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Category
                </label>
                <Select
                  options={["news", "fashion", "lifestyle", "travel", "food", "sports", "Education"]}
                  {...register("category", { required: "Category is required" })}
                  error={errors.category?.message}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white text-base"
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Tags
              </label>
              <Input
                placeholder="Enter tags (comma separated)"
                {...register("tags", { required: "Tags are required" })}
                error={errors.tags?.message}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              {errors.tags && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.tags.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Summary
              </label>
              <TextArea
                placeholder="Write a brief summary of your post"
                {...register("excerpt", { required: "Summary is required" })}
                error={errors.excerpt?.message}
                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base min-h-[120px]"
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Content
              </label>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <RTE
                  name="content"
                  control={control}
                  defaultValue={getValues("content")}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white text-base min-h-[300px]"
                />
              </div>
              {errors.content && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Featured Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
                <div className="space-y-1 text-center">
                  {imageView ? (
                    <div className="relative">
                      <img
                        src={imageView}
                        alt="Preview"
                        className="mx-auto h-64 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-300">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="image-upload"
                            type="file"
                            className="sr-only"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              {errors.image && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.image.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="submit"
                bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
                className="px-8 py-3 text-white font-medium rounded-lg transition-colors duration-200 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : post ? (
                  "Update Post"
                ) : (
                  "Create Post"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;