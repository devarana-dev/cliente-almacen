import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import openNotificationWithIcon from "../../hooks/useNotification";
import { cleanProyectoAction, getProyectoAction, updateProyectoAction } from "../../actions/proyectosActions";

const EditProyectos = () => {

    const { updated, errors, editedProyecto } = useSelector(state => state.proyectos);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    

    const [form] = Form.useForm();

    const handleSubmit = () => {
        const id = editedProyecto.id
        const proyecto = form.getFieldsValue()
        proyecto.id = id  
        dispatch(updateProyectoAction(proyecto))
    }


    useEffect(() => {
        dispatch(getProyectoAction(id))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(editedProyecto){
            form.setFieldsValue({...editedProyecto})
        }
        // eslint-disable-next-line
    }, [editedProyecto])

    useEffect(() => {
        if(updated){
            openNotificationWithIcon('success', 'Proyecto actualizada correctamente')
            form.resetFields();
            navigate('/proyectos')
        }
        if(errors){
            openNotificationWithIcon('error', 'Error al actualizar proyecto')
        }

        return () => dispatch(cleanProyectoAction())
        
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
 
export default EditProyectos;