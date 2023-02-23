import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import openNotificationWithIcon from "../../hooks/useNotification";
import { createEtapaAction } from "../../actions/etapasActions";
import { getProyectosAction } from "../../actions/proyectosActions";


const initialValues = {
    nombre: "",
    descripcion: "",
}

const CreateEtapas = () => {

    const { created, errors } = useSelector(state => state.etapas);
    const {proyectos} = useSelector(state => state.proyectos)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        dispatch(createEtapaAction(values))
    }

    useEffect(() => {
        dispatch(getProyectosAction())  
        // eslint-disable-next-line
    }, [])

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
                label="Proyecto"
                name="proyectoId"
                rules={[
                    {
                        required: true,
                        message: "Por favor seleccione el proyecto",
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Seleccione el proyecto"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        proyectos.map( proyecto => (
                            <Option key={proyecto.id} value={proyecto.id}>{proyecto.nombre}</Option>
                        ))
                    }
                </Select>
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