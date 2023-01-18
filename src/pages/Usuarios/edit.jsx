import { Form, Input, Select, Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { getAllRolesAction } from "../../actions/roleActions";
import { getUsuarioAction, updateUsuarioAction } from "../../actions/usuarioActions";
import Forbidden from "../../components/Elements/Forbidden";
import Loading from "../../components/Elements/Loading";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";
import { getAllEmpresaAction } from "../../actions/empresaActions";

const EditUsuario = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { Option } = Select;
    const {id} = useParams()
    const [form] = Form.useForm();

    const { editedUsuario, isLoading, errors, updated } = useSelector(state => state.usuarios);
    const { roles } = useSelector(state => state.roles);
    const { empresas } = useSelector(state => state.empresas);
    const { userPermission } = useSelector(state => state.permisos);


    useEffect(() => {
        dispatch(getAllRolesAction())
        dispatch(getAllEmpresaAction())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(!editedUsuario){
            dispatch(getUsuarioAction(id))
        }
        // eslint-disable-next-line
    }, [editedUsuario])

    useEffect(() => {
        form.setFieldsValue({...editedUsuario})
        // first
        form.setFieldsValue({ empresa: editedUsuario?.empresas?.map(empresa => empresa.id) })
        // eslint-disable-next-line
    }, [editedUsuario])

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, updated])

    console.log(form.getFieldsValue());

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

    const handleSubmit = () => {
        const usuario = { ...form.getFieldsValue(), id }
        // console.log(usuario);
        dispatch(updateUsuarioAction(usuario));
    }

    if(!hasPermission(userPermission, 'editar usuarios') && !isLoading ) return <Forbidden/>
    
    if(isLoading) return <Loading />
    if(!editedUsuario) return <div>No se encontro el usuario</div>

    
    return (

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

               <Input name="email" type="email" onBlur={
                    (e) => {   
                        const isDevarana = /^[a-zA-Z0-9._-]+@devarana\.mx$/.test(e.target.value);
                        if(isDevarana){
                            form.setFieldsValue({esInterno: true})
                        }else{
                            form.setFieldsValue({esInterno: false})
                        }
                    }
                        
               }/>                   
            </Form.Item>
            {
                !form.getFieldValue('esInterno') &&
                    (
                        <>
                            <Form.Item
                                label="Contraseña"
                                name="password"
                                hasFeedback
                            >
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item
                                label="Empresa"
                                name="empresa"
                                rules={[
                                    { required: true, message: 'Debes ingresar una empresa' },
                                ]}
                                hasFeedback
                            >
                                <Select
                                    placeholder="Selecciona una empresa"
                                    allowClear
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }

                                >
                                    {
                                        empresas.map(empresa => (
                                            <Option key={empresa.id} value={empresa.id}>{empresa.nombreCorto}</Option>
                                        ))
                                    }
                            </Select>
                            </Form.Item>
                        </>
                    )
            }
            <Form.Item 
                label="Telefono" 
                name="telefono" 
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
                        Volver
                    </Button>  
                    <Button type="ghost" htmlType="submit">
                        Guardar
                    </Button>  
                </div>
            </Form.Item>
        </Form>
        );
}
 
export default EditUsuario;