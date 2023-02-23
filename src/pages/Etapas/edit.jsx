import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import openNotificationWithIcon from "../../hooks/useNotification";
import { cleanEtapaAction, getEtapaAction, updateEtapaAction } from "../../actions/etapasActions";
import { getProyectosAction } from "../../actions/proyectosActions";

const EditEtapas = () => {

    const { updated, errors, editedEtapa } = useSelector(state => state.etapas);
    const {proyectos} = useSelector(state => state.proyectos)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    

    const [form] = Form.useForm();

    const handleSubmit = () => {
        const id = editedEtapa.id
        const etapa = form.getFieldsValue()
        etapa.id = id  
        dispatch(updateEtapaAction(etapa))
    }


    useEffect(() => {
        dispatch(getEtapaAction(id))
        dispatch(getProyectosAction())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(editedEtapa){
            form.setFieldsValue({...editedEtapa})
        }
        // eslint-disable-next-line
    }, [editedEtapa])

    useEffect(() => {
        if(updated){
            openNotificationWithIcon('success', 'Etapa actualizada correctamente')
            form.resetFields();
            navigate('/etapas')
        }
        if(errors){
            openNotificationWithIcon('error', 'Error al actualizar etapa')
        }

        return () => dispatch(cleanEtapaAction())
        
        // eslint-disable-next-line
    }, [updated, errors])  

    console.log(form.getFieldsValue());

    return (
    <>
        <Form
            className="max-w-screen-md mx-auto pt-2 pb-24"
            form={form}
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
                    defaultValue={editedEtapa?.proyecto?.id}
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
 
export default EditEtapas;