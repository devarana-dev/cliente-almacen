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

export function createNivelAction(){
    return async (dispatch) => {
        dispatch(createNivelRequest())
        await clientAxios.post('/niveles')
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
