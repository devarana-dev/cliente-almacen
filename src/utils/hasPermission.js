export const hasPermission = (userPermission, route) => {
    if(userPermission) {
        return userPermission.find(permission => permission.permiso === route) ? true : false
    }
}

export const groupPermission = (userPermission, routesGroup) => {
    if(userPermission) {
        // Si el usuario tiene permiso para una ruta, entonces se retorna true
        return routesGroup.find(route => hasPermission(userPermission, route)) ? true : false
    }
}
