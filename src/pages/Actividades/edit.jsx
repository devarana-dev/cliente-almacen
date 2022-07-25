import { Form, Input, Select, Button, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getActividadAction, updateActividadAction } from "../../actions/actividadActions";
import { cleanErrorAction } from "../../actions/globalActions";
import Loading from "../../components/Elements/Loading";
import openNotificationWithIcon from "../../hooks/useNotification";

const EditActividades = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors, editedActividad, isLoading, updated } = useSelector(state => state.actividades);

    const [actividad, setActividad] = useState({
        nombre: "",
        descripcion: "",
        status: "",
    });

    useEffect(() =>{
        if(!editedActividad){
            dispatch(getActividadAction(id))
        }
        setActividad({...editedActividad})
        form.setFieldsValue({...editedActividad})
    // eslint-disable-next-line
    },[editedActividad])

    const handleChange = (e) => {
        setActividad({
            ...actividad,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(updateActividadAction(actividad));
    }

    useEffect(() => {
        displayAlert()
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
    
    if(isLoading) return <Loading />
    if(!editedActividad) return <div>No se encontro la actividad</div>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
            form={form}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Actividad </h1>

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
                label="Descripción"
                name="descripcion"
                rules={[
                    { required: true, message: "Debes ingresar una descripción" },
                ]}
                hasFeedback
            >
                <TextArea name="descripcion"/>
            </Form.Item>
            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                hasFeedback
            >
                <Select placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setActividad({...actividad, status:value})} }>
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
 
export default EditActividades;