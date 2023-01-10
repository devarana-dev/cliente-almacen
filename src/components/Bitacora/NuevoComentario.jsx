import { Button, Form } from 'antd';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanState, createComentarioAction } from '../../actions/bitacoraActions';
import openNotificationWithIcon from '../../hooks/useNotification';
import { useUploadFile } from '../../hooks/useUploadFile'
import Loading from '../Elements/Loading';

export const NuevoComentario = ({id = 0, onClose}) => {
    
    const [files, setFiles] = useState([]);
    const {getInputProps, getRootProps, isDragActive, thumbs} = useUploadFile(files, setFiles);
    const {isCreatedComment, isLoadingComment, isCreatingComment} = useSelector(state => state.bitacoras);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleSubmit = () => {
    
        const query = {...form.getFieldsValue(), files, id }  ;
        dispatch(createComentarioAction(query))

    }

    useEffect(() => {
        if(isCreatedComment){
            openNotificationWithIcon('success', 'El usuario ha sido creado correctamente')
            form.resetFields();
            setFiles([]);
            dispatch(cleanState());
        }
        // eslint-disable-next-line
    }, [isCreatedComment])
            

    
    
    return (
        <div>
                <h2 className='font-bold py-2'>Nuevo Comentario</h2>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name='comentario'
                        rules={[{ required: true, message: 'El comentario es requerido' }]}
                    >
                        <textarea rows={3} className='w-full border border-gray-300 rounded-md p-2' placeholder='Escribe un comentario' onChange={ e => form.setFieldsValue({comentario: e.target.value, id}) }></textarea>
                    </Form.Item>
                    <Form.Item>
                        <div {...getRootProps({className: 'dropzone w-full border border-gray-300 rounded-md p-2 flex flex-col justify-center items-center cursor-pointer'})}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                <p className='text-center'>Suelta el archivo aquí ...</p> :
                                <p className='text-center'>Arrastra y suelta un archivo aquí, o haz clic para seleccionar un archivo</p>
                            }
                        </div>
                        <aside className='flex flex-wrap gap-2'>
                            {thumbs}
                        </aside>
                    </Form.Item>
                    <Form.Item>
                        <div className='flex justify-between pt-10'>
                            {/* Cancelar */}
                            <Button type='ghost' htmlType='button' onClick={() => onClose()} disabled={isLoadingComment}>
                                Cancelar
                            </Button>
                            <Button type='primary' htmlType="submit" disabled={isLoadingComment || isCreatingComment }>Agregar</Button>
                        </div>
                    </Form.Item>
                    
                </Form>
                {
                    isCreatingComment && (
                        <div className='relative'>
                            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
                                <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full">
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex justify-center items-center">
                                            <Loading text={"Guardando Comentario..."}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
        
                    
                }
        </div>
    )
}
