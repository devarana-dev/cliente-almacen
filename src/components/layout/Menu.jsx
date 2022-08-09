import { Menu } from "antd";
import { SettingOutlined, AppstoreOutlined, LogoutOutlined,UserOutlined  } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import { hasPermission, groupPermission} from "../../utils/hasPermission";
import { useSelector } from "react-redux";


export default function LayoutMenu ({collapsed, setCollapsed}) {

    const { userPermission } = useSelector(state => state.permisos);
    
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
        setCollapsed(!collapsed)
	}

    const items = [
	getItem('Inicio', '/', <AppstoreOutlined />),
    groupPermission( userPermission, ['/crear-vales', '/ver-vales']) ?
    getItem('Vales', 'sub1', <LogoutOutlined />, [
        hasPermission(userPermission, '/crear-vales') ? getItem('Generar', '/vales-salida/nuevo') : null,
        hasPermission(userPermission, '/ver-vales') ? getItem('Consultar', '/vales-salida') : null,
    ]) 
    : null,
    groupPermission( userPermission, ['/ver-usuarios', '/ver-roles', '/ver-insumos', '/ver-obras', '/ver-niveles', '/ver-zonas', '/ver-actividades', '/ver-personal']) ?
        getItem('Gestión', 'sub3', <SettingOutlined />, [
            groupPermission( userPermission, ['/ver-usuarios', '/ver-roles']) ?
                getItem('Usuarios', 'subsub1', <UserOutlined />, [
                    hasPermission(userPermission, '/ver-usuarios') ? getItem('Usuario', '/usuarios'): null,
                    hasPermission(userPermission, '/ver-roles') ? getItem('Roles', '/roles') : null,
                ], 'group')
            : null,
            groupPermission( userPermission, ['/ver-insumos', '/ver-obras', '/ver-niveles', '/ver-zonas', '/ver-actividades', '/ver-personal']) ?
                getItem('Generales', 'subsub2', <UserOutlined />, [
                    hasPermission(userPermission, '/ver-insumos') ? getItem('Insumos', '/insumos') : null,
                    hasPermission(userPermission, '/ver-obras') ? getItem('Obras', '/obra') : null,
                    hasPermission(userPermission, '/ver-niveles') ? getItem('Niveles', '/niveles') : null,
                    hasPermission(userPermission, '/ver-zonas') ? getItem('Zonas', '/zonas') : null,
                    hasPermission(userPermission, '/ver-actividades') ? getItem('Actividades', '/actividades') : null,
                    hasPermission(userPermission, '/ver-personal') ? getItem('Trabajadores', '/personal') : null,
                ], 'group')
            : null,		
        ])
    : null ,
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
