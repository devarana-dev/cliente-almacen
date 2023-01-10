import { types } from '../types';

const initialState = {
    isLoading: false,
    errors: null,
    created: false,
    updated: false,
    deleted: false,
    etapas: [],
    editedEtapa: null,
};

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {

        case types.GET_ETAPAS:
        case types.GET_ETAPA:
        case types.CREATE_ETAPA:
        case types.UPDATE_ETAPA:
            return {
                ...state,
                isLoading: true,
            }
        case types.GET_ETAPAS_SUCCESS:
            return {
                ...state,
                etapas: action.payload,
                isLoading: false,
                errors: null,
            }   
        
        case types.GET_ETAPAS_ERROR:
        case types.GET_ETAPA_ERROR:
        case types.CREATE_ETAPA_ERROR:
        case types.UPDATE_ETAPA_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        
        case types.GET_ETAPA_SUCCESS:
            return {
                ...state,
                editedEtapa: action.payload,
                isLoading: false,
                errors: null,
            }

        case types.CREATE_ETAPA_SUCCESS:
            return {
                ...state,
                created: true,
                isLoading: false,
                errors: null,
            }

        case types.UPDATE_ETAPA_SUCCESS:
            return {
                ...state,
                updated: true,
                isLoading: false,
                errors: null,
            }
        
        case types.CLEAN_ETAPA:
            return {
                ...state,
                created: false,
                updated: false,
                deleted: false,
                editedEtapa: null,
                errors: null,
            }
            
        default:
            return state;
    }
}