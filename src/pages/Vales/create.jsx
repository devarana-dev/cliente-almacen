import { Steps, Form, Select, Button  } from 'antd';
import { useEffect, useState } from 'react';

import { getAllObraAction } from '../../actions/obraActions';
import { getAllNivelesAction } from '../../actions/nivelActions';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPersonalAction } from '../../actions/personalActions';

const CreateValesSalida = () => {

    const { Step } = Steps;

    const [current, setCurrent] = useState(0);
    const [vale, setVale] = useState({
        almacenId: 4,
    });

    const dispatch = useDispatch()

    const { niveles } = useSelector(state => state.niveles);
    const { obra } = useSelector(state => state.obras);
    const { personal } = useSelector(state => state.personal);
    const { Option } = Select;

    const [ selectedNivel, setSelectedNivel ] = useState([]);
    const [ selectedActividad, setSelectedActividad ] = useState([]);
    const [ selectedZona, setSelectedZona ] = useState([]);


    const handleChangeObra = (id) => {
       const [result] = obra.filter( item => item.id === id)
       setSelectedNivel(result.niveles);
    }
    const handleChangeNivel = (id) => {
        const [result] = niveles.filter( item => item.id === id)
        setSelectedActividad(result.actividades);
        setSelectedZona(result.zonas);
    }


    useEffect(() =>{
        dispatch(getAllObraAction())
        dispatch(getAllNivelesAction())
        dispatch(getAllPersonalAction())
    }, [])


    const handleSubmit = () => {
        console.log(vale);
    }
    return ( 
        <div className="max-w-2xl w-full mx-auto">
            <h1 className="text-center text-2xl font-bold text-dark pb-10">Vale de salida</h1>

            <Steps current={current} className="pb-10 text-base" responsive={false} >
                <Step title="Información General" />
                <Step title="Añadir Materiales"  />
                <Step title="Finalizar"  />
            </Steps>


            <Form 
                onFinish={handleSubmit}
                layout="vertical"
                scrollToFirstError={true}
                initialValues={{
                    almacen: 4,
                }}
            >
                {
                    current === 0 ?
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
                            name="obraId"
                            label="Selecciona una obra / centro de costo"
                            hasFeedback
                        >
                            <Select 
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                showSearch
                                size='large'
                                onChange= { (e) => { handleChangeObra(e); setVale({...vale, obraId: e})} }
                                name="obraId"         
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
                                { required: true, message: 'Debes seleccionar un nivel' },
                            ]}
                            name="nivelId"
                            hasFeedback
                            label="Selecciona un nivel"
                        >
                            <Select
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                disabled={selectedNivel.length === 0}
                                showSearch
                                size='large'
                                onChange={ (e) => { handleChangeNivel(e); setVale({...vale, nivelId: e})}}
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
                            rules={[
                                { required: true, message: 'Debes seleccionar una zona / prototipo'},
                            ]}
                            name="zonaId"
                            hasFeedback
                            label="Selecciona una zona / prototipo"
                        >
                            <Select 
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                disabled={selectedZona.length === 0}
                                showSearch
                                size='large'
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
                            rules={[
                                { required: true, message: 'Debes seleccionar un tipo de trabajo' },
                            ]}
                            name="actividadId"
                            hasFeedback
                            label="Selecciona una actividad a realizar"
                        >
                            <Select 
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                disabled={selectedActividad.length === 0}
                                showSearch
                                size='large'
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
                            rules={[
                                { required: true, message: 'Debes seleccionar a un jefe de cuadrilla' },
                            ]}
                            name="personalId"
                            hasFeedback
                            label="Selecciona un jefe de cuadrilla"
                        >
                            <Select 
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                showSearch
                                size='large'
                                onChange={ (e) => { setVale({...vale, personalId: e})}}
                                >
                                {
                                    personal.map(item => (
                                        <Option key={item.id} value={item.id}>{`${item.nombre} ${item.apellidoPaterno} ${item.apellidoMaterno}`}</Option>
                                    ))
                                }                                
                            </Select>
                        </Form.Item>

                        <Button type='ghost' htmlType='submit'>
                            Continuar
                        </Button>
                    </>
                    : current === 1 ?
                        {/* <CreateValesSalida1 /> */}
                    : current === 2 ?
                        {/* <CreateValesSalida1 /> */}
                    : null

                }
            </Form>
        </div>
    );
}
 
export default CreateValesSalida;