import { BellOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { getNotificationesAction, updateNotificationeAction } from '../actions/notificationActions';
import { getAllPrestamosAction } from '../actions/prestamoActions';
import { getAllValesAction, getCountValeSalidaAction } from '../actions/valeActions';
import { hasPermission } from '../utils/hasPermission';


    // const accessToken = localStorage.getItem('accessToken')

    const socket = io( process.env.REACT_APP_SERVER, {
        auth: { accessToken: localStorage.getItem('accessToken') },
    });

        
const Notificaciones = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [active, setActive] = useState(true)

    
    // const { notificaciones } = useSelector( state => state.notificaciones)
    const { userPermission } = useSelector(state => state.permisos);
    const { userAuth, isLoading } = useSelector(state => state.auth)


    

    useEffect(() => {
        console.log('Conectado ?', socket.connected);

        socket.on('connected', () => {
            setIsConnected(true)
        })
        socket.on('disconnected', () => {
            setIsConnected(false)
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
        
    }, [isConnected])
    
    useEffect(() => {
        joinRoom()
        
        socket.on("recieve_vale", ({message}) => {
            console.log('Recibi vale');
            dispatch(getAllValesAction())
            dispatch(getCountValeSalidaAction())
        })

        socket.on("recieve_prestamo", ({message}) => {
            console.log('Recibi prestamos');
            dispatch(getAllPrestamosAction())
        })
    }, [socket, userPermission])
 
    

    const joinRoom = () => {

        if(userPermission && !isLoading){
            if(hasPermission(userPermission, 'entregar vales')){
                console.log('Almacenista');
                socket.emit("join_room", {user: userAuth.id, room: 'almacen'})
            }else{
                console.log('Residente');
                socket.emit("join_room", {user: userAuth.id, room: 'residente'})
            }
        }
        
    }

    // const [options, setOptions] = useState([{
    //     key: '1',
    //     label: 'No hay notificaciones'
    // }])

    // useEffect(() => {
    //     const accessToken = localStorage.getItem('accessToken')
    //     // if(accessToken){
    //         const socket = io( process.env.REACT_APP_SERVER, {
    //             auth: { accessToken },
    //         });
            

    //         socket.on('connect_error', () => setTimeout( () => socket.connect(), 5000) )

    //         socket.on('disconnect', () => console.log("Server disconnected"))
            
    //         dispatch(getNotificationesAction())

    // //    }
    // }, []);

   

    // useEffect(() => {
    //     setOptions(
    //         notificaciones.map( (item, i) => (
    //             { key: i, type: 'group', label: `${item.titulo}`, children:[ {key: item.id , label: `${item.mensaje}`}] }
    //         ))
    //     )

    // }, [notificaciones])

    // const getNotificacionesCount = () => {
    //     let countNotification = 0
    //     notificaciones.filter(item => item.status ? countNotification++ : countNotification )
    //     return countNotification
    // }

    

    // const menu = () => {
    //     return <Menu items={options} /> 
    // }
    // const handleVisit = () => {
    //     if(active && notificaciones.length > 0){
    //         dispatch(updateNotificationeAction())
    //     }
    // }

    return ( 
    <>

        {/* <Dropdown overlay={menu} placement="bottomRight" className='my-auto' trigger={['click']} onVisibleChange={ () => setActive(!active)} disabled={options.length === 0}>
            <Badge count={getNotificacionesCount()} showZero overflowCount={10}>
                <Button type='icon-ghost' onClick={  handleVisit }>
                    <BellOutlined className="text-xl" />
                </Button>
            </Badge>
        </Dropdown> */}
        
    </>
     );
}
 
export default Notificaciones;