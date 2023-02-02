import { useDispatch, useSelector } from 'react-redux'
import { clearAuthAction, getUserAction, loginWithPasswordAction } from '../../actions/authActions';
import {FcGoogle} from 'react-icons/fc'
import Logotipo from "../../assets/img/LogoAzulDevaranaG.png"
import { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { ArrowLeftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import openNotificationWithIcon from '../../hooks/useNotification';

export default function Login() {

    const [viewForm, setViewForm] = useState(false)
    const [form] = Form.useForm();

    const dispatch = useDispatch()

    const { errors } = useSelector( state => state.auth )

    const redirectToGoogleSSO = async ()  => {
        const googleLoginUrl = `${import.meta.env.VITE_URL}/google-login`
        window.location.href = googleLoginUrl
        // const newWindow = window.open(googleLoginUrl, "_blank", "width=500,height=600")

        // if(newWindow){
        //     const timer = setInterval(() => {
        //         if(newWindow.closed){
        //             dispatch(getUserAction())
        //             if(timer){
        //                 clearInterval(timer)
        //             }
        //         }
        //     }, 500)
        // }
    }

    const showForm = () => {
        setViewForm(!viewForm)
    }

    const handleSubmit = () => dispatch(loginWithPasswordAction(form.getFieldsValue()))
    
    useEffect(() => {
        if(errors){
            openNotificationWithIcon('error', errors.message)
        }

        return () => dispatch(clearAuthAction())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors])

    return (
        <>            
            <div className='mx-auto p-3 rounded-md align-middle h-screen flex flex-col px-5'>
            <img src={Logotipo} className="max-w-md mt-10 w-full px-2 m-auto drop-shadow" alt='Logo Devarana'/>
            {
                viewForm ?
                <div className='bg-glassmorphism w-full m-auto p-10 '>
                    <Form
                        name='login'
                        layout='vertical'
                        form={form}
                        onFinish={handleSubmit}
                        className='animate__animated animate__fadeIn animate__faster'
                    >
                        <Form.Item
                            name='email'
                            rules={[ { required: true, message: 'Por favor ingrese su correo electrónico', type: 'email' }]}

                        >                            
                            <Input placeholder='Correo Electrónico' type='email' prefix={<UserOutlined className='text-dark'/>}  className='text-dark'/>
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                        >
                            <Input.Password placeholder='Contraseña' prefix={<LockOutlined className='text-dark'/>}  className='text-dark'/>
                        </Form.Item>
                        <div className="flex justify-between">
                            <button 
                                className='text-white font-bold text-sm hover:opacity-70 flex items-center' 
                                onClick={showForm}
                                type='button'
                                >
                                <ArrowLeftOutlined className='pr-2'/> Volver
                                
                            </button>
                            <button 
                                className='flex items-center rounded-3xl border 
                                text-dark font-bold px-4 py-1 bg-white justify-around shadow-md hover:opacity-70' 
                                type='submit'>
                                Accesar
                            </button>
                        </div>
                        
                    </Form>
                </div>
                : 

                <div className='m-auto '>
                    <div className='animate__animated animate__fadeIn animate__faster'>
                        <button 
                            className='flex items-center rounded-3xl border 
                            text-dark font-bold px-4 py-1 bg-white justify-around mt-auto mb-5 mx-auto shadow-md hover:opacity-70 max-w-[200px] w-full' 
                            onClick={redirectToGoogleSSO}>  
                            <FcGoogle className='mx-2 text-lg'/> Ingresar con Google 
                        </button>
                        <button 
                            className='flex items-center rounded-3xl border 
                            text-dark font-bold px-4 py-1 bg-white justify-around mt-5 mb-auto mx-auto shadow-md hover:opacity-70 max-w-[200px] w-full' 
                            onClick={showForm}>  
                            Acceso a Externos
                        </button>
                    </div>
                </div>
            }
            </div>
        </>
    )
};
