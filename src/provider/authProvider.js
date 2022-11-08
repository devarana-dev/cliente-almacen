import { useEffect, useState } from "react"
import { getAccessToken, refreshAccessToken, getRefreshToken } from "../api/authApi"
import jwtDecode from 'jwt-decode';


export default function AuthProvider(){
   
    const [auth, setAuth] = useState(
        {
            token: null,
            isAuthenticated: false,
            isLoading: true,
            userAuth: null,
        }
    )

    useEffect(() => {
        checkUserLogin(setAuth)
    }, [])
    
    return auth
}

function checkUserLogin( setAuth ) {
    const accessToken = getAccessToken()
    if(!accessToken){
        const refreshToken = getRefreshToken()
        if(!refreshToken){
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        setAuth({
            userAuth: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        })
        }else{
            refreshAccessToken(refreshToken)
        }
    }else{
        setAuth({
            userAuth: jwtDecode(accessToken),
            token: accessToken,
            isAuthenticated: true,
            isLoading: false,
        })

        
    }
}