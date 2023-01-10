import { types } from '../types'


const initialState = {
    permisos: [],
    isLoading: true,
    errors: null,
    userPermission: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {

    switch (action.type) {
        case types.GET_ALL_PERMISOS:
        case types.GET_PERMISO:
            return {
                ...state,
                isLoading: true,
                errors: null,
            }

        case types.GET_ALL_PERMISOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                permisos: action.payload
            }
        
        case types.GET_PERMISO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                userPermission: action.payload
            }
        
        case types.GET_ALL_PERMISOS_ERROR:
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
        default:
            return state;
    }

}
