import { useState } from "react";

export default function Forbidden() {

    const [visible, setVisible] = useState()
    setTimeout(() => {
        setVisible(true)
    } , 1000);


    
    return(
        visible?
            <div className="flex h-full">
                <div className="max-w-md m-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-dark">Error 403: <span className="text-xl md:text-3xl"> No tienes autorización </span> </h1>
                    <p className="text-base md:text-2xl font-normal text-dark">No tienes permiso de acceder</p>
                </div>
            </div>
        : null
    )
};
