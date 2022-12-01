import { useEffect, useState } from "react";
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
import { useCallback } from "react";


const FormBitacora = () => {

    const { uploading, created, errors } = useSelector(state => state.bitacoras)
    const { obra } = useSelector(state => state.obras);
    const { niveles } = useSelector(state => state.niveles);
    const { personal } = useSelector(state => state.personal);
    const { usuarios }  = useSelector(state => state.usuarios);

    const [ selectedNivel, setSelectedNivel ] = useState([]);
    const [ selectedActividad, setSelectedActividad ] = useState([]);
    const [ selectedZona, setSelectedZona ] = useState([]);

    // get query params
    // const { id } = useParams()

    const [form] = Form.useForm();

    form.setFieldsValue({
        fecha: moment(),
        hora: moment()
    })

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
        // eslint-disable-next-line
    }, [])

    useCallback (() => {
        if(created){
            openNotificationWithIcon('success', 'Bitacora creada correctamente')
            navigate('/bitacora')
            form.resetFields();
            setFiles([]);
        }
        // eslint-disable-next-line
    }, [created])



    useEffect(() => {
        if(created){
            openNotificationWithIcon('success', 'Bitacora creada correctamente')
            form.resetFields();
            setFiles([]);
        }
        if(errors){
            openNotificationWithIcon('error', 'Error al crear bitacora')
        }
        // eslint-disable-next-line
    }, [created, errors])  

    

    const handleChangeObra =  (id) => {
        const [result] = obra.filter( item => item.id === id)
        setSelectedNivel(result.niveles)

        form.setFieldsValue({
            obraId: id,
            nivelId: 0,
            actividadId: 0,
            zonaId: 0,
        })
    }

    const handleChangeNivel = (id) => {
        const [result] = niveles.filter( item => item.id === id)
        setSelectedActividad(result.actividades);
        setSelectedZona(result.zonas);
        form.setFieldsValue({
            nivelId: id,
            actividadId: 0,
            zonaId: 0,
        })
    }

    const handleChange = (e) => {
    
        form.setFieldsValue({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
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
                        <DatePicker disabled format={'YYYY-MM-DD'} />
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
                        name="titulo"
                        label="Proyecto"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese un proyecto',
                            },
                        ]}
                    >
                        <Input onChange={handleChange} name="titulo" />
                    </Form.Item>
                    <Form.Item
                        name="obraId"
                        label="Obra / Centro de Costo"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una obra',
                            },
                        ]}
                        
                    >
                        <Select 
                            filterOption={(input, option) => option.children.toString().toLowerCase().includes(input.toLowerCase())}
                            showSearch
                            onChange= { (e) => { handleChangeObra(e);  } }
                            name="obraId" 
                    >
                        <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                        {
                            obra.map(item => (
                                <Option key={item.id} value={item.id}>{item.nombre} | { item.clave }</Option>
                            ))
                        }
                    </Select>
                    </Form.Item>
                    <Form.Item
                        name="nivelId"
                        label="Nivel"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una nivel',
                            },
                        ]}
                    >
                        <Select
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={selectedNivel.length === 0 }
                            showSearch
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
                    <Form.Item
                        name="zonaId"
                        label="Zona"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una zona',
                            },
                        ]}
                    >
                        <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={selectedZona.length === 0 }
                            showSearch
                            onChange={ (e) => { form.setFieldsValue({ zonaId: e }) }}
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
                    <Form.Item
                        name="actividadId"
                        label="Actividad"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una actividad',
                            },
                        ]}
                    >
                        <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={selectedActividad.length === 0 }
                            showSearch
                            onChange={ (e) => { form.setFieldsValue({ actividadId: e }) }}
                            >
                                <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                            {
                                selectedActividad.map(item => (
                                    <Option key={item.id} value={item.id}>{item.nombre}</Option>
                                ))
                            }
                            
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="personalId"
                        label="Destajista / Contratista "
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una destajista',
                            },
                        ]}
                    >
                         <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={personal.length === 0 }
                            showSearch
                            onChange={ (e) => { form.setFieldsValue({ personalId: e }) }}
                            >
                                <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                            {
                                personal.map(item => (
                                    <Option key={item.id} value={item.id}> { `${item.nombre} (${ item.apellidoMaterno }) ${ item.apellidoPaterno }` }  </Option>
                                ))
                            }
                            
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="participantesId"
                        label="Participantes"
                    >
                        <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={usuarios.length === 0 }
                            
                            showSearch
                            mode = "multiple"
                            onChange={ (e) => { form.setFieldsValue({ participantesId: e }) }}
                            >
                                <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                            {
                                usuarios.map(item => (
                                    <Option key={item.id} value={item.id}>{item.nombre} { item.apellidoPaterno } { item.apellidoMaterno } </Option>
                                ))
                            }
                            
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="tipoBitacoraId"
                        label="Tipo de Registro"

                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese un tipo de registro',
                            },
                        ]}
                    >
                         <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            showSearch
                            onChange={ (e) => { form.setFieldsValue({ tipoBitacoraId: e }) }}
                            >
                                <Option key={nanoid()} value={0} disabled>{ `Selecciona una opción` }</Option>
                                <Option key={nanoid()} value={1}>Apertura de bitácora</Option>
                                <Option key={nanoid()} value={2}>Incidencia</Option>
                                <Option key={nanoid()} value={3}>Instrucción</Option>
                                <Option key={nanoid()} value={4}>No conformidad</Option>
                                <Option key={nanoid()} value={5}>Optimización</Option>
                            
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="informacionAdicional"
                        label="Descripcion"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una descripción',
                            },
                        ]}
                    >
                        <TextArea onChange={handleChange} name="informacionAdicional" />
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

                        
                    <div className="flex py-10">
                        <Button type="ghost" htmlType="submit" className="w-full max-w-xs mx-auto">
                            Registrar
                        </Button>
                    </div>
            </Form> 

            { uploading ? 
                <div>
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full">
                            <div className="flex flex-col gap-y-2">
                                <div className="flex justify-center items-center">
                                    <Loading text={"Generando Bitacora..."}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            : null}
        </>
     );
}
 
export default FormBitacora;