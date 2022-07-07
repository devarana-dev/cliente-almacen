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