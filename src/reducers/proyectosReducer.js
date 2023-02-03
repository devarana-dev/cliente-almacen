
import { types } from '../types';

const initialState = {
    isLoading: false,
    errors: null,
    created: false,
    updated: false,
    deleted: false,
    proyectos: [],
    editedProyecto: null,
};

// eslint-disable-next-line
export default (state = initialState, action) => {

    switch(action.type) {

        case types.GET_ALL_PROYECTO:
        case types.GET_PROYECTO:
        case types.CREATE_PROYECTO:
        case types.UPDATE_PROYECTO:
            return {
                ...state,
                isLoading: true,
            }
        case types.GET_ALL_PROYECTO_SUCCESS:
            return {
                ...state,
                proyectos: action.payload,
                isLoading: false,
                errors: null,
            }   
        
        case types.GET_ALL_PROYECTO_ERROR:
        case types.GET_PROYECTO_ERROR:
        case types.CREATE_PROYECTO_ERROR:
        case types.UPDATE_PROYECTO_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        
        case types.GET_PROYECTO_SUCCESS:
            return {
                ...state,
                editedProyecto: action.payload,
                isLoading: false,
                errors: null,
            }

        case types.CREATE_PROYECTO_SUCCESS:
            return {
                ...state,
                created: true,
                isLoading: false,
                errors: null,
            }

        case types.UPDATE_PROYECTO_SUCCESS:
            return {
                ...state,
                updated: true,
                isLoading: false,
                errors: null,
            }

        case types.DELETE_PROYECTO_SUCCESS:
            return {
                ...state,
                deleted: true,
                isLoading: false,
                errors: null,
            }

        case types.CLEAR_PROYECTO:
            return {
                ...state,
                created: false,
                updated: false,
                deleted: false,
                errors: null,
                editedProyecto: null,
            }

        default:
            return state;
    }
}