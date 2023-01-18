
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Select, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteUsuarioAction, getAllUsuariosAction } from '../../actions/usuarioActions';
import Forbidden from '../../components/Elements/Forbidden';
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const Usuarios = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const {usuarios, isLoading, errors, deleted} = useSelector(state => state.usuarios);
    const { userPermission } = useSelector(state => state.permisos);

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


	const handleDelete = (id) => {
		dispatch(deleteUsuarioAction(id))
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
            openNotificationWithIcon('success', 'El usuario se ha eliminado')
        }
    }


    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
        },
        {
          title: 'Apellido Paterno',
          dataIndex: 'apellidoPaterno',
          key: 'apellidoPaterno',
          ellipsis: true,
        },
        {
          title: 'Apellido Materno',
          dataIndex: 'apellidoMaterno',
          key: 'apellidoMaterno',
          ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Rol Usuario',
            dataIndex: 'rol',
            key: 'rol',
            ellipsis: true,
        },
        {
            title: 'Puesto',
            dataIndex: 'puesto',
            key: 'puesto',
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => 
            <div className='flex justify-around'> 
                { hasPermission(userPermission, 'editar usuarios') ? <Button type='icon-warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                {
                    hasPermission(userPermission, 'eliminar usuarios') ? 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                    <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                </Popconfirm> : null
                }
			</div>,
            width: groupPermission(userPermission, ['editar usuarios', 'eliminar usuarios']) ? 100 : 0,
            className: groupPermission(userPermission, ['editar usuarios', 'eliminar usuarios']) ? 'block' : 'hidden',
        }
        
    ];

    const handleSearchByName = (e) => {
        const search = e.target.value
        dispatch( getAllUsuariosAction({search}) )
    }

    const handleSearchByInterno = (e) => {
        const esInterno = e
        dispatch( getAllUsuariosAction({esInterno}) )
    }

    if(!hasPermission(userPermission, 'ver usuarios') && !isLoading ) return <Forbidden/>

    return ( 
    <>
        <div className='py-2 flex justify-end'>          
        {
            hasPermission(userPermission, 'crear usuarios') ?
           <Button type='icon-secondary-new' onClick={() => navigate('create')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>
            : null 
        }
        </div>
        <div className='pb-3 flex justify-end'>
            <Select 
                placeholder = 'Interno/Externo'
                onChange={ e => handleSearchByInterno(e) }
                style={{ width : '150px', marginRight: '10px'}}
            >
                <Select.Option value={null}>Todos</Select.Option>
                <Select.Option value={1}>Interno</Select.Option>
                <Select.Option value={0}>Externo</Select.Option>
            </Select>
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
        <Table scroll={{ x: 'auto' }} columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false} rowKey={ record => record.id }/>
    </>
    );
}
 
export default Usuarios;