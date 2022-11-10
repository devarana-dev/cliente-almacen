import { Spin } from "antd";
import "../../assets/scss/loading.scss";

export default function Loading({text =" Cargando..."}) {
    return (
        <div className="flex m-auto">
            <Spin tip={text} className='mt-5 mx-auto text-dark'/>
        </div>


    )
};
