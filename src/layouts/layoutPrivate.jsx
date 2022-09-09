import { Layout, Button, Modal, notification, Switch, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import authProvider from "../provider/authProvider";
import "../assets/scss/layout.scss"

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    SwapOutlined,
    PlusCircleOutlined,
    AlertOutlined,
  } from '@ant-design/icons';

import { BiSearchAlt } from 'react-icons/bi'
import { IoHome } from 'react-icons/io5'
import {AiOutlineUserAdd,AiOutlineLogout} from 'react-icons/ai'

import MenuLayout from "../components/layout/Menu";
import { validateLoginAction } from "../actions/authActions";
import Notificaciones from "../components/notificaciones";
import tokenAuth from "../config/tokenAuth";
import Logotipo from "../assets/img/LogoDevarana.png"
import { Footer } from "antd/lib/layout/layout";

import { logoutAction } from '../actions/authActions'
import { getPermisoAction } from "../actions/permisosActions";
import Notas from "../components/Notas";
import { groupPermission, hasPermission } from "../utils/hasPermission";

export default function LayoutPrivate({children}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { Header, Sider, Content } = Layout
    const [collapsed, setCollapsed] = useState(false);

    const { userPermission } = useSelector(state => state.permisos);
    const { isAuthenticated, token, isLoading, errors, logout } = useSelector( state => state.auth )
    const [hiddeable, setHiddeable] = useState(localStorage.getItem('sideBar') || false)
    const [visible, setVisible] = useState(false);
    const [visibleNotas, setVisibleNotas] = useState(false);
  
    tokenAuth(token)
    const isAuth = authProvider()    
    useEffect(() => {
        setHiddeable(localStorage.getItem('sideBar') || false)
        dispatch(validateLoginAction(isAuth))
        // eslint-disable-next-line
        return () => {
            dispatch(getPermisoAction())
        }
    }, [dispatch, isAuth])

 
    if( (isAuthenticated || isAuth.isAuthenticated) === false && !isLoading ){
        navigate("/login")
    }

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
            navigate('/login')
        }
        if(errors){
            // error
            notification['error']({
                message: 'Ha habido un error',
                description: errors
            })
        }
        return () => {
            dispatch(getPermisoAction())
        }
        
        // eslint-disable-next-line
    }, [logout])


    return (        
        <Layout className="layout">
            
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
                <Header className="layout-right__header hidden lg:flex"> 
                    <div>
                        {/* <Switch className="bg-dark" checkedChildren="On" unCheckedChildren="Off" defaultChecked={hiddeable} onChange={() => handleSidebar(!hiddeable)}/> */}
                        <button onClick={() => setCollapsed(!collapsed)}> {collapsed ? <MenuUnfoldOutlined className="text-2xl sm:text-dark sm:bg-transparent bg-primary text-white pb-1 px-2 rounded "/> : <MenuFoldOutlined className="text-2xl sm:text-dark sm:bg-transparent bg-primary text-white pb-1 px-2 rounded "/>} </button>
                    </div>
                    <div>
                        <Button className="ml-5" type="icon-primary" onClick={showModalNotas }>  <AlertOutlined className="text-xl text-dark"/> </Button>
                        {isAuth.isAuthenticated ? <Notificaciones/> : null }
                        <Button className="ml-5" type="icon-primary" onClick={showModal }>  <LogoutOutlined className="text-xl"/> </Button>
                    </div>
                    
                </Header>
                <Content className="layout-right__content"> 
                    <img src={Logotipo} alt="" className='mx-auto block lg:hidden max-w-full pb-3'/>
                    {children} 
                </Content>
            </Layout>
            <Footer className="block lg:hidden">
                <div className="footer">
                    <Link to={'/'} className="block w-full h-auto text-center footer__link">
                        <div className="footer__link-icon"> 
                            <IoHome className="m-auto"/> 
                            <p> Home </p>
                        </div>
                    </Link>
                    {/* <Link to={'/vales-salida/nuevo'} className="block w-full h-auto text-center footer__link">
                        <div className="footer__link-icon"> 
                            <MdLibraryAddCheck className="m-auto"/> 
                            <p> Crear Vale </p>
                        </div>
                    </Link> */}
                    <Link to={'/vales-salida'} className="block w-full h-auto text-center footer__link">
                    <div className="footer__link-icon"> 
                            <BiSearchAlt className="m-auto"/> 
                            <p> Consultar </p>
                        </div>
                    </Link>
                    <Link to={'/personal'} className="block w-full h-auto text-center footer__link">
                        <div className="footer__link-icon"> 
                            <AiOutlineUserAdd className="m-auto"/> 
                            <p> Personal </p>
                        </div>
                    </Link>
                    <Link to={'/prestamos'} className="block w-full h-auto text-center footer__link">
                        <div className="footer__link-icon"> 
                            <SwapOutlined className="m-auto"/> 
                            <p> Préstamos </p>
                        </div>
                    </Link>
                    <div className="block w-full h-auto text-center footer__link cursor-pointer">
                        <div className="footer__link-icon" onClick={showModal }> 
                            <AiOutlineLogout className="m-auto" />
                            <p> Salir </p>
                        </div>
                    </div>
                </div>

                {
                groupPermission(userPermission, ['crear vales', 'crear personal']) ?
                
                    <Dropdown
                        className="fixed right-7 bottom-24 z-50"
                        overlay={<Menu
                            items={
                                [
                                    hasPermission(userPermission, 'crear vales') ?
                                    {
                                        key: '5',
                                        label: (
                                        <Link className="dropDownResponsive" to={'/vales-salida/nuevo'}>
                                            Crear Vale
                                        </Link>
                                        ),
                                    }:
                                    null,
                                    hasPermission(userPermission, 'crear personal') ?
                                    {
                                        key: '6',
                                        label: (
                                        <Link className="dropDownResponsive" to={'/personal/create'}>
                                            Registrar Personal
                                        </Link>
                                        ),
                                    } : null
                                ]
                            }
                        />}
                        placement="topRight"
                        trigger={'click'}
                        arrow={{
                            pointAtCenter: true,
                        }}
                        >
                        <Button type='icon-secondary-new'><PlusCircleOutlined className='py-1'/></Button>
                    </Dropdown>
                    : null 
                }
                
                
            </Footer>

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

            <Modal 
                title="Notas de Versión"
                visible={visibleNotas}
                footer={false}
                onCancel={hideModalNotas}
                width={ 1000 }
                >
                < Notas />
            </Modal>
        </Layout>
    )
};
