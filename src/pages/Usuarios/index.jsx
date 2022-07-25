
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteUsuarioAction, getAllUsuariosAction } from '../../actions/usuarioActions';
import { AntdNotification } from '../../components/Elements/Notification';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';

const Usuarios = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const {usuarios, isLoading, errors, deleted} = useSelector(state => state.usuarios);

    useEffect(() => {
        dispatch(getAllUsuariosAction())
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
		setDataSource(
			usuarios.map( (item, i) => (
				{ key: i, acciones:item.id, rol: item.role.nombre, ...item }
			))
		)
    },[usuarios])


	const handleDelete = (id) => {
		dispatch(deleteUsuarioAction(id))
	}

    useEffect(() => {
        displayAlert()
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
          sorter: (a, b) => a.nombre.localeCompare(b.nombre),
          ...getColumnSearchProps('apellidoPaterno'),
        },
        {
          title: 'Apellido Materno',
          dataIndex: 'apellidoMaterno',
          key: 'apellidoMaterno',
          sorter: (a, b) => a.nombre.localeCompare(b.nombre),
          ...getColumnSearchProps('apellidoMaterno'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Rol Usuario',
            dataIndex: 'rol',
            key: 'rol',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            ...getColumnSearchProps('rol'),
            // render: (text, record) => { return record.role.nombre }
            // render: (value) => {console.log(value); }
        },
        {
            title: 'Puesto',
            dataIndex: 'puesto',
            key: 'puesto',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            ...getColumnSearchProps('puesto'),
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => 
            <div className='flex justify-around'> 
				<Button type='warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='font-bold text-lg'/> </Button> 
				<Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
					<Button type='danger'> <DeleteOutlined className='font-bold text-lg'/> </Button> 
				</Popconfirm>
            </div>,
            width: 150,
        }
        
    ];

    if(isLoading) {
        return <div>Cargando...</div>
    }

    return ( 
    <>
		<h1 className='text-dark text-xl text-center font-medium'>Usuarios</h1>
		<div className='py-2 flex justify-between'>
			<Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Volver</Button>
			<Button type='primary' onClick={() => navigate('create')}>Agregar Nuevo Usuario</Button>
		</div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Usuarios;