import { Divider } from "antd";

const Notas = () => {
    return ( 
        <div className="max-h-[600px] overflow-y-auto">

            <div className="">
                <h1 className="text-primary text-lg font-bold">Actualización <span>13/09/22</span></h1>
                <ul className="text-dark">
                    <li>Se ajustó validaciones sobre los cuadros de comentarios en algunas secciones, ya que permitía enviarlos vacíos.</li>
                    <li>Se ajustó una validación a la hora de cancelar un insumo, no se cerraba correctamente el vale cuando ya había insumos "Entregados" </li>
                </ul>
            </div>
            <Divider/>
            <div className="">
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