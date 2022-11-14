import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import styles from "../scss/Login.module.scss";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";


 const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth, navigate])

    const onSubmit = async () => {
        try {
            const data = await dispatch(loginUser({username, password}))
            console.log(data)
            toast(data.payload.message)

        } catch (error) {
            console.log(error)
        }
    }

    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({});
    return (
        <>
            <Paper classes={{root: styles.root}}>
                <Typography classes={{root: styles.title}} variant="h5">
                    {t("auth")}
                </Typography>
                <div className={styles.avatar}>
                    <Avatar sx={{width: 100, height: 100}}/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        error={Boolean(errors.login?.message)}
                        helperText={errors.login?.message}
                        {...register("login", {required: "This field is required, please enter your username"})}
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
                        {...register("password", {required: "This field is required, please enter your password"})}
                        className={styles.field}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label={t("password")}
                        fullWidth
                    />
                    <Button
                        disabled={!isValid}
                        type="submit"
                        size="large"
                        variant="contained"
                        fullWidth
                    >
                        {t("navBar.login")}
                    </Button>
                </form>
                <Link href="#">
                    <Link
                        to='/register'
                        className='flex justify-center items-center text-xs text-black my-5 '>
                        {t("haven`tAcc")}
                    </Link>
                </Link>
            </Paper>
        </>
    )
}

export default LoginPage;