import { types } from '../types'


const initialState = {
    niveles: [],
    isLoading: true,
    errors: null,
    editedNivel: null,
    created: false,
    updated: false,
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_NIVEL:
        case types.CREATE_NIVEL:
        case types.UPDATE_NIVEL:
        case types.GET_NIVEL:
        case types.DELETE_NIVEL:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedNivel: null,
                created: false,
                updated: false,

            }
        case types.GET_ALL_NIVEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                niveles: action.payload
            }
        case types.CREATE_NIVEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                niveles: [...state.niveles, action.payload],
                created: true
            }
        case types.UPDATE_NIVEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                niveles: state.niveles.map(nivel => nivel.id === action.payload.id ? action.payload : nivel),
                updated: true
            }
        case types.GET_NIVEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedNivel: action.payload
            }

        case types.DELETE_NIVEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                niveles: state.niveles.filter(nivel => nivel.id !== action.payload.id)
            }

        case types.GET_ALL_NIVEL_ERROR:
        case types.UPDATE_NIVEL_ERROR:
        case types.GET_NIVEL_ERROR:
        case types.CREATE_NIVEL_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }

        
        
        default:
            return state
    }
}