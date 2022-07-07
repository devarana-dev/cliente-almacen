import { Button, Form, Select } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllActividadAction } from '../../actions/actividadActions';
import { getAllCentroCostoAction } from '../../actions/centroCostoActions';
import { getAllNivelesAction } from '../../actions/nivelActions';
import { getAllZonaAction } from '../../actions/zonaActions';

const CreateValesSalida1 = ({current, setCurrent}) => {

    const dispatch = useDispatch()

    const { zonas } = useSelector(state => state.zonas);
    const { actividades } = useSelector(state => state.actividades);
    const { niveles } = useSelector(state => state.niveles);
    const { centroCosto } = useSelector(state => state.centroCosto);
    const {Option} = Select;


    useEffect(() =>{
        dispatch(getAllZonaAction())
        dispatch(getAllActividadAction())
        dispatch(getAllNivelesAction())
        dispatch(getAllCentroCostoAction())
    }, [])

    return ( 
        <>
            {/* <h1>Información General</h1> */}
            {/* <h1> Añadir Materiales </h1> */}
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
                    defaultValue={"4"}
                >
                    <Option value="4">Almacén 4</Option>
                    
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar un centro de costo' },
                ]}
                name="centroCosto_id"
                hasFeedback
            >
                <Select 
                    placeholder="Obra / Centro de Costo"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                >
                    <Option value="1">Centro de costo 1</Option>
                    
                    {
                        centroCosto.map(item => (
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
            >
                <Select 
                    placeholder="Nivel"
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
            >
                <Select 
                    mode="multiple" placeholder="Selecciona un Prototipo / Zona"
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