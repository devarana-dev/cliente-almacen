import { Form, Input, Button, DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { getPersonalAction, updatePersonalAction } from "../../actions/personalActions";
import Forbidden from "../../components/Elements/Forbidden";
import Loading from "../../components/Elements/Loading";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const EditPersonal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams()
    const [form] = Form.useForm();

    const { editedPersonal, isLoading, errors, updated } = useSelector(state => state.personal);
    const { userPermission } = useSelector(state => state.permisos);

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
        dispatch(updatePersonalAction(personal));
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
            openNotificationWithIcon('success', 'El personal ha sido actualizado correctamente')
            navigate('/personal')
        }
    }

    if(!hasPermission(userPermission, '/editar-personal')) return <Forbidden/>
    if(isLoading) return <Loading />
    if(!editedPersonal) return <div>No se encontro el personal</div>
    
    return (

        <Form 
            className="max-w-screen-md mx-auto" 
            onFinish={handleSubmit}
            layout="vertical"
            
            form={form}
            >

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