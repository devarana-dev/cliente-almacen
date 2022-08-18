import { Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanErrorAction } from "../../actions/globalActions";
import { createInsumoAction } from "../../actions/insumoActions";
import Forbidden from "../../components/Elements/Forbidden";
import openNotificationWithIcon from "../../hooks/useNotification";
import { hasPermission } from "../../utils/hasPermission";

const CreateInsumos = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;

    const { errors, created } = useSelector(state => state.insumos);

    const [insumo, setInsumo] = useState({
        nombre: "",
        status: true,
        claveEnk: '',
        centroCosto: '',
        unidadMedida: '',
    });
    const {nombre, status, claveEnk, centroCosto, unidadMedida} = insumo


    const handleChange = (e) => {
        setInsumo({
            ...insumo,
            [e.target.name]: e.target.value,
        });
    }


    const handleSubmit = () => {
        dispatch(createInsumoAction(insumo));
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
            openNotificationWithIcon('success', 'El insumo ha sido creado correctamente')
            navigate('/insumos')
        }
    }

    const { userPermission } = useSelector(state => state.permisos);
    if(!hasPermission(userPermission, 'crear insumos')) return <Forbidden/>
    
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
                label="ID Enkontrol"
                name="claveEnk"
                rules={[
                    { required: true, message: "Debes ingresar una clave enkontrol" },
                ]}
                hasFeedback
            >
                <Input value={claveEnk} name="claveEnk" onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                label="Centro de Costos"
                name="centroCosto"
                rules={[
                    { required: true, message: "Debes ingresar un Centro de Costos" },
                ]}
                hasFeedback
            >
                <Input value={centroCosto} name="centroCosto" onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                label="Unidad de medida"
                name="unidadMedida"
                rules={[
                    { required: true, message: "Debes ingresar una unidad de medida" },
                ]}
                hasFeedback
            >
                <Input value={unidadMedida} name="unidadMedida" onChange={handleChange}/>
            </Form.Item>

            <Form.Item
                name="status"
                label="Estatus"
                rules={[
                    { required: true, message: "Debes seleccionar un estatus" },
                ]}
                initialValue={status}
            >
                <Select value={status} placeholder="Selecciona un estatus" name="status" onChange={ (value) => { setInsumo({...insumo, status:value})} }>
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
 
export default CreateInsumos;