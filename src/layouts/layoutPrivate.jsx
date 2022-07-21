import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import authProvider from "../provider/authProvider";

import "../assets/scss/layout.scss"

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import Menu from "../components/layout/Menu";
import { validateLoginAction } from "../actions/authActions";
import Socket from "../components/socket";
import Logout from "../components/layout/Logout";
import tokenAuth from "../config/tokenAuth";

export default function LayoutPrivate({children}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { Header, Sider, Content } = Layout
    const [collapsed, setCollapsed] = useState(false);

    const isAuth = authProvider()
    const { isAuthenticated } = useSelector( state => state.auth )
    const { isLoading } = useSelector( state => state.auth )
  
    

    useEffect(() => {
        dispatch(validateLoginAction(isAuth))
        tokenAuth(isAuth.token)
        // eslint-disable-next-line
    }, [isAuth])

    if( (isAuthenticated || isAuth.isAuthenticated) === false && !isLoading ){
        navigate("/login")
    }

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
                Logotipo
            </div>
            <Menu collapsed={collapsed} setCollapsed={setCollapsed}/>
            
            </Sider>
            <Layout className="layout-right">
                <Header className="layout-right__header hidden sm:flex"> 
                    <button onClick={() => setCollapsed(!collapsed)}> {collapsed ? <MenuUnfoldOutlined className="text-2xl sm:text-dark sm:bg-transparent bg-primary text-white pb-1 px-2 rounded "/> : <MenuFoldOutlined className="text-2xl sm:text-dark sm:bg-transparent bg-primary text-white pb-1 px-2 rounded "/>} </button>
                    <div>
                        <Socket/>
                        <Logout/>
                    </div>
                    
                </Header>
                <Content className="layout-right__content"> 
                    {children} 
                </Content>
            </Layout>
        </Layout>

    )



};
