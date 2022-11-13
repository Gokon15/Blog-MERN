import React from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {checkIsAuth, logout} from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

import {Disclosure} from '@headlessui/react'
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {t, i18n} = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const activeStyles = {
        color: 'white',
        background: 'lightgrey',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('You are logged out')
        navigate('/login')

    }

    /*const navigation = [
        {name: 'Main page', href: '/', current: false},
        {name: 'My posts', href: '/posts', current: false},
        {name: 'Add post', href: '/new', current: false},
    ]

    const navigationIsntAuth = [
        {name: 'Main page', href: '/', current: false},
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }*/

    return (
        <div className='flex py-4 justify-center items-center mr-9'>

            {isAuth && (<Disclosure as="nav" className="bg-gray-800 rounded">
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                        <div className="relative flex h-16 items-center justify-between">
                            <div
                                className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                                <div className="hidden sm:ml-6 sm:block mr-7">
                                    <div className="flex space-x-4">
                                        <button className={'text-gray-300 hover:bg-gray-700 hover:text-white'} onClick={() => changeLanguage("en")}>EN</button>
                                        <button className={'text-gray-300 hover:bg-gray-700 hover:text-white'} onClick={() => changeLanguage("de")}>UA</button>
                                        <NavLink
                                            to={'/'}
                                            style={({isActive}) =>
                                                isActive ? activeStyles : undefined
                                            }
                                            className={'text-gray-300 hover:bg-gray-700 hover:text-white'}
                                        >
                                            {t("navBar.main")}
                                        </NavLink>
                                        <NavLink
                                            to={'/posts'}
                                            style={({isActive}) =>
                                                isActive ? activeStyles : undefined
                                            } className={'text-gray-300 hover:bg-gray-700 hover:text-white'}
                                        >
                                            {t("navBar.posts")}
                                        </NavLink>
                                        <NavLink
                                            to={'/new'}
                                            style={({isActive}) =>
                                                isActive ? activeStyles : undefined
                                            }

                                            className={'text-gray-300 hover:bg-gray-700 hover:text-white'}
                                        >
                                            {t("navBar.add")}
                                        </NavLink>
                                    </div>
                                </div>
                                <div
                                    className='flex justify-center items-center text-xs text-white'>
                                    <Button size="small" variant="outlined" color="error"
                                            onClick={logoutHandler}>
                                        {t("navBar.logout")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Disclosure>)}
            {!isAuth && (<Disclosure as="nav" className="bg-gray-800 rounded">
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                        <div className="relative flex h-16 items-center justify-between">
                            <div
                                className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4 mr-6">
                                        <button onClick={() => changeLanguage("en")}>EN</button>
                                        <button onClick={() => changeLanguage("de")}>UA</button>
                                        <NavLink
                                            to={'/'}
                                            style={({isActive}) =>
                                                isActive ? activeStyles : undefined
                                            }

                                            /*aria-current={item.current ? 'page' : undefined}*/
                                        >
                                            {t("navBar.main")}
                                        </NavLink>
                                    </div>
                                </div>
                                <div
                                    className='flex justify-center items-center text-xs text-white rounded-sm '>
                                    {isAuth ? (
                                        <Button variant="outlined" color="error" onClick={logoutHandler}>
                                            Log Out
                                        </Button>
                                    ) : (
                                        <Button size="small" variant="outlined" color="error">
                                            <Link to={'/login'}> {t("navBar.login")} </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            </Disclosure>)}

        </div>
    )
}
