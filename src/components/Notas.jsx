import { Divider } from "antd";

const Notas = () => {
    return ( 
        <div className="max-h-[500px] overflow-y-auto">

            {/* <div>
                <h1 className="text-primary text-lg font-bold">Actualización <span>30/10/22</span></h1>
                <ul className="text-dark">
                    <li className="font-bold"> * Actualización</li>
                    <li> Se creo nuevo módulo de reportes el cual permite poder la cantidad solicitada por insumo relacionada a los vales.</li>
                    <li> Se integró una herramienta para la detección de errores lo que facilitará el solucionar los errores que detengan el funcionamiento de la aplicacón. </li>
                    
                </ul>
            </div>
            <Divider/> */}
            <div>
                <h1 className="text-primary text-lg font-bold">Actualización <span>12/10/22</span></h1>
                <ul className="text-dark">
                    <li className="font-bold"> * Mejoras</li>
                    <li> Se realizó una actualización en el módulo de consultar, lo que mejoró el tiempo de carga de los vales y mejora en los filtros de búsqueda. </li>
                    <li> Se agregó mensaje a la hora de generar vales relacionado a los préstamos. </li>
                    <li className="font-bold"> * Correción de errores</li>
                    <li> Se corrigió un error en el dashboard que no mostraba el grafico correctamente</li>
                    
                </ul>
            </div>
            <Divider/>
            <div>
                <h1 className="text-primary text-lg font-bold">Actualización <span>13/09/22</span></h1>
                <ul className="text-dark">
                    <li>Se ajustó validaciones sobre los cuadros de comentarios en algunas secciones, ya que permitía enviarlos vacíos.</li>
                    <li>Se ajustó una validación a la hora de cancelar un insumo, no se cerraba correctamente el vale cuando ya había insumos "Entregados" </li>
                </ul>
            </div>
            <Divider/>
            <div>
                <h1 className="text-primary text-lg font-bold">Actualización <span>05/09/22</span></h1>
                <ul className="text-dark">
                    <li> Se añadió la posibilidad de prestar insumos. </li>
                    <li>Se corrigieron algunos errores de funcionamiento </li>
                </ul>
            </div>
            <Divider/>
            
        </div>
        
     );
}
 
export default Notas;