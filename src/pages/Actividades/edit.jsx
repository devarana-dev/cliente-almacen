import { Form, Input, Select, Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getActividadAction, updateActividadAction } from "../../actions/actividadActions";
import { cleanErrorAction } from "../../actions/globalActions";
import Forbidden from "../../components/Elements/Forbidden";
import Loading from "../../components/Elements/Loading";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const EditActividades = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    

    const { errors, editedActividad, isLoading, updated } = useSelector(state => state.actividades);
    const { userPermission } = useSelector(state => state.permisos);

    useEffect(() =>{
        if(!editedActividad){
            dispatch(getActividadAction(id))
        }
        form.setFieldsValue({...editedActividad})
    // eslint-disable-next-line
    },[editedActividad])


    const handleSubmit = () => {
        const query = form.getFieldsValue();
        query.id = id
        dispatch(updateActividadAction(query));
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
            openNotificationWithIcon('success', 'La actividad ha sido actualizado correctamente')
            navigate('/actividades')
        }
    }

    if(!hasPermission(userPermission, 'editar actividades') && !isLoading ) return <Forbidden/>
    if(isLoading) return <Loading />

    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={handleSubmit}
            layout="vertical"
            form={form}
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    { required: true, message: "Debes ingresar un nombre" },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Tipo de actividad"
                name="type"
                rules={[
                    { required: true, message: "Debes ingresar un tipo" },
                ]}
                hasFeedback
            >
                <Select>
                    <Option value="vales_bitacora">Vales y Bitácora</Option>
                    <Option value="vales">Vales</Option>
                    <Option value="bitacora">Bitácora</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                hasFeedback
            >
                <Select>
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
 
export default EditActividades;