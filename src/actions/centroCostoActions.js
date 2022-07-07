import clientAxios from '../config/axios';
import { types } from '../types';


export function getAllCentroCostoAction(){
    return async (dispatch) => {
        dispatch(getAllCentroCostoRequest())
        await clientAxios.get('/centrosCosto')
            .then ( res => {
                dispatch(getAllCentroCostoSuccess(res.data.centroCostos))
            }).catch( err => {
                console.log('Error getAllCentroCostoAction', err.response);
                dispatch(getAllCentroCostoError(err.response.data.message))
            })
    }
}
const getAllCentroCostoRequest = () => {
    return {
        type: types.GET_ALL_CENTRO_COSTO
    }
}
const getAllCentroCostoSuccess = payload => {
    return {
        type: types.GET_ALL_CENTRO_COSTO_SUCCESS,
        payload
    }
}
const getAllCentroCostoError = error => {
    return {
        type: types.GET_ALL_CENTRO_COSTO_ERROR,
        payload: error
    }
}
