import axios from 'axios'

const getToken = () => {
    return localStorage.getItem('accessToken')
}

const clientAxios = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'accessToken': getToken()
    } 
})


export default clientAxios