import { MoreOutlined, PlusCircleOutlined, ProfileOutlined, SwapOutlined } from "@ant-design/icons";
import { AiOutlineLogout, AiOutlineUserAdd } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { groupPermission, hasPermission } from "../../utils/hasPermission";
import { Button, Dropdown, Menu, Layout } from "antd";
const { Footer } = Layout;

export default function FooterLayout({showModal, userPermission}) {

    console.log(hasPermission(userPermission, 'crear bitacora'));
    const navigate = useNavigate();

    return (
    <>
        <Footer className="block lg:hidden z-50">
            { import.meta.env.VITE_NODE_ENV === "test" && <div className="text-red-500 bg-red-100 text-center uppercase w-full content-center absolute bottom-0 left-0 right-0 text-xs">Versión de Pruebas</div> }
            <div className="footer">
                <Link to={'/'} className="block w-full h-auto text-center footer__link">
                    <div className="footer__link-icon"> 
                        <IoHome className="m-auto"/> 
                        <p> Home </p>
                    </div>
                </Link>
                {
                        hasPermission(userPermission, 'crear vales') ?
                        <Link to={'/vales-salida'} className="block w-full h-auto text-center footer__link">
                            <div className="footer__link-icon"> 
                                    <BiSearchAlt className="m-auto"/> 
                                    <p> Consultar </p>
                                </div>
                        </Link>
                        : null
                }
                
                {
                    hasPermission(userPermission, 'crear bitacora') ?
                    <Link to={'/bitacora'} className="block w-full h-auto text-center footer__link">
                        <div className="footer__link-icon">
                            <ProfileOutlined className="m-auto"/>
                            <p> Bitácora </p>
                        </div>
                    </Link>
                    : null
                }
                <div className="block w-full h-auto text-center footer__link cursor-pointer">
                    <Dropdown 
                        overlay={
                            <Menu 
                                items={[
                                    hasPermission(userPermission, 'ver prestamos') ?
                                    {
                                        key: '2',
                                        label: 'Prestamos',
                                        icon: <SwapOutlined />,
                                        onClick: () => navigate('/prestamos')
                                    } : null,
                                    hasPermission(userPermission, 'ver personal') ?
                                    {
                                        key: '1',
                                        label: 'Personal',
                                        icon: <AiOutlineUserAdd/>,
                                        onClick: () => navigate('/personal')
                                    } : null,
                                    {
                                        key: '3',
                                        label: 'Salir',
                                        icon: <AiOutlineLogout />,
                                        onClick: () => showModal()
                                    }
                                ]}
                            />
                        }
                        trigger={['click']}
                        placement="topRight"
                    >
                        <div className="flex flex-col">
                            <MoreOutlined /> Ver más
                        </div>
                    </Dropdown>
                </div>
            </div>

            {
                groupPermission(userPermission, ['crear vales', 'crear personal', 'crear bitacora']) ?
            
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
                                        Registrar Vale
                                    </Link>
                                    ),
                                } : null,
                                hasPermission(userPermission, 'crear personal') ?
                                {
                                    key: '6',
                                    label: (
                                    <Link className="dropDownResponsive" to={'/personal/create'}>
                                        Registrar Personal
                                    </Link>
                                    ),
                                } : null,
                                hasPermission(userPermission, 'crear bitacora') ?
                                {
                                    key: '7',
                                    label: (
                                    <Link className="dropDownResponsive" to={'/bitacora/form'}>
                                        Registrar Bitacora
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
    </>
    )
};
