import { Divider } from "antd";

const Notas = () => {
    return ( 
        <div className="max-h-[600px] overflow-y-auto">

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