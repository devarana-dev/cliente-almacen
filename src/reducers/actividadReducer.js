import { types } from '../types'


const initialState = {
    actividades: [],
    isLoading: true,
    errors: null,
    editedActividad: null
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_ACTIVIDAD:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedActividad: null

            }
        case types.GET_ALL_ACTIVIDAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                actividades: action.payload
            }
        case types.GET_ALL_ACTIVIDAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return state
    }
}