
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
import Zonas from "../pages/Zonas"
import CreateZonas from "../pages/Zonas/create"
import EditZonas from "../pages/Zonas/edit"
import Actividades from "../pages/Actividades"
import CreateActividades from "../pages/Actividades/create"
import EditActividades from "../pages/Actividades/edit"
import EditNiveles from "../pages/Niveles/edit"
import Obras from "../pages/Obras"
import CreateObra from "../pages/Obras/create"
import EditObra from "../pages/Obras/edit"
import Unidades from "../pages/Unidades"
import CreateUnidades from "../pages/Unidades/create"
import EditUnidades from "../pages/Unidades/edit"
import Personal from "../pages/Personal"
import CreatePersonal from "../pages/Personal/create"
import EditPersonal from "../pages/Personal/edit"
import Insumos from "../pages/Insumos"
import EditInsumos from "../pages/Insumos/edit"
import CreateInsumos from "../pages/Insumos/create"

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
        component: EditNiveles
    },
    {
        path: '/unidades',
        layout: Private,
        component: Unidades
    },
    {
        path: '/unidades/create',
        layout: Private,
        component: CreateUnidades
    },
    {
        path: '/unidades/:id',
        layout: Private,
        component: EditUnidades
    },
    {
        path: '/obra',
        layout: Private,
        component: Obras
    },
    {
        path: '/obra/create',
        layout: Private,
        component: CreateObra
    },
    {
        path: '/obra/:id',
        layout: Private,
        component: EditObra
    },
    {
        path: '/zonas',
        layout: Private,
        component: Zonas
    },
    {
        path: '/zonas/create',
        layout: Private,
        component: CreateZonas
    },
    {
        path: '/zonas/:id',
        layout: Private,
        component: EditZonas
    },
    {
        path: '/actividades',
        layout: Private,
        component: Actividades
    },
    {
        path: '/actividades/create',
        layout: Private,
        component: CreateActividades
    },
    {
        path: '/actividades/:id',
        layout: Private,
        component: EditActividades
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
        path: '/personal',
        layout: Private,
        component: Personal
    },
    {
        path: '/personal/create',
        layout: Private,
        component: CreatePersonal
    },
    {
        path: '/personal/:id',
        layout: Private,
        component: EditPersonal
    },

    {
        path: '/insumos',
        layout: Private,
        component: Insumos
    },
    {
        path: '/insumos/create',
        layout: Private,
        component: CreateInsumos
    },
    {
        path: '/insumos/:id',
        layout: Private,
        component: EditInsumos
    },




    {
        path: "*",
        layout: Private,
        component: Error404,
    },
]


const routes = [...routesPrivate, ...routesPublic]

export default routes