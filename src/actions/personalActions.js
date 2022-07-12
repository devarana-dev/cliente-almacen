import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllPersonalAction(){
    return async (dispatch) => {
        dispatch(getAllPersonalRequest())
        await clientAxios.get('/personal')
            .then ( res => {
                dispatch(getAllPersonalSuccess(res.data.personal))
            })
            .catch( err => {
                console.log('Error getAllPersonalAction', err.response);
                dispatch(getAllPersonalError(err.response.data.message))
            })
    }
}
const getAllPersonalRequest = () => {
    return {
        type: types.GET_ALL_PERSONAL
    }
}
const getAllPersonalSuccess = payload => {
    return {
        type: types.GET_ALL_PERSONAL_SUCCESS,
        payload
    }
}
const getAllPersonalError = error => {
    return {
        type: types.GET_ALL_PERSONAL_ERROR,
        payload: error
    }
}



export function getPersonalAction(id){
    return async (dispatch) => {
        dispatch(getPersonalRequest())
        await clientAxios.get(`/personal/${id}`)
            .then ( res => {
                dispatch(getPersonalSuccess(res.data.personal))
            })
            .catch( err => {
                console.log('Error getPersonalAction', err.response);
                dispatch(getPersonalError(err.response.data.message))
            })
    }
}
const getPersonalRequest = () => {
    return {
        type: types.GET_PERSONAL
    }
}
const getPersonalSuccess = payload => {
    return {
        type: types.GET_PERSONAL_SUCCESS,
        payload
    }
}
const getPersonalError = error => {
    return {
        type: types.GET_PERSONAL_ERROR,
        payload: error
    }
}


export function createPersonalAction(personal){
    return async (dispatch) => {
        dispatch(createPersonalRequest())
        await clientAxios.post('/personal', personal)
            .then ( res => {
                dispatch(createPersonalSuccess(res.data.personal))
            })
            .catch( err => {
                console.log('Error createPersonalAction', err.response);
                dispatch(createPersonalError(err.response.data.message))
            })
    }
}
const createPersonalRequest = () => {
    return {
        type: types.CREATE_PERSONAL
    }
}
const createPersonalSuccess = payload => {
    return {
        type: types.CREATE_PERSONAL_SUCCESS,
        payload
    }
}
const createPersonalError = error => {
    return {
        type: types.CREATE_PERSONAL_ERROR,
        payload: error
    }
}


export function updatePersonalAction(personal){
    return async (dispatch) => {
        dispatch(updatePersonalRequest())
        await clientAxios.put(`/personal/${personal.id}`, personal)
            .then ( res => {
                dispatch(updatePersonalSuccess(res.data.personal))
            })
            .catch( err => {
                console.log('Error updatePersonalAction', err.response);
                dispatch(updatePersonalError(err.response.data.message))
            })
    }
}
const updatePersonalRequest = () => {
    return {
        type: types.UPDATE_PERSONAL
    }
}
const updatePersonalSuccess = payload => {
    return {
        type: types.UPDATE_PERSONAL_SUCCESS,
        payload
    }
}
const updatePersonalError = error => {
    return {
        type: types.UPDATE_PERSONAL_ERROR,
        payload: error
    }
}


export function deletePersonalAction(id){
    return async (dispatch) => {
        dispatch(deletePersonalRequest())
        await clientAxios.delete(`/personal/${id}`)
            .then ( res => {
                dispatch(deletePersonalSuccess(res.data.personal))
            })
            .catch( err => {
                console.log('Error deletePersonalAction', err.response);
                dispatch(deletePersonalError(err.response.data.message))
            })
    }
}
const deletePersonalRequest = () => {
    return {
        type: types.DELETE_PERSONAL
    }
}
const deletePersonalSuccess = payload => {
    return {
        type: types.DELETE_PERSONAL_SUCCESS,
        payload
    }
}
const deletePersonalError = error => {
    return {
        type: types.DELETE_PERSONAL_ERROR,
        payload: error
    }
}
