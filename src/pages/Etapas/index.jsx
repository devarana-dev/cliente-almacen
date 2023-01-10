
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEtapaAction, getEtapasAction } from '../../actions/etapasActions';
import openNotificationWithIcon from '../../hooks/useNotification';
import { cleanErrorAction } from '../../actions/globalActions';
import { groupPermission, hasPermission } from '../../utils/hasPermission';
import Forbidden from '../../components/Elements/Forbidden';

const Etapas = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { etapas, isLoading, errors, deleted} = useSelector(state => state.etapas);
    const { userPermission } = useSelector(state => state.permisos);
    
    useEffect(() => {

        dispatch(getEtapasAction())
        //  clean state
        return () => {
            dispatch(cleanErrorAction())
        }
    // eslint-disable-next-line
    }, [])

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
        },
        {
            title: 'Estatus',
            render: (record) => record.status ? 'Activo' : 'Inactivo',
        },
        
        {
            title: 'Acciones',
            render: (render) => 
            <div className='flex justify-around'> 
                { hasPermission(userPermission, 'editar personal') ? <Button type='icon-warning' onClick={ () => navigate(`${render.id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                {
                    hasPermission(userPermission, 'eliminar personal') ? 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(render.id) } title="Deseas eliminar este elemento ?"> 
                    <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                </Popconfirm> : null
                }
            </div>,
            width: groupPermission(userPermission, ['editar personal', 'eliminar personal']) ? 100 : 0,
            className: groupPermission(userPermission, ['editar personal', 'eliminar personal']) ? 'block' : 'hidden',
        }
        
    ];

	const handleDelete = (id) => {
        dispatch(deleteEtapaAction(id))
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
            openNotificationWithIcon('success', 'El insumo se ha eliminado')
        }
    }

    const handleSearchByName = (e) => {
        const search = e.target.value
        dispatch( getEtapasAction({search}) )
    }


    if(!hasPermission(userPermission, 'ver personal')) return <Forbidden />

    return ( 
    <>
        <div className='py-2 flex justify-end'>          
        {
            hasPermission(userPermission, 'crear personal') ?
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
        <Table scroll={{ x: 'auto'}}  columns={columns} dataSource={etapas} loading={isLoading} showSorterTooltip={false} rowKey={ record => record.id } />
    </>
    );
}
 
export default Etapas;