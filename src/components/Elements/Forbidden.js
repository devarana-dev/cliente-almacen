import { useState } from "react";

export default function Forbidden() {

    const [visible, setVisible] = useState()

    setTimeout(() => {
        setVisible(true)
    } , 1000);

    return(
        visible?
            <div className="forbidden">
                <div className="forbidden__content">
                    <div className="forbidden__content__title">
                        <h1>403</h1>
                    </div>
                    <div className="forbidden__content__text">
                        <h2>Prohibido</h2>
                        <p>No Tienes permiso de acceder</p>
                    </div>
                </div>
            </div>
        : null
    )
};
