import { useEffect } from "react";

const LoginSuccess = () => {
    
    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 100)
    })

    return ( 
        <div className="p-5 text-dark text-center bg-white h-screen w-full flex">
            <div className="m-auto">
                <h1 className="text-3xl">Inicio de sesión correcto</h1>
                <p className="text-2xl">Esta ventana se cerrará automáticamente</p>
            </div>
        </div>
     );
}
 
export default LoginSuccess;