export default function Forbidden() {

    setTimeout(() => {
        return(
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

        )
    } , 100);
   
};
