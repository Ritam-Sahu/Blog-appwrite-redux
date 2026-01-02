import React, {useCallback, useEffect} from "react";
import {useForm} from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../services/config'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostFrom({post}){

    // Initialize form with default values
    // If editing → load post data
    // If creating → start with empty fields
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',

        }
    });

    const navigate = useNavigate();
    // Logged-in user (used when creating a new post)
    const userData = useSelector(state => state.user.userData)

/**
   * FORM SUBMIT HANDLER
   * Handles two flows:
   * 1. Update existing post
   * 2. Create new post
   */
    const submit = async (data)=>{
        // ----- EDIT MODE -----
        if(post){
            const file = data.image[0]? appwriteService.uploadFile(data): null;

            // If new file uploaded → delete old image
            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            
            // Update post in database
            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage: file? file.$id : undefined,
            });

            // Redirect to post page
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }

        }
        
        // ----- CREATE MODE -----
        else{
            // Upload image first
            const file = await appwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id
                data.featuredImage = file.$Id

                // Create new post entry
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })
                if(dbPost){
                    navigate(`/post${dbPost.$id}`)
                }
            }
        }
    }


    /**
   * SLUG TRANSFORM FUNCTION
   * Converts title → slug format
   */
    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, '-')
        }
        return ''
    },[])

    /**
   * Auto-generate slug whenever title changes
   */
    useEffect(()=>{
        // Subscribe to form field changes in real-time
        const subscription = watch((value,{name})=>{
            // Only react when the "title" field changes
            if(name === 'title'){
                // Auto-generate slug and update slug field
                setValue('slug', slugTransform(value.title,{shouldValidate:true}))
            }
        })
        
        // Cleanup — stop watching when component unmounts
        return () =>{
            subscription.unsubscribe()
        }
    },[watch, slugTransform, setValue])

    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}



// This form is a reusable component that handles both creating and editing posts. It integrates image upload, slug auto-generation, real-time form watching, RTE content editing, and Appwrite CRUD operations using React-Hook-Form.


// “This effect listens to changes in the title field and automatically updates the slug using a slug generator function. The subscription is cleaned up on unmount to avoid unnecessary event listeners.”