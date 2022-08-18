
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteUsuarioAction, getAllUsuariosAction } from '../../actions/usuarioActions';
import Forbidden from '../../components/Elements/Forbidden';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const Usuarios = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const {usuarios, isLoading, errors, deleted} = useSelector(state => state.usuarios);
    const { userPermission } = useSelector(state => state.permisos);

    useEffect(() => {
        dispatch(getAllUsuariosAction())
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(usuarios.length > 0){
            console.log(usuarios);            
            setDataSource(
                usuarios.map( (item, i) => (
                    { key: i, acciones:item.id, rol: item.role.nombre, ...item }
                ))
            )
        }
    },[usuarios])


	const handleDelete = (id) => {
		dispatch(deleteUsuarioAction(id))
	}

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, deleted])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
            dispatch( cleanErrorAction() )
            
        }
        if(deleted){
            openNotificationWithIcon('success', 'El usuario se ha eliminado')
        }
    }


    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          sorter: (a, b) => a.nombre.localeCompare(b.nombre),
          ...getColumnSearchProps('nombre'),
        },
        {
          title: 'Apellido Paterno',
          dataIndex: 'apellidoPaterno',
          key: 'apellidoPaterno',
          sorter: (a, b) => a.apellidoPaterno.localeCompare(b.apellidoPaterno),
          ...getColumnSearchProps('apellidoPaterno'),
          ellipsis: true,
        },
        {
          title: 'Apellido Materno',
          dataIndex: 'apellidoMaterno',
          key: 'apellidoMaterno',
          sorter: (a, b) => a.apellidoMaterno.localeCompare(b.apellidoMaterno),
          ...getColumnSearchProps('apellidoMaterno'),
          ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Rol Usuario',
            dataIndex: 'rol',
            key: 'rol',
            sorter: (a, b) => a.rol.localeCompare(b.rol),
            ...getColumnSearchProps('rol'),
            ellipsis: true,
        },
        {
            title: 'Puesto',
            dataIndex: 'puesto',
            key: 'puesto',
            sorter: (a, b) => a.puesto.localeCompare(b.puesto),
            ...getColumnSearchProps('puesto'),
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => 
            <div className='flex justify-around'> 
                { hasPermission(userPermission, 'editar usuarios') ? <Button type='icon-warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                {
                    hasPermission(userPermission, 'eliminar usuarios') ? 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                    <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                </Popconfirm> : null
                }
			</div>,
            width: groupPermission(userPermission, ['editar usuarios', 'eliminar usuarios']) ? 100 : 0,
            className: groupPermission(userPermission, ['editar usuarios', 'eliminar usuarios']) ? 'block' : 'hidden',
        }
        
    ];

    if(!hasPermission(userPermission, 'ver usuarios') && !isLoading ) return <Forbidden/>

    return ( 
    <>
        <div className='py-2 flex justify-end'>          
        {
            hasPermission(userPermission, 'crear usuarios') ?
           <Button type='icon-secondary-new' onClick={() => navigate('create')} className="fixed right-10 bottom-8 z-50 items-center lg:block hidden"><PlusCircleOutlined /></Button>
            : null 
        }
        </div>
        <Table scroll={{ x: 'auto' }} columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Usuarios;