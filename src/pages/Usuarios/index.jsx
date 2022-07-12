
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';

import { useEffect, useRef, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsuariosAction } from '../../actions/usuarioActions';

const Usuarios = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const {usuarios} = useSelector(state => state.usuarios);
    const {isLoading} = useSelector(state => state.usuarios);

    useEffect(() => {
        dispatch(getAllUsuariosAction())
    // eslint-disable-next-line
    }, [])

    useEffect(() => {

		setDataSource(
			usuarios.map( (item, i) => (
				{ key: i, acciones:item.id, rol: item.role.nombre, ...item }
			))
		)
    },[usuarios])

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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Rol Usuario',
            dataIndex: 'rol',
            key: 'rol',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            ...getColumnSearchProps('rol'),
            // render: (text, record) => { return record.role.nombre }
            // render: (value) => {console.log(value); }
        },
        {
            title: 'Puesto',
            dataIndex: 'puesto',
            key: 'puesto',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            ...getColumnSearchProps('puesto'),
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => <div><Button type='warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='font-bold text-lg'/> </Button> <Button type='danger' onClick={ () => navigate(`${id}`) }> <DeleteOutlined className='font-bold text-lg'/> </Button> </div>,
            width: 200,
        }
        
    ];

    if(isLoading) {
        return <div>Cargando...</div>
    }

    return ( 
    <>
        <div className='py-10 flex justify-between'>
          <h1 className='text-dark text-2xl'>Usuarios</h1>
            <Button type='primary' onClick={() => navigate('create')} className='block ml-auto'>Agregar Nuevo Usuario</Button>
        </div>
        <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Usuarios;