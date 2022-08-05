import { BellOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getNotificationesAction, updateNotificationeAction } from '../actions/notificationActions';

const Socket = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
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
        setOptions([{
            key: '1',
            label: 'No hay notificaciones'
        }])
        
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

    

    const menu = <Menu items={options} className="py-3" /> 

    const handleVisit = () => {
        setOptions(
            notificaciones.map( (item, i) => (
                { key: i, type: 'group', label: `${item.titulo}`, children:[ {key: item.id , label: `${item.mensaje}`}] }
            ))
        )
        if(active){
            dispatch(updateNotificationeAction())
        }
        
    }

    return ( 
    <>

        <Dropdown overlay={menu} placement="bottomRight" className='my-auto' trigger={['click']} onVisibleChange={ () => setActive(!active)}>
            <Badge count={getNotificacionesCount()} showZero overflowCount={10}>
                <Button type='icon-ghost' onClick={  handleVisit }>
                    <BellOutlined className="text-xl" />
                </Button>
            </Badge>
        </Dropdown>
        
    </>
     );
}
 
export default Socket;