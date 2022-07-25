import { Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { getAllRolesAction } from "../../actions/roleActions";
import { getUsuarioAction, updateUsuarioAction } from "../../actions/usuarioActions";
import Loading from "../../components/Elements/Loading";
import openNotificationWithIcon from "../../hooks/useNotification";

const EditUsuario = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { Option } = Select;
    const {id} = useParams()
    const [form] = Form.useForm();

    const { editedUsuario, isLoading, errors, updated } = useSelector(state => state.usuarios);
    const { roles } = useSelector(state => state.roles);

    useEffect(() => {
        dispatch(getAllRolesAction())

        if(!editedUsuario){
            dispatch(getUsuarioAction(id))
        }

        setUsuario({...editedUsuario})
        form.setFieldsValue({...editedUsuario})
        // eslint-disable-next-line
    }, [editedUsuario])

    useEffect(() => {
        displayAlert()
    }, [errors, updated])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
            dispatch( cleanErrorAction() )
        }
        if(updated){
            openNotificationWithIcon('success', 'El usuario ha sido actualizado correctamente')
            navigate('/usuarios')
        }
    }

    const [usuario, setUsuario] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        tipoUsuario_id: "",
        puesto:  "",
    });


    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    }


    const handleSubmit = () => {
        dispatch(updateUsuarioAction(usuario));
    }

    if(isLoading) return <Loading />
    if(!editedUsuario) return <div>No se encontro el personal</div>

    
    return (

        <Form 
            className="max-w-screen-md mx-auto" 
            onFinish={handleSubmit}
            layout="vertical"
            onChange={handleChange}
            form={form}
            >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Usuario </h1>

            <Form.Item 
                label="Nombre" 
                name="nombre" 
                rules={[
                    { required: true, message : 'Debes ingresar un nombre' },
                ]} 
                hasFeedback>
                <Input name="nombre" />
            </Form.Item>

            <Form.Item 
                label="Apellido Paterno" 
                name="apellidoPaterno" 
                rules={[
                    { required: true, message: 'Debes ingresar un apellido paterno' },
                ]} 
                hasFeedback>
                <Input name="apellidoPaterno" />
            </Form.Item>

            <Form.Item 
                label="Apellido Materno" 
                name="apellidoMaterno" 
                rules={[
                    { required: true, message: 'Debes ingresar un apellido materno' },
                ]} 
                hasFeedback>   
                <Input name="apellidoMaterno" />
            </Form.Item>

            <Form.Item 
                label="Email" 
                name="email" 
                rules={[
                    { required: true, message: 'Debes ingresar un email', type: 'email' },
                ]} 
                hasFeedback> 

               <Input name="email" type="email" />                   
            </Form.Item>
            <Form.Item 
                label="Telefono" 
                name="email" 
                rules={[
                    { required: true, message: 'Debes ingresar un teléfono', },
                ]} 
                hasFeedback> 

               <Input name="telefono" type="tel" />                   
            </Form.Item>

            <Form.Item 
                label="Puesto" 
                name="puesto" 
                rules={[
                    { required: true, message: 'Debes seleccionar un puesto' },
                ]}
                hasFeedback
                >
                <Input name="puesto" />
            </Form.Item>

            <Form.Item 
                label="Tipo Usuario" 
                name="tipoUsuario_id" 
                rules={[
                    { required: true, message: 'Debes seleccionar un tipo de usuario' },
                ]} 
                hasFeedback>
                <Select 
                    placeholder="Selecciona un tipo de usuario"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                    onChange={ (value) => { setUsuario({...usuario, tipoUsuario_id:value})} }
                >
                    {
                        roles.map(role => (
                            <Option key={role.id} value={role.id}>{role.nombre}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
                
            

            <Form.Item className="py-5">
                <div className="flex justify-between">
                    <Button type="dark" onClick={ () => navigate(-1)}>
                        Volver
                    </Button>  
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>  
                    {/* <Button type="ghost" onClick={ () => navigate(-1)}>
                        Secondary
                    </Button>  
                    <Button type="danger" htmlType="submit">
                        Danger
                    </Button>  
                    <Button type="warning" htmlType="submit">
                        Warning
                    </Button>  
                    <Button type="dark" htmlType="submit">
                        Cancelar
                    </Button>   */}
                </div>
            </Form.Item>
        </Form>
        );
}
 
export default EditUsuario;