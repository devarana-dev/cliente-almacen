import clientAxios from '../config/axios';
import { types } from '../types';

export function getBitacorasAction(){
    return async (dispatch) => {
        dispatch( getBitacorasRequest())
        await clientAxios.get('/bitacora').then(res => {
            dispatch(getBitacorasSuccess(res.data.bitacoras))
        }
        ).catch(err => {
            console.log('Error getBitacoraAction', err.response);
            dispatch(getBitacorasError(err.response.data.message))
        })
    }
}

const getBitacorasRequest = () => ({
    type: types.GET_BITACORAS
});

const getBitacorasSuccess = payload => ({
    type: types.GET_BITACORAS_SUCCESS,
    payload
});

const getBitacorasError = error => ({
    type: types.GET_BITACORAS_ERROR,
    payload: error
});



/// Create

export function createBitacoraAction(bitacora){
    return async (dispatch) => {
        dispatch( createBitacoraRequest())
        await clientAxios.post('/bitacora', bitacora, { headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            dispatch(createBitacoraSuccess(res.data.bitacora))
        }
        ).catch(err => {
            console.log('Error createBitacoraAction', err.response);
            dispatch(createBitacoraError(err.response.data.message))
        })
    }
}

const createBitacoraRequest = () => ({
    type: types.CREATE_BITACORA
});

const createBitacoraSuccess = payload => ({
    type: types.CREATE_BITACORA_SUCCESS,
    payload
});

const createBitacoraError = error => ({
    type: types.CREATE_BITACORA_ERROR,
    payload: error
});



// Get Bitacora id

export function getBitacoraAction(id){
    return async (dispatch) => {
        dispatch( getBitacoraRequest())
        await clientAxios.get(`/bitacora/${id}`).then(res => {
            dispatch(getBitacoraSuccess(res.data.bitacora))
        }
        ).catch(err => {
            console.log('Error getBitacoraAction', err.response);
            dispatch(getBitacoraError(err.response.data.message))
        })
    }
}


const getBitacoraRequest = () => ({
    type: types.GET_BITACORA
});

const getBitacoraSuccess = payload => ({
    type: types.GET_BITACORA_SUCCESS,
    payload
});

const getBitacoraError = error => ({
    type: types.GET_BITACORA_ERROR,
    payload: error
});


export function createComentarioAction(comentario){
    return async (dispatch) => {
        dispatch( createComentarioRequest())
        await clientAxios.post('/bitacora/crearComentario', comentario,  { headers: { 'Content-Type': 'multipart/form-data' }}).then(res => {
            dispatch(createComentarioSuccess(res.data.comentario))
        }
        ).catch(err => {
            console.log('Error createComentarioAction', err.response);
            dispatch(createComentarioError(err.response.data.message))
        })
    }
}

const createComentarioRequest = () => ({
    type: types.CREATE_COMENTARIO_BITACORA
});

const createComentarioSuccess = payload => ({
    type: types.CREATE_COMENTARIO_BITACORA_SUCCESS,
    payload
});

const createComentarioError = error => ({
    type: types.CREATE_COMENTARIO_BITACORA_ERROR,
    payload: error
});


export function cleanState () {
    return {
        type: types.CLEAN_STATE_BITACORA
    }
}