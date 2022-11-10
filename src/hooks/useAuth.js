import jwtDecode from 'jwt-decode'
import { getAccessToken } from '../api/authApi'
import { useEffect, useRef } from 'react'
import { logoutAction, validateLoginAction } from '../actions/authActions'
import { useDispatch } from 'react-redux'

export const useAuth = () => {
    
    const dispatch = useDispatch()
    const ref = useRef({
        userAuth: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
    })

    const accessToken = getAccessToken()

    useEffect(() => {
     
        if(!accessToken){
            dispatch(logoutAction())
            ref.current = {
                userAuth: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            }

            
        }else{
            ref.current = {
                userAuth: jwtDecode(accessToken),
                token: accessToken,
                isAuthenticated: true,
                isLoading: false,
            }
        }
        
        dispatch ( validateLoginAction(ref.current) )
        // eslint-disable-next-line
    }, [accessToken])
    
    return ref.current

}
