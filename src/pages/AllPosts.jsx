import React, {useState, useEffect} from "react";
import appwriteService from "../appwirte/config"
import { Container, PostCard } from "../components";

export default function AllPosts(){

    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        appwriteService.getPosts([])
        .then((posts)=>{
            if(posts){
                setPosts(posts.rows)
            }
        })
    },[])

    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div  key={post.$id} className="p-2 w-1/4">
                        <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}



// useEffect(() => {
//   const fetchPosts = async () => {
//     const res = await appwriteService.getPosts([]);

//     if (res) {
//       setPosts(res.rows);
//     }
//   };

//   fetchPosts();
// }, []);
