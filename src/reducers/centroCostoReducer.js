import { types } from '../types'


const initialState = {
    centroCosto: [],
    isLoading: true,
    errors: null,
    editedCentroCosto: null
}

// GET_CENTRO_COSTO_SUCCESS
// CREATE_CENTRO_COSTO_SUCCESS
// UPDATE_CENTRO_COSTO_SUCCESS
// DELETE_CENTRO_COSTO_SUCCESS

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_CENTRO_COSTO:
        case types.GET_CENTRO_COSTO:
        case types.CREATE_CENTRO_COSTO:
        case types.UPDATE_CENTRO_COSTO:
        case types.DELETE_CENTRO_COSTO:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedCentroCosto: null

            }
        case types.GET_ALL_CENTRO_COSTO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                centroCosto: action.payload
            }
        case types.GET_CENTRO_COSTO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedCentroCosto: action.payload
            }
        case types.CREATE_CENTRO_COSTO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                centroCosto: [...state.centroCosto, action.payload]
            }
        case types.UPDATE_CENTRO_COSTO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                centroCosto: state.centroCosto.map(centroCosto => ( centroCosto._id === action.payload._id ? action.payload : centroCosto ))
            }
        case types.DELETE_CENTRO_COSTO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                centroCosto: state.centroCosto.filter(centroCosto => centroCosto._id !== action.payload._id)
            }
        case types.GET_ALL_CENTRO_COSTO_ERROR:
        case types.GET_CENTRO_COSTO_ERROR:
        case types.CREATE_CENTRO_COSTO_ERROR:
        case types.UPDATE_CENTRO_COSTO_ERROR:
        case types.DELETE_CENTRO_COSTO_ERROR:

            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return state
    }
}