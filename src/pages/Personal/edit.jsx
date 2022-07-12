import { Form, Input, Button, notification, DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPersonalAction, updatePersonalAction } from "../../actions/personalActions";

const EditPersonal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams()
    const [form] = Form.useForm();

    const { editedPersonal, isLoading, errors } = useSelector(state => state.personal);

    const [personal, setPersonal] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        fechaIngreso: "",
    });


    useEffect(() => {
        if(!editedPersonal){
            dispatch(getPersonalAction(id))
        }

        

        if(editedPersonal){
            setPersonal({
                ...editedPersonal,
                fechaIngreso: moment(editedPersonal.fechaIngreso),
            })
            form.setFieldsValue({
                ...editedPersonal,
                fechaIngreso: moment(editedPersonal.fechaIngreso)
            })
        }
        // eslint-disable-next-line
    }, [editedPersonal])



    const handleChange = (e) => {
        console.log(personal);
        setPersonal({
            ...personal,
            [e.target.name]: e.target.value,
        });
    }


    const handleSubmit = () => {
        console.log(personal.fechaIngreso);
        dispatch(updatePersonalAction(personal));

        if(!errors){

            notification.success({
                message: "Personal actualizado",
                description: "El personal ha sido actualizado correctamente",
                duration: 2,
            });
            navigate('/personal')
        }
    }

    if(isLoading) return <div>Cargando...</div>
    if(!editedPersonal) return <div>No se encontro el personal</div>
    
    return (

        <Form 
            className="max-w-screen-md mx-auto" 
            onFinish={handleSubmit}
            layout="vertical"
            
            form={form}
            >
            <h1 className="text-center text-2xl font-bold text-dark"> Editar Personal </h1>

            <Form.Item 
                label="Nombre" 
                name="nombre" 
                rules={[
                    { required: true, message : 'Debes ingresar un nombre' },
                ]} 
                hasFeedback>
                <Input name="nombre" onChange={handleChange} />
            </Form.Item>

            <Form.Item 
                label="Apellido Paterno" 
                name="apellidoPaterno" 
                rules={[
                    { required: true, message: 'Debes ingresar un apellido paterno' },
                ]} 
                hasFeedback>
                <Input name="apellidoPaterno" onChange={handleChange} />
            </Form.Item>

            <Form.Item 
                label="Apellido Materno" 
                name="apellidoMaterno" 
                rules={[
                    { required: true, message: 'Debes ingresar un apellido materno' },
                ]} 
                hasFeedback>   
                <Input name="apellidoMaterno" onChange={handleChange}/>
            </Form.Item>

            <Form.Item 
                label="Fecha Ingreso" 
                name="fechaIngreso" 
                rules={[
                    { required: true, message: 'Debes seleccionar fecha de ingreso', },
                ]} 
                hasFeedback> 

               <DatePicker name="fechaIngreso" format={'DD-MM-YYYY'} className="w-full" onChange={ (text, dateString) => setPersonal({...personal, fechaIngreso: dateString}) }/>                   
            </Form.Item>


                
            

            <Form.Item className="py-5">
                <div className="flex justify-between">
                    <Button type="dark" onClick={ () => navigate(-1)}>
                        Volver
                    </Button>  
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>  
                </div>
            </Form.Item>
        </Form>
        );
}
 
export default EditPersonal;