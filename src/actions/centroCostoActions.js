import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllCentroCostoAction(){
    return async (dispatch) => {
        dispatch(getAllCentroCostoRequest())
        await clientAxios.get('/centrosCosto')
            .then ( res => {
                dispatch(getAllCentroCostoSuccess(res.data.centroCostos))
            }).catch( err => {
                console.log('Error getAllCentroCostoAction', err.response);
                dispatch(getAllCentroCostoError(err.response.data.message))
            })
    }
}
const getAllCentroCostoRequest = () => {
    return {
        type: types.GET_ALL_CENTRO_COSTO
    }
}
const getAllCentroCostoSuccess = payload => {
    return {
        type: types.GET_ALL_CENTRO_COSTO_SUCCESS,
        payload
    }
}
const getAllCentroCostoError = error => {
    return {
        type: types.GET_ALL_CENTRO_COSTO_ERROR,
        payload: error
    }
}

export function getCentroCostoAction(id){
    return async (dispatch) => {
        dispatch(getCentroCostoRequest())
        await clientAxios.get(`/centrosCosto/${id}`)
            .then ( res => {
                dispatch(getCentroCostoSuccess(res.data.centroCosto))
            }).catch( err => {
                console.log('Error getCentroCostoAction', err.response);
                dispatch(getCentroCostoError(err.response.data.message))
            } )
    }
}
const getCentroCostoRequest = () => {
    return {
        type: types.GET_CENTRO_COSTO
    }
}
const getCentroCostoSuccess = payload => {
    return {
        type: types.GET_CENTRO_COSTO_SUCCESS,
        payload
    }
}
const getCentroCostoError = error => {
    return {
        type: types.GET_CENTRO_COSTO_ERROR,
        payload: error
    }
}

export function createCentroCostoAction(centroCosto){
    return async (dispatch) => {
        dispatch(createCentroCostoRequest())
        await clientAxios.post('/centrosCosto', centroCosto)
            .then ( res => {
                dispatch(createCentroCostoSuccess(res.data.centroCosto))
            }).catch( err => {
                console.log('Error createCentroCostoAction', err.response);
                dispatch(createCentroCostoError(err.response.data.message))
            } )
    }
}
const createCentroCostoRequest = () => {
    return {
        type: types.CREATE_CENTRO_COSTO
    }
}
const createCentroCostoSuccess = payload => {
    return {
        type: types.CREATE_CENTRO_COSTO_SUCCESS,
        payload
    }
}
const createCentroCostoError = error => {
    return {
        type: types.CREATE_CENTRO_COSTO_ERROR,
        payload: error
    }
}

export function updateCentroCostoAction(centroCosto){
    return async (dispatch) => {
        dispatch(updateCentroCostoRequest())
        await clientAxios.put(`/centrosCosto/${centroCosto.id}`, centroCosto)
            .then ( res => {
                dispatch(updateCentroCostoSuccess(res.data.centroCosto))
            }).catch( err => {
                console.log('Error updateCentroCostoAction', err.response);
                dispatch(updateCentroCostoError(err.response.data.message))
            } )
    }
}
const updateCentroCostoRequest = () => {
    return {
        type: types.UPDATE_CENTRO_COSTO
    }
}
const updateCentroCostoSuccess = payload => {
    return {
        type: types.UPDATE_CENTRO_COSTO_SUCCESS,
        payload
    }
}
const updateCentroCostoError = error => {
    return {
        type: types.UPDATE_CENTRO_COSTO_ERROR,
        payload: error
    }
}

export function deleteCentroCostoAction(id){
    return async (dispatch) => {
        dispatch(deleteCentroCostoRequest())
        await clientAxios.delete(`/centrosCosto/${id}`)
            .then ( res => {
                dispatch(deleteCentroCostoSuccess(res.data.message))
            }).catch( err => {
                console.log('Error deleteCentroCostoAction', err.response);
                dispatch(deleteCentroCostoError(err.response.data.message))
            } )
    }
}
const deleteCentroCostoRequest = () => {
    return {
        type: types.DELETE_CENTRO_COSTO
    }
}
const deleteCentroCostoSuccess = payload => {
    return {
        type: types.DELETE_CENTRO_COSTO_SUCCESS,
        payload
    }
}
const deleteCentroCostoError = error => {
    return {
        type: types.DELETE_CENTRO_COSTO_ERROR,
        payload: error
    }
}
