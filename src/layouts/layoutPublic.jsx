import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { validateLoginAction } from "../actions/authActions"
import authProvider from "../provider/authProvider"

export default function LayoutPublic({children}) {
    
    const isAuth = authProvider()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuthenticated} = useSelector( state => state.auth )
    const {isLoading} = useSelector( state => state.auth )

    useEffect(() => {
        if(isAuth.isAuthenticated){
            dispatch(validateLoginAction(isAuth))
        }
    }, [isAuth]);

    if((isAuthenticated || isAuth.isAuthenticated) && !isLoading ){
        navigate("/")
    }
    

    return (
        <div className="w-full flex flex-col sm:bg-light sm:bg-none bg-royalview bg-cover bg-no-repeat bg-center h-screen"> {children} </div>
    )
};
