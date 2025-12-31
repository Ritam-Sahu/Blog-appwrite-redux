import React from "react";
import appwriteService from "../appwirte/config"
import {Link} from 'react-router-dom'

// we use $id coz its appwrite syntax
function PostCard({$id, title, featuredImage}){

    return(
        // Navigates to the post details page using post id
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="rounded-xl"/>
                </div>
                <h2 className="text-xl font-bold">
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard;


/**
 * PostCard Component
 * Renders a single blog post preview card
 * $id comes from Appwrite (row/document id)
 */