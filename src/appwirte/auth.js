import conf from '../conf/conf.js';
import {Client, Account, ID} from "appwrite";

// AuthService acts as a service layer for authentication
// This helps avoid vendor lock-in and keeps auth logic out of UI components
export class AuthService {

    // Create Appwrite client instance
    // Client is initialized once and reused to avoid repeated setup
    client = new Client();

    // Account service reference
    account; 

    // Constructor runs when AuthService object is created
    // Used to configure Appwrite client only once (better for performance)
    constructor(){
       this.client 
                  .setEndpoint(conf.appwriteEndPoint)
                  .setProject(conf.appwritProjectId);
        this.account = new Account(this.client); 
    }

    // Wrapper method for user signup
    // Appwrite-specific logic is hidden here to reduce vendor lock-in
    // Destructured params make method clean and readable
    async createAccount ({email, password, name}){
        try{
            const userAccount = await this.account.create({
                userId: ID.unique(), // Generates unique user ID
                email,
                password,
                name
            })

            if(!userAccount){
                return userAccount; 
            }
            // If account is created successfully, auto-login the user
            // Improves user experience after signup
            return this.login({email,password})
            
        }
        catch(err){
            // Error is thrown so UI layer can handle it properly
            throw err;
        }
    }

    // Wrapper method for login
    // Frontend does not directly depend on Appwrite SDK
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession({email,password})
        }
        catch(err){
            throw err;
        }
    }

    // Used to fetch currently logged-in user
    // Helpful for session persistence and protected routes
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error);
            return null;
        }
    }

    // Logs out the user by deleting all active sessions
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrie service :: logout :: error", error);
            
        }
    }
}


// Create and export a single instance (Singleton pattern)
// Ensures same Appwrite client & session is reused across the app
const authService = new AuthService();


export default authService;



// used full APPWRITE latest DOC 2025

// Quality code

// what is vendor lock in
// “When an application becomes tightly dependent on a specific ..
// third-party service or platform, making it difficult or costly to switch to another provider later.”

// Why it matters:
// Migration becomes expensive
// Architecture flexibility reduces
// Business risk increases if pricing or policies change

