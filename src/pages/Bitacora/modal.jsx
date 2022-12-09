import { Button, Divider, Form, Input, Modal, Switch } from 'antd';
import moment from 'moment';
import React from 'react'

const initialData = {
    titulo: '',
    descripcion: '',
    imagenes: false,
    comentarios: false,
}

export const ModalBitacora = ({setIsModalOpen, isModalOpen, bitacoraPreview, selectedOption}) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit = () => {
        const query = {...form.getFieldsValue(), selectedOption}  ;
        console.log(query)
    }

  return (
    <Modal title="Configurar Reporte" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
        footer={[
            <Button key="back" onClick={handleCancel}>
                Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={onSubmit}>
                Generar
            </Button>,
        ]}
    >
        <Form action="" layout='vertical' form={form} initialValues={initialData} onFinish={onSubmit}>

            <Form.Item 
                label="Título:" 
                name="titulo" 
                rules={[{
                        required: true,
                        message: 'El título es requerido',
                    }]}
            >
                <Input type="text" />
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
            {bitacoraPreview.length > 0 && bitacoraPreview.map((item, index) => (
                <li className='list-decimal list-inside' key={index}>{`${item.titulo} - ${item.tipo_bitacora.nombre} - ${moment(item.fecha,'YYYY-MM-DD').format('DD/MM/YYYY')}`}</li>
            ))}            
        </ul>
    </Modal>
  )
}
