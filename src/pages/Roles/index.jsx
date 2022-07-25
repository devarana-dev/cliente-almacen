
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteRoleAction, getAllRolesAction } from '../../actions/roleActions';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';

const Roles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const {roles, isLoading, errors, deleted} = useSelector(state => state.roles);

    useEffect(() => {
        dispatch(getAllRolesAction())

        setDataSource(
            roles.map( (item, i) => (
				{ key: i, acciones:item.id, ...item}
            )
        ))
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        
            setDataSource(
                roles.map( (item, i) => (
					{ key: i, acciones:item.id, ...item }
                ))
		)
    },[roles])


    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          sorter: (a, b) => a.nombre.localeCompare(b.nombre),
          ...getColumnSearchProps('nombre'),
        },
        {
          title: 'Descripcion',
          dataIndex: 'descripcion',
          key: 'descripcion',
          sorter: (a, b) => a.nombre.localeCompare(b.nombre),
          ...getColumnSearchProps('descripcion'),
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

	const handleDelete = (id) => {
		dispatch(deleteRoleAction(id))
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
            openNotificationWithIcon('success', 'El rol se ha eliminado')
        }
    }

    return ( 
    <>
        <h1 className='text-dark text-xl text-center font-medium'>Roles</h1>
            <div className='py-2 flex justify-between'>
                <Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Regresar</Button>
                <Button type='primary' onClick={() => navigate('create')}>Agregar Nuevo Rol</Button>
            </div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Roles;