import { Menu } from "antd";
import { SettingOutlined, AppstoreOutlined, LogoutOutlined,UserOutlined  } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";

export default function LayoutMenu () {

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


    const items = [
	getItem('Inicio', '/', <AppstoreOutlined />),
	getItem('Vales', 'sub1', <LogoutOutlined />, [
		getItem('Vale Salida', '/vales-salida/nuevo'),
		getItem('Consultar Vales', '/vales-salida'),
	]),
	getItem('Gestión', 'sub3', <SettingOutlined />, [
		getItem('Usuarios', 'subsub1', <UserOutlined />, [
			getItem('Roles', '/roles'),
			getItem('Usuario', '/usuarios'),
     	], 'group'),
		getItem('Vales', 'subsub2', <UserOutlined />, [
			getItem('Carga Insumos', '/carga-insumos'),
			// getItem('U. de medida', '/unidades'),
			getItem('Niveles', '/niveles'),
			getItem('Zonas', '/zonas'),
			getItem('Actividades', '/actividades'),
			getItem('Centro Costos', '/centros-costo'),
      	], 'group'),		
	]),
      ];

    return (
        <Menu
			className="layout__menu"
			mode="inline"
			items={items}
			onClick={ (item) => (navigate(item.key) )}
			defaultSelectedKeys={[`${url}`]}
        />
    )
    
};
