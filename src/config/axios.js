import axios from 'axios'
export const cancelTokenSource = axios.CancelToken.source();

const clientAxios = axios.create({
    baseURL: process.env.REACT_APP_URL,
    cancelToken: cancelTokenSource.token,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    } 
})


export default clientAxios