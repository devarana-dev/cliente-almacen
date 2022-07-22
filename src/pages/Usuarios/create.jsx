import { Form, Input, Select, Button, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRolesAction } from "../../actions/roleActions";
import { createUsuarioAction } from "../../actions/usuarioActions";
import { AntdNotification } from "../../components/Elements/Notification";
import openNotificationWithIcon  from '../../hooks/useNotification'

const CreateUsuario = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;

    const { errors, isLoading, created } = useSelector(state => state.usuarios);
    const { roles } = useSelector(state => state.roles);
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        tipoUsuario_id: "",
        puesto:  "",
    });
    const {nombre, apellidoPaterno, apellidoMaterno, email, telefono, tipoUsuario_id, puesto} = usuario


    useEffect(() => {
        dispatch(getAllRolesAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        displayAlert()
    }, [errors, created])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
        }
        if(created){
            openNotificationWithIcon('success', 'El usuario ha sido creado correctamente')
            navigate('/usuarios')
        }
    }

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    }


    const handleSubmit = () => {
        dispatch(createUsuarioAction(usuario))
    }

   
    return (

        <>
            <Form 
                className="max-w-screen-md mx-auto" 
                onFinish={handleSubmit}
                layout="vertical"
                onChange={handleChange}
                >
                <h1 className="text-center text-2xl font-bold text-dark"> Nuevo Usuario </h1>

                <Form.Item 
                    label="Nombre" 
                    name="nombre" 
                    rules={[
                        { required: true, message : 'Debes ingresar un nombre' },
                    ]} 
                    hasFeedback>
                    <Input name="nombre" value={nombre}/>
                </Form.Item>

                <Form.Item 
                    label="Apellido Paterno" 
                    name="apellidoPaterno" 
                    rules={[
                        { required: true, message: 'Debes ingresar un apellido paterno' },
                    ]} 
                    hasFeedback>
                    <Input name="apellidoPaterno" value={apellidoPaterno}/>
                </Form.Item>

                <Form.Item 
                    label="Apellido Materno" 
                    name="apellidoMaterno" 
                    rules={[
                        { required: true, message: 'Debes ingresar un apellido materno' },
                    ]} 
                    hasFeedback>   
                    <Input name="apellidoMaterno" value={apellidoMaterno}/>
                </Form.Item>

                <Form.Item 
                    label="Email" 
                    name="email" 
                    rules={[
                        { required: true, message: 'Debes ingresar un email', type: 'email' },
                    ]} 
                    hasFeedback> 

                <Input name="email" type="email" value={email}/>                   
                </Form.Item>
                <Form.Item 
                    label="Telefono" 
                    name="telefono" 
                    rules={[
                        { required: true, message: 'Debes ingresar un telefono', type: 'tel' },
                    ]} 
                    hasFeedback> 

                <Input name="telefono" type="telefono" value={telefono}/>                   
                </Form.Item>

                <Form.Item 
                    label="Puesto" 
                    name="puesto" 
                    rules={[
                        { required: true, message: 'Debes seleccionar un puesto' },
                    ]}
                    hasFeedback
                    >
                    <Input name="puesto" value={puesto}/>
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
                        value={tipoUsuario_id}
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
                            Cancelar
                        </Button>  
                        <Button type="primary" className="" htmlType="submit">
                            Guardar
                        </Button>  
                    </div>
                </Form.Item>
            </Form>
        </>
        );
}
 
export default CreateUsuario;