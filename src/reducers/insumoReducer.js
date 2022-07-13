import { types } from '../types'


const initialState = {
    insumos: [],
    isLoading: true,
    errors: null,
    editedInsumo: null
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_INSUMO:
        case types.CREATE_INSUMO:
        case types.UPDATE_INSUMO:
        case types.GET_INSUMO:
        case types.DELETE_INSUMO:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedInsumo: null

            }
        case types.GET_ALL_INSUMO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                insumos: action.payload
            }
        case types.CREATE_INSUMO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                insumos: [...state.insumos, action.payload]
            }
        case types.UPDATE_INSUMO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                insumos: state.insumos.map(insumo => insumo.id === action.payload.id ? action.payload : insumo)
            }
        case types.GET_INSUMO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedInsumo: action.payload
            }

        case types.DELETE_INSUMO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                insumos: state.insumos.filter(insumo => insumo.id !== action.payload.id)
            }

        case types.GET_ALL_INSUMO_ERROR:
        case types.UPDATE_INSUMO_ERROR:
        case types.GET_INSUMO_ERROR:
        case types.CREATE_INSUMO_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }

        
        
        default:
            return state
    }
}