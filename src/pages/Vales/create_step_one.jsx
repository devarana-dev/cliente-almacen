import { Button, Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllObraAction } from '../../actions/obraActions';
import { getAllNivelesAction } from '../../actions/nivelActions';
import { getAllPersonalAction } from '../../actions/personalActions';
import "../../assets/scss/steps.scss"


const InformacionGral = ({current, setCurrent, setVale, vale}) => {

    const dispatch = useDispatch()

    const { niveles } = useSelector(state => state.niveles);
    const { obra } = useSelector(state => state.obras);
    
    const { personal } = useSelector(state => state.personal);
    const { Option } = Select;

    const [ selectedNivel, setSelectedNivel ] = useState([]);
    const [ selectedActividad, setSelectedActividad ] = useState([]);
    const [ selectedZona, setSelectedZona ] = useState([]);




    const handleChangeObra =  (id) => {
        const [result] = obra.filter( item => item.id === id)
        const centroCosto = result.clave.split('-')[1].trim();
        setVale({...vale, obraId: id, centroCosto})
        setSelectedNivel(result.niveles)
    }
    

    const handleChangeNivel = (id) => {
        const [result] = niveles.filter( item => item.id === id)
        setVale({...vale, nivelId: id})
        setSelectedActividad(result.actividades);
        setSelectedZona(result.zonas);
    }

    useEffect(() =>{
        dispatch(getAllObraAction())
        dispatch(getAllNivelesAction())
        dispatch(getAllPersonalAction())
        // eslint-disable-next-line
    }, [])


    const handleSubmit = () => {
        setCurrent(1)
    }

    return ( 
        <Form 
                onFinish={handleSubmit}
                layout="vertical"
                scrollToFirstError={true}
                initialValues={{
                    almacen: 4,
                }}
                className="steps-form"
            >
                
                    
                <Form.Item
                    className='mb-3 text-sm'
                        rules={[
                            { required: true, message: 'Debes seleccionar un Almacén' },
                        ]}
                        name="almacen"
                        hasFeedback
                        label="Almacén"
                    >
                        <Select 
                            placeholder="Selecciona un Almacén"
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            showSearch
                        >
                            <Option key={1} value={4}>Almacén 4</Option>
                        </Select>
                </Form.Item>

                <Form.Item
                    className='mb-3 text-sm'
                    rules={[
                        { required: true, message: 'Debes seleccionar un centro de costo' },
                    ]}
                    name="obraId"
                    label="Obra / Centro de costo"
                    hasFeedback
                >
                    <Select 
                        filterOption={(input, option) => option.children.toString().toLowerCase().includes(input.toLowerCase())}
                        showSearch
                        onChange= { (e) => { handleChangeObra(e);  } }
                        name="obraId"         
                    >
                        {
                            obra.map(item => (
                                <Option key={item.id} value={item.id}>{item.nombre} | { item.clave }</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    className='mb-3 text-sm'
                    rules={[
                        { required: true, message: 'Debes seleccionar un nivel' },
                    ]}
                    name="nivelId"
                    hasFeedback
                    label="Nivel"
                >
                    <Select
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        disabled={selectedNivel.length === 0}
                        showSearch
                        onChange={ (e) => { handleChangeNivel(e) }}
                        name="nivelId"
                    >
                        {
                            selectedNivel.map(item => (
                                <Option key={item.id} value={item.id}>{item.nombre}</Option>
                            ))
                        }
                        
                    </Select>
                </Form.Item>

                <Form.Item
                    className='mb-3 text-sm'
                    rules={[
                        { required: true, message: 'Debes seleccionar una zona / prototipo'},
                    ]}
                    name="zonaId"
                    hasFeedback
                    label="Zona"
                >
                    <Select 
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        disabled={selectedZona.length === 0}
                        showSearch
                        name="zonaId"
                        onChange={ (e) => { setVale({...vale, zonaId: e})}}
                        >
                        {
                            selectedZona.map(item => (
                                <Option key={item.id} value={item.id}>{item.nombre}</Option>
                            ))
                        }
                        

                    </Select>
                </Form.Item>

                <Form.Item
                    className='mb-3 text-sm'
                    rules={[
                        { required: true, message: 'Debes seleccionar un tipo de trabajo' },
                    ]}
                    name="actividadId"
                    hasFeedback
                    label="Actividad a realizar"
                >
                    <Select 
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        disabled={selectedActividad.length === 0}
                        showSearch
                        onChange={ (e) => { setVale({...vale, actividadId: e})}}
                        >
                        {
                            selectedActividad.map(item => (
                                <Option key={item.id} value={item.id}>{item.nombre}</Option>
                            ))
                        }
                        
                    </Select>
                </Form.Item>

                <Form.Item
                    className='mb-3 text-sm'
                    rules={[
                        { required: true, message: 'Debes seleccionar a un jefe de cuadrilla' },
                    ]}
                    name="personalId"
                    hasFeedback
                    label="Jefe de cuadrilla"
                >
                    <Select 
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        showSearch
                        onChange={ (e) => { setVale({...vale, personalId: e})}}
                        >
                        {
                            personal.map(item => (
                                <Option key={item.id} value={item.id}>{`${item.nombre} ${item.apellidoPaterno} ${item.apellidoMaterno}`}</Option>
                            ))
                        }                                
                    </Select>
                </Form.Item>
                        
                <div className='flex justify-center pt-5'>
                    <Button type='ghost' htmlType='submit'>
                        Continuar
                    </Button>
                </div>
            </Form>
    );
}
 
export default InformacionGral;