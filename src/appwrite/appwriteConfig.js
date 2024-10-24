import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class AppwriteService {

    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // Create post method
    async createPost({title, slug, content, featuredImage, status, userId}) {

        try {

            return await this.databases.createDocument(

                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch (error) {
            console.log("Appwrite service :: createPost :: Error", error.message);
            
        }
    }

    // Update post method
    async updatePost(slug, {title, content, featuredImage, status}) {

        try {

            return await this.databases.updateDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
            console.log("Appwrite service :: updatePost :: Error", error.message);            
        }
    }

    // Delete post method
    async deletePost(slug) {

        try {
            
            await this.databases.deleteDocument(

                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug // documentId
            )

            return true;

        } catch (error) {
            console.log("Appwrite service :: deletePost :: Error", error.message);
            return false;
            
        }
    }

    // Get single post method
    async getPosts(slug) {

        try {

            return await this.databases.listDocuments(

                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPosts :: Error", error.message);
            return false;
            
        }
    }

    // Get all posts method
    async getAllPosts() {

        try {

            return await this.databases.listDocuments(

                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                [Query.equal("status", "active")] // queries
            )

        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: Error", error.message);
            return false;
            
        }
    }

    // file upload method
    async uploadFile(file) {

        try {
            
            return await this.storage.createFile(

                config.appwriteBucketId,
                ID.unique(), // fileId
                file
            );

        } catch (error) {
            console.log("Appwrite service :: uploadFile :: Error", error.message);
            return false;
        }
    }

    // file delete method
    async deleteFile(fileId) {

        try {

            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            );

            return true;

        } catch (error) {
            console.log("Appwrite service :: deleteFile :: Error", error.message);
            return false;
            
        }
    }

    // File preview method
    async getPreviewFile(fileId) {

        try {

            return await this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            );
            
        } catch (error) {
            console.log("Appwrite service :: previewFile :: Error", error.message);
            return false;
        }
    }
    
}

const appwriteService = new AppwriteService()

export default appwriteService