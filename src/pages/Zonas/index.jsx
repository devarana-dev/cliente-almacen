
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';


import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteZonaAction, getAllZonaAction } from '../../actions/zonaActions';
import Forbidden from '../../components/Elements/Forbidden';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const Zonas = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const { zonas, isLoading, errors, deleted} = useSelector(state => state.zonas);
    const { userPermission } = useSelector(state => state.permisos);    

    useEffect(() => {
        dispatch(getAllZonaAction())

        setDataSource(
            zonas.map( (item, i) => (
				{ key: i, acciones:item.id, ...item}
            )
        ))
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        
            setDataSource(
                zonas.map( (item, i) => (
					{ key: i, acciones:item.id, ...item }
                ))
		)
    }, [zonas])


    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          sorter: (a, b) => a.nombre.localeCompare(b.nombre),
          ...getColumnSearchProps('nombre'),
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
        },
        
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => 
            <div className='flex justify-around'> 
            { hasPermission(userPermission, '/editar-zonas') ? <Button type='warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='font-bold text-lg'/> </Button>  : null } 
            {
                hasPermission(userPermission, '/eliminar-zonas') ? 
            <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                <Button type='danger'> <DeleteOutlined className='font-bold text-lg'/> </Button> 
            </Popconfirm> : null
            }
        </div>,
        width: groupPermission(userPermission, ['/editar-zonas', '/eliminar-zonas']) ? 150 : 0,
        className: groupPermission(userPermission, ['/editar-zonas', '/eliminar-zonas']) ? 'block' : 'hidden',
        }
        
    ];

    const handleDelete = (id) => {
      dispatch(deleteZonaAction(id))
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
            openNotificationWithIcon('success', 'La zona se ha eliminado')
        }
    }

    if(!hasPermission(userPermission, '/ver-zonas') && !isLoading ) return <Forbidden/>

    return ( 
    <>
        <h1 className='text-dark text-xl text-center font-medium'>Zonas</h1>
        <div className='py-2 flex justify-end'>          
            {
                hasPermission(userPermission, '/crear-niveles') ?
                <Button type='primary' onClick={() => navigate('create')}>Agregar Nueva Zona</Button>
                : null 
            }
        </div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Zonas;