import { notification } from 'antd'
import { useEffect } from 'react'


export const AntdNotification = ({ type, errors }) => {

    let description = ''
    let message = ''
    console.log(errors, type);

    switch (type) {
        case 'success':
            message = 'Correcto!'
        break;
        case 'error':
            message = 'Parece que hubo un problema'
        break;
        case 'warning':
            message = 'Atención!'
        break;
        case 'info':
            message = 'Información'
        break;   
        default:
            break;
    }

    useEffect(() => {
        notification[type]({
            message,
            description:errors,
        })
    }, [type, message, description, errors])

    return null
}
