import { Form, Input, Select, Button, notification, TextArea } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getZonaAction, updateZonaAction } from "../../actions/zonaActions";

const EditZonas = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors, editedZona, isLoading } = useSelector(state => state.zonas);

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
    },[editedZona])

    const handleChange = (e) => {
        setZona({
            ...zona,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        console.log(zona);
        dispatch(updateZonaAction(zona));

        if(!errors){
                notification.success({
                    message: "Zona actualizada",
                    description: "La zona se ha sido actualizado correctamente",
                    duration: 2,
                });
            }
        navigate("/zonas");
    }
    
    if(isLoading) return <div>Cargando...</div>
    if(!editedZona) return <div>No se encontro la Zona</div>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
            form={form}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Zona </h1>

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