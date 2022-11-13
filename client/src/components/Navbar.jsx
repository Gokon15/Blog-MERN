import React from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {checkIsAuth, logout} from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

import {Disclosure} from '@headlessui/react'
import Button from "@mui/material/Button";

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    const navigation = [
        {name: 'Main page', href: '/', current: false},
        {name: 'My posts', href: '/posts', current: false},
        {name: 'Add post', href: '/new', current: false},
    ]

    const navigationIsntAuth = [
        {name: 'Main page', href: '/', current: false},
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className='flex py-4 justify-center items-center mr-9'>

            {/*{isAuth && (
                <ul className='flex gap-8'>
                    <li>
                        <NavLink
                            to={'/'}
                            href='/'
                            className='text-xs text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className='text-xs text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Мои посты
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
                            className='text-xs text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Добавить пост
                        </NavLink>
                    </li>
                </ul>
            )}*/}
            {isAuth && (<Disclosure as="nav" className="bg-gray-800 rounded">
                {({}) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                            <div className="relative flex h-16 items-center justify-between">
                                <div
                                    className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                                    <div className="hidden sm:ml-6 sm:block mr-7">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    style={({isActive}) =>
                                                        isActive ? activeStyles : undefined
                                                    }
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                    <div
                                        className='flex justify-center items-center text-xs text-white'>
                                        <Button size="small" variant="outlined" color="error"
                                                onClick={logoutHandler}>
                                            Log Out
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>)}
            {!isAuth && (<Disclosure as="nav" className="bg-gray-800 rounded">
                {({}) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                            <div className="relative flex h-16 items-center justify-between">
                                <div
                                    className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4 mr-6">
                                            {navigationIsntAuth.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    style={({isActive}) =>
                                                        isActive ? activeStyles : undefined
                                                    }
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}
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
                                                <Link to={'/login'}> Log In </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>)}

        </div>
    )
}
