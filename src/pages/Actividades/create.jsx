import { Form, Input, Select, Button, notification, TextArea } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createActividadAction } from "../../actions/actividadActions";

const CreateActividades = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors } = useSelector(state => state.actividades);

    const [actividad, setActividad] = useState({
        nombre: "",
        status: "",
        descripcion: "",
    });
    const {nombre, descripcion, status} = actividad

    const handleChange = (e) => {
        setActividad({
            ...actividad,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(createActividadAction(actividad));

        if(!errors){                
            notification.success({
                message: "Actividad creada",
                description: "La actividad o prototipo han sido creados correctamente",
                duration: 2,
            });
            navigate("/actividades");
        }
    }
    
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Nueva Actividad / Prototipo </h1>

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
                label="Descripción"
                name="descripcion"
                rules={[
                    { required: true, message: "Debes ingresar una descripción" },
                ]}
                hasFeedback
            >
                <TextArea value={descripcion} name="descripcion"/>
            </Form.Item>

            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                hasFeedback
            >
                <Select value={status} placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setActividad({...actividad, status:value})} }>
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
 
export default CreateActividades;