import { types } from '../types'


const initialState = {
    isAuthenticated: false,
    userAuth: null,
    isLoading: true,
    errors: null
    // token: null,
}


// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {
        
        case types.LOGIN_ERROR:
        case types.LOGIN_VALIDATE_ERROR:
        case types.LOGOUT_ERROR:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                isAuthenticated: false,
                userAuth: null
            }

        case types.LOGIN_SUCCESS:
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            localStorage.setItem('accessToken', action.payload.accessToken)
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                errors: null,
            }

        case types.LOGOUT_SUCCESS:
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                errors: null,
                userAuth: null
            }        
        case types.LOGIN_VALIDATE_SUCCESS:
            return {
                ...state,
                userAuth: action.payload.userAuth,
                isLoading: action.payload.isLoading,
                isAuthenticated: action.payload.isAuthenticated,
                errors: null,
            }
        default:
            return state
        

    }
    
};

