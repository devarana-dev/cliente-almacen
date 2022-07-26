import { types } from '../types'


const initialState = {
    vales: [],
    editedVale: null,
    isLoading: true,
    errors: null,
    created: false,
    updated: false,
    delivered: false,
    deleted: false,
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {

        case types.GET_ALL_VALE:
        case types.GET_VALE:
        case types.CREATE_VALE:
            return {
                ...state,
                isLoading: true,
                errors: null,
                editedVale: null,
                created: false,
                updated: false,
                delivered: false,
                deleted: false,
            }
        
        case types.DELIVER_VALE:
            return {
                ...state,
                isLoading: true,
                errors: null, 
                delivered: false,
            }

        case types.DELIVER_VALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                delivered: true,
                vales: state.vales.map(vale => {
                    if(vale.id === action.payload.insumo.valeSalidaId) {
                        vale.statusVale = action.payload.valeSalida.statusVale
                        vale.detalle_salidas.map(detalle => {
                            if(detalle.id === action.payload.insumo.id) {
                                return (
                                    detalle.cantidadEntregada = action.payload.insumo.cantidadEntregada,
                                    detalle.cantidadSolicitada = action.payload.insumo.cantidadSolicitada,
                                    detalle.status = action.payload.insumo.status
                                )
                            }
                        })
                    }
                    return vale
                })
            }

        case types.DELIVER_VALE_ERROR:    
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                delivered: false,
            }
                    
        case types.UPDATE_VALE:
            return {
                ...state,
                isLoading: true,
                errors: null,
            }

        case types.GET_ALL_VALE_SUCCESS:
            return {
                ...state,
                vales: action.payload,
                isLoading: false,
                errors: null
            }
        
        case types.GET_VALE_SUCCESS:
            return {
                ...state,
                editedVale: action.payload,
                isLoading: false,
                errors: null
            }

        case types.CREATE_VALE_SUCCESS:
            return {
                ...state,
                vales: [...state.vales, action.payload],
                isLoading: false,
                errors: null,
                created: true
            }

        case types.UPDATE_VALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: null,
                vales: state.vales.map(vale => ( vale._id === action.payload._id ? action.payload : vale )),
                updated: true
            }

        case types.GET_ALL_VALE_ERROR:
        case types.GET_VALE_ERROR:
        case types.CREATE_VALE_ERROR:
        case types.UPDATE_VALE_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
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


