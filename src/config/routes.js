
import Public from "../layouts/layoutPublic"
import Private from "../layouts/layoutPrivate"


import Login from "../pages/Auth/Login"
import Home from "../pages/Home"
import LoginSuccess from "../pages/Auth/LoginSuccess"
import LoginError from "../pages/Auth/LoginError"
import Acciones from "../pages/Inicio/Acciones"
import ValesSalida from "../pages/Vales"

const routesPublic = [
    {
        path: '/login',
        layout: Public,
        component: Login
    },
    {
        path: "/success",
        layout: Public,
        component: LoginSuccess,
    },
    {
        path: "/error",
        layout: Public,
        component: LoginError,
    }
]

const routesPrivate = [
    {
        path: '/',
        layout: Private,
        component: Home
    },
    {
        path: '/acciones',
        layout: Private,
        component: Acciones
    },
    {
        path: '/vales-salida',
        layout: Private,
        component: ValesSalida
    }
]


const routes = [...routesPrivate, ...routesPublic]

export default routes