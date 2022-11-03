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


export function generateReporteGeneralAction(params){
    return async (dispatch) => {
        dispatch(generateReporteRequest())
        await clientAxios.get('/reportes/export-reporte-general', {params})
            .then ( res => {
                dispatch(generateReporteSuccess(res.data))
            }).catch( err => {
                console.log('Error getAllReportesAction', err.response);
                dispatch(generateReporteError(err.response.data.message))
            } )
    }
}


export function generateReporteAcumuladoAction(params){
    return async (dispatch) => {
        dispatch(generateReporteRequest())
        await clientAxios.get('/reportes/export-reporte-acumulado', {params})
            .then ( res => {
                dispatch(generateReporteSuccess(res.data))
            }).catch( err => {
                console.log('Error getAllReportesAction', err.response);
                dispatch(generateReporteError(err.response.data.message))
            } )
    }
}

const generateReporteRequest = () => {
    return {
        type: types.GENERATE_REPORTE
    }
}

const generateReporteSuccess = payload => {
    return {
        type: types.GENERATE_REPORTE_SUCCESS,
        payload
    }
}

const generateReporteError = error => {
    return {
        type: types.GENERATE_REPORTE_ERROR,
        payload: error
    }
}


export function cleanGenerarReporteAction(){
    return (dispatch) => {
        dispatch({
            type: types.CLEAN_GENERAR_REPORTE
        })
    }
}