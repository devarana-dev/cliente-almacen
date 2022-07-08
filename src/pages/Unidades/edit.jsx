import { Form, Input, Select, Button, notification, TextArea } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getUnidadAction, updateUnidadAction } from "../../actions/unidadActions";

const EditUnidades = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors, editedUnidad, isLoading } = useSelector(state => state.unidades);
    const [unidad, setUnidad] = useState({
        nombre: "",
        nombreCorto: "",
        status: "",
    });

    useEffect(() =>{
        if(!editedUnidad){
            dispatch(getUnidadAction(id))
        }
        setUnidad({...editedUnidad})
        form.setFieldsValue({...editedUnidad})
    },[editedUnidad])

    const handleChange = (e) => {
        setUnidad({
            ...unidad,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        console.log(unidad);
        dispatch(updateUnidadAction(unidad));

        if(!errors){
                notification.success({
                    message: "Unidad actualizado",
                    description: "El unidad ha sido actualizado correctamente",
                    duration: 2,
                });
            }
        navigate("/unidades");
    }
    
    if(isLoading) return <div>Cargando...</div>
    if(!editedUnidad) return <div>No se encontro el unidad</div>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
            form={form}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Unidad </h1>

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
                label="Nombre Corto"
                name="nombreCorto"
                rules={[
                    { required: true, message: "Debes ingresar un nombreCorto" },
                ]}
                hasFeedback
            >
                <Input name="nombreCorto" />
            </Form.Item>
            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                
            >
                <Select placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setUnidad({...unidad, status:value})} }>
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
 
export default EditUnidades;