import { types } from '../types'


const initialState = {
    permisos: [],
    isLoading: true,
    isLoadingAlt: true,
    errors: null,
    userPermission: null,
    editedPermiso: null,
    created: false,
    updated: false,
    deleted: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {

    switch (action.type) {
        case types.GET_ALL_PERMISOS:
        case types.GET_PERMISO_USUARIO:
        case types.GET_PERMISO:
        case types.CREATE_PERMISO:
        case types.UPDATE_PERMISO:
        case types.DELETE_PERMISO:
            return {
                ...state,
                isLoading: true,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
            }

        case types.GET_ALL_ALT_PERMISOS:
            return {
                ...state,
                isLoadingAlt: true,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
            }

        case types.GET_ALL_PERMISOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoadingAlt: false,
                errors: null,
                permisos: action.payload
            }
        
        case types.GET_PERMISO_USUARIO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                userPermission: action.payload
            }

        case types.GET_PERMISO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedPermiso: action.payload,
            }

            

        case types.CREATE_PERMISO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                permisos: [...state.permisos, action.payload],
                created: true
            }
        
        case types.UPDATE_PERMISO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                permisos: state.permisos.map( permiso => permiso.id === action.payload.id ? action.payload : permiso ),
                updated: true
            }

        case types.DELETE_PERMISO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                permisos: state.permisos.filter( permiso => permiso.id !== action.payload ),
                deleted: true
            }
        
        case types.GET_ALL_PERMISOS_ERROR:
        case types.GET_PERMISO_USUARIO_ERROR:
        case types.CREATE_PERMISO_ERROR:
        case types.UPDATE_PERMISO_ERROR:
        case types.DELETE_PERMISO_ERROR:
        case types.GET_PERMISO_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        case types.CLEAN_ERROR_STATE:
            return {
                ...state,
                errors: null
            }

        case types.CLEAN_PERMISOS_STATE:
            return {
                ...state,
                created: false,
                updated: false,
                deleted: false,
                editedPermiso: null
            }

            
        default:
            return state;
    }

}
