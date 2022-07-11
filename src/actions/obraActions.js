import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllObraAction(){
    return async (dispatch) => {
        dispatch(getAllObraRequest())
        await clientAxios.get('/obras')
            .then ( res => {
                dispatch(getAllObraSuccess(res.data.obra))
            }).catch( err => {
                console.log('Error getAllObraAction', err.response);
                dispatch(getAllObraError(err.response.data.message))
            })
    }
}
const getAllObraRequest = () => {
    return {
        type: types.GET_ALL_OBRA
    }
}
const getAllObraSuccess = payload => {
    return {
        type: types.GET_ALL_OBRA_SUCCESS,
        payload
    }
}
const getAllObraError = error => {
    return {
        type: types.GET_ALL_OBRA_ERROR,
        payload: error
    }
}

export function getObraAction(id){
    return async (dispatch) => {
        dispatch(getObraRequest())
        await clientAxios.get(`/obras/${id}`)
            .then ( res => {
                dispatch(getObraSuccess(res.data.obra))
            }).catch( err => {
                console.log('Error getObraAction', err.response);
                dispatch(getObraError(err.response.data.message))
            } )
    }
}
const getObraRequest = () => {
    return {
        type: types.GET_OBRA
    }
}
const getObraSuccess = payload => {
    return {
        type: types.GET_OBRA_SUCCESS,
        payload
    }
}
const getObraError = error => {
    return {
        type: types.GET_OBRA_ERROR,
        payload: error
    }
}

export function createObraAction(obra){
    return async (dispatch) => {
        dispatch(createObraRequest())
        await clientAxios.post('/obras', obra)
            .then ( res => {
                dispatch(createObraSuccess(res.data.obra))
            }).catch( err => {
                console.log('Error createObraAction', err.response);
                dispatch(createObraError(err.response.data.message))
            } )
    }
}
const createObraRequest = () => {
    return {
        type: types.CREATE_OBRA
    }
}
const createObraSuccess = payload => {
    return {
        type: types.CREATE_OBRA_SUCCESS,
        payload
    }
}
const createObraError = error => {
    return {
        type: types.CREATE_OBRA_ERROR,
        payload: error
    }
}

export function updateObraAction(obra){
    return async (dispatch) => {
        dispatch(updateObraRequest())
        await clientAxios.put(`/obras/${obra.id}`, obra)
            .then ( res => {
                dispatch(updateObraSuccess(res.data.obra))
            }).catch( err => {
                console.log('Error updateObraAction', err.response);
                dispatch(updateObraError(err.response.data.message))
            } )
    }
}
const updateObraRequest = () => {
    return {
        type: types.UPDATE_OBRA
    }
}
const updateObraSuccess = payload => {
    return {
        type: types.UPDATE_OBRA_SUCCESS,
        payload
    }
}
const updateObraError = error => {
    return {
        type: types.UPDATE_OBRA_ERROR,
        payload: error
    }
}

export function deleteObraAction(id){
    return async (dispatch) => {
        dispatch(deleteObraRequest())
        await clientAxios.delete(`/obras/${id}`)
            .then ( res => {
                dispatch(deleteObraSuccess(res.data.obra))
            }).catch( err => {
                console.log('Error deleteObraAction', err.response);
                dispatch(deleteObraError(err.response.data.message))
            } )
    }
}
const deleteObraRequest = () => {
    return {
        type: types.DELETE_OBRA
    }
}
const deleteObraSuccess = payload => {
    return {
        type: types.DELETE_OBRA_SUCCESS,
        payload
    }
}
const deleteObraError = error => {
    return {
        type: types.DELETE_OBRA_ERROR,
        payload: error
    }
}
