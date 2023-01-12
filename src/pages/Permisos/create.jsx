import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { createPermisoAction, resetPermisionStateAction } from "../../actions/permisosActions";

import openNotificationWithIcon from "../../hooks/useNotification";
import { removeAccentsAndLowercase } from "../../utils/removeSpecialChars";

const CreatePermisos = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { errors, created } = useSelector( state => state.permisos )
   


    const handleSubmit = () => {
        dispatch(createPermisoAction(form.getFieldsValue()));
    }

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
        return () => dispatch(resetPermisionStateAction())
    }, [errors, created])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
            dispatch( cleanErrorAction() )
        }
        if(created){
            openNotificationWithIcon('success', 'Permiso creado correctamente')
            navigate('/permisos')
        }
    }

    const purify = (e) => {
        const result = removeAccentsAndLowercase(e)
        form.setFieldsValue({permisos: result})
    }
    

    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            form={form}
        >

            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    { required: true, message: "Debes ingresar un nombre" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Permiso"
                name="permisos"
                rules={[
                    { required: true, message: "Debes ingresar un permiso" },
                ]}
            >
                <Input 
                    onChange={purify}
                />
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
 
export default CreatePermisos;