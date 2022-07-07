import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllUsuariosAction(){
    return async (dispatch) => {
        dispatch(getAllUsuariosRequest())
        await clientAxios.get('/usuarios')
            .then ( res => {
                dispatch(getAllUsuariosSuccess(res.data.usuarios))
            })
            .catch( err => {
                console.log('Error getAllUsuariosAction', err.response);
                dispatch(getAllUsuariosError(err.response.data.message))
            })
    }
}
const getAllUsuariosRequest = () => {
    return {
        type: types.GET_ALL_USER
    }
}
const getAllUsuariosSuccess = payload => {
    return {
        type: types.GET_ALL_USER_SUCCESS,
        payload
    }
}
const getAllUsuariosError = error => {
    return {
        type: types.GET_ALL_USER_ERROR,
        payload: error
    }
}



export function getUsuarioAction(id){
    return async (dispatch) => {
        dispatch(getUsuarioRequest())
        await clientAxios.get(`/usuarios/${id}`)
            .then ( res => {
                dispatch(getUsuarioSuccess(res.data.usuario))
            })
            .catch( err => {
                console.log('Error getUsuarioAction', err.response);
                dispatch(getUsuarioError(err.response.data.message))
            })
    }
}
const getUsuarioRequest = () => {
    return {
        type: types.GET_USER
    }
}
const getUsuarioSuccess = payload => {
    return {
        type: types.GET_USER_SUCCESS,
        payload
    }
}
const getUsuarioError = error => {
    return {
        type: types.GET_USER_ERROR,
        payload: error
    }
}


export function createUsuarioAction(usuario){
    return async (dispatch) => {
        dispatch(createUsuarioRequest())
        await clientAxios.post('/usuarios', usuario)
            .then ( res => {
                dispatch(createUsuarioSuccess(res.data.usuario))
            })
            .catch( err => {
                console.log('Error createUsuarioAction', err.response);
                dispatch(createUsuarioError(err.response.data.message))
            })
    }
}
const createUsuarioRequest = () => {
    return {
        type: types.CREATE_USER
    }
}
const createUsuarioSuccess = payload => {
    return {
        type: types.CREATE_USER_SUCCESS,
        payload
    }
}
const createUsuarioError = error => {
    return {
        type: types.CREATE_USER_ERROR,
        payload: error
    }
}


export function updateUsuarioAction(usuario){
    return async (dispatch) => {
        dispatch(updateUsuarioRequest())
        await clientAxios.put(`/usuarios/${usuario.id}`, usuario)
            .then ( res => {
                dispatch(updateUsuarioSuccess(res.data.usuario))
            })
            .catch( err => {
                console.log('Error updateUsuarioAction', err.response);
                dispatch(updateUsuarioError(err.response.data.message))
            })
    }
}
const updateUsuarioRequest = () => {
    return {
        type: types.UPDATE_USER
    }
}
const updateUsuarioSuccess = payload => {
    return {
        type: types.UPDATE_USER_SUCCESS,
        payload
    }
}
const updateUsuarioError = error => {
    return {
        type: types.UPDATE_USER_ERROR,
        payload: error
    }
}
