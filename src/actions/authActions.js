import clientAxios from '../config/axios';
import { types } from '../types';

export function getUserAction () {
    return async (dispatch) => {
        await clientAxios.get('/login/validate', { withCredentials: true })
            .then ( res => {
                console.log(res.data);
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
        if(auth){
            dispatch({
                type: types.LOGIN_VALIDATE_SUCCESS,
                payload: auth
            })
        }else{
            dispatch({
                type: types.LOGIN_VALIDATE_ERROR,
                payload: null
            })
            logoutAction()
        }
    }
}

export function logoutAction(){
    return async (dispatch) => {
        try {
            await clientAxios.get('/auth/logout', {withCredentials: true})
            dispatch(logoutSuccess())
        } catch (error) {
            dispatch(logoutError(error.response.data))
        }
    }
}

const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS
})

const logoutError = payload => ({
    type: types.LOGOUT_ERROR,
    payload
})