import { types } from '../types'


const initialState = {
    centroCosto: [],
    isLoading: true,
    errors: null,
    editedCentroCosto: null
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_CENTRO_COSTO:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedCentroCosto: null

            }
        case types.GET_ALL_CENTRO_COSTO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                centroCosto: action.payload
            }
        case types.GET_ALL_CENTRO_COSTO_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return state
    }
}