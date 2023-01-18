import { Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEmpresaAction } from "../../actions/empresaActions";
import { cleanErrorAction } from "../../actions/globalActions";
import Forbidden from "../../components/Elements/Forbidden";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const CreateEmpresa = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { Option } = Select;
    const { errors, created } = useSelector(state => state.empresas);
    const { userPermission } = useSelector(state => state.permisos);

    const handleSubmit = () => {
        dispatch(createEmpresaAction(form.getFieldsValue()));
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
            navigate('/empresas')
        }
    }

    if(!hasPermission(userPermission, 'crear empresas')) return <Forbidden/>
    
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            form={form}
        >
            <Form.Item
                label="Nombre Completo"
                name="nombreCompleto"
                rules={[
                    { required: true, message: "Debes ingresar un nombre completo" },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Nombre Corto"
                name="nombreCorto"
                rules={[
                    { required: true, message: "Debes ingresar un nombre corto" },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="RFC"
                name="rfc"
                rules={[
                    { required: true, message: "Debes ingresar un RFC" },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Dirección"
                name="direccion"
                rules={[
                    { required: true, message: "Debes ingresar una dirección" },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item  
                label="Teléfono"
                name="telefono"
                rules={[
                    { required: true, message: "Debes ingresar un teléfono" },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="status"
                label="Estatus"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                hasFeedback
            >
                <Select  placeholder="Selecciona un estatus">
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option> 
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
 
export default CreateEmpresa;