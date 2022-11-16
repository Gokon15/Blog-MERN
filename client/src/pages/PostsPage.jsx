import React, {useCallback} from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import PostItem from '../components/PostItem'
import axios from '../utils/axios'
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const PostsPage = () => {
    const [posts, setPosts] = useState([])
    const isLoading = useSelector((state) => state.post.loading)

    const fetchMyPosts = useCallback(async () => {
        try {
            const {data} = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }, [])


    useEffect(() => {
        fetchMyPosts()
    }, [fetchMyPosts])

    return (
        <>
            {isLoading ? <Box className='flex  justify-center justify-items-center mt-12'>
                <CircularProgress/>
            </Box> : <div className='w-1/2 mx-auto py-10 flex flex-col gap-10 '>
                {posts?.map((post, idx) => (
                    <PostItem post={post} key={idx}/>
                ))}
            </div>}

        </>
    )
}

export default PostsPage;