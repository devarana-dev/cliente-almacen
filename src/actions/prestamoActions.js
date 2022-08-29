import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllPrestamosAction(){
    return async (dispatch) => {
        dispatch(getAllPrestamoRequest())
        await clientAxios.get('/prestamos')
            .then ( res => {
                dispatch(getAllPrestamoSuccess(res.data.prestamos))
            })
            .catch( err => {
                console.log('Error getAllPrestamosAction', err.response);
                dispatch(getAllPrestamoError(err.response.data.message))
            })
    }
}
const getAllPrestamoRequest = () => {
    return {
        type: types.GET_ALL_PRESTAMO
    }
}
const getAllPrestamoSuccess = payload => {
    return {
        type: types.GET_ALL_PRESTAMO_SUCCESS,
        payload
    }
}
const getAllPrestamoError = error => {
    return {
        type: types.GET_ALL_PRESTAMO_ERROR,
        payload: error
    }
}


export function createPrestamoAction(prestamo){
    return async (dispatch) => {
        dispatch(createPrestamoRequest())
        await clientAxios.post('/prestamo', prestamo)
            .then ( res => {
                dispatch(createPrestamoSuccess(res.data.prestamos))
            })
            .catch( err => {
                console.log('Error createPrestamoAction', err.response);
                dispatch(createPrestamoError(err.response.data.message))
            })
    }
}
const createPrestamoRequest = () => {
    return {
        type: types.CREATE_PRESTAMO
    }
}
const createPrestamoSuccess = payload => {
    return {
        type: types.CREATE_PRESTAMO_SUCCESS,
        payload
    }
}
const createPrestamoError = error => {
    return {
        type: types.CREATE_PRESTAMO_ERROR,
        payload: error
    }
}


export function updatePrestamoAction(prestamo){
    return async (dispatch) => {
        dispatch(updatePrestamoRequest())
        await clientAxios.put(`/prestamos`, prestamo)
            .then ( res => {
                dispatch(updatePrestamoSuccess(res.data.prestamo))
            })
            .catch( err => {
                console.log('Error updatePrestamoAction', err.response);
                dispatch(updatePrestamoError(err.response))
            })
    }
}
const updatePrestamoRequest = () => {
    return {
        type: types.UPDATE_PRESTAMO
    }
}
const updatePrestamoSuccess = payload => {
    return {
        type: types.UPDATE_PRESTAMO_SUCCESS,
        payload
    }
}
const updatePrestamoError = error => {
    return {
        type: types.UPDATE_PRESTAMO_ERROR,
        payload: error
    }
}

