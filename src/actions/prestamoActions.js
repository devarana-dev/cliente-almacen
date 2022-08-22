import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllPrestamosAction(){
    return async (dispatch) => {
        dispatch(getAllPersonalRequest())
        await clientAxios.get('/prestamos')
            .then ( res => {
                dispatch(getAllPersonalSuccess(res.data.prestamos))
            })
            .catch( err => {
                console.log('Error getAllPrestamosAction', err.response);
                dispatch(getAllPersonalError(err.response.data.message))
            })
    }
}
const getAllPersonalRequest = () => {
    return {
        type: types.GET_ALL_PRESTAMO
    }
}
const getAllPersonalSuccess = payload => {
    return {
        type: types.GET_ALL_PRESTAMO_SUCCESS,
        payload
    }
}
const getAllPersonalError = error => {
    return {
        type: types.GET_ALL_PRESTAMO_ERROR,
        payload: error
    }
}



export function createPersonalAction(prestamo){
    return async (dispatch) => {
        dispatch(createPersonalRequest())
        await clientAxios.post('/prestamo', prestamo)
            .then ( res => {
                dispatch(createPersonalSuccess(res.data.prestamos))
            })
            .catch( err => {
                console.log('Error createPersonalAction', err.response);
                dispatch(createPersonalError(err.response.data.message))
            })
    }
}
const createPersonalRequest = () => {
    return {
        type: types.CREATE_PRESTAMO
    }
}
const createPersonalSuccess = payload => {
    return {
        type: types.CREATE_PRESTAMO_SUCCESS,
        payload
    }
}
const createPersonalError = error => {
    return {
        type: types.CREATE_PRESTAMO_ERROR,
        payload: error
    }
}


export function updatePersonalAction(prestamo){
    return async (dispatch) => {
        dispatch(updatePersonalRequest())
        await clientAxios.put(`/prestamo/${prestamo.id}`, prestamo)
            .then ( res => {
                dispatch(updatePersonalSuccess(res.data.prestamos))
            })
            .catch( err => {
                console.log('Error updatePersonalAction', err.response);
                dispatch(updatePersonalError(err.response.data.message))
            })
    }
}
const updatePersonalRequest = () => {
    return {
        type: types.UPDATE_PRESTAMO
    }
}
const updatePersonalSuccess = payload => {
    return {
        type: types.UPDATE_PRESTAMO_SUCCESS,
        payload
    }
}
const updatePersonalError = error => {
    return {
        type: types.UPDATE_PRESTAMO_ERROR,
        payload: error
    }
}
