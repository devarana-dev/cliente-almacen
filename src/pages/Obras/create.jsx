import { Form, Input, Select, Button, notification, Checkbox, Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createObraAction } from "../../actions/obraActions";
import { getAllNivelesAction } from "../../actions/nivelActions";

const CreateObra = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;

    const { errors } = useSelector(state => state.obras );
    const { niveles } = useSelector( state => state.niveles )

    const [obra, setObra] = useState({
        nombre: "",
        status: true,
        clave: "",
        niveles: []
    });
    const {nombre, clave, status} = obra
    
    useEffect(() => {
        dispatch(getAllNivelesAction())
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
        dispatch(createObraAction(obra));

        if(!errors){                
            notification.success({
                message: "Correcto!",
                description: "Se ha creado la obra correctamente",
                duration: 2,
            });
            navigate("/obra");
        }
    }
    
    return ( 
        <Form
            className="max-w-screen-md mx-auto"
            onFinish={() => handleSubmit()}
            layout="vertical"
            
        >
            <h1 className="text-center text-2xl font-bold text-dark"> Nueva Obra / CC </h1>

            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    { required: true, message: "Debes ingresar un nombre" },
                ]}
                hasFeedback
            >
                <Input value={nombre} name="nombre" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Clave"
                name="clave"
                rules={[
                    { required: true, message: "Debes ingresar una descripción" },
                ]}
                hasFeedback
            >
                <Input value={clave} name="clave" onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                label="Estatus"
                name="status"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                
                initialValue={status}
            >
                <Select value={status} placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setObra({...obra, status:value})} }>
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option> 
                </Select>
            </Form.Item>

            <Divider />

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
 
export default CreateObra;