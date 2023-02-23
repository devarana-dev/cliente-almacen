import { Button, Form, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import openNotificationWithIcon from "../../hooks/useNotification";
import { cleanProyectoAction, getProyectoAction, updateProyectoAction } from "../../actions/proyectosActions";
import { useUploadFile } from "../../hooks/useUploadFile";

const EditProyectos = () => {

    const { updated, errors, editedProyecto } = useSelector(state => state.proyectos);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    

    const [form] = Form.useForm();
    const [files, setFiles] = useState([]);
    const options = {
        maxFiles: 1,
        fileTypes: ['image/png']
    }
    const {getInputProps, getRootProps, isDragActive, thumbs, fileRejections, totalSize} = useUploadFile(files, setFiles, options);

    const handleSubmit = () => {
        const id = editedProyecto.id
        const proyecto = form.getFieldsValue()
        proyecto.id = id  
        if(files.length > 0){
            proyecto.files = files
        }

        dispatch(updateProyectoAction(proyecto))
    }


    useEffect(() => {
        dispatch(getProyectoAction(id))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(editedProyecto){
            form.setFieldsValue({...editedProyecto})
        }
        // eslint-disable-next-line
    }, [editedProyecto])

    useEffect(() => {
        if(updated){
            openNotificationWithIcon('success', 'Proyecto actualizada correctamente')
            form.resetFields();
            navigate('/proyectos')
        }
        if(errors){
            openNotificationWithIcon('error', 'Error al actualizar proyecto')
        }

        // return () => dispatch(cleanProyectoAction())
        
        // eslint-disable-next-line
    }, [updated, errors])  


    return (
    <>
        <Form
            className="max-w-screen-md mx-auto pt-2 pb-24"
            form={form}
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

            {
                editedProyecto &&
                <>
                    <p className="text-[12px] opacity-60 pb-2">Logo</p>
                    <div className="border border-gray-300 rounded-md p-2 flex justify-center">
                        <Image
                            key={editedProyecto?.id} 
                            src={`https://spaces.erp-devarana.mx/${editedProyecto?.logo}`} 
                            alt={editedProyecto?.nombre} 
                            className='object-cover max-h-32 max-w-full mx-auto'
                            fallback="data:image/png;base64,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"
                        />
                    </div>
                </>
            }
            
            <div {...getRootProps({className: 'dropzone w-full border rounded-md p-3 flex flex-col justify-center items-center cursor-pointer border-dashed border-secondary my-5'})}>
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

            <div className="justify-between flex">
                <Button type="default" htmlType="button" onClick={ () => navigate(-1)}> Cancelar </Button>
                <Button type="ghost" htmlType="submit"> Guardar </Button>
            </div>
        </Form>

    </>
    );
}
 
export default EditProyectos;