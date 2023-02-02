const Error404 = () => {
    return (
    <div className="flex h-full">
        <div className="max-w-lg m-auto text-center drop-shadow-md">
            <p className="text-3xl md:text-4xl font-bold">Error 404: <span className="text-xl md:text-3xl">Página No Encontrada </span> </p>
            <p className="text-base md:text-2xl font-normal">Link incorrecto o mal escrito.</p>
            <p className="text-base md:text-lg font-normal">Si crees que esto es un error contacta a desarrollo.</p>
        </div>
    </div> 
    );
}
 
export default Error404;