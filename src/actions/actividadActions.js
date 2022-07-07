import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllActividadAction(){
    return async (dispatch) => {
        dispatch(getAllActividadRequest())
        await clientAxios.get('/actividades')
            .then ( res => {
                dispatch(getAllActividadSuccess(res.data.actividades))
            })
            .catch( err => {
                console.log('Error getAllActividadAction', err.response);
                dispatch(getAllActividadError(err.response.data.message))
            })
    }
}
const getAllActividadRequest = () => {
    return {
        type: types.GET_ALL_ACTIVIDAD
    }
}
const getAllActividadSuccess = payload => {
    return {
        type: types.GET_ALL_ACTIVIDAD_SUCCESS,
        payload
    }
}
const getAllActividadError = error => {
    return {
        type: types.GET_ALL_ACTIVIDAD_ERROR,
        payload: error
    }
}