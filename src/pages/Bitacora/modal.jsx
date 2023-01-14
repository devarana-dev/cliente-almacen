import { Button, Divider, Form, Input, Modal, Switch } from 'antd';
import moment from 'moment';
import React from 'react'
import { useDispatch } from 'react-redux';
import { generarReporte } from '../../actions/bitacoraActions';

const initialData = {
    titulo: '',
    descripcion: '',
    imagenes: false,
    comentarios: false,
}

export const ModalBitacora = ({setIsModalOpen, isModalOpen, selectedPreview, selectedOption}) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const onSubmit = () => {

        form.validateFields().then( () => {
            const query = {...form.getFieldsValue(), selectedOption}  ;
            dispatch(generarReporte(query))

        }).catch( err => console.log(err))

    }

  return (
    <Modal title="Configurar Reporte" visible={isModalOpen} onOk={ handleOk } onCancel={handleCancel} destroyOnClose={true}
        footer={[
            <Button key="back" onClick={handleCancel}>
                Cancelar
            </Button>,            
            <Button htmlType='submit' type='primary' onClick={ () => onSubmit()}>
                Generar
            </Button>,
        ]}
    >
        <Form layout='vertical' form={form} initialValues={initialData} onFinish={onSubmit} noValidate>

            <Form.Item 
                label="Título:" 
                name="titulo" 
                rules={[{
                        required: true,
                        message: 'El título es requerido',
                    }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item label="Descripción:" name="descripcion">
                <Input.TextArea />
            </Form.Item>
            <div className='grid grid-cols-2'>
                <Form.Item label="Incluir Imágenes" name="imagenes" id="imagenes" valuePropName="checked" className='col-span-1'>
                    <Switch />
                </Form.Item>
                <Form.Item label="Incluir Comentarios" name="comentarios" id="comentarios" valuePropName="checked" className='col-span-1'>
                    <Switch />
                </Form.Item>
            </div>

        </Form>

        <Divider />

        <p className='font-bold'>Listado de registros a incluir:</p>
        <ul className='max-h-28 h-auto overflow-y-auto'>
            {selectedPreview.length > 0 && selectedPreview.map((item, index) => (
                <li className='list-decimal list-inside' key={index}>{`${item.titulo} - ${item.tipo_bitacora.nombre} - ${moment(item.fecha,'YYYY-MM-DD').format('DD/MM/YYYY')}`}</li>
            ))}            
        </ul>
    </Modal>
  )
}
