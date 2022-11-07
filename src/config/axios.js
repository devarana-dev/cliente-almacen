import axios from 'axios'
import { validateLoginAction } from '../actions/authActions';
import { getAccessToken } from '../api/authApi';
import AuthProvider from '../provider/authProvider';
export const cancelTokenSource = axios.CancelToken.source();

const clientAxios = axios.create({
    baseURL: process.env.REACT_APP_URL,
    cancelToken: cancelTokenSource.token,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    } 
})

clientAxios.interceptors.request.use( async (config) => {
    const isAuth = AuthProvider()
    if(isAuth.isAuthenticated){
        const accessToken = getAccessToken()
        if(accessToken !== '' || accessToken !== null) {
            config.headers['accessToken'] = accessToken
        }
        return config;
    }else {
        validateLoginAction(isAuth)
    }
}, (error) => {
    return Promise.reject(error);
});




export default clientAxios