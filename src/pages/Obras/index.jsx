
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteObraAction, getAllObraAction } from '../../actions/obraActions';
import Forbidden from '../../components/Elements/Forbidden';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const Obras = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const { obra, isLoading, errors, deleted} = useSelector(state => state.obras);
    const { userPermission } = useSelector(state => state.permisos);

    useEffect(() => {
        dispatch(getAllObraAction())

        setDataSource(
            obra.map( (item, i) => (
				{ key: i, acciones:item.id, ...item}
            )
        ))
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
            setDataSource(
                obra.map( (item, i) => (
					{ key: i, acciones:item.id, ...item }
                ))
		)
    },[obra])


    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          sorter: (a, b) => a.nombre.localeCompare(b.nombre),
          ...getColumnSearchProps('nombre'),
        },
        {
          title: 'Clave',
          dataIndex: 'clave',
          key: 'obra',
          ...getColumnSearchProps('clave'),
        },
        {
          title: 'Estatus',
          dataIndex: 'estatus',
          key: 'estatus',
          render: (text, record) => ( record.status ? 'Activo' : 'Inactivo' ),
          filters: [
            { 
              text: 'Activo',
              value: true
            },
                  { 
              text: 'Inactivo',
              value: false
            },
          ],
		  onFilter: (value, record) => record.status === value,
          width: 150
        },   
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => 
			<div className='flex justify-around'> 
                { hasPermission(userPermission, '/editar-obras') ? <Button type='warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='font-bold text-lg'/> </Button>  : null } 
                {
                    hasPermission(userPermission, '/eliminar-obras') ? 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                    <Button type='danger'> <DeleteOutlined className='font-bold text-lg'/> </Button> 
                </Popconfirm> : null
                }
			</div>,
            width: groupPermission(userPermission, ['/editar-obras', '/eliminar-obras']) ? 150 : 0,
            className: groupPermission(userPermission, ['/editar-obras', '/eliminar-obras']) ? 'block' : 'hidden',
        }
        
    ];

	const handleDelete = (id) => {
		dispatch(deleteObraAction(id))
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
            openNotificationWithIcon('success', 'La obra se ha eliminado')
        }
    }


    if(!hasPermission(userPermission, '/ver-obras') && !isLoading ) return <Forbidden/>

    return ( 
    <>
        <h1 className='text-dark text-2xl text-center font-medium'>Obra / CC</h1>
        <div className='py-2 flex justify-end'>
			{
                hasPermission(userPermission, '/crear-obras') ?
                    <Button type='primary' onClick={() => navigate('create')}>Agregar Nueva Obra/CC</Button>
                : null 
            }
		</div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Obras;