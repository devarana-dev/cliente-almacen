import axios from 'axios'

const getToken = () => {
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken !== '' || accessToken !== null) {    
        return accessToken
    }

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