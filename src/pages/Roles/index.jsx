
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteRoleAction, getAllRolesAction } from '../../actions/roleActions';
import Forbidden from '../../components/Elements/Forbidden';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const Roles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const {roles, isLoading, errors, deleted} = useSelector(state => state.roles);
    const { userPermission } = useSelector(state => state.permisos);

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
                { hasPermission(userPermission, '/editar-roles') ? <Button type='icon-warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                {
                    hasPermission(userPermission, '/eliminar-roles') ? 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                    <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                </Popconfirm> : null
                }
			</div>,
            width: groupPermission(userPermission, ['/editar-roles', '/eliminar-roles']) ? 100 : 0,
            className: groupPermission(userPermission, ['/editar-roles', '/eliminar-roles']) ? 'block' : 'hidden',
        }
        
    ];

	const handleDelete = (id) => {
		dispatch(deleteRoleAction(id))
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
            openNotificationWithIcon('success', 'El rol se ha eliminado')
        }
    }

    if(!hasPermission(userPermission, '/ver-roles') && !isLoading ) return <Forbidden/>

    return ( 
    <>
        <h1 className='text-dark text-3xl text-center font-bold'>Roles</h1>
            <div className='py-2 flex justify-end'>          
            {
                hasPermission(userPermission, '/crear-roles') ?
                <Button type='icon-secondary-new' onClick={() => navigate('create')} className="fixed right-10 bottom-8 z-50 items-center"><PlusCircleOutlined /></Button>
                : null 
            }
            </div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Roles;