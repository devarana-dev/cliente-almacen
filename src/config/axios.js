import axios from 'axios'
import { getAccessToken } from '../api/authApi';
export const cancelTokenSource = axios.CancelToken.source();

const clientAxios = axios.create({
    baseURL: import.meta.env.VITE_URL,
    cancelToken: cancelTokenSource.token,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    } 
})


clientAxios.interceptors.request.use( async (config) => {
    const accessToken = getAccessToken()
    if(accessToken){
        config.headers['accessToken'] = accessToken
    }
    return config

}, (error) => {
    console.log('Error request', error);
    return Promise.reject(error);
});

clientAxios.interceptors.response.use( (response) => {
    return response;
}, async (error) => {
    // redirect to login if error 401    
    if(error.response.status === 401){
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        // window.location.href = '/login'
    }
    return Promise.reject(error);
});


export default clientAxios

