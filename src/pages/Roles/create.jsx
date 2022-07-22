import { Form, Input, Select, Button, notification, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPermisosAction } from "../../actions/permisosActions";
import { createRoleAction } from "../../actions/roleActions";
import openNotificationWithIcon from "../../hooks/useNotification";

const CreateRoles = () => {

    const [indeterminate, setIndeterminate] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;
    const { TextArea } = Input;

    const { errors, created } = useSelector(state => state.roles);
    const { permisos } = useSelector( state => state.permisos )
   

    const [role, setRole] = useState({
        nombre: "",
        descripcion: "",
        status: true,
        permisos: []
    });

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
    }, [])

    useEffect(() => {
        displayAlert()
    }, [errors, created])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
        }
        if(created){
            openNotificationWithIcon('success', 'El rol ha sido creado correctamente')
            navigate('/roles')
        }
    }
 

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

        console.log(role);
    }

    
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            onChange={handleChange}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Nuevo Rol </h1>

            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    { required: true, message: "Debes ingresar un nombre" },
                ]}
                hasFeedback
            >
                <Input value={nombre} name="nombre" />
            </Form.Item>

            <Form.Item
                label="Descripción"
                name="descripcion"
                rules={[
                    { required: true, message: "Debes ingresar una descripción" },
                ]}
                hasFeedback
            >
                <TextArea value={descripcion} name="descripcion"/>
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
                <Checkbox indeterminate={indeterminate}>
                    Seleccionar Todos
                </Checkbox>
                <div className="grid grid-cols-4">
                    <>
                        <div className="col-span-1">
                            <p className="font-bold">Ver</p>
                        </div>
                        <div className="col-span-1">
                            <p className="font-bold">Crear</p>
                        </div>
                        <div className="col-span-1">
                            <p className="font-bold">Editar</p>
                        </div>
                        <div className="col-span-1">
                            <p className="font-bold">Borrar</p>
                        </div>
                    </>
                </div>
                <Checkbox.Group> 
                    <div className="grid grid-cols-4 gap-y-1">
                        {
                            permisos.map ((item, i) => (
                                <Checkbox name="permisos" key={i} value={item.id} onChange={ (e) => handleCheck(e) }> {item.nombre} </Checkbox>
                               
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
 
export default CreateRoles;