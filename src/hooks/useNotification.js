import { notification } from 'antd';

export default function openNotificationWithIcon (type, errors)  {

    let description = ''
    let message = ''

    console.log(errors);
 
    if(typeof(errors) === 'string') {
        description = errors
    }else {
        description = 'Lo sentimos hubo problemas en el servidor intente nuevamente, si el problema persiste comuniquese con el administrador del sistema'
    }

    
    switch (type) {
        case 'success':
            message = 'Correcto!'
        break;
        case 'error':
            message = 'Error!'
        break;
        case 'warning':
            message = 'Atención!'
        break;
        case 'info':
            message = 'Información!'
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