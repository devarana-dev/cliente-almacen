import clientAxios from '../config/axios';
import { types } from '../types';


export function getNotificationesAction(){
    return async (dispatch) => {
        dispatch( getNotificacionesRequest())
        await clientAxios.get('/notificaciones').then(res => {
            dispatch(getNotificacionesSuccess(res.data.notificaciones))
        }
        ).catch(err => {
            console.log('Error getNotificationesAction', err.response);
            dispatch(getNotificacionesError(err.response.data.message))
        })
    }
}

const getNotificacionesRequest = () => ({
    type: types.GET_NOTIFICATIONS
});

const getNotificacionesSuccess = payload => ({
    type: types.GET_NOTIFICATIONS_SUCCESS,
    payload
});

const getNotificacionesError = error => ({
    type: types.GET_NOTIFICATIONS_ERROR,
    payload: error
});


export function updateNotificationeAction(){
    return async (dispatch) => {
        dispatch( updateNotificationRequest())
        await clientAxios.put(`/notificaciones`).then(res => {
            dispatch(updateNotificationSuccess(res.data.notificaciones))
        }
        ).catch(err => {
            console.log('Error updateNotificationeAction', err.response);
            dispatch(updateNotificationError(err.response.data.message))
        })
    }
}

const updateNotificationRequest = () => ({
    type: types.UPDATE_NOTIFICATION
});

const updateNotificationSuccess = payload => ({
    type: types.UPDATE_NOTIFICATION_SUCCESS,
    payload
});

const updateNotificationError = error => ({
    type: types.UPDATE_NOTIFICATION_ERROR,
    payload: error
});