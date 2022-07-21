import { Form, Input, Select, Button, notification } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createZonaAction } from "../../actions/zonaActions";

const CreateZonas = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;

    const { errors } = useSelector(state => state.zonas);

    const [zona, setZona] = useState({
        nombre: "",
        status: true,
    });
    const {nombre, status} = zona

    const handleChange = (e) => {
        setZona({
            ...zona,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(createZonaAction(zona));

        if(!errors){                
            notification.success({
                message: "Zona creada",
                description: "La zona o prototipo han sido creados correctamente",
                duration: 2,
            });
            navigate("/zonas");
        }
    }
    
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Nueva Zona / Prototipo </h1>

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
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                initialValue={status}
            >
                <Select value={status} placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setZona({...zona, status:value})} }>
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
 
export default CreateZonas;