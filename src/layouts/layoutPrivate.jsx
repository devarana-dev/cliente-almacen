import { Layout, Button, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import authProvider from "../provider/authProvider";

import "../assets/scss/layout.scss"

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';

import { MdLibraryAddCheck } from 'react-icons/md'
import { BiSearchAlt } from 'react-icons/bi'
import {AiOutlineUserAdd,AiOutlineLogout} from 'react-icons/ai'

import Menu from "../components/layout/Menu";
import { validateLoginAction } from "../actions/authActions";
import Socket from "../components/socket";
import tokenAuth from "../config/tokenAuth";
import Logotipo from "../assets/img/LogoDevarana.png"
import { Footer } from "antd/lib/layout/layout";

import { logoutAction } from '../actions/authActions'

export default function LayoutPrivate({children}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { Header, Sider, Content } = Layout
    const [collapsed, setCollapsed] = useState(false);

    const isAuth = authProvider()
    const { isAuthenticated } = useSelector( state => state.auth )
    const { isLoading, errors,  logout } = useSelector( state => state.auth )
  
    

    useEffect(() => {
        dispatch(validateLoginAction(isAuth))
        tokenAuth(isAuth.token)
        // eslint-disable-next-line
    }, [isAuth])

 
    if( (isAuthenticated || isAuth.isAuthenticated) === false && !isLoading ){
        navigate("/login")
    }

    
    const [visible, setVisible] = useState(false);

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
            <Menu collapsed={collapsed} setCollapsed={setCollapsed}/>
            
            </Sider>
            <Layout className="layout-right">
                <Header className="layout-right__header hidden sm:flex"> 
                    <button onClick={() => setCollapsed(!collapsed)}> {collapsed ? <MenuUnfoldOutlined className="text-2xl sm:text-dark sm:bg-transparent bg-primary text-white pb-1 px-2 rounded "/> : <MenuFoldOutlined className="text-2xl sm:text-dark sm:bg-transparent bg-primary text-white pb-1 px-2 rounded "/>} </button>
                    <div>
                        <Socket/>
                        <Button className="ml-5" type="primary" onClick={showModal }>  <LogoutOutlined /> </Button>
                    </div>
                    
                </Header>
                <Content className="layout-right__content"> 
                    {children} 
                </Content>
            </Layout>
            <Footer className="block sm:hidden">
                <div className="footer">
                    <Link to={'/vales-salida/nuevo'} className="block w-full h-auto text-center footer__link">
                        <div className="footer__link-icon"> 
                            <MdLibraryAddCheck className="m-auto"/> 
                            <p> Crear Vale </p>
                        </div>
                    </Link>
                    <Link to={'/vales-salida'} className="block w-full h-auto text-center footer__link">
                    <div className="footer__link-icon"> 
                            <BiSearchAlt className="m-auto"/> 
                            <p> Consultar </p>
                        </div>
                    </Link>
                    <Link to={'/personal/create'} className="block w-full h-auto text-center footer__link">
                        <div className="footer__link-icon"> 
                            <AiOutlineUserAdd className="m-auto"/> 
                            <p> Personal </p>
                        </div>
                    </Link>
                    <Link to={'/'} className="block w-full h-auto text-center footer__link">
                        <div className="footer__link-icon"> 
                            <AiOutlineLogout className="m-auto" onClick={showModal }/>
                            <p> Salir </p>
                        </div>
                    </Link>
                </div>
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
        </Layout>

        

    )



};
