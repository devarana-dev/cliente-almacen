import { types } from '../types'


const initialState = {
    insumos: [],
    isLoading: true,
    errors: null,
    editedInsumo: null,

    upload: false,
    uploadState: null,
    uploadMessage: null,
    uploadedCount: 0,

    created: false,
    updated: false,
    deleted: false,
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
                editedInsumo: null,
                created: false,
                updated: false,
                deleted: false,

            }

        case types.UPLOAD_MASSIVE_INSUMO:
            return {
                ...state,
                isLoading: false,
                errors: null,
                upload: true
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
                insumos: [...state.insumos, action.payload],
                created: true
            }

        case types.UPLOAD_MASSIVE_INSUMO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                insumos: [...state.insumos, ...action.payload.insumosNoCreados],
                upload: false,
                uploadState: 'success',
                uploadMessage: action.payload.message,
                uploadedCount: action.payload.insumosNoCreados.length
            }
        case types.UPDATE_INSUMO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                insumos: state.insumos.map(insumo => insumo.id === action.payload.id ? action.payload : insumo),
                updated: true
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
                insumos: state.insumos.filter(insumo => insumo.id !== action.payload.id),
                deleted: true
            }

        case types.GET_ALL_INSUMO_ERROR:
        case types.UPDATE_INSUMO_ERROR:
        case types.GET_INSUMO_ERROR:
        case types.CREATE_INSUMO_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                upload: false
            }

        case types.UPLOAD_MASSIVE_INSUMO_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                upload: false,
                uploadState: 'error',
                uploadMessage: action.payload.message
            }
        
        case types.CLEAR_UPLOAD_STATE:
            return {
                ...state,
                upload: false,
                uploadState: null,
                uploadMessage: null,
                uploadedCount: 0
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