import { types } from '../types'


const initialState = {
    obra: [],
    isLoading: true,
    errors: null,
    editedObra: null
}

// GET_OBRA_SUCCESS
// CREATE_OBRA_SUCCESS
// UPDATE_OBRA_SUCCESS
// DELETE_OBRA_SUCCESS

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_OBRA:
        case types.GET_OBRA:
        case types.CREATE_OBRA:
        case types.UPDATE_OBRA:
        case types.DELETE_OBRA:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedObra: null

            }
        case types.GET_ALL_OBRA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                obra: action.payload
            }
        case types.GET_OBRA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                editedObra: action.payload
            }
        case types.CREATE_OBRA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                obra: [...state.obra, action.payload]
            }
        case types.UPDATE_OBRA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                obra: state.obra.map(obra => ( obra._id === action.payload._id ? action.payload : obra ))
            }
        case types.DELETE_OBRA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                obra: state.obra.filter(obra => obra.id !== action.payload.id)
            }
        case types.GET_ALL_OBRA_ERROR:
        case types.GET_OBRA_ERROR:
        case types.CREATE_OBRA_ERROR:
        case types.UPDATE_OBRA_ERROR:
        case types.DELETE_OBRA_ERROR:

            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return state
    }
}