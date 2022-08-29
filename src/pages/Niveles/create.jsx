import { Form, Input, Select, Button, Checkbox, Divider } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllActividadAction } from "../../actions/actividadActions";
import { cleanErrorAction } from "../../actions/globalActions";
import { createNivelAction } from "../../actions/nivelActions";
import { getAllZonaAction } from "../../actions/zonaActions";
import Forbidden from "../../components/Elements/Forbidden";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const CreateNiveles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;

    const { errors, created } = useSelector(state => state.niveles);
    const { zonas } = useSelector( state => state.zonas )
    const { actividades } = useSelector( state => state.actividades )
    const { userPermission } = useSelector(state => state.permisos)

    const [nivel, setNivel] = useState({
        nombre: "",
        status: true,
        zonas: [],
        actividades: []
    });
    const {nombre, status} = nivel

    useEffect(() => {
        dispatch(getAllZonaAction())
        dispatch(getAllActividadAction())
    // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setNivel({
            ...nivel,
            [e.target.name]: e.target.value,
        });
    }

    const handleCheckZona = (e) => {
        
        const { value, checked } = e.target
        if ( checked ) {
            setNivel({
                ...nivel,
                zonas: [...nivel.zonas, value]
            })         
        }
        else {
            setNivel({
                ...nivel,
                zonas: nivel.zonas.filter((e) => e !== Number(value))
            })
        }

    }
    const handleCheckActividad = (e) => {
        const { value, checked } = e.target
        if ( checked ) {
            setNivel({
                ...nivel,
                actividades: [...nivel.actividades, value]
            })         
        }
        else {
            setNivel({
                ...nivel,
                actividades: nivel.actividades.filter((e) => e !== Number(value))
            })
        }
    }

    const handleSubmit = () => {
        dispatch(createNivelAction(nivel));
    }

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
            openNotificationWithIcon('success', 'El nivel ha sido creado correctamente')
            navigate('/niveles')
        }
    }
    if(!hasPermission(userPermission, 'editar niveles')) return <Forbidden/>
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
                name="status"
                label="Estatus"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                initialValue={status}
            >
                <Select value={status} placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setNivel({...nivel, status:value})} }>
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option> 
                </Select>
            </Form.Item>

            <Divider/>

            <Form.Item
                label="Selecciona zonas relacionados"
                name="zonas"
            > 
                {zonas && zonas.length > 0 && nivel.zonas ?
                <Checkbox.Group className="w-full">
                <div className="grid grid-cols-2">
                {
                    zonas && zonas.length > 0 ?
                    zonas.map( (item, i) => (
                        <div key={i} className="col-span-1">
                            <Checkbox name="zonas" value={item.id} onChange={ (e) => handleCheckZona(e) }> {item.nombre}  </Checkbox>
                        </div>
                    ))
                    :
                    null
                }
                </div>
            </Checkbox.Group>
            :
                null    
            } 
            </Form.Item>

            <Form.Item
                label="Selecciona actividades relacionados"
                name="actividades"
                style={{ fontSize : "20px !important" }}
            > 
                {actividades && actividades.length > 0 && nivel.actividades ?
                <Checkbox.Group className="w-full">
                <div className="grid grid-cols-2">
                {
                    actividades && actividades.length > 0 ?
                    actividades.map( (item, i) => (
                        <div key={i} className="col-span-1">
                            <Checkbox name="actividades" value={item.id} onChange={ (e) => handleCheckActividad(e) }> {item.nombre}  </Checkbox>
                        </div>
                    ))
                    :
                    null
                }
                </div>
            </Checkbox.Group>
            :
                null    
            } 
            </Form.Item>

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
 
export default CreateNiveles;