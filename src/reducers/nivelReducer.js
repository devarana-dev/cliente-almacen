import { types } from '../types'


const initialState = {
    niveles: [],
    isLoading: true,
    errors: null,
    editedNivel: null
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_NIVEL:
        case types.CREATE_NIVEL:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedNivel: null

            }
        case types.GET_ALL_NIVEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                niveles: action.payload
            }
        case types.GET_ALL_NIVEL_ERROR:
        case types.CREATE_NIVEL_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }

        case types.CREATE_NIVEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                niveles: [...state.niveles, action.payload]
            }
        
        default:
            return state
    }
}