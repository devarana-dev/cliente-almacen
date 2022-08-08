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
    const [socket, setSocket] = useState(null);
    const [active, setActive] = useState(true)


    const [options, setOptions] = useState([{
        key: '1',
        label: 'No hay notificaciones'
    }])

    useEffect(() => {
        const socketIO = io(process.env.REACT_APP_SERVER, {});
        setSocket(socketIO);
        
        
        dispatch(getNotificationesAction())
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setOptions(
            notificaciones.map( (item, i) => (
                { key: i, type: 'group', label: `${item.titulo}`, children:[ {key: item.id , label: `${item.mensaje}`}] }
            ))
        )

        if(notificaciones.length > 0) {
            if( notificaciones.length === 1) {
                notification.open({
                    message: "Nueva Notificación",
                    description: notificaciones[0].mensaje + 'Has click para verla',
                    key: 2,
                    type: 'info',
                    onClick: () => {
                        navigate('/vales-salida');
                        notification.close(2);
                    }
                }, 1000)
            }else {
                notification.open({
                    message: "Nuevas Notificaciones",
                    description: notificaciones.length + " notificaciones, has click para verlas",
                    key: 1,
                    type: 'info',
                    className: 'cursor-pointer',
                    onClick: () => {
                        navigate('/vales-salida');
                        notification.close(1);
                    }
                }, 1000)
            }
            
        }
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
        if(active){
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