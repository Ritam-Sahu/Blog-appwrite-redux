//best practice in production

const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_END_POINT),
    appwritProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteurlCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteurlBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;