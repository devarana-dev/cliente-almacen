import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllActividadAction(){
    return async (dispatch) => {
        dispatch(getAllActividadRequest())
        await clientAxios.get('/actividades')
            .then ( res => {
                dispatch(getAllActividadSuccess(res.data.actividades))
            })
            .catch( err => {
                console.log('Error getAllActividadAction', err.response);
                dispatch(getAllActividadError(err.response.data.message))
            })
    }
}
const getAllActividadRequest = () => {
    return {
        type: types.GET_ALL_ACTIVIDAD
    }
}
const getAllActividadSuccess = payload => {
    return {
        type: types.GET_ALL_ACTIVIDAD_SUCCESS,
        payload
    }
}
const getAllActividadError = error => {
    return {
        type: types.GET_ALL_ACTIVIDAD_ERROR,
        payload: error
    }
}

export function getActividadAction(id){
    return async (dispatch) => {
        dispatch(getActividadRequest())
        await clientAxios.get(`/actividades/${id}`)
            .then ( res => {
                dispatch(getActividadSuccess(res.data.actividad))
            }).catch( err => {
                console.log('Error getActividadAction', err.response);
                dispatch(getActividadError(err.response.data.message))
            } )
    }
}
const getActividadRequest = () => {
    return {
        type: types.GET_ACTIVIDAD
    }
}
const getActividadSuccess = payload => {
    return {
        type: types.GET_ACTIVIDAD_SUCCESS,
        payload
    }
}
const getActividadError = error => {
    return {
        type: types.GET_ACTIVIDAD_ERROR,
        payload: error
    }
}


export function createActividadAction(actividad){
    return async (dispatch) => {
        dispatch(createActividadRequest())
        await clientAxios.post('/actividades', actividad)
            .then ( res => {
                dispatch(createActividadSuccess(res.data.actividad))
            }).catch( err => {
                console.log('Error createActividadAction', err.response);
                dispatch(createActividadError(err.response.data.message))
            } )
    }
}
const createActividadRequest = () => {
    return {
        type: types.CREATE_ACTIVIDAD
    }
}
const createActividadSuccess = payload => {
    return {
        type: types.CREATE_ACTIVIDAD_SUCCESS,
        payload
    }
}
const createActividadError = error => {
    return {
        type: types.CREATE_ACTIVIDAD_ERROR,
        payload: error
    }
}


export function updateActividadAction(actividad){
    return async (dispatch) => {
        dispatch(updateActividadRequest())
        await clientAxios.put(`/actividades/${actividad.id}`, actividad)
            .then ( res => {
                console.log(res.data.actividad)
                dispatch(updateActividadSuccess(res.data.actividad))
            }).catch( err => {
                console.log('Error updateActividadAction', err.response);
                dispatch(updateActividadError(err.response.data.message))
            } )
    }
}
const updateActividadRequest = () => {
    return {
        type: types.UPDATE_ACTIVIDAD
    }
}
const updateActividadSuccess = payload => {
    return {
        type: types.UPDATE_ACTIVIDAD_SUCCESS,
        payload
    }
}
const updateActividadError = error => {
    return {
        type: types.UPDATE_ACTIVIDAD_ERROR,
        payload: error
    }
}

export function deleteActividadAction(id){
    return async (dispatch) => {
        dispatch(deleteActividadRequest())
        await clientAxios.delete(`/actividades/${id}`)
            .then ( res => {
                dispatch(deleteActividadSuccess(res.data.actividad))
            }).catch( err => {
                console.log('Error deleteActividadAction', err.response);
                dispatch(deleteActividadError(err.response.data.message))
            } )
    }
}
const deleteActividadRequest = () => {
    return {
        type: types.DELETE_ACTIVIDAD
    }
}
const deleteActividadSuccess = payload => {
    return {
        type: types.DELETE_ACTIVIDAD_SUCCESS,
        payload
    }
}
const deleteActividadError = error => {
    return {
        type: types.DELETE_ACTIVIDAD_ERROR,
        payload: error
    }
}

