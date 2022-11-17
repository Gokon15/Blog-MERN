import './App.css';
import Layout from "./components/Layout";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import PostsPage from "./pages/PostsPage";
import EditPostPage from "./pages/EditPostPage";
import AddPostPage from "./pages/AddPostPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {checkIsAuth, getMe} from "./redux/features/auth/authSlice";



function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='posts' element={!isAuth ? <MainPage/> : <PostsPage/>}/>
                <Route path=':id' element={!isAuth ? <MainPage/> : <PostPage/>}/>
                <Route path=':id/edit' element={<EditPostPage/>}/>
                <Route path='new' element={ !isAuth ? <MainPage/> : <AddPostPage/>}/>
                <Route path='register' element={<RegisterPage/>}/>
                <Route path='login' element={<LoginPage/>}/>
            </Routes>
            <ToastContainer position='bottom-right'/>
        </Layout>

    )
}

export default App
