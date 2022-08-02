
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePersonalAction, getAllPersonalAction } from '../../actions/personalActions';
import moment from 'moment';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { cleanErrorAction } from '../../actions/globalActions';
import { groupPermission, hasPermission } from '../../utils/hasPermission';
import Forbidden from '../../components/Elements/Forbidden';

const Personal = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const {personal, isLoading, errors, deleted} = useSelector(state => state.personal);
    const { userPermission } = useSelector(state => state.permisos);

    useEffect(() => {
        dispatch(getAllPersonalAction())
    // eslint-disable-next-line
    }, [])

    useEffect(() => {

		setDataSource(
			personal.map( (item, i) => (
				{ key: i, acciones:item.id, residente: `${item.user.nombre} ${item.user.apellidoPaterno}` , ...item }
			))
		)
    },[personal])


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
          title: 'Fecha Ingreso',
          dataIndex: 'fechaIngreso',
          key: 'fechaIngreso',
          sorter: (a, b) => a.nombre.localeCompare(b.nombre),
          render: (text, record) => ( moment(record.fechaIngreso).format('DD/MM/YYYY') ),
        },
        {
          title: 'Dirigido Por',
          dataIndex: 'residente',
          key: 'residente',
          sorter: (a, b) => a.residente.localeCompare(b.nombre),
          ...getColumnSearchProps('residente'),

        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => 
            <div className='flex justify-around'> 
                { hasPermission(userPermission, '/editar-personal') ? <Button type='icon-warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                {
                    hasPermission(userPermission, '/eliminar-personal') ? 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                    <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                </Popconfirm> : null
                }
            </div>,
            width: groupPermission(userPermission, ['/editar-personal', '/eliminar-personal']) ? 100 : 0,
            className: groupPermission(userPermission, ['/editar-personal', '/eliminar-personal']) ? 'block' : 'hidden',
        }
        
    ];

	const handleDelete = (id) => {
		dispatch(deletePersonalAction(id))
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
            openNotificationWithIcon('success', 'El insumo se ha eliminado')
        }
    }

    if(isLoading) {
        return <div>Cargando...</div>
    }

    if(!hasPermission(userPermission, '/ver-personal') && !isLoading ) return <Forbidden/>
    return ( 
    <>
        <h1 className='text-dark text-xl text-center font-medium'>Lideres de Cuadrilla</h1>
        <div className='py-2 flex justify-end'>          
        {
            hasPermission(userPermission, '/crear-personal') ?
            <Button type='primary' onClick={() => navigate('create')}>Agregar</Button>
            : null 
        }
        </div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Personal;