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
    const [ newNotification, setNewNotification ] = useState(0)
    const [active, setActive] = useState(true)


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

        let count = 0
        
        notificaciones.map( (item, i ) =>  (
            item.status ? count++ : null
        )) 

        setNewNotification(count)
    }, [notificaciones])
    

    const [options, setOptions] = useState([{
        key: '1',
        label: 'No hay notificaciones'
    }])

    const menu = <Menu items={options} className="py-3" /> 

    const handleVisit = () => {
        if(active){
            dispatch(updateNotificationeAction())
        }
        
    }

    return ( 
    <>

        <Dropdown overlay={menu} placement="bottomRight" className='my-auto' trigger={['click']} onVisibleChange={ () => setActive(!active)}>
            <Badge count={newNotification} showZero overflowCount={10}>
                <Button type='icon-ghost' onClick={  handleVisit }>
                    <BellOutlined className="text-xl" />
                </Button>
            </Badge>
        </Dropdown>
        
    </>
     );
}
 
export default Socket;