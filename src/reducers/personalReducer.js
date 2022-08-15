import { types } from '../types'


const initialState = {
    personal: [],
    editedPersonal: null,
    isLoading: true,
    errors: null,
    created: false,
    updated: false,
    deleted: false,
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {

        case types.GET_ALL_PERSONAL:
        case types.GET_PERSONAL:
        case types.CREATE_PERSONAL:
        case types.UPDATE_PERSONAL:
        case types.DELETE_PERSONAL:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedPersonal: null,
                created: false,
                updated: false,
                deleted: false,
            }
        case types.GET_ALL_PERSONAL_SUCCESS:
            return {
                ...state,
                personal: action.payload,
                isLoading: false,
                errors: null
            }
        
        case types.GET_PERSONAL_SUCCESS:
            return {
                ...state,
                editedPersonal: action.payload,
                isLoading: false,
                errors: null
            }

        case types.CREATE_PERSONAL_SUCCESS:
            return {
                ...state,
                personal: [...state.personal, action.payload],
                isLoading: false,
                errors: null,
                created: true
            }

        case types.UPDATE_PERSONAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedPersonal: null,
                personal: state.personal.map(item => ( item.id === action.payload.id ? action.payload : item )),
                updated: true,
            }
            
        case types.DELETE_PERSONAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                personal: state.personal.filter(item => item.id !== action.payload.id),
                deleted: true
            }
        
        case types.UPDATE_PERSONAL_ERROR:
        case types.DELETE_PERSONAL_ERROR:
        case types.GET_ALL_PERSONAL_ERROR:
        case types.GET_PERSONAL_ERROR:
        case types.CREATE_PERSONAL_ERROR:
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