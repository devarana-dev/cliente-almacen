import clientAxios from '../config/axios';
import { types } from '../types';

export function getAllInsumosAction(){
    return async (dispatch) => {
        dispatch(getAllInsumosRequest())
        await clientAxios.get('/insumos')
            .then ( res => {
                dispatch(getAllInsumosSuccess(res.data.insumos))
            }).catch( err => {
                console.log('Error getAllInsumoAction', err.response);
                dispatch(getAllInsumosError(err.response.data.message))
            } )
    }
}
const getAllInsumosRequest = () => {
    return {
        type: types.GET_ALL_INSUMO
    }
}
const getAllInsumosSuccess = payload => {
    return {
        type: types.GET_ALL_INSUMO_SUCCESS,
        payload
    }
}
const getAllInsumosError = error => {
    return {
        type: types.GET_ALL_INSUMO_ERROR,
        payload: error
    }
}

export function createInsumoAction(insumo){
    return async (dispatch) => {
        dispatch(createInsumoRequest())
        await clientAxios.post('/insumos', insumo)
            .then ( res => {
                dispatch(createInsumoSuccess(res.data.insumo))
            }).catch( err => {
                console.log('Error createInsumoAction', err.response);
                dispatch(createInsumoError(err.response.data.message))
            } )
    }
}

const createInsumoRequest = () => {
    return {
        type: types.CREATE_INSUMO
    }
}
const createInsumoSuccess = payload => {
    return {
        type: types.CREATE_INSUMO_SUCCESS,
        payload
    }
}
const createInsumoError = error => {
    return {
        type: types.CREATE_INSUMO_ERROR,
        payload: error
    }
}

export function getInsumoAction(id){
    return async (dispatch) => {
        dispatch(getInsumoRequest())
        await clientAxios.get(`/insumos/${id}`)
            .then ( res => {
                dispatch(getInsumoSuccess(res.data.insumo))
            }).catch( err => {
                console.log('Error getInsumoAction', err.response);
                dispatch(getInsumoError(err.response.data.message))
            } )
    }
}

const getInsumoRequest = () => {
    return {
        type: types.GET_INSUMO
    }
}
const getInsumoSuccess = payload => {
    return {
        type: types.GET_INSUMO_SUCCESS,
        payload
    }
}
const getInsumoError = error => {
    return {
        type: types.GET_INSUMO_ERROR,
        payload: error
    }
}

export function updateInsumoAction(insumo){
    return async (dispatch) => {
        dispatch(updateInsumoRequest())
        await clientAxios.put(`/insumos/${insumo.id}`, insumo)
            .then ( res => {
                dispatch(updateInsumoSuccess(res.data.insumo))
            }).catch( err => {
                console.log('Error updateInsumoAction', err.response);
                dispatch(updateInsumoError(err.response.data.message))
            } )
    }
}

const updateInsumoRequest = () => {
    return {
        type: types.UPDATE_INSUMO
    }
}
const updateInsumoSuccess = payload => {
    return {
        type: types.UPDATE_INSUMO_SUCCESS,
        payload
    }
}
const updateInsumoError = error => {
    return {
        type: types.UPDATE_INSUMO_ERROR,
        payload: error
    }
}


export function deleteInsumoAction(id){
    return async (dispatch) => {
        dispatch(deleteInsumoRequest())
        await clientAxios.delete(`/insumos/${id}`)
            .then ( res => {
                console.log(res.data);
                dispatch(deleteInsumoSuccess(res.data.insumo))
            }).catch( err => {
                console.log('Error deleteInsumoAction', err.response);
                dispatch(deleteInsumoError(err.response.data.message))
            } )
    }
}

const deleteInsumoRequest = () => {
    return {
        type: types.DELETE_INSUMO
    }
}
const deleteInsumoSuccess = payload => {
    return {
        type: types.DELETE_INSUMO_SUCCESS,
        payload
    }
}
const deleteInsumoError = error => {
    return {
        type: types.DELETE_INSUMO_ERROR,
        payload: error
    }
}



export function uploadMassiveInsumo (form) {
    return async (dispatch) => {
        dispatch(uploadMassiveInsumoRequest())
        await clientAxios.post('/insumos/massiveUpload', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then ( res => {
                dispatch(uploadMassiveInsumoSuccess(res.data))
            }).catch( err => {
                console.log('Error uploadMassiveInsumo', err.response);
                dispatch(uploadMassiveInsumoError(err))
            } )
    }
}

const uploadMassiveInsumoRequest = () => {
    return {
        type: types.UPLOAD_MASSIVE_INSUMO
    }
}
const uploadMassiveInsumoSuccess = payload => {
    return {
        type: types.UPLOAD_MASSIVE_INSUMO_SUCCESS,
        payload
    }
}
const uploadMassiveInsumoError = error => {
    return {
        type: types.UPLOAD_MASSIVE_INSUMO_ERROR,
        payload: error
    }
}


export const clearUploadState = () => {
    return {
        type: types.CLEAR_UPLOAD_STATE
    }
}
