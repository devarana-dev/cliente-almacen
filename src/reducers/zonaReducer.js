import { types } from '../types'


const initialState = {
    zonas: [],
    isLoading: true,
    errors: null,
    editedZona: null,
    created: false,
    updated: false,
    deleted: false,
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_ZONA:
        case types.CREATE_ZONA:
        case types.GET_ZONA:
        case types.UPDATE_ZONA:
        case types.DELETE_ZONA:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedZona: null,
                created: false,
                updated: false,
                deleted: false,
            }
        case types.GET_ALL_ZONA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                zonas: action.payload
            }

        case types.GET_ZONA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedZona: action.payload
            }

        case types.UPDATE_ZONA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                zonas: state.zonas.map(zona => zona.id === action.payload.id ? action.payload : zona),
                editedZona: null,
                updated: true
            }
        case types.DELETE_ZONA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                zonas: state.zonas.filter(zona => zona.id !== action.payload.id),
                deleted: true,
            }

        case types.DELETE_ZONA_ERROR:
        case types.GET_ALL_ZONA_ERROR:
        case types.CREATE_ZONA_ERROR:
        case types.GET_ZONA_ERROR:
        case types.UPDATE_ZONA_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }

        case types.CREATE_ZONA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                zonas: [...state.zonas, action.payload],
                created: true
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