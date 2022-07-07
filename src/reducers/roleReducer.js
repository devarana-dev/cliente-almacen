import { types } from '../types'


const initialState = {
    roles: [],
    isLoading: true,
    errors: null,
    editedRole: null
}




// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {

        case types.GET_ALL_ROLE:
        case types.CREATE_ROLE:
        case types.GET_ROLE:
        case types.UPDATE_ROLE:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedRole: null
            }
        
        case types.GET_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedRole: action.payload
            }

        case types.GET_ALL_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.payload,
                isLoading: false
            }

        case types.UPDATE_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                roles: state.roles.map(role => role.id === action.payload.id ? action.payload : role),
                editedRole: null
            }


        case types.GET_ALL_ROLE_ERROR:
        case types.CREATE_ROLE_ERROR:
        case types.GET_ROLE_ERROR:
        case types.UPDATE_ROLE_ERROR:
            return {
                ...state,
                errors: action.payload,
                isLoading: false
            }
        case types.CREATE_ROLE_SUCCESS:
            return {
                ...state,
                roles: [...state.roles, action.payload],
                isLoading: false
            }

        
        default:
            return state
    }
}
