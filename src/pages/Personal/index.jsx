
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, notification, Popconfirm, Space, Table } from 'antd';

import { useEffect, useRef, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePersonalAction, getAllPersonalAction } from '../../actions/personalActions';
import moment from 'moment';

const Personal = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const {personal, isLoading, errors} = useSelector(state => state.personal);

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

    /// Table
    
    // eslint-disable-next-line no-unused-vars
    const [searchText, setSearchText] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText('');
        confirm();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`Buscar ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Buscar
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Limpiar
              </Button>
            </Space>
          </div>
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        }
        
    });

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
            <Button type='warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='font-bold text-lg'/> </Button> 
            <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
              <Button type='danger'> <DeleteOutlined className='font-bold text-lg'/> </Button> 
            </Popconfirm>
                </div>,
            width: 150,
        }
        
    ];

	const handleDelete = (id) => {
		dispatch(deletePersonalAction(id))
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

    if(isLoading) {
        return <div>Cargando...</div>
    }

    return ( 
    <>
        <h1 className='text-dark text-xl text-center font-medium'>Lideres de Cuadrilla</h1>
        <div className='py-2 flex justify-between'>
            <Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Volver</Button>
            <Button type='primary' onClick={() => navigate('create')}>Agregar Nuevo Lider de Cuadrilla</Button>
        </div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Personal;