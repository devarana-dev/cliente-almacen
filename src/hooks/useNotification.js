import { notification } from 'antd';

export default function openNotificationWithIcon (type, errors)  {

    let description = ''
    let message = ''
 
    if(typeof(errors) === 'string') {
        description = errors
    }
    if(typeof(errors) === 'object') {
        description = 'Todos los campos son obligatorios'
    }
    
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
            message = 'Parece que hubo un problema'
            break;
    }
    notification[type]({
        message: message,
        description
    });
};