import { Form, Input, Select, Button, notification, TextArea } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getNivelAction, updateNivelAction } from "../../actions/nivelActions";

const EditNiveles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors, editedNivel, isLoading } = useSelector(state => state.niveles);

    console.log(editedNivel)
    const [nivel, setNivel] = useState({
        nombre: "",
        status: "",
    });

    useEffect(() =>{
        if(!editedNivel){
            dispatch(getNivelAction(id))
        }
        setNivel({...editedNivel})
        form.setFieldsValue({...editedNivel})
    },[editedNivel])

    const handleChange = (e) => {
        setNivel({
            ...nivel,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        console.log(nivel);
        dispatch(updateNivelAction(nivel));

        if(!errors){
                notification.success({
                    message: "Nivel actualizado",
                    description: "El nivel ha sido actualizado correctamente",
                    duration: 2,
                });
            }
        navigate("/niveles");
    }
    
    if(isLoading) return <div>Cargando...</div>
    if(!editedNivel) return <div>No se encontro el nivel</div>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
            form={form}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Nivel </h1>

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
                <Select placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setNivel({...nivel, status:value})} }>
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
 
export default EditNiveles;