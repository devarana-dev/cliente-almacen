import { types } from '../types'


const initialState = {
    usuarios: [],
    editedUsuario: null,
    isLoading: true,
    errors: null,
    created: false,
    updated: false,
    deleted: false,
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {
        case types.GET_USER:
        case types.CREATE_USER:
        case types.UPDATE_USER:
        case types.DELETE_USER:
            return {
                ...state,
                isLoading: true,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
            }
        
        case types.GET_ALL_USER:
            return {
                ...state,
                isLoading: true,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                editedUsuario: null,
            }
        case types.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                usuarios: action.payload,
                isLoading: false,
                errors: null,
            }
        
        case types.GET_USER_SUCCESS:
            return {
                ...state,
                editedUsuario: action.payload,
                isLoading: false,
                errors: null
            }

        case types.CREATE_USER_SUCCESS:
            return {
                ...state,
                usuarios: [...state.usuarios, action.payload],
                isLoading: false,
                errors: null,
                created: true
            }

        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedUsuario: null,
                usuarios: state.usuarios.map(usuario => ( usuario.id === action.payload.id ? action.payload : usuario )),
                updated: true
            }
        
        case types.DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                usuarios: state.usuarios.filter(usuario => usuario.id !== action.payload.id),
                deleted: true
            }

        case types.UPDATE_USER_ERROR:
        case types.DELETE_USER_ERROR:
        case types.GET_ALL_USER_ERROR:
        case types.GET_USER_ERROR:
        case types.CREATE_USER_ERROR:
            return {
                ...state,
                errors: action.payload,
                isLoading: false
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