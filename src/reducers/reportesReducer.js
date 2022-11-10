import { types } from '../types'


const initialState = {
    insumos: [],
    paginate: {},
    isLoading: true,
    isGeneratingReport: false,
    errors: null,
    generar: [],
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {

        case types.GET_ALL_REPORTE:
            return {
                ...state,
                isLoading: true,
                errors: null,
                insumos: [],
            }

        case types.GET_ALL_REPORTE_SUCCESS:
            return {
                ...state,
                insumos: action.payload.rows,
                paginate: {
                    totalItem:action.payload.totalItem,
                    totalPages:action.payload.totalPages,
                    currentPage:action.payload.currentPage,
                },
                isLoading: false,
                errors: null,
            }

        case types.GET_ALL_REPORTE_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            }

        case types.GENERATE_REPORTE:
            return {
                ...state,
                isGeneratingReport: true,
                errors: null,
                generar: [],
                
            }
        case types.GENERATE_REPORTE_SUCCESS:
            return {
                ...state,
                generar: action.payload,
                isGeneratingReport: false,
                errors: null,
            }
        case types.CLEAN_GENERAR_REPORTE:
            return {
                ...state,
                isGeneratingReport: false,
                generar: [],
            }

        case types.GENERAR_REPORTE_PDF:
            return {
                ...state,
                isGeneratingReport: true,
                errors: null,
            }


        case types.GENERAR_REPORTE_PDF_SUCCESS:
            return {
                ...state,
                isGeneratingReport: false,
                errors: null,
            }
            
        case types.GENERAR_REPORTE_PDF_ERROR:
        case types.GENERATE_REPORTE_ERROR:
            return {
                ...state,
                isGeneratingReport: false,
                errors: action.payload,
            }


        default:
            return state
    }
}


