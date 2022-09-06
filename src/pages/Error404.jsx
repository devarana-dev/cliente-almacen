const Error404 = () => {
    return (
    <div className="flex h-full">
        <div className="max-w-lg m-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-dark">Error 404: <span className="text-xl md:text-3xl">Página No Encontrada </span> </h1>
            <p className="text-base md:text-2xl font-normal text-dark">Link incorrecto o mal escrito.</p>
            <p className="text-base md:text-lg font-normal text-dark">Si crees que esto es un error contacta a desarrollo.</p>
        </div>
    </div> 
    );
}
 
export default Error404;