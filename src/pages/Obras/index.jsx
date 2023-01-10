
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, Input } from 'antd';

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
          key: 'nombre'
        },
        {
          title: 'Clave',
          dataIndex: 'clave',
          key: 'obra',
        },
        {
          title: 'Etapa',
          key: 'obra',
          render: (text, record) =>  record.etapa?.nombre || "No asignado",
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
            render: (text, record) => 
			<div className='flex justify-around'> 
                { hasPermission(userPermission, 'editar obras') ? <Button type='icon-warning' onClick={ () => navigate(`${record.id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                {
                    hasPermission(userPermission, 'eliminar obras') ? 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(record.id) } title="Deseas eliminar este elemento ?"> 
                    <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                </Popconfirm> : null
                }
			</div>,
            width: groupPermission(userPermission, ['editar obras', 'eliminar obras']) ? 100 : 0,
            className: groupPermission(userPermission, ['editar obras', 'eliminar obras']) ? 'block' : 'hidden',
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


    if(!hasPermission(userPermission, 'ver obras') && !isLoading ) return <Forbidden/>


    const handleSearchByName = (e) => {
        const search = e.target.value
        dispatch( getAllObraAction({search}) )
    }

    return ( 
    <>
        <div className='py-2 flex justify-end'>
			{
                hasPermission(userPermission, 'crear obras') ?
                  <Button type='icon-secondary-new' onClick={() => navigate('create')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>
                : null 
            }
		</div>
        <div className='pb-3 flex justify-end'>
            <Input type="text" 
                style={{ width : '250px'}} 
                onChange={ e => handleSearchByName(e) }
                allowClear
                suffix={<SearchOutlined />}
                placeholder="Buscar"
                // value={filtros.busqueda}
                name="busqueda"
            />
        </div>
        <Table columns={columns} scroll={{ x: 'auto'}}  dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Obras;