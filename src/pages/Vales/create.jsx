import { useState } from 'react';
import InformacionGral from './create_step_one';
import ListaInsumos from './create_step_two';
import Logotipo from "../../assets/img/LogoDevarana.png"

const CreateValesSalida = () => {

    const [current, setCurrent] = useState(0);
    const [vale, setVale] = useState({
        almacenId: 4,
        listaInsumos: [],
        statusVale: 1,
    });

    return ( 
        <div className="max-w-2xl w-full mx-auto sm:px-10 px-1">
            <img src={Logotipo} alt="" className='mx-auto block md:hidden max-w-full py-2'/>
            <h1 className='text-center text-dark text-3xl font-bold pt-5 uppercase hidden md:block'> Vales de Salida</h1>
            
                
            <div className={`${current !== 0 ? 'hidden' : 'block '}`}>
                <InformacionGral current={current} setCurrent={setCurrent} setVale={setVale} vale={vale} />
            </div>
            <div className={`${current !== 1 ? 'hidden' : 'block '}`}>
                <ListaInsumos current={current} setCurrent={setCurrent} setVale={setVale} vale={vale} />
            </div>
        </div>
    );
}
 
export default CreateValesSalida;