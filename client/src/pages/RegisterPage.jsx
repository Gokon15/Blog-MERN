import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
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
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const isAuth = useSelector(checkIsAuth)
    const isLoading = useSelector((state) => state.auth.isLoading)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate])

    const onSubmit = async () => {
        try {
            const data = await dispatch(registerUser({username, password}))
            toast(data.payload.message)
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

    const {t} = useTranslation();

    return (
        <>
            {isLoading ? <Box className='flex  justify-center justify-items-center mt-12'>
                <CircularProgress/>
            </Box> : <Paper classes={{root: styles.root}}>
                <Typography classes={{root: styles.title}} variant="h5">
                    {t("register")}
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
                        label={t("username")}
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
                        label={t("password")}
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
                        {t("register")}
                    </Button>
                </form>
                <Link
                    to='/login'
                    className='flex justify-center items-center text-xs text-black my-5 '>
                    {t("haveAcc")}
                </Link>
            </Paper>}

        </>
    )
}

export default RegisterPage;