import { Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { createZonaAction } from "../../actions/zonaActions";
import Forbidden from "../../components/Elements/Forbidden";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const CreateZonas = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;

    const { errors, created } = useSelector(state => state.zonas);
    const { userPermission } = useSelector(state => state.permisos);    

    const [zona, setZona] = useState({
        nombre: "",
        status: true,
    });
    const {nombre, status} = zona

    const handleChange = (e) => {
        setZona({
            ...zona,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(createZonaAction(zona));
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
            openNotificationWithIcon('success', 'La zona ha sido creada correctamente')
            navigate('/zonas')
        }
    }
    if(!hasPermission(userPermission, 'crear zonas')) return <Forbidden/>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
        >

            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    { required: true, message: "Debes ingresar un nombre" },
                ]}
                hasFeedback
            >
                <Input value={nombre} name="nombre" />
            </Form.Item>

            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                initialValue={status}
            >
                <Select value={status} placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setZona({...zona, status:value})} }>
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
 
export default CreateZonas;