
import { EyeOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input, notification, Popconfirm, Space, Table, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAllValesAction } from '../../actions/valeActions';

const ValesSalida = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { vales } = useSelector( state => state.vales )
    const [ dataSource, setDataSource ] = useState([]);
    

    useEffect(() => {
        dispatch(getAllValesAction())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
		setDataSource(
			vales.map( (item, i) => (
				{ 
                    key: i, 
                    residente:`${item.user.nombre} ${item.user.apellidoPaterno} ${item.user.apellidoMaterno}`,
                    personalInfo: `${item.personal.nombre} ${item.personal.apellidoPaterno} ${item.personal.apellidoMaterno}`,
                    actividadInfo: item.actividad.nombre,
                    aciones:item.id, 
                    ...item 
                }
			))
		)
    }, [vales])



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
              onChange={(e) => {setSelectedKeys(e.target.value ? [e.target.value] : []); handleSearch(selectedKeys, confirm({closeDropdown:false}), dataIndex)}  }
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
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
            title: 'Folio',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.localCompare(b.id),
            ...getColumnSearchProps('id'),
            width: 100
        },
        {
            title: 'Elaborado Por',
            dataIndex: 'residente',
            key: 'residente',
            sorter: (a, b) => a.residente.localCompare(b.residente),
            ...getColumnSearchProps('residente'),
        },
        {
            title: 'Entregar A',
            dataIndex: 'personalInfo',
            key: 'personalInfo',
            sorter: (a, b) => a.personalInfo.localCompare(b.personalInfo),
            ...getColumnSearchProps('personalInfo'),
        },
        {
            title: 'Actividad',
            dataIndex: 'actividadInfo',
            key: 'actividadInfo',
            sorter: (a, b) => a.actividadInfo.localCompare(b.actividadInfo),
            ...getColumnSearchProps('actividadInfo'),
        },
        {
            title: 'Estatus',
            dataIndex: 'statusVale',
            key: 'statusVale',
            render: (text, record) => ( 
                record.statusVale === 1 ? <Tag color="green">Por Entregar</Tag>:
                record.statusVale === 2 ? <Tag color="lime">Borrador</Tag> :
                record.statusVale === 3 ? <Tag color="geekblue">Entregado</Tag> : ''
             ),
            filters: [
                { 
                    text: 'Por Entregar',
                    value: 1
                },
                { 
                    text: 'Borrador',
                    value: 2
                },
                { 
                    text: 'Entregado',
                    value: 3
                },
            ],
            onFilter: (value, record) => record.statusVale === value,
            width: 100
        },   
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => 
            <div className='flex justify-around'> 
				<Button type='default'> <EyeOutlined className='font-medium'/> </Button> 
				<Button type='ghost'> <SendOutlined className='font-medium'/> </Button> 
            </div>,
            width: 200,
        }
    ]




    return ( 
        <>
            <h1 className='text-dark text-xl text-center font-medium'>Vales</h1>
            <div className='py-2 flex justify-between'>
                <Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Volver</Button>
                <Button type='primary' onClick={() => navigate('create')}>Agregar Nuevo Vale</Button>
            </div>
            <Table columns={columns} dataSource={dataSource} />
        </>    
    );
}
 
export default ValesSalida;