import { Form, Input, Select, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { getAllRolesAction } from "../../actions/roleActions";
import { createUsuarioAction } from "../../actions/usuarioActions";
import Forbidden from "../../components/Elements/Forbidden";
import openNotificationWithIcon  from '../../hooks/useNotification'
import { hasPermission } from "../../utils/hasPermission";

const CreateUsuario = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;

    const { errors, created } = useSelector(state => state.usuarios);
    const { roles } = useSelector(state => state.roles);
    const { userPermission } = useSelector(state => state.permisos);

    const [esInterno, setEsInterno] = useState(true)

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getAllRolesAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        !esInterno && message.info({ content: 'Los usuarios externos requieren contraseña', duration: 3, key: 'info' })
    }, [esInterno])

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
            openNotificationWithIcon('success', 'El usuario ha sido creado correctamente')
            form.resetFields()
            navigate('/usuarios')
        }
    }


    const handleSubmit = () => {

        const usuario = { ...form.getFieldsValue(), esInterno }
        dispatch(createUsuarioAction(usuario))
    }

    if(!hasPermission(userPermission, 'crear usuarios')) return <Forbidden/>

    return (
        <>
            <Form 
                className="max-w-screen-md mx-auto" 
                onFinish={handleSubmit}
                layout="vertical"
                form={form}
                >

                <Form.Item 
                    label="Nombre" 
                    name="nombre" 
                    rules={[
                        { required: true, message : 'Debes ingresar un nombre' },
                    ]} 
                    hasFeedback>
                    <Input name="nombre"/>
                </Form.Item>

                <Form.Item 
                    label="Apellido Paterno" 
                    name="apellidoPaterno" 
                    rules={[
                        { required: true, message: 'Debes ingresar un apellido paterno' },
                    ]} 
                    hasFeedback>
                    <Input name="apellidoPaterno"/>
                </Form.Item>

                <Form.Item 
                    label="Apellido Materno" 
                    name="apellidoMaterno" 
                    rules={[
                        { required: true, message: 'Debes ingresar un apellido materno' },
                    ]} 
                    hasFeedback>   
                    <Input name="apellidoMaterno"/>
                </Form.Item>

                <Form.Item 
                    label="Email" 
                    name="email" 
                    rules={[
                        { required: true, message: 'Debes ingresar un email', type: 'email' },
                    ]} 
                    hasFeedback
                    // onchange si el correo validado con regex no es igual a devarana.mx entonces esInterno = true
                > 

                <Input name="email" type="email" onBlur={
                    (e) => {
                        const isDevarana = /^[a-zA-Z0-9._-]+@devarana\.mx$/.test(e.target.value);
                        if(isDevarana){
                            setEsInterno(true)
                            form.setFieldsValue({
                                tipoUsuario_id: undefined
                            })
                        }else{
                            setEsInterno(false)
                            form.setFieldsValue({
                                tipoUsuario_id: roles.filter(role => {
                                    const regex = /externo/gi
                                    return regex.test(role.nombre)
                                })[0].id
                            })
                        }
                    }
                }/>
                </Form.Item>
                {
                    !esInterno ? (
                        <Form.Item
                            label="Contraseña"
                            name="password"
                            rules={[
                                { required: true, message: 'Usuarios externos requieren contraseña' },
                            ]}
                            hasFeedback
                        >
                            <Input.Password/>
                        </Form.Item>
                    ) : null 
                }
                <Form.Item 
                    label="Telefono" 
                    name="telefono" 
                    rules={[
                        { required: true, message: 'Debes ingresar un telefono', type: 'tel' },
                    ]} 
                    hasFeedback> 

                <Input name="telefono" type="telefono"/>                   
                </Form.Item>

                <Form.Item 
                    label="Puesto" 
                    name="puesto" 
                    rules={[
                        { required: true, message: 'Debes seleccionar un puesto' },
                    ]}
                    hasFeedback
                    >
                    <Input name="puesto"/>
                </Form.Item>

                <Form.Item 
                    label="Tipo Usuario" 
                    name="tipoUsuario_id" 
                    rules={[
                        { required: true, message: 'Debes seleccionar un tipo de usuario' },
                    ]} 
                    >
                    <Select 
                        placeholder="Selecciona un tipo de usuario"
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        showSearch
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
                        <Button type="default" onClick={ () => navigate(-1)}>
                            Cancelar
                        </Button>  
                        <Button type="ghost" className="" htmlType="submit">
                            Guardar
                        </Button>  
                    </div>
                </Form.Item>
            </Form>
        </>
        );
}
 
export default CreateUsuario;