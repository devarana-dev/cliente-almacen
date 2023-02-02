import { useSelector } from "react-redux"
import LayoutPrivate from "./layoutPrivate"
import { useAuth } from "../hooks/useAuth"
import Loading from "../components/Elements/Loading"
import { useNavigate } from "react-router-dom"


export default function LayoutError({children}) {

    const { isAuthenticated, isLoading, logout } = useSelector( state => state.auth )
    useAuth()

    if(isLoading) return <Loading />

    if(isAuthenticated){
        return (
            <>
                <LayoutPrivate>
                    <div className="text-dark h-full">
                        {children}
                    </div>
                </LayoutPrivate>
            </>
        )
    }
    
};
