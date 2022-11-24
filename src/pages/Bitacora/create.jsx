import { useEffect, useState } from "react";
import { Button, DatePicker, Divider, Form, Image, Input, Select, TimePicker } from "antd";
import {useDropzone} from 'react-dropzone'
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { getAllObraAction } from "../../actions/obraActions";
import { getAllNivelesAction } from "../../actions/nivelActions";
import { getAllPersonalAction } from "../../actions/personalActions";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { getAllUsuariosAction } from "../../actions/usuarioActions";

const CreateBitacora = () => {


    
    const { obra } = useSelector(state => state.obras);
    const { niveles } = useSelector(state => state.niveles);
    const { personal } = useSelector(state => state.personal);
    const { usuarios }  = useSelector(state => state.usuarios);

    const [ selectedNivel, setSelectedNivel ] = useState([]);
    const [ selectedActividad, setSelectedActividad ] = useState([]);
    const [ selectedZona, setSelectedZona ] = useState([]);


    const {TextArea} = Input;
    const { Option } = Select;
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            ]);
        },
        accept: 'image/*, .pdf'
    })

    const thumbs = files.map(file => (
        <div key={file.name}>
          <div className="relative">
                <Image
                    src={file.preview}
                    alt={file.name} 
                    width={150}
                    height={150}
                    className="rounded-md object-contain"
                    // Revoke data uri after image is loaded
                    // onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
                <Button className="bottom-0 left-0  absolute w-full" type="icon-secondary-new" onClick={
                    () => {
                        setFiles(files.filter(f => f.name !== file.name))
                    }
                }>
                    <DeleteOutlined />
                </Button>
          </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    useEffect(() =>{
        dispatch(getAllObraAction())
        dispatch(getAllNivelesAction())
        dispatch(getAllPersonalAction())
        dispatch(getAllUsuariosAction())
        // eslint-disable-next-line
    }, [])

    const handleChangeObra =  (id) => {
        const [result] = obra.filter( item => item.id === id)
        setSelectedNivel(result.niveles)
    }

    const handleChangeNivel = (id) => {
        const [result] = niveles.filter( item => item.id === id)
        setSelectedActividad(result.actividades);
        setSelectedZona(result.zonas);
    }
    
    return ( 
        <>
            <Form
                className="max-w-screen-md mx-auto pt-2 pb-24"
            >
                <div className="flex justify-between gap-2">
                    <Form.Item
                        name="fecha"
                        label="Fecha de Registro"
                    >
                        <DatePicker defaultValue={moment()} disabled />
                    </Form.Item>

                    <Form.Item
                        name="hora"
                        label="Hora de Registro"
                    >
                        <TimePicker defaultValue={moment()} disabled />
                    </Form.Item>
                </div>
                <Divider className="pb-8 my-2"/>
                    <Form.Item
                        name="proyecto"
                        label="Proyecto"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese un proyecto',
                            },
                        ]}
                    >
                        <Input />
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
                        name="nivel"
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
                            disabled={selectedNivel.length === 0}
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
                        name="zona"
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
                            disabled={selectedZona.length === 0}
                            showSearch
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
                        name="actividad"
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
                            disabled={selectedActividad.length === 0}
                            showSearch
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
                        name="destajista"
                        label="Destajista / Contratista "
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una destajista',
                            },
                        ]}
                    >
                        <Select />
                    </Form.Item>
                    <Form.Item
                        name="participantes"
                        label="Participantes"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una participantes',
                            },
                        ]}
                    >
                        <Select 
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            disabled={usuarios.length === 0}
                            showSearch
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
                        name="tipoRegistro"
                        label="Tipo de Registro"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una tipoRegistro',
                            },
                        ]}
                    >
                        <Select />
                    </Form.Item>
                    <Form.Item
                        name="informacionAdicional"
                        label="Información Adicional"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una informacionAdicional',
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                    <div {...getRootProps()} className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4">
                        <input {...getInputProps()} />
                        {
                        isDragActive ?
                            <p>Suelta el archivo aquí...</p> :
                            <p className="text-center">Arrastra y suelta los archivos aquí, o haz clic para seleccionar archivos</p>
                        }
                    </div>
                    <div className="flex gap-10 flex-wrap">
                        {thumbs}
                    </div>

                    <div className="flex py-10">
                        <Button type="ghost" htmlType="submit" className="w-full max-w-xs mx-auto">
                            Registrar
                        </Button>
                    </div>
            </Form> 
        </>
     );
}
 
export default CreateBitacora;