import { types } from '../types'


const initialState = {
    prestamos: [],
    isLoading: true,
    errors: null,
    created: false,
    updated: false,
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {

        case types.GET_ALL_PRESTAMO:
        case types.CREATE_PRESTAMO:
        case types.UPDATE_PRESTAMO:
            return {
                ...state,
                isLoading: true,
                errors: null,
                created: false,
                updated: false,
            }
        case types.GET_ALL_PRESTAMO_SUCCESS:
            return {
                ...state,
                prestamos: action.payload,
                isLoading: false,
                errors: null,
            }

        case types.CREATE_PRESTAMO_SUCCESS:
            return {
                ...state,
                prestamos: [...state.prestamos, action.payload],
                isLoading: false,
                errors: null,
                created: true
            }

        case types.UPDATE_PRESTAMO_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                isLoading: false,
                errors: null,
                prestamos: state.prestamos.map(item => item.id === action.payload.id ? action.payload : item ),
                updated: true,
            }
            
        case types.UPDATE_PRESTAMO_ERROR:
        case types.GET_ALL_PRESTAMO_ERROR:
        case types.CREATE_PRESTAMO_ERROR:
            return {
                ...state,
                errors: action.payload,
                isLoading: false
            }
        case types.CLEAN_ERROR_STATE:
            return {
                ...state,
                errors: null
            }   
        default:
            return state
    }
}