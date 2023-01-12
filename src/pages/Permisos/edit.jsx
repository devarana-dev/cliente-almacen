import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { updatePermisoAction, getPermisoAction, resetPermisionStateAction } from "../../actions/permisosActions";
import openNotificationWithIcon from "../../hooks/useNotification";
import { removeAccentsAndLowercase } from "../../utils/removeSpecialChars";

const EditPermisos = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    
    const { errors, editedPermiso, updated} = useSelector( state => state.permisos )

    useEffect(() => {
        if(!editedPermiso){
            dispatch(getPermisoAction(id))
        }
    // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        form.setFieldsValue({
            ...editedPermiso
        })

        return () => dispatch(resetPermisionStateAction())
    // eslint-disable-next-line
    }, [editedPermiso])


    const handleSubmit = () => {
        const permiso = { ...form.getFieldsValue(), id }
        dispatch(updatePermisoAction(permiso));
    }

    

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, updated])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
            dispatch( cleanErrorAction() )
        }
        if(updated){
            openNotificationWithIcon('success', 'El permiso ha sido actualizado correctamente')
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
 
export default EditPermisos;