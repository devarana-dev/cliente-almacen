import jwtDecode from "jwt-decode";
import clientAxios from "../config/axios"

export function getAccessToken() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
        return null;
    }

    return willExpireToken(accessToken) ? null : accessToken;
};

export function getRefreshToken(){
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken || refreshToken === 'null' || refreshToken === 'undefined') {
        return null;
    }

    return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessToken(refreshToken){
    return clientAxios.post('/auth/refresh', {refreshToken})
}

function willExpireToken(accessToken){
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
}
