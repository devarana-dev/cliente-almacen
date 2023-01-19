import { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Divider, Form, Image, Input, Select, TimePicker } from "antd";
import moment from "moment";
import { getAllObraAction } from "../../actions/obraActions";
import { getAllNivelesAction } from "../../actions/nivelActions";
import { getAllPersonalAction } from "../../actions/personalActions";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { getAllUsuariosAction } from "../../actions/usuarioActions";
import { createBitacoraAction } from "../../actions/bitacoraActions";
import Loading from "../../components/Elements/Loading";
import openNotificationWithIcon from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { useUploadFile } from "../../hooks/useUploadFile";
import { getAllActividadAction } from "../../actions/actividadActions";
import { Mask } from "../../components/Mask";


const FormBitacora = () => {

    const { uploading, created, errors } = useSelector(state => state.bitacoras)
    const { obra } = useSelector(state => state.obras);
    const { niveles } = useSelector(state => state.niveles);
    const { personal } = useSelector(state => state.personal);
    const { usuarios }  = useSelector(state => state.usuarios);
    const { actividades } = useSelector(state => state.actividades);
    const { userAuth } = useSelector(state => state.auth);
    
    const [tipoBitacora, setTipoBitacora] = useState(1);
    const [ selectedNivel, setSelectedNivel ] = useState([]);
    const [ selectedZona, setSelectedZona ] = useState([]);

    const tipoUsuario = useMemo(() => {
        if( userAuth)
        {
            return userAuth.esInterno
        }
    }, [userAuth])

    console.log(tipoUsuario);



    // get query params
    // const { id } = useParams()

    const [form] = Form.useForm();
    const {TextArea} = Input;
    const { Option } = Select;
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {getInputProps, getRootProps, isDragActive, thumbs} = useUploadFile(files, setFiles);
    

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        // eslint-disable-next-line
    }, []);

    useEffect(() =>{
            dispatch(getAllObraAction())
            dispatch(getAllNivelesAction())
            dispatch(getAllPersonalAction())
            dispatch(getAllUsuariosAction())
            dispatch(getAllActividadAction())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            fecha: moment(),
            hora: moment(),
            proyectoId: 1,
        })
        // eslint-disable-next-line
    }, [])
        


    useEffect(() => {
        if(created){
            openNotificationWithIcon('success', 'Bitacora creada correctamente')
            form.resetFields();
            setFiles([]);
            navigate('/bitacora')
        }
        if(errors){
            openNotificationWithIcon('error', errors)
        }
        // eslint-disable-next-line
    }, [created, errors])  

    

    const handleChangeObra = (id) => {
        const [result] = obra.filter( item => item.id === id)

        setSelectedNivel(result.niveles)
        form.setFieldsValue({
            obraId: id,
            nivelId: undefined,
            zonaId: undefined,
        })
    }

    const handleChangeNivel = (id) => {
        const [result] = niveles.filter( item => item.id === id)
        setSelectedZona(result.zonas);
        form.setFieldsValue({
            nivelId: id,
            zonaId: undefined,
        })
    }

    const handleSubmit = () => {

        // si tipoUsuario es === 2 entonces validar participantesId es required sino no

        if(!tipoUsuario){
            form.setFieldsValue({
                participantesId: 0
            })
        }
        const query = {...form.getFieldsValue(), files}  ;

        console.log(query);
        dispatch(createBitacoraAction(query))

    }

    return ( 
        <>
            <Form
                className="max-w-screen-md mx-auto pt-2 pb-24"
                onFinish={handleSubmit}
                form={form}
            >
                <div className="flex justify-between gap-2">
                    <Form.Item
                        name="fecha"
                        label="Fecha de Registro"
                    >
                        <DatePicker disabled format={'DD-MM-YYYY'} />
                    </Form.Item>

                    <Form.Item
                        name="hora"
                        label="Hora de Registro"
                    >
                        <TimePicker disabled />
                    </Form.Item>
                </div>
                <Divider className="pb-8 my-2"/>


                <Form.Item
                    name="tipoBitacoraId"
                    label="Tipo Bitacora"
                    labelCol={{ span: 4 }}
                    rules={[{ required: true, message: 'Por favor ingrese un tipo de bitacora' }]}
                >
                    <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            showSearch
                            onChange={value => setTipoBitacora(value)}
                            className="inline-block w-full"
                            
                            >
                                <Option key={nanoid()} value={1}>Incidencias</Option>
                                <Option key={nanoid()} value={2}>Acuerdos</Option>
                                <Option key={nanoid()} value={3}>Inicio de trabajos</Option>
                                <Option key={nanoid()} value={4}>Fin de trabajos</Option>          
                        </Select>
                </Form.Item>

                    
                {/* Proyecto */}
                <Form.Item
                    name="proyectoId"
                    label="Proyecto"
                    labelCol={{ span: 4 }}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese un proyecto',
                        },
                    ]}
                >
                    <Select 
                        filterOption={(input, option) => option.children.toString().toLowerCase().includes(input.toLowerCase())}
                        showSearch
                    >
                        <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                        <Option key={nanoid()} value={1}>Royal View</Option>

                    </Select>
                </Form.Item>
                {/* Etapa */}
                <Form.Item
                    name="etapaId"
                    label="Etapa"
                    labelCol={{ span: 4 }}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese un etapa',
                        },
                    ]}
                >
                    <Select 
                        filterOption={(input, option) => option.children.toString().toLowerCase().includes(input.toLowerCase())}
                        showSearch
                    >
                        <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                        <Option key={nanoid()} value={1}>Torre A</Option>
                        <Option key={nanoid()} value={2}>Torre B</Option>
                        <Option key={nanoid()} value={3}>Torre C</Option>

                    </Select>
                </Form.Item>
                {
                    tipoUsuario &&
                    ( <>
                    {/* Obra */}
                    <Form.Item
                        name="obraId"
                        label="Obra / CC"
                        labelCol={{ span: 4 }}                    
                    >
                        <Select 
                            filterOption={(input, option) => option.children.toString().toLowerCase().includes(input.toLowerCase())}
                            showSearch
                            onChange= { (e) => { handleChangeObra(e);  } }
                            allowClear

                    >
                        <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                        {
                            obra.map(item => (
                                <Option key={item.id} value={item.id}>{item.nombre} | { item.clave }</Option>
                            ))
                        }
                    </Select>
                    </Form.Item>
                    {/* Nivel */}
                    <Form.Item
                        name="nivelId"
                        label="Nivel"
                        labelCol={{ span: 4 }}
                    >
                        <Select
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={selectedNivel.length === 0 }
                            showSearch
                            allowClear
                            onChange={ (e) => { handleChangeNivel(e) }}
                            name="nivelId"
                        >
                            <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                            {
                                selectedNivel.map(item => (
                                    <Option key={item.id} value={item.id}>{item.nombre}</Option>
                                ))
                            }
                            
                        </Select>
                    </Form.Item>
                    {/* Zona */}
                    <Form.Item
                        name="zonaId"
                        label="Zona"
                        labelCol={{ span: 4 }}
                    >
                        <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={selectedZona.length === 0 }
                            showSearch
                            allowClear
                            name="zonaId"
                            >
                            <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                            {
                                selectedZona.map(item => (
                                    <Option key={item.id} value={item.id}>{item.nombre}</Option>
                                ))
                            }
                            
    
                        </Select>
                    </Form.Item>
                    </> )
                }
               {
                 tipoUsuario ?
                    ( <>    
                        {/* Actividad */}
                        <Form.Item
                            name="actividad"
                            label="Actividad"
                            labelCol={{ span: 4 }}   
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese una actividad',
                                }                 
                            ]}
                        >
                            <Select 
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                disabled={actividades.length === 0 }
                                showSearch
                                >
                                    <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                                {
                                    actividades.map(item => (
                                        <Option key={item.id} value={item.nombre}>{item.nombre}</Option>
                                    ))
                                }
                                
                            </Select>
                        </Form.Item>
                    </> )
                    :
                    (
                        <>
                            {/* Actividad Externo */}
                            <Form.Item
                                name="actividadExterno"
                                label="Actividad"
                                labelCol={{ span: 4 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese una actividad',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </>
                    )

                }
                {
                    tipoUsuario &&
                    (<>
                    {/* Destajista */}
                    <Form.Item
                        name="personalId" 
                        label="Personal "
                        labelCol={{ span: 4 }}
                    >
                            <Select 
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                disabled={personal.length === 0 }
                                showSearch
                                
                                >
                                    <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                                {
                                    personal.map(item => (
                                        <Option key={item.id} value={item.id}> { `${item.nombre}  ${item.apellidoMaterno ? `( ${item.apellidoMaterno} )` : '' } ${ item.apellidoPaterno }` }  </Option>
                                    ))
                                }
                                
                            </Select>
                    </Form.Item>
                    {/* Contratista */}
                    <Form.Item
                        name="externoId"
                        label="Contratista"
                        labelCol={{ span: 4 }}
                    >
                            <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={usuarios.length === 0 }
                            showSearch
                            allowClear
                            >
                                <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                            
                            {/* Mostrar unicamente usuarios esInterno false */}
                            {
                                usuarios.filter(item => item.esInterno === false).map(item => (
                                    <Option key={item.id} value={item.id}> { `${item.nombre} ${ item.apellidoPaterno }` }  </Option>
                                ))
                            }

                            
                        </Select>
                    </Form.Item>
                    </>)
                }
                {/* Participantes */}
                <Form.Item
                    name="participantesId"
                    label="Participantes"
                    labelCol={{ span: 4 }}
                    // si tipoUsuario es == 2 es requerido
                    rules={[{ required: !tipoUsuario, message: 'Selecciona al menos un participante' }]}
                >
                    <Select 
                        filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                        disabled={usuarios.length === 0 }
                        showSearch
                        mode = "multiple"
                        options = { 
                            // Agrupar  label: Internos y label: Externos a los que usuarios.esInterno sea true y false respectivamente
                            [
                                {
                                    label: 'Internos',
                                    options: usuarios.filter(item => item.esInterno === true).map(item => (
                                        { label: `${item.nombre} ${ item.apellidoPaterno }`, value: item.id }
                                    ))
                                },
                                {
                                    label: 'Externos',
                                    options: usuarios.filter(item => item.esInterno === false).map(item => (
                                        { label: `${item.nombre} ${ item.apellidoPaterno }`, value: item.id }
                                    ))
                                }
                            ]
                         }
                    />
                </Form.Item>
                {/* Titulo */}
                <Form.Item
                    name="titulo"
                    label="Titulo"
                    labelCol={{ span: 4 }}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese un proyecto',
                        },
                    ]}
                >
                    
                    <Input />
                </Form.Item>
                 {/* Descripción */}
                <Form.Item
                    name="descripcion"
                    label="Descripcion"
                    labelCol={{ span: 4 }}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese una descripcion',
                        },
                    ]}

                >
                    <TextArea />
                </Form.Item>

                <div {...getRootProps({className: 'dropzone w-full border border-gray-300 rounded-md p-2 flex flex-col justify-center items-center cursor-pointer'})}>
                    <input {...getInputProps()} />
                    {
                    isDragActive ?
                        <p>Suelta el archivo aquí...</p> :
                        <p className="text-center">Arrastra y suelta los archivos aquí, o haz clic para seleccionar archivos</p>
                    }
                </div>
                <div className="flex gap-10 flex-wrap">
                    <Image.PreviewGroup>
                        {thumbs}
                    </Image.PreviewGroup>
                </div>               
                <div className="flex py-10 justify-between">
                    <Button type="default" htmlType="button" onClick={ () => navigate(-1)}> Cancelar </Button>
                    <Button type="ghost" htmlType="submit">
                        Registrar
                    </Button>
                </div>
            </Form> 

            { uploading ? 
                <Mask text={"Generando Bitacora..."} />            
                : null
            }
        </>
     );
}
 
export default FormBitacora;