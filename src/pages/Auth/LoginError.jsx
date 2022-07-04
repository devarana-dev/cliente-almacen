import { useEffect } from "react";

const LoginError = () => {

    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 1500)
    })

    return ( 
        <div className="p-5 text-dark text-center bg-white h-screen w-full flex">
            <div className="m-auto">
                <h1 className="text-3xl"> Tu correo no está activo porfavor contacta al administrador</h1>
                <p className="text-2xl">Esta ventana se cerrará automáticamente</p>
            </div>
        </div>
    );
}
 
export default LoginError;