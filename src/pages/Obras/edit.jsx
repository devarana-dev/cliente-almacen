import { Form, Input, Select, Button, Checkbox, Divider  } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getObraAction, updateObraAction } from "../../actions/obraActions";
import { getAllNivelesAction } from "../../actions/nivelActions";
import openNotificationWithIcon from "../../hooks/useNotification";
import { cleanErrorAction } from "../../actions/globalActions";
import Loading from "../../components/Elements/Loading";
import { hasPermission } from "../../utils/hasPermission";
import Forbidden from "../../components/Elements/Forbidden";
import { getEtapasAction } from "../../actions/etapasActions";

const EditObra = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;

    const { errors, editedObra, isLoading, updated } = useSelector(state => state.obras);
    const {niveles} = useSelector( state => state.niveles )
    const { etapas } = useSelector(state => state.etapas);
    const { userPermission } = useSelector(state => state.permisos)

    const [obra, setObra] = useState({
        nombre: "",
        clave: "",
        status: "",
        etapaId: null
    });

    useEffect(() =>{
        if(!editedObra){
            dispatch(getObraAction(id))
        }
        setObra({ 
            ...editedObra,
            niveles: editedObra? editedObra.niveles.map(item => item.id) : null
        })
        form.setFieldsValue({
            ...editedObra,
            niveles: editedObra? editedObra.niveles.map(item => item.id) : null
        })

        dispatch(getAllNivelesAction())
    // eslint-disable-next-line
    }, [editedObra])

    useEffect(() => {
        dispatch(getEtapasAction())
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setObra({
            ...obra,
            [e.target.name]: e.target.value,
        });
    }

    const handleCheck = (e) => {
        const { value, checked } = e.target
        if ( checked ) {
            setObra({
                ...obra,
                niveles: [...obra.niveles, value]
            })         
        }
        else {
            setObra({
                ...obra,
                niveles: obra.niveles.filter((e) => e !== Number(value))
            })
        }
    }

    const handleSubmit = () => {
        dispatch(updateObraAction(obra));
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
            openNotificationWithIcon('success', 'Se ha actualizado la obra correctamente')
            navigate('/obra')
        }
    }
    
    
    if(!hasPermission(userPermission, 'editar obras')) return <Forbidden/>
    
    if(isLoading) return <Loading />
    if(!editedObra) return <div>No se encontro el centro de costo</div>

    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            form={form}
        >

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
                label="Clave"
                name="clave"
                rules={[
                    { required: true, message: "Debes ingresar una descripción" },
                ]}
                hasFeedback
            >
                <Input name="clave" onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                label="Etapa"
                name="etapaId"
                defaultValue={null}
                rules={[
                    { required: true, message: "Debes seleccionar una etapa" },
                ]}
                hasFeedback
                
            >
                <Select
                    placeholder="Selecciona una etapa"
                    showSearch
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    onChange={ (value) => { setObra({...obra, etapaId:value})} }
                >
                    {
                        etapas && etapas.length > 0 ?
                        etapas.map( (item, i) => (
                            <Option key={i} value={item.id}> {item.nombre} </Option>    
                        ))
                        :
                        null
                    }
                </Select>
            </Form.Item>

            <Form.Item
                name="status"
                label="Estatus"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
            >
                <Select placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setObra({...obra, status:value})} }>
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option> 
                </Select>
            </Form.Item>

            <Divider  />
            
            <Form.Item
                label="Selecciona niveles relacionados"
                name="niveles"
            > 
                {niveles && niveles.length > 0 && obra.niveles ?
                <Checkbox.Group defaultValue={obra.niveles} className="w-full">
                <div className="grid grid-cols-4">
                {
                    niveles && niveles.length > 0 ?
                    niveles.map( (item, i) => (
                        <div key={i} className="col-span-1">
                            <Checkbox  value={item.id} name="niveles" onChange={ (e) => handleCheck(e) }> {item.nombre}  </Checkbox>
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
 
export default EditObra;