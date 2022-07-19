
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, notification } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteNivelAction, getAllNivelesAction } from '../../actions/nivelActions';
import { AntdNotification } from '../../components/Elements/Notification';
import { getColumnSearchProps } from '../../hooks/useFilter'

const Niveles = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const { niveles, isLoading, errors } = useSelector(state => state.niveles);

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
            <Button type='warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='font-bold text-lg'/> </Button> 
				<Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
					<Button type='danger'> <DeleteOutlined className='font-bold text-lg'/> </Button> 
				</Popconfirm>
            </div>,
            width: 150,
        }
        
    ];

	const handleDelete = (id) => {
		dispatch(deleteNivelAction(id))
		if (errors){
			notification['error']({
				message: 'Error al eliminar',
				description: errors
			})
		}else{
			notification['success']({
				message: 'Correcto!',
				description: 'Se ha eliminado correctamente'
			})
		}
	}

    return ( 
    <>
        <h1 className='text-dark text-xl text-center font-medium'>Niveles</h1>
        {  (errors && errors.length > 0) && <AntdNotification errors={errors} type='error'/>}
        <div className='py-2 flex justify-between'>
          <Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Regresar</Button>
          <Button type='primary' onClick={() => navigate('create')}>Agregar Nuevo Nivel</Button>
        </div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Niveles;