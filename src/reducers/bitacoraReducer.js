import { types } from '../types'


const initialState = {
    bitacoras: [],
    isLoading: true,
    isLoadingBitacora: true,
    isCreatingComment: false,
    isCreatedComment: false,
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

        case types.CREATE_COMENTARIO_BITACORA:
            return {
                ...state,
                isCreatingComment: true,
                errors: null,
                isCreatedComment: false,
            }

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
                isLoadingBitacora: true,
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
        
        case types.CREATE_COMENTARIO_BITACORA_SUCCESS:
            return {
                ...state,
                isCreatingComment: false,
                errors: null,
                isCreatedComment: true,
                // merge the new comment with the existing comments in state.bitacora.comentarios_bitacoras at the 
                // beginning of the array
                bitacora: {
                    ...state.bitacora,
                    comentarios_bitacoras: [action.payload, ...state.bitacora.comentarios_bitacoras]
                }
            }
        
        case types.CREATE_COMENTARIO_BITACORA_ERROR:
            return {
                ...state,
                isCreatingComment: false,
                errors: action.payload,
                isCreatedComment: false,
            }

        case types.CLEAN_STATE_BITACORA:    
            return {
                ...state,
                isLoading: false,
                isLoadingBitacora: false,
                isCreatingComment: false,
                isCreatedComment: false,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
            }


        default:
            return state
    }
}