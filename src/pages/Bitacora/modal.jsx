import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { generarReporteAction } from '../../actions/bitacoraActions';
import { Mask } from '../../components/Mask';

const initialData = {
    titulo: '',
    descripcion: '',
    imagenes: false,
    comentarios: false,
}

export const ModalBitacora = ({setIsModalOpen, isModalOpen, selectedPreview, selectedOption, isLoadingReport, generatedReport, proyectoId, usuarios}) => {

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
            query.proyectoId = proyectoId;
            dispatch(generarReporteAction(query))

        }).catch( err => console.log(err))
    }

    useEffect(() => {
        
        if(generatedReport){
            setIsModalOpen(false);
            form.resetFields();
        }      
    }, [generatedReport])


    const validateExtraMail = () => {
        const destinatarios = form.getFieldValue('destinatarios');        
       
        const isValidEmail = email => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        };
          
        const filteredMail = destinatarios.filter( correo => isValidEmail(correo) );


        form.setFieldsValue({
            destinatarios: filteredMail
        })
    
    }
    
  return (
    <>
    
        <Modal title="Configurar Reporte" open={isModalOpen} onOk={ handleOk } onCancel={handleCancel} destroyOnClose={true}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancelar
                </Button>,            
                <Button htmlType='submit' type='primary' onClick={ () => onSubmit()} disabled={isLoadingReport}>
                    Generar
                </Button>,
            ]}
        >
            <Form layout='vertical' form={form} initialValues={initialData} onFinish={onSubmit} noValidate>
                <Form.Item 
                    label="Ingresa el título de tu reporte:" 
                    name="titulo" 
                    rules={[{
                            required: true,
                            message: 'El título es requerido',
                        }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item label="Ingresa una descripción de tu reporte" name="descripcion">
                    <Input.TextArea />
                </Form.Item>

                
                <div className='grid grid-cols-2'>
                    <Form.Item label="Incluir Imágenes" name="imagenes" id="imagenes" valuePropName="checked" className='col-span-1 '>
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Incluir Comentarios" name="comentarios" id="comentarios" valuePropName="checked" className='col-span-1 '>
                        <Switch />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Enviar a:"
                    name="destinatarios"
                >
                    <Select
                        mode='tags'
                        placeholder="Selecciona de la lista o ingresa el correo electrónico"
                        // agrupar usuarios si esInterno = true y si esInterno = false internos y externos
                        onChange={validateExtraMail}
                        options = {[
                            {
                                label: 'Interno',
                                // filtrar usuarios si esInterno = true y si su role.id  = 4 y 7
                                options: usuarios.filter( usuario => usuario.esInterno === true && (usuario.role.id === 4 || usuario.role.id === 7)).map( usuario => ({
                                    label: `${usuario.nombre} ${usuario.apellidoPaterno}`,
                                    value: usuario.email
                                }))
                            },
                            {
                                label: 'Externo',
                                options: usuarios.filter( usuario => usuario.esInterno === false).map( usuario => ({
                                    label: `${usuario.nombre} ${usuario.apellidoPaterno}`,
                                    value: usuario.email
                                }))
                            }
                        ]}
                    >
                    
                         
                         
                    </Select>
                </Form.Item>

            </Form>

            <p className='text-xs text-black text-opacity-40 text-center text-bold'>Tu archivo incluye { selectedOption.length } reporte{ selectedOption.length > 1 ? 's' : '' }</p>
            { 
                isLoadingReport ?
                    <Mask text= "Generando Reporte..."/>
                : null
            }
        </Modal>

       
    
    </>
  )
}
