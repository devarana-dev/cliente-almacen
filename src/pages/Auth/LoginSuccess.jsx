import { useEffect } from "react";
import { getUserAction } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Elements/Loading";

const LoginSuccess = () => {

    const dispatch = useDispatch()
    const { isAuthenticated, isLoading, logout } = useSelector( state => state.auth )
    
    useEffect(() => {
        setTimeout(() => {
            dispatch(getUserAction())
        }, 1000)
    }, [])


    useEffect(() => {
        if(isAuthenticated && !isLoading){
            window.location.href = '/'
        }
    }, [isAuthenticated])

    useEffect(() => {
        if(logout){
            window.location.href = '/login'
        }
    }, [logout])

    return ( 
        <div className="text-dark text-center bg-white h-screen w-full flex">
            <div className="m-auto">
                <Loading text="Iniciando Sesión" />
            </div>
        </div>
     );
}
 
export default LoginSuccess;