import { types } from '../types'


const initialState = {
    zonas: [],
    isLoading: true,
    errors: null,
    editedZona: null
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_ZONA:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedZona: null

            }
        case types.GET_ALL_ZONA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                zonas: action.payload
            }
        case types.GET_ALL_ZONA_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return state
    }
}