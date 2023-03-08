import { Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createActividadAction } from "../../actions/actividadActions";
import { cleanErrorAction } from "../../actions/globalActions";
import Forbidden from "../../components/Elements/Forbidden";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const initialValues = {
    nombre: "",
    status: true,
    type: "vales_bitacora",
};

const CreateActividades = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;
    const [form] = Form.useForm();

    const { errors, created } = useSelector(state => state.actividades);
    const { userPermission } = useSelector(state => state.permisos);

    const handleSubmit = () => {
        const query = form.getFieldsValue();
        dispatch(createActividadAction(query));
    }

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, created])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
            dispatch( cleanErrorAction() )
        }
        if(created){
            openNotificationWithIcon('success', 'La actividad ha sido creada correctamente')
            navigate('/actividades')
        }
    }

    if(!hasPermission(userPermission, 'crear actividades')) return <Forbidden/>
    

    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={handleSubmit}
            layout="vertical"
            form={form}
            initialValues={initialValues}
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    { required: true, message: "Debes ingresar un nombre" },
                ]}
                hasFeedback
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Categoría"
                name="type"
                hasFeedback                
            >
                <Select>
                    <Option value="vales_bitacora">Vales y Bitácora</Option>
                    <Option value="vales">Vales</Option>
                    <Option value="bitacora">Bitácora</Option>
                </Select>
            </Form.Item>

            <Form.Item className="py-5">
                <div className="flex justify-between">
                    <Button type="default" onClick={ () => navigate(-1)}>
                        Cancelar
                    </Button>  
                    <Button type="ghost" htmlType="submit">
                        Guardar
                    </Button>  
                </div>
            </Form.Item>

        </Form>
     );
}
 
export default CreateActividades;