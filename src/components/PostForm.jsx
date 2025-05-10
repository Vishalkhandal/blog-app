import React, { useCallback, useEffect } from "react";
import { Input, Button, Select, RTE } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      category: post?.category || "news",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log("userData from PostForm", userData);


  const submit = async (data) => {
    console.log("Form data:", data);

    // Check if user is authenticated
    if (!userData || !userData.$id) {
      console.error("User is not authenticated.");
      navigate('/auth/login'); // Redirect to login page
      return;
    }

    try {
      let fileId = post?.featuredImage;

      // Handle file upload if a new image is provided
      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        fileId = file.$id;

        // Delete the old file if updating
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      // Add the file ID to the data
      data.featuredImage = fileId;

      if (post) {
        // Update the post
        const updatedPost = await appwriteService.updatePost({
          ...data, featuredImage: fileId,
          userId: userData.$id,
        }, post.$id);
        if (updatedPost) {
          navigate(`/post/${updatedPost.slug}`);
        }
      } else {
        // Create a new post
        const newPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (newPost) {
          navigate(`/post/${newPost.slug}`);
        }
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
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

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post ? "Edit Blog" : "Create New Blog"}</h1>
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <Input
          label="Title"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <Input
          label="Author"
          placeholder="Author"
          {...register("author", { required: true })}
        />
        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
        <Select
          options={["news", "fashion", "lifestyle", "travel", "food", "sports"]}
          label="Category"
          {...register("category", { required: true })}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;