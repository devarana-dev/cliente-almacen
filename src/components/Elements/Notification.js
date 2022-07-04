import { notification } from 'antd'
import { useEffect } from 'react'


export const AntdNotification = ({ type, message, description }) => {

    useEffect(() => {
        notification[type]({
            message,
            description
        })
    }, [type, message, description])

    return null
}
