import { LogoutOutlined } from '@ant-design/icons';
import { Button, Modal, notification } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../actions/authActions'

const Logout = () => {

    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {errors, isLoading, logout }  = useSelector( state => state.auth )

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    const handleLogout = () => {
        dispatch(logoutAction())
    }


    useEffect(() => {
        if(logout && !isLoading){
            hideModal()
            navigate('/login')
        }
        if(errors){
            // error
            notification['error']({
                message: 'Ha habido un error',
                description: errors
            })
        }
    }, [logout])
    return ( 

        <>
        <Button className="ml-5" type="primary" onClick={showModal }>  <LogoutOutlined /> </Button>
        <Modal
            title="Salir"
            visible={visible}
            onOk={handleLogout}
            onCancel={hideModal}
            okText="Si"
            cancelText="No"
        >
            <p>Deseas cerrar sesión?</p>
        </Modal>
        </>
     );
}
 
export default Logout;