import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Moment from 'react-moment'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import SendIcon from '@mui/icons-material/Send';

import axios from '../utils/axios'
import {removePost} from '../redux/features/post/postSlice'
import {
    createComment,
    getPostComments,
} from '../redux/features/comment/commentSlice'
import {CommentItem} from '../components/CommentItem'
import {Fab} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {CommentRounded} from "@mui/icons-material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')

    const {user} = useSelector((state) => state.auth)
    const {comments} = useSelector((state) => state.comment)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('The post has been deleted')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({postId, comment}))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const {data} = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    const {t} = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { isValid},
    } = useForm({
        mode: "onChange",
    });

    if (!post) {
        return (
            <div className={'flex items-center justify-center '}>
                <div className=' text-xl text-center text-black py-10 bg-white rounded inline-block px-12  '>
                    No posts here yet
                </div>
            </div>
        )
    }
    return (
        <div className={'px-7'}>
            <div className='flex gap-10 py-8'>
                <div className='w-2/3 bg-white p-12 rounded'>
                    <div className='flex flex-col basis-1/4 flex-grow'>
                        <div
                            className={
                                post?.imgUrl
                                    ? 'flex rouded-sm h-80'
                                    : 'flex rounded-sm'
                            }
                        >
                            {post?.imgUrl && (
                                <img
                                    src={`http://localhost:3002/${post.imgUrl}`}
                                    alt='img'
                                    className='object-cover w-full'
                                />
                            )}
                        </div>
                    </div>

                    <div className='flex justify-between items-center pt-2'>
                        <div className='text-xs text-black  opacity-50'>
                            {post.username}
                        </div>
                        <div className='text-xs text-black  opacity-50'>
                            <Moment date={post.createdAt} format='D MMM YYYY'/>
                        </div>
                    </div>
                    <div className='text-black text-xl'>{post.title}</div>
                    <p className='text-black opacity-60 text-xs pt-4 line-clamp-4 whitespace-wrap'>
                        {post.text}
                    </p>
                    <div className='flex gap-3 items-center mt-2 justify-between'>
                        <div className='flex gap-3 mt-4'>
                            <button className='flex items-center justify-center gap-2 text-xs text-black  opacity-50'>
                                <VisibilityRoundedIcon fontSize="small"/> <span>{post.views}</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 text-xs text-black  opacity-50'>
                                <CommentRounded fontSize="small"/>
                                <span>{post.comments?.length || 0} </span>
                            </button>
                        </div>

                        {user?._id === post.author && (
                            <div className='flex gap-3 mt-4'>
                                <button className='flex items-center justify-center gap-2 text-black  opacity-50'>
                                    <Link to={`/${params.id}/edit`}>
                                        <Fab color="secondary" aria-label="edit">
                                            <EditIcon/>
                                        </Fab>
                                    </Link>
                                </button>
                                <button
                                    onClick={removePostHandler}
                                    className='flex items-center justify-center gap-2  text-black  opacity-50'
                                >
                                    <Fab color="secondary" aria-label="edit">
                                        <DeleteIcon/>
                                    </Fab>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {user ? <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
                        <form
                            className='flex gap-2 '
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextField
                                id="outlined-required"
                                fullwidth
                                placeholder={t("comment")}
                                {...register("comment", {required: "Input comment"})}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                InputProps={{
                                    style: {
                                        background: 'lightgrey'
                                    }
                                }}
                            />

                            <Button type='submit'
                                    disabled={!isValid}
                                    variant="contained" endIcon={<SendIcon/>}>
                                {t("send")}
                            </Button>
                        </form>

                        {comments?.map((cmt) => (
                            <CommentItem key={cmt._id} cmt={cmt}/>
                        ))}
                    </div> :
                    <div className='w-1/3 p-8 bg-white-700 flex flex-col gap-2 rounded'>
                        <h1>{t("viewComment")}</h1>
                    </div>
                }
            </div>
        </div>
    )
}
