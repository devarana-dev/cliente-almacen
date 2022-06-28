import axios from 'axios'

const clientAxios = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})


export default clientAxios