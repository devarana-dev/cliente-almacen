import { Spin } from "antd";
import "../../assets/scss/loading.scss";

export default function Loading() {
    return (
        <div className="flex m-auto">
            <Spin tip='Cargando...' className='mt-5 mx-auto text-dark'/>
        </div>


    )
};
