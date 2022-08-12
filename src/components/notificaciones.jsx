import { BellOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { getNotificationesAction, updateNotificationeAction } from '../actions/notificationActions';

const Notificaciones = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { notificaciones } = useSelector( state => state.notificaciones)
    const { userAuth } = useSelector( state => state.auth)
    const [active, setActive] = useState(true)


    const [options, setOptions] = useState([{
        key: '1',
        label: 'No hay notificaciones'
    }])

    useEffect(() => {
        const accessToken = userAuth.token || localStorage.getItem('accessToken')
       if(accessToken){
            const socket = io(process.env.REACT_APP_SERVER, {
                auth: { accessToken: accessToken },
            });
            
            //enviar usuario userAuth
            socket.emit('user', userAuth);
            socket.on('user', (data) => {
                console.log(data)
            } )
    

            socket.on('connect_error', () => {
                setTimeout( () => socket.connect(), 5000)
            })
            socket.on('notificacion', (data) => {
                dispatch(getNotificationesAction())
                data.map( item => {
                    notification.open({
                        message: "Nueva Notificación",
                        description: item.label,
                        key: item.uuid,
                        type: 'info',
                        onClick: () => {
                            navigate('/vales-salida');
                            notification.close(2);
                        }
                    }, 1000)
                })
            })
            socket.on('disconnect', () => console.log("Server disconnected"))
            
            dispatch(getNotificationesAction())
        // eslint-disable-next-line
       }
    }, [userAuth]);

   

    useEffect(() => {
        setOptions(
            notificaciones.map( (item, i) => (
                { key: i, type: 'group', label: `${item.titulo}`, children:[ {key: item.id , label: `${item.mensaje}`}] }
            ))
        )

    }, [notificaciones])

    const getNotificacionesCount = () => {
        let countNotification = 0
        notificaciones.filter(item => item.status ? countNotification++ : countNotification )
        return countNotification
    }

    

    const menu = () => {
        return <Menu items={options} /> 
    }
    const handleVisit = () => {
        if(active && notificaciones.length > 0){
            dispatch(updateNotificationeAction())
        }
    }

    return ( 
    <>

        <Dropdown overlay={menu} placement="bottomRight" className='my-auto' trigger={['click']} onVisibleChange={ () => setActive(!active)} disabled={options.length === 0}>
            <Badge count={getNotificacionesCount()} showZero overflowCount={10}>
                <Button type='icon-ghost' onClick={  handleVisit }>
                    <BellOutlined className="text-xl" />
                </Button>
            </Badge>
        </Dropdown>
        
    </>
     );
}
 
export default Notificaciones;