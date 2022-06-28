import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {getAccessToken, getRefreshToken} from "../api/authApi";

export default function AuthProvider() {

    const [ auth, setAuth ] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: true,
    });

    useEffect(() => {
        checkUserLogin(setAuth)
    }, [])
   
}

function checkUserLogin(setAuth) {
    const accessToken = getAccessToken();
    
    if(accessToken){
        setAuth({
            isAuthenticated: true,
            user: jwtDecode(accessToken).user,
            token: accessToken,
            isLoading: false,
        })
    }else{
        setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
        })
    }
}
