import { useEffect } from "react";
import { getUserAction } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import Loading from "../../components/Elements/Loading";

const LoginSuccess = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        setTimeout(() => {
            dispatch(getUserAction())
        }, 1000)
    }, [])

    return ( 
        <div className="p-5 text-dark text-center bg-white h-screen w-full flex">
            <div className="m-auto">
                <Loading text="Iniciando Sesión" />
            </div>
        </div>
     );
}
 
export default LoginSuccess;