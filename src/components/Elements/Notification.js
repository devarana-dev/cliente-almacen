import { notification } from 'antd'
import { useEffect } from 'react'


export const AntdNotification = ({ type, errors }) => {

    let description = ''
    let message = ''

    if(typeof(errors) === 'string') {
        description = errors
    }
    else if(typeof(errors) === 'object') {
        Object.keys(errors).forEach(key => {
            description += `${key} ${errors[key]}\n`
        })
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

    useEffect(() => {
        notification[type]({
            message,
            description: errors,
        })
        // eslint-disable-next-line
    }, [])

    return null
}
