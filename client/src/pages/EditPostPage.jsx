import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'

import axios from '../utils/axios'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const EditPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setOldImage(data.imgUrl)
    }, [params.id])

    const imageFormHandler = () => {
        setOldImage('')
        setNewImage('')
    }

    const submitHandler = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', params.id)
            updatedPost.append('image', newImage)
            dispatch(updatePost(updatedPost))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setTitle('')
        setText('')
    }

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    return (
        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()}
        >
            <Button variant="contained" component="label">
                 Change image
                <input onChange={(e) => {
                    setNewImage(e.target.files[0])
                    setOldImage('')
                }} hidden accept="image/*" multiple
                       type="file"/>
            </Button>

            {oldImage  && (
                <div className={'my-6'}>
                    <Button variant="outlined" color="error" onClick={imageFormHandler}>
                        Delete image
                    </Button>
                </div>
            )}

            { newImage && (
                <div className={'my-6'}>
                    <Button variant="outlined" color="error" onClick={imageFormHandler}>
                        Delete image
                    </Button>
                </div>
            )}
            {/*<label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                Прикрепить изорбажение:
                <input
                    type='file'
                    className='hidden'
                    onChange={(e) => {
                        setNewImage(e.target.files[0])
                        setOldImage('')
                    }}
                />
            </label>*/}
            <div className='flex object-cover py-2'>

                {oldImage && (
                    <img
                        src={`http://localhost:3002/${oldImage}`}
                        alt={oldImage.name}
                    />
                )}
                {newImage && (
                    <img
                        src={URL.createObjectURL(newImage)}
                        alt={newImage.name}
                    />
                )}
            </div>

            <div className={'bg-white rounded my-12'}>
                <TextField
                    variant="standard"
                    placeholder="Post title"
                    label="Post title"
                    multiline
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
            </div>
            {/*<label className='text-xs text-white opacity-70'>
                Заголовок поста:
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Заголовок'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>*/}

            <div>
                <TextField
                    sx={{
                        width: 515,
                    }}
                    id="outlined-multiline-static"
                    label="Post text"
                    multiline
                    value={text}
                    rows={4}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                />
            </div>

            {/*<label className='text-xs text-white opacity-70'>
                Текст поста:
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Текст поста'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
                />
            </label>*/}

            <div className='flex gap-8 items-center justify-center mt-4'>
                <Button variant="contained" onClick={submitHandler}>Update post</Button>

                <Button variant="outlined" color="error" onClick={clearFormHandler}>
                    Clear form
                </Button>
            </div>
        </form>
    )
}
