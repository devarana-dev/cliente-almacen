import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import openNotificationWithIcon from "../../hooks/useNotification";
import { cleanEtapaAction, getEtapaAction, updateEtapaAction } from "../../actions/etapasActions";

const EditEtapas = () => {

    const { updated, errors, editedEtapa } = useSelector(state => state.etapas);

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