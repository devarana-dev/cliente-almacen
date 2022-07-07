import { Form, Input, Select, Button, notification, TextArea } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getCentroCostoAction, updateCentroCostoAction } from "../../actions/centroCostoActions";

const EditCentroCosto = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors, editedCentroCosto, isLoading } = useSelector(state => state.centroCosto);

    const [centroCosto, setCentroCosto] = useState({
        nombre: "",
        descripcion: "",
        status: "",
    });

    useEffect(() =>{
        if(!editedCentroCosto){
            dispatch(getCentroCostoAction(id))
        }
        setCentroCosto({...editedCentroCosto})
        form.setFieldsValue({...editedCentroCosto})
    },[editedCentroCosto])

    const handleChange = (e) => {
        setCentroCosto({
            ...centroCosto,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        console.log(centroCosto);
        dispatch(updateCentroCostoAction(centroCosto));

        if(!errors){
                notification.success({
                    message: "Centro de costo actualizado",
                    description: "El centro de costo ha sido actualizado correctamente",
                    duration: 2,
                });
            }
        navigate("/centros-costo");
    }
    
    if(isLoading) return <div>Cargando...</div>
    if(!editedCentroCosto) return <div>No se encontro el centro de costo</div>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
            form={form}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Centro de Costo </h1>

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
                    { required: true, message: "Debes ingresar una descripción" },
                ]}
                hasFeedback
            >
                <Input name="nombreCorto"/>
            </Form.Item>
            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
            >
                <Select placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setCentroCosto({...centroCosto, status:value})} }>
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
 
export default EditCentroCosto;