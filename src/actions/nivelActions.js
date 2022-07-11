import clientAxios from '../config/axios';
import { types } from '../types';

export function getAllNivelesAction(){
    return async (dispatch) => {
        dispatch(getAllNivelesRequest())
        await clientAxios.get('/niveles')
            .then ( res => {
                dispatch(getAllNivelesSuccess(res.data.niveles))
            }).catch( err => {
                console.log('Error getAllNivelAction', err.response);
                dispatch(getAllNivelesError(err.response.data.message))
            } )
    }
}
const getAllNivelesRequest = () => {
    return {
        type: types.GET_ALL_NIVEL
    }
}
const getAllNivelesSuccess = payload => {
    return {
        type: types.GET_ALL_NIVEL_SUCCESS,
        payload
    }
}
const getAllNivelesError = error => {
    return {
        type: types.GET_ALL_NIVEL_ERROR,
        payload: error
    }
}

export function createNivelAction(nivel){
    return async (dispatch) => {
        dispatch(createNivelRequest())
        await clientAxios.post('/niveles', nivel)
            .then ( res => {
                dispatch(createNivelSuccess(res.data.nivel))
            }).catch( err => {
                console.log('Error createNivelAction', err.response);
                dispatch(createNivelError(err.response.data.message))
            } )
    }
}

const createNivelRequest = () => {
    return {
        type: types.CREATE_NIVEL
    }
}
const createNivelSuccess = payload => {
    return {
        type: types.CREATE_NIVEL_SUCCESS,
        payload
    }
}
const createNivelError = error => {
    return {
        type: types.CREATE_NIVEL_ERROR,
        payload: error
    }
}

export function getNivelAction(id){
    return async (dispatch) => {
        dispatch(getNivelRequest())
        await clientAxios.get(`/niveles/${id}`)
            .then ( res => {
                dispatch(getNivelSuccess(res.data.nivel))
            }).catch( err => {
                console.log('Error getNivelAction', err.response);
                dispatch(getNivelError(err.response.data.message))
            } )
    }
}

const getNivelRequest = () => {
    return {
        type: types.GET_NIVEL
    }
}
const getNivelSuccess = payload => {
    return {
        type: types.GET_NIVEL_SUCCESS,
        payload
    }
}
const getNivelError = error => {
    return {
        type: types.GET_NIVEL_ERROR,
        payload: error
    }
}

export function updateNivelAction(nivel){
    return async (dispatch) => {
        dispatch(updateNivelRequest())
        await clientAxios.put(`/niveles/${nivel.id}`, nivel)
            .then ( res => {
                dispatch(updateNivelSuccess(res.data.nivel))
            }).catch( err => {
                console.log('Error updateNivelAction', err.response);
                dispatch(updateNivelError(err.response.data.message))
            } )
    }
}

const updateNivelRequest = () => {
    return {
        type: types.UPDATE_NIVEL
    }
}
const updateNivelSuccess = payload => {
    return {
        type: types.UPDATE_NIVEL_SUCCESS,
        payload
    }
}
const updateNivelError = error => {
    return {
        type: types.UPDATE_NIVEL_ERROR,
        payload: error
    }
}


export function deleteNivelAction(id){
    return async (dispatch) => {
        dispatch(deleteNivelRequest())
        await clientAxios.delete(`/niveles/${id}`)
            .then ( res => {
                console.log(res.data);
                dispatch(deleteNivelSuccess(res.data.nivel))
            }).catch( err => {
                console.log('Error deleteNivelAction', err.response);
                dispatch(deleteNivelError(err.response.data.message))
            } )
    }
}

const deleteNivelRequest = () => {
    return {
        type: types.DELETE_NIVEL
    }
}
const deleteNivelSuccess = payload => {
    return {
        type: types.DELETE_NIVEL_SUCCESS,
        payload
    }
}
const deleteNivelError = error => {
    return {
        type: types.DELETE_NIVEL_ERROR,
        payload: error
    }
}
