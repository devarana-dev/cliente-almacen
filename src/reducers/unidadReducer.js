import { types } from '../types'


const initialState = {
    unidades: [],
    isLoading: true,
    errors: null,
    editedUnidad: null
}




// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_UNIDAD:
        case types.CREATE_UNIDAD:
        case types.GET_UNIDAD:
        case types.UPDATE_UNIDAD:
        case types.DELETE_UNIDAD:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedUnidad: null
            }

        case types.GET_UNIDAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedUnidad: action.payload
            }

        case types.GET_ALL_UNIDAD_SUCCESS:
            return {
                ...state,
                unidades: action.payload,
                isLoading: false
            }

        case types.UPDATE_UNIDAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                unidades: state.unidades.map(unidad => unidad.id === action.payload.id ? action.payload : unidad),
                editedUnidad: null
            }

        case types.DELETE_UNIDAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                unidades: state.unidades.filter(unidad => unidad.id !== action.payload)
            }


        case types.DELETE_CENTRO_COSTO_ERROR:
        case types.GET_ALL_UNIDAD_ERROR:
        case types.CREATE_UNIDAD_ERROR:
        case types.GET_UNIDAD_ERROR:
        case types.UPDATE_UNIDAD_ERROR:
            return {
                ...state,
                errors: action.payload,
                isLoading: false
            }
        case types.CREATE_UNIDAD_SUCCESS:
            return {
                ...state,
                unidades: [...state.unidades, action.payload],
                isLoading: false
            }

        default:
            return state
    }
}