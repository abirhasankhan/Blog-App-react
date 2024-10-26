import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // Create user method
    async createAccount({ email, password, name }) {
        try {
            // Create a new user
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // Automatically log in the user if account creation is successful
            if (user) {
                return await this.logIn({ email, password });
            } else {
                return null;  // Just in case no user is created and no error is thrown
            }

        } catch (err) {
            console.error("Error creating account:", err.message);
            throw new Error("Failed to create account. Please try again later.");
        }
    }

    // Login method
    async logIn({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(
                email,
                password
            );

            return session;

        } catch (err) {
            console.error("Error logging in account:", err.message);
            throw new Error("Failed to log in account. Please check your credentials.");
        }
    }

    // Get current user (session)
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user; // User is logged in

        } catch (err) {
            console.error("Appwrite service :: getCurrentUser :: Error", err.message);
        }
        return null;
    }

    // Logout method
    async logout() {
        try {
            // Log out from all session
            // await this.account.deleteSessions();
            // Log out the current session
            await this.account.deleteSession("current");

        } catch (err) {
            console.error("Appwrite service :: logout :: Error", err.message);
            throw new Error("Failed to log out. Please try again later.");
        }
    }

}

const authService = new AuthService();

export default authService;
