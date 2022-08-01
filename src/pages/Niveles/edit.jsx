import { Form, Input, Select, Button, Divider, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getAllActividadAction } from "../../actions/actividadActions";
import { cleanErrorAction } from "../../actions/globalActions";
import { getNivelAction, updateNivelAction } from "../../actions/nivelActions";
import { getAllZonaAction } from "../../actions/zonaActions";
import Forbidden from "../../components/Elements/Forbidden";
import Loading from "../../components/Elements/Loading";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const EditNiveles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    
    const { errors, editedNivel, isLoading, updated } = useSelector( state => state.niveles );
    const { zonas } = useSelector( state => state.zonas )
    const { actividades } = useSelector( state => state.actividades )
    const { userPermission } = useSelector(state => state.permisos)

    const [nivel, setNivel] = useState({
        nombre: "",
        status: "",
    });

    useEffect(() =>{
        if(!editedNivel){
            dispatch(getNivelAction(id))
        }

        dispatch(getAllZonaAction())
        dispatch(getAllActividadAction())

        setNivel({
            ...editedNivel,
            zonas: editedNivel? editedNivel.zonas.map(item => item.id) : null,
            actividades: editedNivel? editedNivel.actividades.map(item => item.id) : null
        })

        form.setFieldsValue({
            ...editedNivel,
            zonas: editedNivel? editedNivel.zonas.map(item => item.id) : null,
            actividades: editedNivel? editedNivel.actividades.map(item => item.id) : null
        })
    // eslint-disable-next-line
    },[editedNivel])

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
        dispatch(updateNivelAction(nivel));
    }

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
            openNotificationWithIcon('success', 'El nivel ha sido actualizado correctamente')
            navigate('/niveles')
        }
    }

    if(!hasPermission(userPermission, '/editar-niveles')) return <Forbidden/>
    if(isLoading) return <Loading />
    if(!editedNivel) return <div>No se encontro el nivel</div>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            form={form}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Nivel </h1>

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
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                
            >
                <Select placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setNivel({...nivel, status:value})} }>
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option> 
                </Select>
            </Form.Item>

            <Divider />

            <Form.Item
                label="Selecciona zonas relacionados"
                name="zonas"
            > 
                {zonas && zonas.length > 0 && nivel.zonas ?
                <Checkbox.Group defaultValue={nivel.zonas} className="w-full">
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
                <Checkbox.Group defaultValue={nivel.actividades} className="w-full">
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
 
export default EditNiveles;