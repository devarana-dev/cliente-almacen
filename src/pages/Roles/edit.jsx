import { Form, Input, Select, Button, notification, TextArea } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { createRoleAction, getRoleAction, updateRoleAction } from "../../actions/roleActions";

const EditRoles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors, editedRole, isLoading } = useSelector(state => state.roles);

    const [role, setRole] = useState({
        nombre: "",
        descripcion: "",
        status: "",
    });

    useEffect(() =>{
        if(!editedRole){
            dispatch(getRoleAction(id))
        }
        setRole({...editedRole})
        form.setFieldsValue({...editedRole})
    },[editedRole])

    const handleChange = (e) => {
        setRole({
            ...role,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        console.log(role);
        dispatch(updateRoleAction(role));

        if(!errors){
                notification.success({
                    message: "Rol actualizado",
                    description: "El rol ha sido actualizado correctamente",
                    duration: 2,
                });
            }
        navigate("/roles");
    }
    
    if(isLoading) return <div>Cargando...</div>
    if(!editedRole) return <div>No se encontro el rol</div>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
            form={form}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Rol </h1>

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
                
            >
                <Select placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setRole({...role, status:value})} }>
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
 
export default EditRoles;