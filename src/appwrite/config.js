import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId, excerpt, authorName, category, tags }) {
        try {
            // Check if slug already exists
            const existingPosts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("slug", slug)]
            );

            if (existingPosts.documents.length > 0) {
                throw new Error("Slug already exists. Please use a different slug.");
            }

            // Create the post using slug as document ID
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Use slug as document ID
                {
                    slug,
                    title,
                    content,
                    featuredImage: featuredImage || null,
                    status,
                    userId,
                    excerpt,
                    authorName,
                    category,
                    tags
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, excerpt, authorName, category, tags }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Use slug as document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    excerpt,
                    authorName,
                    category,
                    tags
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            // First get the post to get the image ID
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

            // Delete the image from storage if it exists
            if (post.featuredImage) {
                await this.deleteFile(post.featuredImage);
            }

            // Delete the post document
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );            
            if (post.featuredImage) {
                post.imageUrl = this.getFileView(post.featuredImage);
            }            
            return post;
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFileView(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service



// File does not show on browser and do not delete as well in database. I think fileId which I try to store in database do not store in database only name add. I think I need to update my fileId when data is submittd in PostForm component