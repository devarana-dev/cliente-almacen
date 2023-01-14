import clientAxios from '../config/axios';
import { types } from '../types';


export function getEtapasAction(filtros){
    return async (dispatch) => {
        dispatch( getEtapasRequest()) 
        await clientAxios.get('/etapas', { params: filtros }).then(res => {
            dispatch(getEtapasSuccess(res.data.etapas))
        }).catch(err => {
            console.log('Error getEtapasAction', err.response);
            dispatch(getEtapasError(err.response.data.message))
        })
    }
}

const getEtapasRequest = () => ({
    type: types.GET_ETAPAS
});

const getEtapasSuccess = payload => ({
    type: types.GET_ETAPAS_SUCCESS,
    payload
});

const getEtapasError = payload => ({
    type: types.GET_ETAPAS_ERROR,
    payload
});


export function getEtapaAction(id){
    return async (dispatch) => {
        dispatch( getEtapaRequest()) 
        await clientAxios.get(`/etapas/${id}`).then(res => { 
            dispatch(getEtapaSuccess(res.data.etapa))
        }).catch(err => {
            console.log('Error getEtapaAction', err.response);
            dispatch(getEtapaError(err.response.data.message))
        })
    }
}

const getEtapaRequest = () => ({
    type: types.GET_ETAPA
});

const getEtapaSuccess = payload => ({
    type: types.GET_ETAPA_SUCCESS,
    payload
});

const getEtapaError = payload => ({
    type: types.GET_ETAPA_ERROR,
    payload
});


export function createEtapaAction(etapa){
    return async (dispatch) => {
        dispatch( createEtapaRequest()) 
        await clientAxios.post('/etapas', etapa).then(res => { 
            dispatch(createEtapaSuccess(res.data.etapa))
        }).catch(err => {
            console.log('Error createEtapaAction', err.response);
            dispatch(createEtapaError(err.response.data.message))
        })
    }
}

const createEtapaRequest = () => ({
    type: types.CREATE_ETAPA
});

const createEtapaSuccess = payload => ({
    type: types.CREATE_ETAPA_SUCCESS,
    payload
});

const createEtapaError = payload => ({
    type: types.CREATE_ETAPA_ERROR,
    payload
});


export function updateEtapaAction(etapa){
    return async (dispatch) => {
        dispatch( updateEtapaRequest()) 
        await clientAxios.put(`/etapas/${etapa.id}`, etapa).then(res => { 
            dispatch(updateEtapaSuccess(res.data.etapa))
        }).catch(err => {
            console.log('Error updateEtapaAction', err.response);
            dispatch(updateEtapaError(err.response.data.message))
        })
    }
}

const updateEtapaRequest = () => ({
    type: types.UPDATE_ETAPA
});

const updateEtapaSuccess = payload => ({
    type: types.UPDATE_ETAPA_SUCCESS,
    payload
});

const updateEtapaError = payload => ({
    type: types.UPDATE_ETAPA_ERROR,
    payload
});


export function deleteEtapaAction(id){
    return async (dispatch) => {
        dispatch( deleteEtapaRequest()) 
        await clientAxios.delete(`/etapas/${id}`).then(res => { 
            dispatch(deleteEtapaSuccess(res.data.etapa))
        }).catch(err => {
            console.log('Error deleteEtapaAction', err.response);
            dispatch(deleteEtapaError(err.response.data.message))
        })
    }
}

const deleteEtapaRequest = () => ({
    type: types.DELETE_ETAPA
});

const deleteEtapaSuccess = payload => ({
    type: types.DELETE_ETAPA_SUCCESS,
    payload
});

const deleteEtapaError = payload => ({
    type: types.DELETE_ETAPA_ERROR,
    payload
});



export function cleanEtapaAction(){
    return async (dispatch) => {
        dispatch({
            type: types.CLEAN_ETAPA
        }) 
    }
}