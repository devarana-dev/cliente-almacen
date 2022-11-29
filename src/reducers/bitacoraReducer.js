import { types } from '../types'


const initialState = {
    bitacoras: [],
    isLoading: true,
    isLoadingBitacora: true,
    errors: null,
    created: false,
    updated: false,
    deleted: false,
    uploading: false,
    bitacora: null,
}


// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_BITACORA:
            return {
                ...state,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                uploading: true
            }
        case types.GET_BITACORAS:
            return {
                ...state,
                isLoading: true,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
            }

        case types.GET_BITACORA:
            return {
                ...state,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
                bitacora: null,
                isLoadingBitacora: true
            }

        case types.GET_BITACORAS_SUCCESS:
            return {
                ...state,
                bitacoras: action.payload,
                isLoading: false,
                errors: null,
            }

        case types.GET_BITACORA_SUCCESS:
            return {
                ...state,
                bitacora: action.payload,
                isLoadingBitacora: false,
                errors: null,
            }
        
        case types.CREATE_BITACORA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                bitacoras: [...state.bitacoras, action.payload],
                created: true,
                updated: false,
                deleted: false,
                uploading: false
            }
        case types.CREATE_BITACORA_ERROR:
        case types.GET_BITACORAS_ERROR:
        case types.GET_BITACORA_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoadingBitacora: false,
                errors: action.payload,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
                bitacora: null,
            }
        

        default:
            return state
    }
}