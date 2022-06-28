
import Public from "../layouts/layoutPublic"
import Private from "../layouts/layoutPrivate"


import Login from "../pages/Auth/Login"
import Home from "../pages/Home"

const routesPublic = [
    {
        path: '/login',
        layout: Public,
        component: Login
    }
]

const routesPrivate = [
    {
        path: '/',
        layout: Private,
        component: Home
    }
]


const routes = [...routesPrivate, ...routesPublic]

export default routes