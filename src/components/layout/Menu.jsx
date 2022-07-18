import { Menu } from "antd";
import { SettingOutlined, AppstoreOutlined, LogoutOutlined,UserOutlined  } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";

export default function LayoutMenu ({collapsed, setCollapsed}) {

    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
    }
	const location = useLocation()
	const navigate = useNavigate()
    const url = location.pathname


	const validateCollapsed = () => {
		if(window.innerWidth < 768){
			setCollapsed(!collapsed)
		}
	}


    const items = [
	getItem('Inicio', '/', <AppstoreOutlined />),
	getItem('Vales', 'sub1', <LogoutOutlined />, [
		getItem('Generar', '/vales-salida/nuevo'),
		getItem('Consultar', '/vales-salida'),
		
	]),
	getItem('Gestión', 'sub3', <SettingOutlined />, [
		getItem('Usuarios', 'subsub1', <UserOutlined />, [
			getItem('Usuario', '/usuarios'),
			getItem('Roles', '/roles'),
     	], 'group'),
		getItem('Generales', 'subsub2', <UserOutlined />, [
			getItem('Insumos', '/insumos'),
			getItem('Obras', '/obra'),
			getItem('Niveles', '/niveles'),
			getItem('Zonas', '/zonas'),
			getItem('Actividades', '/actividades'),
			getItem('Trabajadores', '/personal'),
      	], 'group'),		
	]),
      ];

    return (
        <Menu
			className="layout__menu"
			mode="inline"
			items={items}
			onClick={ (item) =>  { navigate(item.key);  }}
			onSelect={ () =>  validateCollapsed()}
			defaultSelectedKeys={[`${url}`]}
        />
    )
    
};
