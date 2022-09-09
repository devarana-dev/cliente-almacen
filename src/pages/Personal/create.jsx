import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRolesAction } from "../../actions/roleActions";
import { createPersonalAction } from "../../actions/personalActions";
import openNotificationWithIcon from "../../hooks/useNotification";
import { cleanErrorAction } from "../../actions/globalActions";
import { hasPermission } from "../../utils/hasPermission";
import Forbidden from "../../components/Elements/Forbidden";

const CreatePersonal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { errors, created } = useSelector(state => state.personal);
    const { userPermission } = useSelector(state => state.permisos);

    const [personal, setPersonal] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        especialidad: ""
    });
    const {nombre, apellidoPaterno, apellidoMaterno, especialidad} = personal


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
        // eslint-disable-next-line
    }, [errors, created])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
            dispatch( cleanErrorAction() )
        }
        if(created){
            openNotificationWithIcon('success', 'El personal ha sido actualizado correctamente')
            navigate('/personal')
        }
    }

    if(!hasPermission(userPermission, 'crear personal')) return <Forbidden/>
    return (

        <Form 
            className="max-w-screen-md mx-auto" 
            onFinish={handleSubmit}
            layout="vertical"
            >
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
                label="Apodo" 
                name="apellidoMaterno" 
                hasFeedback>   
                <Input name="apellidoMaterno" value={apellidoMaterno} onChange={handleChange}/>
            </Form.Item>


            <Form.Item 
                label="Especialidad" 
                name="especialidad" 
                rules={[
                    { required: true, message: 'Debes ingresar una especialidad' },
                ]} 
                hasFeedback>   
                <Input name="especialidad" value={especialidad} onChange={handleChange}/>
            </Form.Item>


            <Form.Item className="py-5">
                <div className="flex justify-between">
                    <Button type="default" onClick={ () => navigate(-1)}>
                        Cancelar
                    </Button>  
                    <Button type="ghost" className="" htmlType="submit">
                        Guardar
                    </Button>  
                </div>
            </Form.Item>
        </Form>
        );
}
 
export default CreatePersonal;