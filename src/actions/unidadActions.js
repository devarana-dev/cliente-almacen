import clientAxios from '../config/axios';
import { types } from '../types';

export function getAllUnidadesAction(){
    return async (dispatch) => {
        dispatch(getAllUnidadRequest())
        await clientAxios.get('/unidades')
            .then ( res => {
                dispatch(getAllUnidadSuccess(res.data.unidades))
            })
            .catch( err => {
                console.log('Error getAllUnidadAction', err.response);
                dispatch(getAllUnidadError(err.response.data.message))
            })
    }
}
const getAllUnidadRequest = () => {
    return {
        type: types.GET_ALL_UNIDAD
    }
}
const getAllUnidadSuccess = payload => {
    return {
        type: types.GET_ALL_UNIDAD_SUCCESS,
        payload
    }
}
const getAllUnidadError = error => {
    return {
        type: types.GET_ALL_UNIDAD_ERROR,
        payload: error
    }
}


export function createUnidadAction (unidad){
    return async (dispatch) => {
        dispatch(createUnidadRequest())
        await clientAxios.post('/unidades', unidad)
            .then ( res => {
                dispatch(createUnidadSuccess(res.data.unidad))
            })
            .catch( err => {
                console.log('Error createUnidadAction', err);
                dispatch(createUnidadError(err.response.data.message))
            })
    }
}
const createUnidadRequest = () => {
    return {
        type: types.CREATE_UNIDAD
    }
}
const createUnidadSuccess = payload => {
    return {
        type: types.CREATE_UNIDAD_SUCCESS,
        payload
    }
}
const createUnidadError = error => {
    return {
        type: types.CREATE_UNIDAD_ERROR,
        payload: error
    }
}


export function getUnidadAction(id){
    return async (dispatch) => {
        dispatch(getUnidadRequest())
        await clientAxios.get('/unidades/'+id)
            .then ( res => {
                dispatch(getUnidadSuccess(res.data.unidad))
            })
            .catch( err => {
                console.log('Error getUnidadAction', err.response);
                dispatch(getUnidadError(err.response.data.message))
            })
    }
}
const getUnidadRequest = () => {
    return {
        type: types.GET_UNIDAD
    }
}
const getUnidadSuccess = payload => {
    return {
        type: types.GET_UNIDAD_SUCCESS,
        payload
    }
}
const getUnidadError = error => {
    return {
        type: types.GET_UNIDAD_ERROR,
        payload: error
    }
}


export function updateUnidadAction (unidad){
    return async (dispatch) => {
        dispatch(updateUnidadRequest())
        await clientAxios.put('/unidades/'+unidad.id, unidad)
            .then ( res => {
                dispatch(updateUnidadSuccess(res.data.unidad))
            })
            .catch( err => {
                console.log('Error updateUnidadAction', err.response);
                dispatch(updateUnidadError(err.response.data.message))
            })
    }
}
const updateUnidadRequest = () => {
    return {
        type: types.UPDATE_UNIDAD
    }
}
const updateUnidadSuccess = payload => {
    return {
        type: types.UPDATE_UNIDAD_SUCCESS,
        payload
    }
}
const updateUnidadError = error => {
    return {
        type: types.UPDATE_UNIDAD_ERROR,
        payload: error
    }
}


export function deleteUnidadAction (id){
    return async (dispatch) => {
        dispatch(deleteUnidadRequest())
        await clientAxios.delete('/unidades/'+id)
            .then ( res => {
                dispatch(deleteUnidadSuccess(res.data.message))
            })
            .catch( err => {
                console.log('Error deleteUnidadAction', err.response);
                dispatch(deleteUnidadError(err.response.data.message))
            })
    }
}
const deleteUnidadRequest = () => {
    return {
        type: types.DELETE_UNIDAD
    }
}
const deleteUnidadSuccess = payload => {
    return {
        type: types.DELETE_UNIDAD_SUCCESS,
        payload
    }
}
const deleteUnidadError = error => {
    return {
        type: types.DELETE_UNIDAD_ERROR,
        payload: error
    }
}

