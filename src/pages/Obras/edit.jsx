import { Form, Input, Select, Button, notification, Checkbox, Divider  } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getObraAction, updateObraAction } from "../../actions/obraActions";
import { getAllNivelesAction } from "../../actions/nivelActions";

const EditObra = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    const [form] = Form.useForm();
    const { Option } = Select;

    const { errors, editedObra, isLoading } = useSelector(state => state.obras);
    const {niveles} = useSelector( state => state.niveles )

    const [obra, setObra] = useState({
        nombre: "",
        clave: "",
        status: "",
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

    }, [editedObra])

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

        if(!errors){
                notification.success({
                    message: "Correcto!",
                    description: "Se ha actualizado la obra correctamente",
                    duration: 2,
                });
            }
        navigate("/obra");
    }
    
    if(isLoading) return <div>Cargando...</div>
    if(!editedObra) return <div>No se encontro el centro de costo</div>
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            form={form}
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Obra / CC </h1>

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
 
export default EditObra;