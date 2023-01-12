import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllPermisosAction(filtro){
    return async (dispatch) => {
        if(filtro){
            dispatch(getAllPermisosAltRequest())
        }else{
            dispatch(getAllPermisosRequest())
        }
        await clientAxios.get('/permisos', {params: filtro})
            .then ( res => {
                    dispatch(getAllPermisosSuccess(res.data.permisos))
            }).catch( err => {
                console.log('Error getAllPermisosAction', err.response);
                dispatch(getAllPermisosError(err.response.data.message))
            } )
    }
}

const getAllPermisosRequest = () => {
    return {
        type: types.GET_ALL_PERMISOS
    }
}

const getAllPermisosAltRequest = () => {
    return {
        type: types.GET_ALL_ALT_PERMISOS
    }
}
const getAllPermisosSuccess = (payload) => {
    return {
        type: types.GET_ALL_PERMISOS_SUCCESS,
        payload
    }
}


const getAllPermisosError = error => {
    return {
        type: types.GET_ALL_PERMISOS_ERROR,
        payload: error
    }
}

export function getPermisoUsuarioAction(){
    return async (dispatch) => {
        dispatch(getPermisoUsuarioRequest())
        await clientAxios.get(`/permisos/usuario`)
            .then ( res => {

                dispatch(getPermisoUsuarioSuccess(res.data.permisos))
            }).catch( err => {
                console.log('Error getPermisoAction', err.response);
                dispatch(getPermisoUsuarioError(err.response.data.message))
            } )
    }
}
const getPermisoUsuarioRequest = () => {
    return {
        type: types.GET_PERMISO_USUARIO
    }
}
const getPermisoUsuarioSuccess = payload => {
    return {
        type: types.GET_PERMISO_USUARIO_SUCCESS,
        payload
    }
}
const getPermisoUsuarioError = error => {
    return {
        type: types.GET_PERMISO_USUARIO_ERROR,
        payload: error
    }
}


export function getPermisoAction (id){
    return async (dispatch) => {
        dispatch(getPermisoRequest())
        await clientAxios.get(`/permisos/${id}`)
            .then ( res => {
                dispatch(getPermisoSuccess(res.data.permiso))
            }).catch( err => {
                console.log('Error getPermisoAction', err.response);
                dispatch(getPermisoError(err.response.data.message))
            } )
    }
}

const getPermisoRequest = () => {
    return {
        type: types.GET_PERMISO
    }
}
const getPermisoSuccess = payload => {
    return {
        type: types.GET_PERMISO_SUCCESS,
        payload
    }
}

const getPermisoError = error => {
    return {
        type: types.GET_PERMISO_ERROR,
        payload: error
    }
}




export function createPermisoAction(permiso){
    return async (dispatch) => {
        dispatch(createPermisoRequest())
        await clientAxios.post('/permisos', permiso)
            .then ( res => {
                dispatch(createPermisoSuccess(res.data.permiso))
            }).catch( err => {
                console.log('Error createPermisoAction', err.response);
                dispatch(createPermisoError(err.response.data.message))
            } )
    }
}
const createPermisoRequest = () => {
    return {
        type: types.CREATE_PERMISO
    }
}
const createPermisoSuccess = payload => {
    return {
        type: types.CREATE_PERMISO_SUCCESS,
        payload
    }
}
const createPermisoError = error => {
    return {
        type: types.CREATE_PERMISO_ERROR,
        payload: error
    }
}

export function updatePermisoAction(permiso){
    return async (dispatch) => {
        dispatch(updatePermisoRequest())
        await clientAxios.put(`/permisos/${permiso.id}`, permiso)
            .then ( res => {
                dispatch(updatePermisoSuccess(res.data.permiso))
            }).catch( err => {
                console.log('Error updatePermisoAction', err.response);
                dispatch(updatePermisoError(err.response.data.message))
            } )
    }
}
const updatePermisoRequest = () => {
    return {
        type: types.UPDATE_PERMISO
    }
}
const updatePermisoSuccess = payload => {
    return {
        type: types.UPDATE_PERMISO_SUCCESS,
        payload
    }
}
const updatePermisoError = error => {
    return {
        type: types.UPDATE_PERMISO_ERROR,
        payload: error
    }
}

export function deletePermisoAction(id){
    return async (dispatch) => {
        dispatch(deletePermisoRequest())
        await clientAxios.delete(`/permisos/${id}`)
            .then ( res => {
                dispatch(deletePermisoSuccess(res.data.permiso))
            }).catch( err => {
                console.log('Error deletePermisoAction', err.response);
                dispatch(deletePermisoError(err.response.data.message))
            } )
    }
}
const deletePermisoRequest = () => {
    return {
        type: types.DELETE_PERMISO
    }
}
const deletePermisoSuccess = payload => {
    return {
        type: types.DELETE_PERMISO_SUCCESS,
        payload
    }
}
const deletePermisoError = error => {
    return {
        type: types.DELETE_PERMISO_ERROR,
        payload: error
    }
}


export function resetPermisionStateAction(){
    return (dispatch) => {
        dispatch({
            type: types.RESET_PERMISO_STATE
        })
    }
}