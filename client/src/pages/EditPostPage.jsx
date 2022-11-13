import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'

import axios from '../utils/axios'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";

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

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({});

    const { t } = useTranslation();

    return (
        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={handleSubmit(submitHandler)}
        >
            <Button variant="contained" component="label">
                {t("changeImage")}
                <input onChange={(e) => {
                    setNewImage(e.target.files[0])
                    setOldImage('')
                }} hidden accept="image/*" multiple
                       type="file"/>
            </Button>

            {oldImage  && (
                <div className={'my-6'}>
                    <Button variant="outlined" color="error" onClick={imageFormHandler}>
                        {t("deleteImage")}
                    </Button>
                </div>
            )}

            { newImage && (
                <div className={'my-6'}>
                    <Button variant="outlined" color="error" onClick={imageFormHandler}>
                        {t("deleteImage")}
                    </Button>
                </div>
            )}
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
                    placeholder={t("postTitle")}
                    label={t("postTitle")}
                    {...register("title", {required: "This field is required, please enter title"})}
                    error={Boolean(errors.title?.message)}
                    helperText={errors.title?.message}
                    multiline
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
            </div>
            <div>
                <TextField
                    sx={{
                        width: 515,
                    }}
                    id="outlined-multiline-static"
                    label={t("postText")}
                    multiline
                    {...register("text", {required: "This field is required, please enter text"})}
                    error={Boolean(errors.text?.message)}
                    helperText={errors.text?.message}
                    value={text}
                    rows={4}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                />
            </div>
            <div className='flex gap-8 items-center justify-center mt-4'>
                <Button variant="contained"  type='submit' /*disabled={!isValid}*/ >{t("updatePost")}</Button>

                <Button variant="outlined" color="error" onClick={clearFormHandler}>
                    {t("clearForm")}
                </Button>
            </div>
        </form>
    )
}
