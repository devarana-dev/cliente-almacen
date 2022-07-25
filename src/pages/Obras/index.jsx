
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, notification } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteObraAction, getAllObraAction } from '../../actions/obraActions';
import { AntdNotification } from '../../components/Elements/Notification';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';

const Obras = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const { obra, isLoading, errors, deleted} = useSelector(state => state.obras);

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
		dispatch(deleteObraAction(id))
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
            openNotificationWithIcon('success', 'La obra se ha eliminado')
        }
    }

    return ( 
    <>
        <h1 className='text-dark text-xl text-center font-medium'>Obra / CC</h1>
		<div className='py-2 flex justify-between'>
			<Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Regresar</Button>
			<Button type='primary' onClick={() => navigate('create')}>Agregar Nueva Obra/CC</Button>
		</div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Obras;