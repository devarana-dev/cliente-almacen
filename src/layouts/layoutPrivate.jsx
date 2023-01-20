import { Layout, Button, Modal, notification} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from 'react-router-dom'
import "../assets/scss/layout.scss"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    AlertOutlined,
  } from '@ant-design/icons';
import MenuLayout from "../components/layout/Menu";
import Logotipo from "../assets/img/LogoDevarana.png"
import { logoutAction } from '../actions/authActions'
import { getPermisoUsuarioAction } from "../actions/permisosActions";
import Notas from "../components/Notas";
import { useAuth } from "../hooks/useAuth";
import FooterLayout from "../components/layout/Footer";
import { useSocket } from "../hooks/useSocket";
import { connectSocket } from "../actions/socketsActions";

export default function LayoutPrivate({children}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { Header, Sider, Content } = Layout
    const [collapsed, setCollapsed] = useState(false);

    const { userPermission } = useSelector(state => state.permisos);
    const { isAuthenticated, isLoading, errors, logout } = useSelector( state => state.auth )
    const [hiddeable, setHiddeable] = useState(localStorage.getItem('sideBar') || false)
    const [visible, setVisible] = useState(false);
    const [visibleNotas, setVisibleNotas] = useState(false);
  

    useAuth()

    useEffect(() => {
        setHiddeable(localStorage.getItem('sideBar') || false)

        dispatch(getPermisoUsuarioAction())
        // eslint-disable-next-line
        return () => {
            
        }
    }, [dispatch])

 
    if( (isAuthenticated) === false && !isLoading ){
        navigate("/login", { state: { from: window.location.pathname } });
    }

    // eslint-disable-next-line no-unused-vars
    const handleSidebar = () => {
        hiddeable ? localStorage.removeItem('sideBar') : localStorage.setItem('sideBar', true)
        setHiddeable(!hiddeable)
    }
    
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false); 
    const showModalNotas = () => setVisibleNotas(true);
    const hideModalNotas = () => setVisibleNotas(false); 
    const handleLogout = () => dispatch(logoutAction())

    useEffect(() => {
        if(logout && !isLoading){
            hideModal()
            navigate('/login', { replace: true })
        }
        if(errors){
            // error
            notification['error']({
                message: 'Ha habido un error',
                description: errors
            })
        }       
        // eslint-disable-next-line
    }, [logout])



    const socket = useSocket(import.meta.env.VITE_SERVER)
    dispatch(connectSocket(socket))

    return (        
        <Layout className="layout animate__animated animate__fadeIn animate__faster">
            
            <Sider 
                className="layout__sider hidden sm:block" 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    setCollapsed(broken)
                }}
            >
            <div className="h-14 p-2 text-center">
                <img src={Logotipo} alt="Logotipo" className="max-w-full p-2" />
            </div>
            <MenuLayout collapsed={collapsed} setCollapsed={setCollapsed} hiddeable={hiddeable} />
            
            </Sider>
            <Layout className="layout-right">
                <Header className="layout-right__header hidden lg:flex relative"> 
                    <div>
                        {/* <Switch className="bg-dark" checkedChildren="On" unCheckedChildren="Off" defaultChecked={hiddeable} onChange={() => handleSidebar(!hiddeable)}/> */}
                        <button onClick={() => setCollapsed(!collapsed)}> {collapsed ? <MenuUnfoldOutlined className="text-2xl sm:text-dark sm:bg-transparent bg-primary text-white pb-1 px-2 rounded "/> : <MenuFoldOutlined className="text-2xl sm:text-dark sm:bg-transparent bg-primary text-white pb-1 px-2 rounded "/>} </button>
                    </div>
                    { import.meta.env.VITE_NODE_ENV === "test" && <div className="text-red-500 bg-red-100 text-center uppercase w-full content-center max-w-sm">Versión de Pruebas</div> }
                    <div>
                        <Button className="ml-5" type="icon-primary" onClick={showModalNotas }>  <AlertOutlined className="text-xl text-dark"/> </Button>
                        <Button className="ml-5" type="icon-primary" onClick={showModal }>  <LogoutOutlined className="text-xl"/> </Button>
                    </div>
                    
                </Header>
                <Content className="layout-right__content"> 
                
                    <img src={Logotipo} alt="" className='mx-auto block lg:hidden max-w-full pb-3'/>
                    {children} 
                </Content>
            </Layout>
            <FooterLayout showModal={showModal} userPermission={userPermission} />

            <Modal
                title="Salir"
                open={visible}
                onOk={handleLogout}
                onCancel={hideModal}
                okText="Si"
                cancelText="No"
            >
                <p>Deseas cerrar sesión?</p>
            </Modal>

            <Modal 
                title="Notas de Versión"
                open={visibleNotas}
                footer={false}
                onCancel={hideModalNotas}
                width={ 1000 }
                >
                < Notas />
            </Modal>
        </Layout>
    )
};
