
import Public from "../layouts/layoutPublic"
import Private from "../layouts/layoutPrivate"


import Login from "../pages/Auth/Login"
import Home from "../pages/Home"
import LoginSuccess from "../pages/Auth/LoginSuccess"
import LoginError from "../pages/Auth/LoginError"
import Acciones from "../pages/Inicio/Acciones"
import ValesSalida from "../pages/Vales"
import CreateValesSalida from "../pages/Vales/create"
import Error404 from "../pages/Error404"
import Usuarios from "../pages/Usuarios"
import CreateUsuario from "../pages/Usuarios/create"
import EditUsuario from "../pages/Usuarios/edit"
import Roles from "../pages/Roles"
import CreateRoles from "../pages/Roles/create"
import EditRoles from "../pages/Roles/edit"
import Niveles from "../pages/Niveles"
import CreateNiveles from "../pages/Niveles/create"

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
        path: '/usuarios',
        layout: Private,
        component: Usuarios
    },
    {
        path: '/usuarios/create',
        layout: Private,
        component: CreateUsuario
    },
    {
        path: '/usuarios/:id',
        layout: Private,
        component: EditUsuario
    },
    {
        path: '/roles',
        layout: Private,
        component: Roles
    },
    {
        path: '/roles/create',
        layout: Private,
        component: CreateRoles
    },
    {
        path: '/roles/:id',
        layout: Private,
        component: EditRoles
    },
    {
        path: '/niveles',
        layout: Private,
        component: Niveles
    },
    {
        path: '/niveles/create',
        layout: Private,
        component: CreateNiveles
    },
    {
        path: '/niveles/:id',
        layout: Private,
        component: EditRoles
    },
    {
        path: '/vales-salida',
        layout: Private,
        component: ValesSalida
    },
    {
        path: '/vales-salida/nuevo',
        layout: Private,
        component: CreateValesSalida
    },




    {
        path: "*",
        layout: Private,
        component: Error404,
    },
]


const routes = [...routesPrivate, ...routesPublic]

export default routes