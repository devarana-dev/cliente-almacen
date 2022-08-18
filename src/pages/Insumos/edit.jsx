import { Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getAllActividadAction } from "../../actions/actividadActions";
import { cleanErrorAction } from "../../actions/globalActions";
import { getInsumoAction, updateInsumoAction } from "../../actions/insumoActions";
import { getAllZonaAction } from "../../actions/zonaActions";
import Loading from "../../components/Elements/Loading";
import openNotificationWithIcon from "../../hooks/useNotification";


const EditInsumos = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;
    
    const { errors, editedInsumo, isLoading, updated } = useSelector( state => state.insumos );

    const [insumo, setInsumo] = useState({
        nombre: "",
        status: "",
    });
    

    useEffect(() =>{
        if(!editedInsumo){
            dispatch(getInsumoAction(id))
        }

        dispatch(getAllZonaAction())
        dispatch(getAllActividadAction())

        setInsumo({ ...editedInsumo })

        form.setFieldsValue({ ...editedInsumo })
        
    // eslint-disable-next-line
    },[editedInsumo])

    const handleChange = (e) => {
        setInsumo({
            ...insumo,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        dispatch(updateInsumoAction(insumo));
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
            openNotificationWithIcon('success', 'El insumo ha sido actualizado correctamente')
            navigate('/insumos')
        }
    }

    if(isLoading) return <Loading />
    if(!editedInsumo) return <div>No se encontro el insumo</div>
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
                label="ID Enkontrol"
                name="claveEnk"
                rules={[
                    { required: true, message: "Debes ingresar un ID Enkontrol" },
                ]}
                hasFeedback
            >
                <Input name="claveEnk" onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                label="Centro de Costos"
                name="centroCosto"
                rules={[
                    { required: true, message: "Debes ingresar un centro de costos" },
                ]}
                hasFeedback
            >
                <Input name="centroCosto" onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                label="Unidad de Medida"
                name="unidadMedida"
                rules={[
                    { required: true, message: "Debes ingresar una unidad de medida" },
                ]}
                hasFeedback
            >
                <Input name="unidadMedida" onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                
            >
                <Select placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setInsumo({...insumo, status:value})} }>
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option> 
                </Select>
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
 
export default EditInsumos;