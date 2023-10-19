import { Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SetAvatar from '../pages/SetAvatar'
import Chat from '../pages/Chat'
import TestFather from '../pages/TestFather'
const routes = [
    {
        path: '/',
        element: <Chat />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/setAvatar',
        element: <SetAvatar />
    },
    {
        path: '/testfather',
        element: <TestFather />
    }
]

export default routes;