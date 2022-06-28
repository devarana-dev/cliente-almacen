import clientAxios from './axios';

const tokenAuth = token => {
    if(token !== '') {
        clientAxios.defaults.headers.common['accessToken'] = token
    }else{
        delete clientAxios.defaults.headers.common['accessToken']
    }
}

export default tokenAuth