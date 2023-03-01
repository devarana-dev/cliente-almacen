import { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Divider, Form, Image, Input, Select, TimePicker } from "antd";
import moment from "moment";
import { getAllPersonalAction } from "../../actions/personalActions";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { getAllUsuariosAction } from "../../actions/usuarioActions";
import { createBitacoraAction } from "../../actions/bitacoraActions";
import openNotificationWithIcon from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { useUploadFile } from "../../hooks/useUploadFile";
import { getAllActividadAction } from "../../actions/actividadActions";
import { Mask } from "../../components/Mask";
import { getEtapasAction } from "../../actions/etapasActions";
import { Detector } from "react-detect-offline";
import { getProyectosAction } from "../../actions/proyectosActions";


const FormBitacora = () => {

    const { uploading, created, errors } = useSelector(state => state.bitacoras)
    const { personal } = useSelector(state => state.personal);
    const { usuarios }  = useSelector(state => state.usuarios);
    const { actividades } = useSelector(state => state.actividades);
    const { proyectos } = useSelector(state => state.proyectos);
    const { etapas } = useSelector(state => state.etapas);
    const { userAuth } = useSelector(state => state.auth);

    const { empresaId } = userAuth || {};

    const [ isOffline, setIsOffline] = useState(true);
    
    const [form] = Form.useForm();
    const {TextArea} = Input;
    const { Option } = Select;
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const options = {
        maxFiles: 100,
    }

    const {getInputProps, getRootProps, isDragActive, thumbs, fileRejections, totalSize} = useUploadFile(files, setFiles, options);
    

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        // eslint-disable-next-line
    }, []);

    const tipoUsuario = useMemo(() => {
        if(userAuth) return userAuth.esInterno
    }, [userAuth])


    useEffect(() =>{
            dispatch(getAllPersonalAction())
            dispatch(getAllUsuariosAction({
                roles: [4, 7, 8]
            }))
            dispatch(getAllActividadAction())
            dispatch(getProyectosAction({
                status: 1
            }))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            fecha: moment(),
            hora: moment(),
        })
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if(created){
            openNotificationWithIcon('success', 'Registro creado correctamente')
            form.resetFields();
            setFiles([]);
            navigate('/bitacora')
        }
        if(errors){
            openNotificationWithIcon('error', errors)
        }
        // eslint-disable-next-line
    }, [created, errors])  

    

    const handleSubmit = () => {

        // si tipoUsuario es === 2 entonces validar participantesId es required sino no

        if(tipoUsuario){
            form.validateFields(['participantesId'])
        }
        const query = {...form.getFieldsValue(), files};

        dispatch(createBitacoraAction(query))

    }


    const validateExtraMail = () => {
        const correos = form.getFieldValue('correos');        
       
        const isValidEmail = email => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        };
          
        const filteredOptions = correos.filter(option => isValidEmail(option));


        form.setFieldsValue({
            correos: filteredOptions
        })
    
    }

    const handleSelectProyecto = (value) => {
        dispatch(getEtapasAction({proyectoId: value, status: 1}))
    }


    return ( 
        <>

            <Detector onChange={
                (online) => {
                    console.log('Detector:', online);
                    setIsOffline(online)
                }
            } render={ ({ online }) => online ?? <> </> }
             />

            <Form
                className="max-w-screen-md mx-auto pt-2 pb-24"
                onFinish={handleSubmit}
                form={form}
                layout="vertical"
                scrollToFirstError
                size="middle"
            >
                <div className="flex justify-between">
                    <Form.Item
                        name="fecha"
                        label="Fecha"
                    >
                        <DatePicker disabled format={'DD-MM-YYYY'} />
                    </Form.Item>

                    <Form.Item
                        name="hora"
                        label="Hora"
                    >
                        <TimePicker disabled />
                    </Form.Item>
                </div>

                <Divider className="pb-2 my-2"/>

                <Form.Item
                    name="tipoBitacoraId"
                    label="Tipo de Registro"
                    labelCol={{ span: 4 }}
                    rules={[{ required: true, message: 'Por favor ingrese un tipo de bitacora' }]}
                    className="mb-3"
                >
                    <Select 
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        showSearch
                        placeholder="Seleccione de la lista"
                        
                        >
                            <Option key={nanoid()} value={1}>Incidencia</Option>
                            <Option key={nanoid()} value={2}>Acuerdo</Option>
                            <Option key={nanoid()} value={3}>Inicio de trabajos</Option>
                            <Option key={nanoid()} value={4}>Cierre de trabajos</Option>          
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
                    className="mb-3"
                >
                    <Select 
                        filterOption={(input, option) => option.children.toString().toLowerCase().includes(input.toLowerCase())}
                        showSearch
                        placeholder="Seleccione de la lista"
                        onChange={handleSelectProyecto}
                    >
                        {
                            proyectos.map( item => (
                                <Option key={nanoid()} value={item.id}>{item.nombre}</Option>
                            ))
                        }
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
                    className="mb-3"
                >
                    <Select 
                        filterOption={(input, option) => option.children.toString().toLowerCase().includes(input.toLowerCase())}
                        showSearch
                        disabled={etapas.length === 0}
                        placeholder="Seleccione de la lista"
                    >
                        {
                            etapas.map( item => (
                                <Option key={nanoid()} value={item.id}>{item.nombre}</Option>
                            ))
                        }

                    </Select>
                </Form.Item>
               
               {
                 tipoUsuario && isOffline ?
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
                            className="mb-3"
                        >
                            <Select 
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                disabled={actividades.length === 0 }
                                showSearch
                                placeholder="Seleccione de la lista"
                                >
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
                                label="Actividad Relacionada"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese una actividad',
                                    },
                                ]}
                                className="mb-3"
                            >
                                <Input placeholder="Escribe una actividad" />
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
                        label="Destajista Relacionado"
                        labelCol={{ span: 4 }}
                        className="mb-3"
                    >
                            <Select 
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                disabled={personal.length === 0 }
                                showSearch
                                allowClear
                                placeholder="Seleccione de la lista"
                                
                                >
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
                        label="Contratista Relacionado"
                        labelCol={{ span: 4 }}
                        className="mb-3"
                    >
                            <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={usuarios.length === 0 }
                            showSearch
                            placeholder="Seleccione de la lista"
                            allowClear
                            >
                        
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
                    className="mb-3"
                >
                    <Select 
                        filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                        disabled={usuarios.length === 0 }
                        showSearch
                        allowClear
                        mode = "multiple"
                        placeholder="Seleccione de la lista"
                        options = { 
                            // Agrupar  label: Internos y label: Externos a los que usuarios.esInterno sea true y false respectivamente
                            [
                                {
                                    label: 'Internos',
                                    options: usuarios.filter(item => item.esInterno === true).map(item => (
                                        { key: nanoid(), label: `${item.nombre} ${ item.apellidoPaterno }`, value: item.id }
                                    ))
                                },
                                {
                                    label: 'Externos',
                                    // si userAuth es interno entonces todos los externos y si es externo solo los externos de su empresa
                                    options: usuarios.filter(item => item.esInterno === false && item.empresas[0].id === empresaId).map(item => (
                                        { key: nanoid(), label: `${item.nombre} ${ item.apellidoPaterno }`, value: item.id }
                                    ))

                                }
                            ]
                         }
                    />
                </Form.Item>

                {/* Correos */}
                <Form.Item
                    name="correos"
                    label="Notificar a"
                    labelCol={{ span: 4 }}
                >
                    <Select
                        mode="tags"
                        tokenSeparators={[',']}
                        placeholder="Ingrese dirección de correo electrónico"
                        allowClear
                        onSelect={ () => validateExtraMail() }
                    />
                </Form.Item>

                <Divider className="my-6"/>
                {/* Titulo */}
                <Form.Item
                    name="titulo"
                    label="Titulo"
                    labelCol={{ span: 4 }}
                    className="mb-3"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese un proyecto',
                        },
                    ]}
                >
                    
                    <Input placeholder="Titulo del registro" /> 
                </Form.Item>
                 {/* Descripción */}
                <Form.Item
                    name="descripcion"
                    label="Descripcion"
                    labelCol={{ span: 4 }}
                    className="mb-3"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese una descripcion',
                        },
                    ]}

                >
                    <TextArea placeholder="Descripción detallada del registro" />
                </Form.Item>

                <Divider className="my-10" />

                <div {...getRootProps({className: 'dropzone w-full border rounded-md p-3 flex flex-col justify-center items-center cursor-pointer border-dashed border-secondary'})}>
                    <input {...getInputProps()} />
                    {
                    isDragActive ?
                        <p>Suelta el archivo aquí...</p> :
                        <p className="text-center">Arrastra y suelta los archivos aquí, o haz clic para seleccionar archivos. </p>
                    }
                </div>
                <p className={`text-right text-xs py-1 ${ totalSize > 25000000 ? 'text-red-500' : 'text-gray-500' }`}> 
                    { (totalSize / 1024 / 1024).toFixed(2) } MB / 25 MB 
                </p>
                <span>
                    {
                        fileRejections.length > 0 &&
                        fileRejections.map(({ file, errors }) => (
                            <div key={file.path}>
                               {
                                    errors.map(e => (
                                            <span className="text-red-500 text-center py-2 block" key={e.code}>{e.message}</span>
                                    ))  
                               }
                            </div>
                        ))                    
                    }
                </span>
                
                <div className="flex gap-10 flex-wrap">
                    <Image.PreviewGroup>
                        {thumbs}
                    </Image.PreviewGroup>
                </div>               
                <span className="text-red-500 text-center py-2 block">
                    {
                        totalSize > 25000000 && <span>El tamaño total de los archivos no debe ser mayor a 25MB.</span>
                    }
                </span>
                <div className="flex py-10 justify-between">
                    <Button type="default" htmlType="button" onClick={ () => navigate(-1)}> Cancelar </Button>
                    <Button type="ghost" htmlType="submit" disabled={
                        // totalSize es mayor a 25MB true
                        totalSize > 25000000
                    }>
                        Registrar
                    </Button>
                </div>
            </Form> 

            { uploading ? 
                <Mask text={"Creando registro en Bitácora..."} />
                : null
            }
        </>
     );
}
 
export default FormBitacora;