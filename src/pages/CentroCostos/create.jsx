import { Form, Input, Select, Button, notification, TextArea } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCentroCostoAction } from "../../actions/centroCostoActions";

const CreateCentroCosto = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors } = useSelector(state => state.centroCosto);

    const [centroCosto, setCentroCosto] = useState({
        nombre: "",
        status: true,
        nombreCorto: "",
    });
    const {nombre, nombreCorto, status} = centroCosto

    const handleChange = (e) => {
        setCentroCosto({
            ...centroCosto,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(createCentroCostoAction(centroCosto));

        if(!errors){                
            notification.success({
                message: "CentroCosto creada",
                description: "La centroCosto o prototipo han sido creados correctamente",
                duration: 2,
            });
            navigate("/centros-costo");
        }
    }
    
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Nueva CentroCosto / Prototipo </h1>

            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    { required: true, message: "Debes ingresar un nombre" },
                ]}
                hasFeedback
            >
                <Input value={nombre} name="nombre" />
            </Form.Item>
            <Form.Item
                label="Nombre Corto"
                name="nombreCorto"
                rules={[
                    { required: true, message: "Debes ingresar una descripción" },
                ]}
                hasFeedback
            >
                <TextArea value={nombreCorto} name="nombreCorto"/>
            </Form.Item>

            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                
                initialValue={status}
            >
                <Select value={status} placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setCentroCosto({...centroCosto, status:value})} }>
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option> 
                </Select>
            </Form.Item>

            <Form.Item className="py-5">
                <div className="flex justify-between">
                    <Button type="dark" onClick={ () => navigate(-1)}>
                        Cancelar
                    </Button>  
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>  
                </div>
            </Form.Item>

        </Form>
     );
}
 
export default CreateCentroCosto;