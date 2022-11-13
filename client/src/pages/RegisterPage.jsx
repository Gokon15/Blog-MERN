import React, {useState, useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {registerUser, checkIsAuth} from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "../scss/Login.module.scss";

import {useForm} from "react-hook-form";

export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const isAuth = useSelector(checkIsAuth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate])

    const onSubmit = async() => {
        try {
            const data =  await dispatch(registerUser({username, password}))
            if (isAuth)  return <Navigate to="/"/>
            toast(data.payload.message)
            setPassword('')
            setUsername('')
        } catch (error) {
            console.log(error)
        }
    }

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({
        mode: "onChange",
    });


    return (
        <>
            {/*<form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-40'
        >
            <h1 className='text-lg text-white text-center'>Регистрация</h1>
            <label className='text-xs text-gray-400'>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Password:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <button
                    type='submit'
                    onClick={onSubmit}
                    className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
                >
                    Подтвердить
                </button>
                <Link
                    to='/login'
                    className='flex justify-center items-center text-xs text-white'
                >
                    Уже зарегистрированы ?
                </Link>
            </div>
        </form>*/}
            <Paper classes={{root: styles.root}}>
                <Typography classes={{root: styles.title}} variant="h5">
                    Registration
                </Typography>
                <div className={styles.avatar}>
                    <Avatar sx={{width: 100, height: 100}}/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        error={Boolean(errors.fullName?.message)}
                        helperText={errors.fullName?.message}
                        {...register("fullName", {required: "Укажите полное имя"})}
                        className={styles.field}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="User name"
                        fullWidth
                    />
                    <TextField
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        type="password"
                        {...register("password", {required: "Укажите пароль"})}
                        className={styles.field}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        fullWidth
                    />
                    <Button
                        disabled={!isValid}
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        size="large"
                        variant="contained"
                        fullWidth
                    >
                        Register
                    </Button>
                </form>
                    <Link
                        to='/login'
                        className='flex justify-center items-center text-xs text-black my-5 '>
                        Already registered?
                    </Link>
            </Paper>
        </>
    )
}
