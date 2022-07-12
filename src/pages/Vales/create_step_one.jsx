import { Button, Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllObraAction } from '../../actions/obraActions';
import { getAllNivelesAction } from '../../actions/nivelActions';

const CreateValesSalida1 = ({current, setCurrent}) => {

    const dispatch = useDispatch()

    const { zonas } = useSelector(state => state.zonas);
    const { actividades } = useSelector(state => state.actividades);
    const { niveles } = useSelector(state => state.niveles);
    const { obra } = useSelector(state => state.obras);
    const { Option } = Select;


    const handleChangeObra = (e) => {
       console.log(e);
    }


    useEffect(() =>{
        dispatch(getAllObraAction())
        dispatch(getAllNivelesAction())
    }, [])

    return ( 
        <>
            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar un Almacén' },
                ]}
                name="almacen"
                hasFeedback
                label="Selecciona un Almacén"
            >
                <Select 
                    placeholder="Selecciona un Almacén"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                >
                    <Option key={1} value={4}>Almacén 4</Option>
                    
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar un centro de costo' },
                ]}
                name="obra_id"
                label="Selecciona una obra / centro de costo"
                hasFeedback
                
            >
                <Select 
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                    onChange={handleChangeObra}
                    name="obra_id"                
                >
                    {
                        obra.map(item => (
                            <Option key={item.id} value={item.id}>{item.nombre}</Option>
                        ))
                    }
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar una sección' },
                ]}
                name="seccion_id"
                hasFeedback
                label="Selecciona un nivel"
            >
                <Select
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                >
                    {
                        niveles.map(item => (
                            <Option key={item.id} value={item.id}>{item.nombre}</Option>
                        ))
                    }
                    
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar una zona', type: 'array' },
                ]}
                name="zona_id"
                hasFeedback
                label="Selecciona una zona o prototipo"
            >
                <Select 
                    mode="multiple"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                    >
                    {
                        zonas.map(item => (
                            <Option key={item.id} value={item.id}>{item.nombre}</Option>
                        ))
                    }
                    
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar un tipo de trabajo' },
                ]}
                name="tipoTrabajo_id"
                hasFeedback
                label="Selecciona una actividad a realizar"
            >
                <Select 
                    placeholder="Trabajo a realizar"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                    >
                    {
                        actividades.map(item => (
                            <Option key={item.id} value={item.id}>{item.nombre}</Option>
                        ))
                    }
                    
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar a un jefe de cuadrilla' },
                ]}
                name="jefeCuadrilla_id"
                hasFeedback
                label="Selecciona un jefe de cuadrilla"
            >
                <Select 
                    placeholder="Entregar a"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                    >
                    <Option value="1">Sin resultados</Option>
                    
                </Select>
            </Form.Item>

            <Button type='ghost' htmlType='submit'>
                Continuar
            </Button>
        </>
    );
}
 
export default CreateValesSalida1;