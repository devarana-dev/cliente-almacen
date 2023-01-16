import moment from 'moment';
import clientAxios from '../config/axios';
import { types } from '../types';

export function getBitacorasAction(filtros){
    return async (dispatch) => {
        dispatch( getBitacorasRequest())
        await clientAxios.get('/bitacora', { params: filtros }).then(res => {
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

export function getBitacoraAction(filtros){
    return async (dispatch) => {
        dispatch( getBitacoraRequest())
        await clientAxios.get(`/bitacora/${filtros}`, { params: filtros }).then(res => {
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

export function getTipoBitacoraAction () {
    return async (dispatch) => {
        dispatch( getTipoBitacoraRequest())
        await clientAxios.get('/bitacora/tipoBitacoras').then(res => {
            dispatch(getTipoBitacoraSuccess(res.data.tiposBitacora))
        }
        ).catch(err => {
            console.log('Error getTipoBitacoraAction', err.response);
            dispatch(getTipoBitacoraError(err.response.data.message))
        })
    }
}

const getTipoBitacoraRequest = () => ({
    type: types.GET_TIPO_BITACORA
});

const getTipoBitacoraSuccess = payload => ({
    type: types.GET_TIPO_BITACORA_SUCCESS,
    payload
});

const getTipoBitacoraError = error => ({
    type: types.GET_TIPO_BITACORA_ERROR,
    payload: error
});


export function generarReporteAction (params) {
    return async (dispatch) => {
        dispatch( generarReporteRequest())
        await clientAxios.post('/bitacora/generar-reporte', params, { responseType: 'arraybuffer', headers: { 'Accept': 'application/pdf' } } ).then(res => {
            const file = new Blob([res.data], {type: 'application/pdf'});
            console.log('file', file);
            const url = window.URL.createObjectURL(file);
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', `${params.titulo}-${moment().format('DD-MM-YYYY-hh-mm')}.pdf`);
            document.body.appendChild(link);
            link.click();
            dispatch(generarReporteSuccess(res.data))
        }
        ).catch(err => {
            console.log('Error generarReporte', err.response);
            dispatch(generarReporteError(err.response.data.message))
        })
    }
}

const generarReporteRequest = () => ({
    type: types.GENERAR_REPORTE
});

const generarReporteSuccess = payload => ({
    type: types.GENERAR_REPORTE_SUCCESS,
    payload
});

const generarReporteError = error => ({
    type: types.GENERAR_REPORTE_ERROR,
    payload: error
});


export function updateVisitaAction(uid){
    return async (dispatch) => {
        await clientAxios.get(`/bitacora/set-visto/${uid}`)
        .then(res => {
            dispatch(updateVisitaSuccess(res.data.id))
        })
        .catch(err => {
            console.log('Error updateVisitaAction', err.response);
            dispatch(updateVisitaError(err.response.data.message))
        })
    }
}

const updateVisitaSuccess = payload => ({
    type: types.UPDATE_VISITA_SUCCESS,
    payload
});

const updateVisitaError = error => ({
    type: types.UPDATE_VISITA_ERROR,
});


export function updateConfirmedAction(uid){
    return async (dispatch) => {
        await clientAxios.get(`/bitacora/set-confirmado/${uid}`)
        .then(res => {
            dispatch(updateConfirmedSuccess(res.data.id))
        })
        .catch(err => {
            console.log('Error updateConfirmedAction', err.response);
            dispatch(updateConfirmedError(err.response.data.message))
        })
    }
}

const updateConfirmedSuccess = payload => ({
    type: types.UPDATE_CONFIRMED_SUCCESS,
    payload
});

const updateConfirmedError = error => ({
    type: types.UPDATE_CONFIRMED_ERROR,
});
