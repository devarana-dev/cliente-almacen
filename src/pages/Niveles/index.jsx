
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteNivelAction, getAllNivelesAction } from '../../actions/nivelActions';
import Forbidden from '../../components/Elements/Forbidden';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const Niveles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const { niveles, isLoading, errors, deleted } = useSelector(state => state.niveles);
    const { userPermission } = useSelector(state => state.permisos);

    useEffect(() => {
        dispatch(getAllNivelesAction())
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        
            setDataSource(
                niveles.map( (item, i) => (
					{ key: i, acciones:item.id, ...item }
                ))
		)
    },[niveles])


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
          dataIndex: 'status',
          key: 'status',
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
          render: (text, record) => ( record.status ? 'Activo' : 'Inactivo' ),
        },
        
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => 
			<div className='flex justify-around'> 
                { hasPermission(userPermission, '/editar-niveles') ? <Button type='icon-warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                {
                    hasPermission(userPermission, '/eliminar-niveles') ? 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                    <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                </Popconfirm> : null
                }
			</div>,
            width: groupPermission(userPermission, ['/editar-niveles', '/eliminar-niveles']) ? 100 : 0,
            className: groupPermission(userPermission, ['/editar-niveles', '/eliminar-niveles']) ? 'block' : 'hidden',
        }
        
    ];

	const handleDelete = (id) => {
		dispatch(deleteNivelAction(id))
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
            openNotificationWithIcon('success', 'El nivel se ha eliminado')
        }
    }

    if(!hasPermission(userPermission, '/ver-niveles') && !isLoading ) return <Forbidden/>
    
    return ( 
    <>
        <h1 className='text-dark text-3xl text-center font-bold'>Niveles</h1>
        <div className='py-2 flex justify-end'>          
        {
            hasPermission(userPermission, '/crear-niveles') ?
          <Button type='icon-secondary-new' onClick={() => navigate('create')} className="fixed right-10 bottom-8 z-50 items-center"><PlusCircleOutlined /></Button>
            : null 
        }
        </div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Niveles;