 
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, notification } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteInsumoAction, getAllInsumosAction } from '../../actions/insumoActions';

import { getColumnSearchProps } from '../../hooks/useFilter'
const Insumos = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const { insumos, isLoading, errors } = useSelector(state => state.insumos);

    useEffect(() => {
        dispatch(getAllInsumosAction())
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setDataSource(
            insumos.map( (item, i) => (
                { key: i, acciones:item.id, ...item }
            ))
		)
    },[insumos])


  const columns = [
    {
        title: 'ID Enkontrol',
        dataIndex: 'claveEnk',
        key: 'claveEnk',
        sorter: (a, b) => a.claveEnk.localeCompare(b.claveEnk),
        ...getColumnSearchProps('claveEnk'),
        width: 150
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        sorter: (a, b) => a.nombre.localeCompare(b.nombre),
        ...getColumnSearchProps('nombre'),
    },
    {
        title: 'Centro Costo',
        dataIndex: 'centroCosto',
        key: 'centroCosto',
        sorter: (a, b) => a.centroCosto.localeCompare(b.centroCosto),
        ...getColumnSearchProps('centroCosto'),
        width: 200
    },
    {
        title: 'Unidad de Medida',
        dataIndex: 'unidadMedida',
        key: 'unidadMedida',
        sorter: (a, b) => a.unidadMedida.localeCompare(b.unidadMedida),
        ...getColumnSearchProps('unidadMedida'),
        width: 200
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
            <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                <Button type='danger'> <DeleteOutlined className='font-bold text-lg'/> </Button> 
            </Popconfirm>
        </div>,
        width: 100,
    }
      
  ];

	const handleDelete = (id) => {
		dispatch(deleteInsumoAction(id))
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
    <h1 className='text-dark text-xl text-center font-medium'>Insumos</h1>
		<div className='py-2 flex justify-between'>
			<Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Regresar</Button>
			<Button type='primary' onClick={() => navigate('create')}>Agregar Nuevo Insumo</Button>
		</div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Insumos;