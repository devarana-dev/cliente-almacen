import clientAxios from '../config/axios';
import { types } from '../types';


export function getProyectosAction(filtros){
    return async (dispatch) => {
        dispatch( getProyectosRequest()) 
        await clientAxios.get('/proyectos', { params: filtros }).then(res => {
            dispatch(getProyectosSuccess(res.data.proyectos))
        }).catch(err => {
            console.log('Error getProyectosAction', err.response);
            dispatch(getProyectosError(err.response.data.message))
        })
    }
}

const getProyectosRequest = () => ({
    type: types.GET_ALL_PROYECTO
});

const getProyectosSuccess = payload => ({
    type: types.GET_ALL_PROYECTO_SUCCESS,
    payload
});

const getProyectosError = payload => ({
    type: types.GET_ALL_PROYECTO_ERROR,
    payload
});


export function getProyectoAction(id){
    return async (dispatch) => {
        dispatch( getProyectoRequest()) 
        await clientAxios.get(`/proyectos/${id}`).then(res => { 
            dispatch(getProyectoSuccess(res.data.proyecto))
        }).catch(err => {
            console.log('Error getProyectoAction', err.response);
            dispatch(getProyectoError(err.response.data.message))
        })
    }
}

const getProyectoRequest = () => ({
    type: types.GET_PROYECTO
});

const getProyectoSuccess = payload => ({
    type: types.GET_PROYECTO_SUCCESS,
    payload
});

const getProyectoError = payload => ({
    type: types.GET_PROYECTO_ERROR,
    payload
});


export function createProyectoAction(proyecto){
    return async (dispatch) => {
        dispatch( createProyectoRequest()) 
        await clientAxios.post('/proyectos', proyecto).then(res => { 
            dispatch(createProyectoSuccess(res.data.proyecto))
        }).catch(err => {
            console.log('Error createProyectoAction', err.response);
            dispatch(createProyectoError(err.response.data.message))
        })
    }
}

const createProyectoRequest = () => ({
    type: types.CREATE_PROYECTO
});

const createProyectoSuccess = payload => ({
    type: types.CREATE_PROYECTO_SUCCESS,
    payload
});

const createProyectoError = payload => ({
    type: types.CREATE_PROYECTO_ERROR,
    payload
});


export function updateProyectoAction(proyecto){
    return async (dispatch) => {
        dispatch( updateProyectoRequest()) 
        await clientAxios.put(`/proyectos/${proyecto.id}`, proyecto).then(res => { 
            dispatch(updateProyectoSuccess(res.data.proyecto))
        }).catch(err => {
            console.log('Error updateProyectoAction', err.response);
            dispatch(updateProyectoError(err.response.data.message))
        })
    }
}

const updateProyectoRequest = () => ({
    type: types.UPDATE_PROYECTO
});

const updateProyectoSuccess = payload => ({
    type: types.UPDATE_PROYECTO_SUCCESS,
    payload
});

const updateProyectoError = payload => ({
    type: types.UPDATE_PROYECTO_ERROR,
    payload
});


export function deleteProyectoAction(id){
    return async (dispatch) => {
        dispatch( deleteProyectoRequest()) 
        await clientAxios.delete(`/proyectos/${id}`).then(res => { 
            dispatch(deleteProyectoSuccess(res.data.proyecto))
        }).catch(err => {
            console.log('Error deleteProyectoAction', err.response);
            dispatch(deleteProyectoError(err.response.data.message))
        })
    }
}

const deleteProyectoRequest = () => ({
    type: types.DELETE_PROYECTO
});

const deleteProyectoSuccess = payload => ({
    type: types.DELETE_PROYECTO_SUCCESS,
    payload
});

const deleteProyectoError = payload => ({
    type: types.DELETE_PROYECTO_ERROR,
    payload
});



export function cleanProyectoAction(){
    return async (dispatch) => {
        dispatch({
            type: types.CLEAN_PROYECTO
        }) 
    }
}