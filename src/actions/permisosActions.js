import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllPermisosAction(){
    return async (dispatch) => {
        dispatch(getAllPermisosRequest())
        await clientAxios.get('/permisos')
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
const getAllPermisosSuccess = payload => {
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

export function getPermisoAction(){
    return async (dispatch) => {
        dispatch(getPermisoRequest())
        await clientAxios.get(`/permisos`)
            .then ( res => {

                dispatch(getPermisoSuccess(res.data.permisos))
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
