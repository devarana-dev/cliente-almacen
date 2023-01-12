
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deletePermisoAction, getAllPermisosAction } from '../../actions/permisosActions';
import openNotificationWithIcon from '../../hooks/useNotification';

const Permisos = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {permisos, isLoadingAlt, errors, deleted} = useSelector(state => state.permisos);
    const[ filtros, setFiltros ] = useState({
        search: ''
    })


    useEffect(() => {
        dispatch(getAllPermisosAction(filtros))
    // eslint-disable-next-line
    }, [])




    const columns = [
        {
            title: 'Nombre',
            render: (text, record) => <span>{record.nombre}</span>,
            
        },
        {
            title: 'Permisos',
            render: (text, record) => <span>{record.permisos}</span>,    
        },
        
        {
            title: 'Acciones',
            render: (text, record) =>
            <div className='flex justify-around'> 
                <Button type='icon-warning' onClick={ () => navigate(`${record.id}`) }> <EditOutlined className='text-xl'/> </Button>
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(record.id) } title="Deseas eliminar este elemento ?"> 
                    <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                </Popconfirm>
			</div>,
            width: 100,
            className: 'block'
        }
        
    ];

	const handleDelete = (id) => {
		dispatch(deletePermisoAction(id))
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
            openNotificationWithIcon('success', 'El rol se ha eliminado')
        }
    }

    const handleSearchByName = (e) => {
        const search = e.target.value
        dispatch( getAllPermisosAction({search}) )
    }

    return ( 
    <>
            <div className='py-2 flex justify-end'>          
                <Button type='icon-secondary-new' onClick={() => navigate('create')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>
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
        <Table scroll={{ x: 'auto'}}  columns={columns} dataSource={permisos} loading={isLoadingAlt} showSorterTooltip={false} rowKey={ record => record.id }/>
    </>
    );
}
 
export default Permisos;