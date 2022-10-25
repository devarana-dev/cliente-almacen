import clientAxios from '../config/axios';
import { types } from '../types';

export function getReportesAcumuladosAction(params){
    return async (dispatch) => {
        dispatch(getAllReportesRequest())
        await clientAxios.get('/reportes', {params})
            .then ( res => {
                dispatch(getAllReportesSuccess(res.data))
            }).catch( err => {
                console.log('Error getAllReportesAction', err.response);
                dispatch(getAllReportesError(err.response.data.message))
            } )
    }
}

const getAllReportesRequest = () => {
    return {
        type: types.GET_ALL_REPORTE
    }
}
const getAllReportesSuccess = payload => {
    return {
        type: types.GET_ALL_REPORTE_SUCCESS,
        payload
    }
}
const getAllReportesError = error => {
    return {
        type: types.GET_ALL_REPORTE_ERROR,
        payload: error
    }
}


export function getReportesGeneralAction(params){
    return async (dispatch) => {
        dispatch(getReporteGeneralRequest())
        await clientAxios.get('/reportes/general', {params})
            .then ( res => {
                dispatch(getReporteGeneralSuccess(res.data))
            }).catch( err => {
                console.log('Error getAllReportesAction', err.response);
                dispatch(getReporteGeneralError(err.response.data.message))
            } )
    }
}

const getReporteGeneralRequest = () => {
    return {
        type: types.GET_ALL_REPORTE
    }
}
const getReporteGeneralSuccess = payload => {
    return {
        type: types.GET_ALL_REPORTE_SUCCESS,
        payload
    }
}
const getReporteGeneralError = error => {
    return {
        type: types.GET_ALL_REPORTE_ERROR,
        payload: error
    }
}
