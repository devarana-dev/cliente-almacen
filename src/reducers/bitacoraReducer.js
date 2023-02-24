import { types } from '../types'


const initialState = {
    bitacoras: [],
    isLoading: true,
    isLoadingBitacora: false,
    isLoadingReport: false,
    isCreatingComment: false,
    isCreatedComment: false,
    generatedReport: false,
    errors: null,
    created: false,
    updated: false,
    deleted: false,
    uploading: false,
    bitacora: null,
    paginate: 0,
    tiposBitacora: [],
    conteoBitacoras:  {total: 0, incidencias: 0, acuerdos: 0, inicio: 0, cierre: 0, avance: 0, noVisto: 0}
}


// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {

// GET_TIPO_BITACORA
// GET_TIPO_BITACORA_SUCCESS
// GET_TIPO_BITACORA_ERROR

        case types.CREATE_COMENTARIO_BITACORA:
            return {
                ...state,
                isCreatingComment: true,
                errors: null,
                isCreatedComment: false,
            }

        case types.CREATE_BITACORA:
            return {
                ...state,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                uploading: true
            }
        case types.GET_BITACORAS:
            return {
                ...state,
                isLoading: true,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
            }
        case types.GET_TIPO_BITACORA:
            return {
                ...state,
                isLoading: true,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
                tiposBitacora: [],
            }

        case types.GET_BITACORA:
            return {
                ...state,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
                bitacora: null,
                isLoadingBitacora: true,
            }

        case types.GET_BITACORAS_SUCCESS:
            return {
                ...state,
                bitacoras: action.payload.bitacoras,
                conteoBitacoras: action.payload.conteoBitacoras,
                isLoading: false,
                errors: null,
            }

        case types.GET_BITACORA_SUCCESS:
            return {
                ...state,
                bitacora: action.payload,
                isLoadingBitacora: false,
                errors: null,
                errorBitacora: null,
            }
        
        case types.CREATE_BITACORA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                bitacoras: [...state.bitacoras, action.payload],
                created: true,
                updated: false,
                deleted: false,
                uploading: false
            }
        case types.CREATE_BITACORA_ERROR:
        case types.GET_BITACORAS_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoadingBitacora: false,
                errors: action.payload,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
                bitacora: null,
            }
        case types.GET_BITACORA_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoadingBitacora: false,
                errorBitacora: action.payload,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
            }
        
        case types.CREATE_COMENTARIO_BITACORA_SUCCESS:
            return {
                ...state,
                isCreatingComment: false,
                errors: null,
                isCreatedComment: true,
                bitacora: {
                    ...state.bitacora,
                    comentarios_bitacoras: [action.payload, ...state.bitacora.comentarios_bitacoras]
                }
            }
        
        case types.CREATE_COMENTARIO_BITACORA_ERROR:
            return {
                ...state,
                isCreatingComment: false,
                errors: action.payload,
                isCreatedComment: false,
            }

        case types.CLEAN_STATE_BITACORA:    
            return {
                ...state,
                isLoading: false,
                isLoadingBitacora: false,
                isCreatingComment: false,
                isCreatedComment: false,
                errors: null,
                created: false,
                updated: false,
                deleted: false,
                uploading: false,
            }

        case types.GET_TIPO_BITACORA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                tiposBitacora: action.payload,
            }

        case types.GET_TIPO_BITACORA_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                tiposBitacora: [],
            }

        case types.UPDATE_VISITA_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                errors: null,
                bitacora: {
                    ...state.bitacora,
                    participantes: state.bitacora.participantes.map(user => {
                        if(user.id === action.payload){
                            return {
                                ...user,
                                pivot_bitacora_users: {
                                    ...user.pivot_bitacora_users,
                                    visited: true
                                }
                            }
                        }
                        return user
                    })
                }

            }

        case types.UPDATE_CONFIRMED_SUCCESS:
            return {
                ...state,
                errors: null,
                bitacora: {
                    ...state.bitacora,
                    participantes: state.bitacora.participantes.map(user => {
                        if(user.id === action.payload){
                            return {
                                ...user,
                                pivot_bitacora_users: {
                                    ...user.pivot_bitacora_users,
                                    confirmed: true
                                }
                            }
                        }
                        return user
                    })
                }
            }


        case types.GENERAR_REPORTE:
            return {
                ...state,
                isLoadingReport: true,
                errors: null,
            }

        case types.GENERAR_REPORTE_SUCCESS:
            return {
                ...state,
                isLoadingReport: false,
                errors: null,
                generatedReport: true,
            }

        case types.GENERAR_REPORTE_ERROR:
            return {
                ...state,
                isLoadingReport: false,
                errors: action.payload,
                generatedReport: false,
            }
        
        case types.UPDATE_CONFIRMED_ERROR:
            return {
                ...state,
                errors: action.payload,
            }
            

                

        default:
            return state
    }
}