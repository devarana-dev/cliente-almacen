import { BellOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu } from 'antd';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Socket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io.connect(process.env.REACT_APP_SERVER);
        setSocket(socket);
    }, []);
    // console.log(socket);

    const [options, setOptions] = useState([{
        key: '1',
        label: 'No hay notificaciones'
    }])

    const menu = <Menu items={options} className="py-3" /> 

    return ( 
    <>

        <Dropdown overlay={menu} placement="bottomRight" className='my-auto' trigger={['click']}>
            <Badge count={11} showZero overflowCount={10}>
                <Button type='ghost'>
                    <BellOutlined />
                </Button>
            </Badge>
        </Dropdown>
        
    </>
     );
}
 
export default Socket;