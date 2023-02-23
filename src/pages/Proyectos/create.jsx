

import { Button, Form, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import openNotificationWithIcon from "../../hooks/useNotification";
import { createProyectoAction } from "../../actions/proyectosActions";
import { useUploadFile } from "../../hooks/useUploadFile";


const initialValues = {
    nombre: "",
    descripcion: "",
}

const CreateProyectos = () => {

    const { created, errors } = useSelector(state => state.proyectos);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [files, setFiles] = useState([]);
    const options = {
        maxFiles: 1,
        fileTypes: ['image/png']
    }
    const {getInputProps, getRootProps, isDragActive, thumbs, fileRejections, totalSize} = useUploadFile(files, setFiles, options);

    const handleSubmit = () => {
        const query = {...form.getFieldsValue(), files};   
        dispatch(createProyectoAction(query))
    }

    useEffect(() => {
        if(created){
            openNotificationWithIcon('success', 'Proyecto creada correctamente')
            form.resetFields();
            navigate('/proyectos')
        }
        if(errors){
            openNotificationWithIcon('error', 'Error al crear proyecto')
        }
        // eslint-disable-next-line
    }, [created, errors])  





    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        // eslint-disable-next-line
    }, []);

    return (
    <>
        <Form
            className="max-w-screen-md mx-auto pt-2 pb-24"
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                    {
                        required: true,
                        message: "Por favor ingrese el nombre de la proyecto",
                    },
                ]} 
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Clave"
                name="clave"
                rules={[
                    {
                        required: true,
                        message: "Por favor ingrese la clave de la proyecto",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <div {...getRootProps({className: 'dropzone w-full border rounded-md p-3 flex flex-col justify-center items-center cursor-pointer border-dashed border-secondary'})}>
                    <input {...getInputProps()} />
                    {
                    isDragActive ?
                        <p>Suelta el archivo aquí...</p> :
                        <p className="text-center">Arrastra y suelta o da click un archivo PNG </p>
                    }
            </div>
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
                
            
            <div className="justify-between flex mt-5">
                <Button type="default" htmlType="button" onClick={ () => navigate(-1)}> Cancelar </Button>
                <Button type="ghost" htmlType="submit" disabled={!files.length > 0}> Crear </Button>
            </div>
        </Form>

    </>
    );
}
 
export default CreateProyectos;