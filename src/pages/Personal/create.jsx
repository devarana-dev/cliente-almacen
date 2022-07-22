import { Form, Input, Button, notification, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRolesAction } from "../../actions/roleActions";
import { createPersonalAction } from "../../actions/personalActions";
import openNotificationWithIcon from "../../hooks/useNotification";

const CreatePersonal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { errors, created } = useSelector(state => state.personal);
    const [personal, setPersonal] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        fechaIngreso: "",
    });
    const {nombre, apellidoPaterno, apellidoMaterno, fechaIngreso} = personal


    useEffect(() => {
        dispatch(getAllRolesAction())

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        setPersonal({
            ...personal,
            [e.target.name]: e.target.value,
        });
    }


    const handleSubmit = () => {
        dispatch(createPersonalAction(personal));
    }

    useEffect(() => {
        displayAlert()
    }, [errors, created])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
        }
        if(created){
            openNotificationWithIcon('success', 'El personal ha sido actualizado correctamente')
            navigate('/personal')
        }
    }

    return (

        <Form 
            className="max-w-screen-md mx-auto" 
            onFinish={handleSubmit}
            layout="vertical"
            >
            <h1 className="text-center text-2xl font-bold text-dark"> Nuevo Lider de Cuadrilla </h1>

            <Form.Item 
                label="Nombre" 
                name="nombre" 
                rules={[
                    { required: true, message : 'Debes ingresar un nombre' },
                ]} 
                hasFeedback>
                <Input name="nombre" value={nombre} onChange={handleChange}/>
            </Form.Item>

            <Form.Item 
                label="Apellido Paterno" 
                name="apellidoPaterno" 
                rules={[
                    { required: true, message: 'Debes ingresar un apellido paterno' },
                ]} 
                hasFeedback>
                <Input name="apellidoPaterno" value={apellidoPaterno} onChange={handleChange}/>
            </Form.Item>

            <Form.Item 
                label="Apellido Materno" 
                name="apellidoMaterno" 
                rules={[
                    { required: true, message: 'Debes ingresar un apellido materno' },
                ]} 
                hasFeedback>   
                <Input name="apellidoMaterno" value={apellidoMaterno} onChange={handleChange}/>
            </Form.Item>


            <Form.Item 
                label="Fecha Ingreso" 
                name="fechaIngreso" 
                rules={[
                    { required: true, message: 'Debes seleccionar una fecha de ingreso', type: 'date' },
                ]} 
                hasFeedback> 

               <DatePicker name="fechaIngreso" format={'DD-MM-YYYY'} type="date" value={fechaIngreso} className ="w-full" onChange={ (text, dateString) => setPersonal({...personal, fechaIngreso: dateString}) }/>
            </Form.Item>               


            <Form.Item className="py-5">
                <div className="flex justify-between">
                    <Button type="dark" onClick={ () => navigate(-1)}>
                        Cancelar
                    </Button>  
                    <Button type="primary" className="" htmlType="submit">
                        Guardar
                    </Button>  
                </div>
            </Form.Item>
        </Form>
        );
}
 
export default CreatePersonal;