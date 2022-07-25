import clientAxios from '../config/axios';
import { types } from '../types';

export function createValeAction(vale){
    return async (dispatch) => {
        dispatch(createValeRequest())
        await clientAxios.post('/vales', vale)
            .then ( res => {
                dispatch(createValeSuccess(res.data.valeSalida))
            }).catch( err => {
                console.log('Error createValeAction', err.response);
                dispatch(createValeError(err.response.data.message))
            } )
    }
}

const createValeRequest = () => {
    return {
        type: types.CREATE_VALE
    }
}
const createValeSuccess = payload => {
    return {
        type: types.CREATE_VALE_SUCCESS,
        payload
    }
}
const createValeError = error => {
    return {
        type: types.CREATE_VALE_ERROR,
        payload: error
    }
}


export function getAllValesAction(){
    return async (dispatch) => {
        dispatch(getAllValesRequest())
        await clientAxios.get('/vales')
            .then ( res => {
                dispatch(getAllValesSuccess(res.data.valeSalida))
            }).catch( err => {
                console.log('Error getAllValesAction', err.response);
                dispatch(getAllValesError(err.response.data.message))
            } )
    }
}
const getAllValesRequest = () => {
    return {
        type: types.GET_ALL_VALE
    }
}
const getAllValesSuccess = payload => {
    return {
        type: types.GET_ALL_VALE_SUCCESS,
        payload
    }
}
const getAllValesError = error => {
    return {
        type: types.GET_ALL_VALE_ERROR,
        payload: error
    }
}

export function deliverValeAction(vale){
    return async (dispatch) => {
        dispatch(deliverValeRequest())
        await clientAxios.post('/vales/deliver', vale)
            .then ( res => {
                dispatch(deliverValeSuccess(res.data))
            }).catch( err => {
                console.log('Error deliverValeAction', err.response);
                dispatch(deliverValeError(err.response.data.message))
            } )
    }
}

const deliverValeRequest = () => {
    return {
        type: types.DELIVER_VALE
    }
}
const deliverValeSuccess = payload => {
    return {
        type: types.DELIVER_VALE_SUCCESS,
        payload
    }
}
const deliverValeError = error => {
    return {
        type: types.DELIVER_VALE_ERROR,
        payload: error
    }
}
