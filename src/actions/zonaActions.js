import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllZonaAction(){
    return async (dispatch) => {
        dispatch(getAllZonaRequest())
        await clientAxios.get('/zonas')
            .then ( res => {
                dispatch(getAllZonaSuccess(res.data.zonas))
            }).catch( err => {
                console.log('Error getAllZonaAction', err.response);
                dispatch(getAllZonaError(err.response.data.message))
            } )
    }
}
const getAllZonaRequest = () => {
    return {
        type: types.GET_ALL_ZONA
    }
}
const getAllZonaSuccess = payload => {
    return {
        type: types.GET_ALL_ZONA_SUCCESS,
        payload
    }
}
const getAllZonaError = error => {
    return {
        type: types.GET_ALL_ZONA_ERROR,
        payload: error
    }
}

export function createZonaAction(zona){
    console.log(zona);
    return async (dispatch) => {
        dispatch(createZonaRequest())
        await clientAxios.post('/zonas', zona)
            .then ( res => {
                dispatch(createZonaSuccess(res.data.zona))
            }).catch( err => {
                console.log('Error createZonaAction', err.response);
                dispatch(createZonaError(err.response.data.message))
            } )
    }
}
const createZonaRequest = () => {
    return {
        type: types.CREATE_ZONA
    }
}
const createZonaSuccess = payload => {
    return {
        type: types.CREATE_ZONA_SUCCESS,
        payload
    }
}
const createZonaError = error => {
    return {
        type: types.CREATE_ZONA_ERROR,
        payload: error
    }
}


export function getZonaAction(id){
    return async (dispatch) => {
        dispatch(getZonaRequest())
        await clientAxios.get(`/zonas/${id}`)
            .then ( res => {
                dispatch(getZonaSuccess(res.data.zona))
            }).catch( err => {
                console.log('Error getZonaAction', err.response);
                dispatch(getZonaError(err.response.data.message))
            } )
    }
}
const getZonaRequest = () => {
    return {
        type: types.GET_ZONA
    }
}
const getZonaSuccess = payload => {
    return {
        type: types.GET_ZONA_SUCCESS,
        payload
    }
}
const getZonaError = error => {
    return {
        type: types.GET_ZONA_ERROR,
        payload: error
    }
}

export function updateZonaAction( zona ) {
    return async (dispatch) => {
        dispatch(updateZonaRequest())
        await clientAxios.put(`/zonas/${zona.id}`, zona)
            .then ( res => {
                dispatch(updateZonaSuccess(res.data.zona))
            }).catch( err => {
                console.log('Error updateZonaAction', err.response);
                dispatch(updateZonaError(err.response.data.message))
            } )
    }
}
const updateZonaRequest = () => {
    return {
        type: types.UPDATE_ZONA
    }
}
const updateZonaSuccess = payload => {
    return {
        type: types.UPDATE_ZONA_SUCCESS,
        payload
    }
}
const updateZonaError = error => {
    return {
        type: types.UPDATE_ZONA_ERROR,
        payload: error
    }
}
