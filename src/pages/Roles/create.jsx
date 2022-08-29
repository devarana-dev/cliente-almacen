import { Form, Input, Select, Button, Checkbox, Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { getAllPermisosAction } from "../../actions/permisosActions";
import { createRoleAction } from "../../actions/roleActions";
import Forbidden from "../../components/Elements/Forbidden";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const CreateRoles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors, created } = useSelector(state => state.roles);
    const { permisos, userPermission } = useSelector( state => state.permisos )
    
    const [role, setRole] = useState({
        nombre: "",
        descripcion: "",
        status: true,
        permisos: []
    });

    const [indeterminate, setIndeterminate] = useState(role.permisos);
    const [checkAll, setCheckAll] = useState(false);

    const {nombre, descripcion, status} = role
    
    const handleChange = (e) => {
        setRole({
            ...role,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(createRoleAction(role));
    }

    useEffect(() => {
        dispatch(getAllPermisosAction())
        // eslint-disable-next-line
    }, [])

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
            openNotificationWithIcon('success', 'El rol ha sido creado correctamente')
            navigate('/roles')
        }
    }

    useEffect(() => {
        if( role.permisos.length > 0 && permisos.length > role.permisos.length){
            setIndeterminate(true)
        }else{
            setIndeterminate(false)
        }
        // eslint-disable-next-line
    }, [role.permisos])
 

    const handleCheck = (e) => {
        const { value, checked } = e.target
        if ( checked ) {
            setRole({
                ...role,
                permisos: [...role.permisos, value]
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

    if(!hasPermission(userPermission, 'crear roles')) return <Forbidden/>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
        >

            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    { required: true, message: "Debes ingresar un nombre" },
                ]}
                hasFeedback
            >
                <Input value={nombre} name="nombre" onChange={handleChange}/>
            </Form.Item>

            <Form.Item
                label="Descripción"
                name="descripcion"
                rules={[
                    { required: true, message: "Debes ingresar una descripción" },
                ]}
                hasFeedback
            >
                <TextArea value={descripcion} name="descripcion" onChange={handleChange}/>
            </Form.Item>

            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                initialValue={status}
            >
                <Select value={status} placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setRole({...role, status:value})} }>
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option> 
                </Select>
            </Form.Item>


            <>
            <Divider/>
                <div className="block pb-6">
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}> 
                        Seleccionar Todos
                    </Checkbox>
                </div>
                <Checkbox.Group defaultValue={role.permisos} value={role.permisos} className="w-full"> 
                    <div className="grid grid-cols-4 gap-y-1">
                        {
                            permisos.map ((item, i) => (
                                <Checkbox className="first-of-type:ml-2" checked={role.permisos.includes(item.id)} name="permisos" key={i} value={item.id} onChange={ (e) => handleCheck(e) }> {item.nombre} </Checkbox>
                               
                            ))
                        }
                    </div>
                </Checkbox.Group>
            </>
                
            

            <Form.Item className="py-5">
                <div className="flex justify-between">
                    <Button type="default" onClick={ () => navigate(-1)}>
                        Cancelar
                    </Button>  
                    <Button type="ghost" htmlType="submit">
                        Guardar
                    </Button>  
                </div>
            </Form.Item>

        </Form>
     );
}
 
export default CreateRoles;