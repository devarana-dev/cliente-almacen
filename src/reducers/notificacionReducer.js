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
            return {
                ...state,
                isLoading: false,
                errors: null,
                updated: true,
                notificaciones: action.payload
                    
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