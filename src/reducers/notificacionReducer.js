import { types } from '../types'


const initialState = {
    notificaciones: [],
    isLoading: true,
    errors: null,

}

export default (state = initialState, action) => {
    switch (action.type) {


        case types.GET_NOTIFICATIONS:
        case types.UPDATE_NOTIFICATION:
            return {
                ...state,
                isLoading: true,
                errors: null,
            }
        
        case types.GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notificaciones: action.payload,
                isLoading: false,
                errors: null
            }
        
        case types.GET_NOTIFICATIONS_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }   
            
        case types.UPDATE_NOTIFICATION_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                isLoading: false,
                errors: null,
                updated: true,
                // buscar en el state todas las notificaciones que vienen en el array de objetos del payload y actualizarlas
                notificaciones: state.notificaciones.map(notificacion => (
                    action.payload.map(notificacionUpdate => (
                        notificacion.id === notificacionUpdate.id ? notificacionUpdate : notificacion
                    ))
                )).flat()
                    
            }
        case types.UPDATE_NOTIFICATION_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }

        default:
            return state
    }
}