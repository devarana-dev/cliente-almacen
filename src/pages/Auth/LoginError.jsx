const LoginError = () => {

    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 1500)
    })

    return ( 
        <div className="p-5 text-white text-center">
            <h1 className="text-3xl"> Tu correo no está activo porfavor contacta al administrador</h1>
            <p className="text-2xl">Esta ventana se cerrará automáticamente</p>
        </div>
    );
}
 
export default LoginError;