import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import openNotificationWithIcon from "../../hooks/useNotification";
import { createEtapaAction } from "../../actions/etapasActions";


const initialValues = {
    nombre: "",
    descripcion: "",
}

const CreateEtapas = () => {

    const { created, errors } = useSelector(state => state.etapas);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        dispatch(createEtapaAction(values))
    }

    useEffect(() => {
        if(created){
            openNotificationWithIcon('success', 'Etapa creada correctamente')
            form.resetFields();
            navigate('/etapas')
        }
        if(errors){
            openNotificationWithIcon('error', 'Error al crear etapa')
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
                        message: "Por favor ingrese el nombre de la etapa",
                    },
                ]} 
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Descripción"
                name="descripcion"
                rules={[
                    {
                        required: true,
                        message: "Por favor ingrese la descripción de la etapa",
                    },
                ]}    
            >
                <Input.TextArea />
            </Form.Item>
            <div className="justify-between flex">
                <Button type="default" htmlType="button" onClick={ () => navigate(-1)}> Cancelar </Button>
                <Button type="ghost" htmlType="submit"> Guardar </Button>
            </div>
        </Form>

    </>
    );
}
 
export default CreateEtapas;