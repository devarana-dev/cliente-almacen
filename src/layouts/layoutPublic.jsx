import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom"
import { validateLoginAction } from "../actions/authActions"
import authProvider from "../provider/authProvider"

export default function LayoutPublic({children}) {
    
    const isAuth = authProvider()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {isAuthenticated} = useSelector( state => state.auth )
    const {isLoading} = useSelector( state => state.auth )
    
    
    useEffect(() => {
        if(isAuth.isAuthenticated){
            dispatch(validateLoginAction(isAuth))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    
    const { from } = location.state || { from: { pathname: "/" } };
    

    if((isAuthenticated || isAuth.isAuthenticated) && !isLoading ){
        navigate(from);
    }


    return (
        <>
            { import.meta.env.VITE_TEST && <div className="bg-red-500 text-white text-center py-2 uppercase fixed left-0 right-0 top-0 z-30">Versión de Pruebas</div> }
            <div className="w-full flex flex-col sm:bg-light bg-homeLogin bg-cover bg-no-repeat bg-center h-screen animate__animated animate__fadeIn animate__faster"> {children} </div>
        </>
    )
};
