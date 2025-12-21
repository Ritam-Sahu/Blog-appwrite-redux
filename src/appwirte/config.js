import conf from '../conf.js'
import {Client, ID, Storage, Query, TablesDB} from "appwrite"

export class Service{

    client = new Client()
    tablesDB;
    storage;

    constructor(){

        this.client
                .setEndpoint(conf.appwriteEndPoint)
                .setProject(conf.appwritProjectId);

        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

    // Create rows
    async createPost({title, slug, content, featuredImage, status, userID}){

        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteurlCollectionId,
                rowId: slug || ID.unique(),
                data: {
                   title,
                   content,  
                   featuredImage,
                   status,
                   userID 
                },
            })
            
        } catch (error) {
            console.log("Appwrite Service :: createpost :: erorr",error);
            
        }
    }

    // Update row
    async updatePost(slug,{title,content,status,featuredImage}){
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteurlCollectionId,
                rowId: slug || ID.unique(),
                data: {
                    title,
                    content,
                    status,
                    featuredImage,
                }
        })
            
        } catch (error) {
            console.log("Appwrite service :: updatapost :: erorr", error);
            
        }
    }

    // delete row 
    async deletePost(slug){
        try {
            await this.tablesDB.deleteRow({
                databaseId:conf.appwriteDatabaseId,
                tableId: conf.appwriteurlCollectionId,
                rowId: slug,
            })
            return true;
            
        } catch (error) {
            console.log("Appwrite service :: deletepost :: erorr", error );
            return false;  
        }
    }

    //get row
    async getPost(slug){
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteurlCollectionId,
                rowId: slug,
            })
        } catch (error) {
            console.log("Appwrite service :: getpost :: erorr", error);
            return false
        }
    }
    
    // list row but only those are active
    async getPosts(queries = [Query.equal("status", "active")] ){
       try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteurlCollectionId,
                queries,
                
            })
       } catch (error) {
            console.log("Appwrite service :: getposts :: erorr", error);
            return false
       } 
    }

    // file upload service

    //create file
    async uploadFile(file){
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteurlBucketId,
                fileId: ID.unique(),
                file, 
            })
            
        } catch (error) {
            console.log("Appwrite service :: uploadfile :: erorr", error);   
            return false;
        }
    }

    // delete file , fileId = “Field IDs come from the column names defined in the Appwrite table schema.”
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile({
                bucketId: conf.appwriteurlBucketId,
                fileId
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletefile :: erorr", error);
            return false;
        }
    }

    // get file preview 
    async getFilePreview(fileId){
        try {
            return this.storage.getFilePreview({
                bucketId: conf.appwriteurlBucketId,
                fileId
            })
            
        } catch (error) {
            console.log("Appwrite Service :: Preview :: erorr", error);
            return false;
        }
    }
}



const service = new Service();

export default service;



// 👉 When docs and VS Code disagree, trust VS Code typings.

// OLD (Databases / Collections)   →   NEW (Tables)
// ------------------------------------------------
// Bucket                          →   Storage (same concept, name clarified)
// Attributes                      →   Columns
// Documents                       →   Rows
// Collections                     →   Tables
// Database                         →   Database (unchanged)
