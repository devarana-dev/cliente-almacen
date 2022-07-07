import { types } from '../types'


const initialState = {
    usuarios: [],
    editedUsuario: null,
    isLoading: true,
    errors: null
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {

        case types.GET_ALL_USER:
        case types.GET_USER:
        case types.CREATE_USER:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedUsuario: null
            }
        
        case types.UPDATE_USER:
            return {
                ...state,
                isLoading: true,
                errors: null,
            }

        case types.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                usuarios: action.payload,
                isLoading: false,
                errors: null
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
                errors: null
            }

        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedUsuario: null,
                usuarios: state.usuarios.map(usuario => ( usuario.id === action.payload.id ? action.payload : usuario ))
            }
            

        case types.GET_ALL_USER_ERROR:
        case types.GET_USER_ERROR:
        case types.CREATE_USER_ERROR:
            return {
                ...state,
                errors: action.payload,
                isLoading: false
            }
            
        default:
            return state
    }
}