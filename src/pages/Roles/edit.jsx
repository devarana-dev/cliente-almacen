import { Form, Input, Select, Button, Modal, Divider, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { getAllPermisosAction } from "../../actions/permisosActions";
import { getRoleAction, updateRoleAction } from "../../actions/roleActions";
import Forbidden from "../../components/Elements/Forbidden";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const EditRoles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors, editedRole, isLoading , updated} = useSelector(state => state.roles);
    const { permisos, userPermission } = useSelector( state => state.permisos )


    const [role, setRole] = useState({
        nombre: "",
        descripcion: "",
        status: "",
        permisos: []
    });

    const [indeterminate, setIndeterminate] = useState(role.permisos);
    const [checkAll, setCheckAll] = useState(false);


    useEffect(() => {
        dispatch(getAllPermisosAction())
        if(!editedRole){
            dispatch(getRoleAction(id))
        }
        setRole({
            ...editedRole,
            permisos: editedRole ? editedRole.permisos.map(item => item.id) : []
        })
        form.setFieldsValue({
            ...editedRole,
            permisos: editedRole ? editedRole.permisos.map(item => item.id) : []
        })

    // eslint-disable-next-line
    },[editedRole])

    const handleChange = (e) => {
        setRole({
            ...role,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(updateRoleAction(role));
    }

    const countDown = () => {
        let secondsToGo = 3;
      
        const modal = Modal.success({
          title: 'Rol Actualizado',
          content: `El navegador cargará los permisos en ${secondsToGo} segundos.`,
          okButtonProps:{ style: {display: "none"}}
        });
      
        const timer = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `El navegador cargará los permisos en ${secondsToGo} segundos.`,
            okButtonProps:{ style: {display: "none"}}
          });
        }, 1000);
      
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
            window.location.reload(true);
        }, secondsToGo * 1000);
    };

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, updated])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
            dispatch( cleanErrorAction() )
        }
        if(updated){
            // openNotificationWithIcon('success', 'El rol ha sido actualizado correctamente')
            navigate('/roles')
            countDown()

            
        }
    }

    useEffect(() => {
        if( role.permisos && role.permisos.length > 0 && permisos.length > role.permisos.length){
            setIndeterminate(true)
        }else{
            setIndeterminate(false)
        }

        if(role.permisos.length === permisos.length){
            setCheckAll(true)
        }

        // eslint-disable-next-line
    }, [role.permisos])
 

    const handleCheck = (e) => {
        const { value, checked } = e.target
        if ( checked ) {
            setRole({
                ...role,
                permisos: role.permisos ? [...role.permisos, value] : [value]
            })
        }
        else {
            setRole({
                ...role,
                permisos: role.permisos.filter((e) => e !== Number(value))
            })
        }

        
    }

    const onCheckAllChange = (e) => {

        const { checked } = e.target

        if(checked){
            setRole({
                ...role,
                permisos: permisos.map( item => item.id)
            })
            setIndeterminate(false)
            setCheckAll(true)
            
        }else{
            setRole({
                ...role,
                permisos: []
            })
            setCheckAll(false)
        }
    }
    
    // if(isLoading) return <Loading />
    if(!hasPermission(userPermission, '/editar-roles') && !isLoading ) return <Forbidden/>
    if(!editedRole) return <div>No se encontro el rol</div>

    
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            
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
                <Input name="nombre" onChange={handleChange}/>
            </Form.Item>

            <Form.Item
                label="Descripción"
                name="descripcion"
                rules={[
                    { required: true, message: "Debes ingresar una descripción" },
                ]}
                hasFeedback
            >
                <TextArea name="descripcion" onChange={handleChange}/>
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

            <>
            <Divider/>
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}> 
                    Seleccionar Todos
                </Checkbox>
                <div className="grid grid-cols-4">
                    <>
                        <div className="col-span-1 py-3">
                            <h2 className="font-bold text-dark text-xl ml-3">Ver</h2>
                        </div>
                        <div className="col-span-1">
                            <h2 className="font-bold text-dark text-xl ml-3">Crear</h2>
                        </div>
                        <div className="col-span-1">
                            <h2 className="font-bold text-dark text-xl ml-3">Editar</h2>
                        </div>
                        <div className="col-span-1">
                            <h2 className="font-bold text-dark text-xl ml-3">Borrar</h2>
                        </div>
                    </>
                </div>
                <Checkbox.Group defaultValue={role.permisos} value={role.permisos} className="w-full"> 
                    <div className="grid grid-cols-4 gap-y-1">
                        {
                            permisos.map ((item, i) => (
                                <Checkbox className="first-of-type:ml-2" checked={role.permisos && role.permisos.includes(item.id)} name="permisos" key={i} value={item.id} onChange={ (e) => handleCheck(e) }> {item.nombre} </Checkbox>
                               
                            ))
                        }
                    </div>
                </Checkbox.Group>
            </>

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