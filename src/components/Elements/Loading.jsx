import { Spin } from "antd";
import "../../assets/scss/loading.scss";

export default function Loading({text =" Cargando..."}) {
    return (
        <div className="flex m-auto flex-col">
            <Spin className='mt-5 mx-auto text-dark'/>
            <span className="text-dark text-center mt-5">{text}</span>
        </div>


    )
};
