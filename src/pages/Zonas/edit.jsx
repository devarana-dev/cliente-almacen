import { Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { getZonaAction, updateZonaAction } from "../../actions/zonaActions";
import Forbidden from "../../components/Elements/Forbidden";
import Loading from "../../components/Elements/Loading";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const EditZonas = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;

    const { errors, editedZona, isLoading, updated } = useSelector(state => state.zonas);
    const { userPermission } = useSelector(state => state.permisos);    

    const [zona, setZona] = useState({
        nombre: "",
        status: "",
    });

    useEffect(() =>{
        if(!editedZona){
            dispatch(getZonaAction(id))
        }
        setZona({...editedZona})
        form.setFieldsValue({...editedZona})
    // eslint-disable-next-line
    },[editedZona])

    const handleChange = (e) => {
        setZona({
            ...zona,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(updateZonaAction(zona));
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
            openNotificationWithIcon('success', 'La zona se ha sido actualizado correctamente')
            navigate('/zonas')
        }
    }
     if(!hasPermission(userPermission, 'editar zonas')) return <Forbidden/>
    if(isLoading) return <Loading />
    if(!editedZona) return <div>No se encontro la Zona</div>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
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
                <Input name="nombre" />
            </Form.Item>
            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                
            >
                <Select placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setZona({...zona, status:value})} }>
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option> 
                </Select>
            </Form.Item>

            <Form.Item className="py-5">
                <div className="flex justify-between">
                    <Button type="dark" onClick={ () => navigate(-1)}>
                        Cancelar
                    </Button>  
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>  
                </div>
            </Form.Item>

        </Form>
     );
}
 
export default EditZonas;