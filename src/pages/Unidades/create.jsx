import { Form, Input, Select, Button, notification, TextArea } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUnidadAction } from "../../actions/unidadActions";

const CreateUnidades = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors } = useSelector(state => state.unidades);

    const [unidad, setUnidad] = useState({
        nombre: "",
        nombreCorto: "",
        status: true,
    });
    const {nombre, nombreCorto, status} = unidad

    const handleChange = (e) => {
        setUnidad({
            ...unidad,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(createUnidadAction(unidad));

        if(!errors){                
            notification.success({
                message: "Unidad creado",
                description: "El unidad ha sido creado correctamente",
                duration: 2,
            });
            navigate("/unidades");
        }
    }
    
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Nuevo Unidad </h1>

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
                label="Nombre corto"
                name="nombreCorto"
                rules={[
                    { required: true, message: "Debes ingresar un nombre corto" },
                ]}
                hasFeedback
            >
                <Input value={nombreCorto} name="nombreCorto" />
            </Form.Item>

            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                initialValue={status}
            >
                <Select value={status} placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setUnidad({...unidad, status:value})} }>
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
 
export default CreateUnidades;