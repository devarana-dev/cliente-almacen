

import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import openNotificationWithIcon from "../../hooks/useNotification";
import { createProyectoAction } from "../../actions/proyectosActions";


const initialValues = {
    nombre: "",
    descripcion: "",
}

const CreateProyectos = () => {

    const { created, errors } = useSelector(state => state.proyectos);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        dispatch(createProyectoAction(values))
    }

    useEffect(() => {
        if(created){
            openNotificationWithIcon('success', 'Proyecto creada correctamente')
            form.resetFields();
            navigate('/proyectos')
        }
        if(errors){
            openNotificationWithIcon('error', 'Error al crear proyecto')
        }
        // eslint-disable-next-line
    }, [created, errors])  


    return (
    <>
        <Form
            className="max-w-screen-md mx-auto pt-2 pb-24"
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    {
                        required: true,
                        message: "Por favor ingrese el nombre de la proyecto",
                    },
                ]} 
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Clave"
                name="clave"
                rules={[
                    {
                        required: true,
                        message: "Por favor ingrese la clave de la proyecto",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <div className="justify-between flex">
                <Button type="default" htmlType="button" onClick={ () => navigate(-1)}> Cancelar </Button>
                <Button type="ghost" htmlType="submit"> Guardar </Button>
            </div>
        </Form>

    </>
    );
}
 
export default CreateProyectos;