import clientAxios from './axios';

const tokenAuth = (accessToken) => {
    if(accessToken !== '' || accessToken !== null) {
        clientAxios.defaults.headers.common['accessToken'] = accessToken
    }else{
        delete clientAxios.defaults.headers.common['accessToken']
    }
}

export default tokenAuth