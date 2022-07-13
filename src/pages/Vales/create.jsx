import { Steps } from 'antd';
import { useState } from 'react';
import InformacionGral from './create_step_one';
import ListaInsumos from './create_step_two';


const CreateValesSalida = () => {

    const { Step } = Steps;
    const [current, setCurrent] = useState(0);
    const [vale, setVale] = useState({
        almacenId: 4,
        listaInsumos: [],
        statusVale: 1
    });

    return ( 
        <div className="max-w-2xl w-full mx-auto">
            <h1 className="text-center text-2xl font-bold text-dark pb-3">Vale de salida</h1>
            
                
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