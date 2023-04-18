import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllEmpresaAction(){
    return async (dispatch) => {
        dispatch(getAllEmpresaRequest())
        await clientAxios.get('/empresas')
            .then ( res => {
                dispatch(getAllEmpresaSuccess(res.data.empresas))
            })
            .catch( err => {
                dispatch(getAllEmpresaError(err.response.data.message))
            })
    }
}
const getAllEmpresaRequest = () => {
    return {
        type: types.GET_ALL_EMPRESA
    }
}
const getAllEmpresaSuccess = payload => {
    return {
        type: types.GET_ALL_EMPRESA_SUCCESS,
        payload
    }
}
const getAllEmpresaError = error => {
    return {
        type: types.GET_ALL_EMPRESA_ERROR,
        payload: error
    }
}

export function getEmpresaAction(id){
    return async (dispatch) => {
        dispatch(getEmpresaRequest())
        await clientAxios.get(`/empresas/${id}`)
            .then ( res => {
                dispatch(getEmpresaSuccess(res.data.empresa))
            }).catch( err => {
                console.log('Error getEmpresaAction', err.response);
                dispatch(getEmpresaError(err.response.data.message))
            } )
    }
}
const getEmpresaRequest = () => {
    return {
        type: types.GET_EMPRESA
    }
}
const getEmpresaSuccess = payload => {
    return {
        type: types.GET_EMPRESA_SUCCESS,
        payload
    }
}
const getEmpresaError = error => {
    return {
        type: types.GET_EMPRESA_ERROR,
        payload: error
    }
}


export function createEmpresaAction(empresa){
    return async (dispatch) => {
        dispatch(createEmpresaRequest())
        await clientAxios.post('/empresas', empresa)
            .then ( res => {
                dispatch(createEmpresaSuccess(res.data.empresa))
            }).catch( err => {
                console.log('Error createEmpresaAction', err.response);
                dispatch(createEmpresaError(err.response.data.message))
            } )
    }
}
const createEmpresaRequest = () => {
    return {
        type: types.CREATE_EMPRESA
    }
}
const createEmpresaSuccess = payload => {
    return {
        type: types.CREATE_EMPRESA_SUCCESS,
        payload
    }
}
const createEmpresaError = error => {
    return {
        type: types.CREATE_EMPRESA_ERROR,
        payload: error
    }
}


export function updateEmpresaAction(empresa){
    return async (dispatch) => {
        dispatch(updateEmpresaRequest())
        await clientAxios.put(`/empresas/${empresa.id}`, empresa)
            .then ( res => {
                console.log(res.data.empresa)
                dispatch(updateEmpresaSuccess(res.data.empresa))
            }).catch( err => {
                console.log('Error updateEmpresaAction', err.response);
                dispatch(updateEmpresaError(err.response.data.message))
            } )
    }
}
const updateEmpresaRequest = () => {
    return {
        type: types.UPDATE_EMPRESA
    }
}
const updateEmpresaSuccess = payload => {
    return {
        type: types.UPDATE_EMPRESA_SUCCESS,
        payload
    }
}
const updateEmpresaError = error => {
    return {
        type: types.UPDATE_EMPRESA_ERROR,
        payload: error
    }
}

export function deleteEmpresaAction(id){
    return async (dispatch) => {
        dispatch(deleteEmpresaRequest())
        await clientAxios.delete(`/empresas/${id}`)
            .then ( res => {
                dispatch(deleteEmpresaSuccess(res.data.empresa))
            }).catch( err => {
                console.log('Error deleteEmpresaAction', err.response);
                dispatch(deleteEmpresaError(err.response.data.message))
            } )
    }
}
const deleteEmpresaRequest = () => {
    return {
        type: types.DELETE_EMPRESA
    }
}
const deleteEmpresaSuccess = payload => {
    return {
        type: types.DELETE_EMPRESA_SUCCESS,
        payload
    }
}
const deleteEmpresaError = error => {
    return {
        type: types.DELETE_EMPRESA_ERROR,
        payload: error
    }
}

