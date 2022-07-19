import clientAxios from '../config/axios';
import { types } from '../types';

export function getUserAction () {
    return async (dispatch) => {
        await clientAxios.get('/login/validate', { withCredentials: true })
            .then ( res => {
                dispatch(loginSuccess(res.data))
            })
            .catch( err => {
                // console.log('Error getUserAction', err.response.data.message);
                dispatch(loginError(err.response.data.message))
            })
    }
}

const loginSuccess = (user) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: user
    }
}

const loginError = (error) => {
    return {
        type: types.LOGIN_ERROR,
        payload: error
    }
}



export function validateLoginAction (auth){
    return dispatch => {
        console.log('validateLoginAction', auth);
        dispatch(loginValidateRequest())
        if(auth){
            dispatch(loginValidateSuccess(auth))
        }else{
            dispatch(loginValidateError('No hay autenticación'))
            logoutAction()
        }
    }
}


const loginValidateRequest = () => ({
    type: types.LOGIN_VALIDATE_REQUEST
})

const loginValidateSuccess = payload => ({
    type: types.LOGIN_VALIDATE_SUCCESS,
    payload
})

const loginValidateError = payload => ({
    type: types.LOGIN_VALIDATE_ERROR,
    payload
})




export function logoutAction(){
    return async (dispatch) => {
        dispatch(logoutRequest())
        try {
            await clientAxios.get('/auth/logout', {withCredentials: true})
            dispatch(logoutSuccess())
        } catch (error) {
            dispatch(logoutError(error.response.data))
        }
    }
}

const logoutRequest = () => ({
    type: types.LOGOUT_REQUEST
})


const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS
})

const logoutError = payload => ({
    type: types.LOGOUT_ERROR,
    payload
})