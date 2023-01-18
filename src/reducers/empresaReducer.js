import { types } from '../types'


const initialState = {
    empresas: [],
    isLoading: false,
    errors: null,
    editedEmpresa: null,
    created: false,
    updated: false,
    deleted: false,
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_EMPRESA:
        case types.GET_EMPRESA:
        case types.CREATE_EMPRESA:
        case types.UPDATE_EMPRESA:
        case types.DELETE_EMPRESA:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedActividad: null,
                created: false,
                updated: false,
                deleted: false,
            }
        case types.GET_ALL_EMPRESA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                empresas: action.payload,
                editedActividad: null
            }

        case types.GET_EMPRESA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedActividad: action.payload
            }

        case types.CREATE_EMPRESA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                empresas: [...state.empresas, action.payload],
                created: true
            }
        case types.CLEAN_ERROR_STATE:
            return {
                ...state,
                errors: null
            }
        case types.UPDATE_EMPRESA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                empresas: state.empresas.map(actividad => actividad.id === action.payload.id ? action.payload : actividad),
                updated: true,
                editedActividad: null,
            }
        
        case types.DELETE_EMPRESA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                empresas: state.empresas.filter(actividad => actividad.id !== action.payload.id),
                deleted: true,
            }

        case types.DELETE_EMPRESA_ERROR:
        case types.UPDATE_EMPRESA_ERROR:    
        case types.CREATE_EMPRESA_ERROR:
        case types.GET_EMPRESA_ERROR:
        case types.GET_ALL_EMPRESA_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return state
    }
}