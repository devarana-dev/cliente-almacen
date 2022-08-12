 
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, Modal } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorAction } from '../../actions/globalActions';
import { deleteInsumoAction, getAllInsumosAction, clearUploadState } from '../../actions/insumoActions';
import Forbidden from '../../components/Elements/Forbidden';
import UploadFile from '../../components/Elements/UploadFile';

import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const Insumos = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ isModalVisible, setIsModalVisible] = useState(false);
    const [ dataSource, setDataSource ] = useState([]);
    const { insumos, isLoading, errors, deleted } = useSelector(state => state.insumos);
    const { userPermission } = useSelector(state => state.permisos);
    

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
        ellipsis:true,
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
        width: 200,
        ellipsis: true,
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
        width: 150
    },
      
    {
        title: 'Acciones',
        dataIndex: 'acciones',
        key: 'acciones',
        render: (id) => 
        <div className='flex justify-around'> 
        {   hasPermission(userPermission, '/eliminar-insumos') ? 
            <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
            </Popconfirm>
            : '-'
        }
        </div>,
        width: groupPermission(userPermission, ['/editar-obras', '/eliminar-insumos']) ? 100 : 0,
        className: groupPermission(userPermission, ['/editar-obras', '/eliminar-insumos']) ? 'block' : 'hidden',
    }
      
  ];

	const handleDelete = (id) => {
		dispatch(deleteInsumoAction(id))
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

    const showModal = () => {
		setIsModalVisible(true);
	};    
	
	const handleCancel = () => {
		setIsModalVisible(false);
        dispatch(clearUploadState())
	};
    
    
    
    if(!hasPermission(userPermission, '/ver-insumos') && !isLoading) return <Forbidden/>
    

    return ( 
    <>
		<div className='py-2 flex justify-end'>
			{
                hasPermission(userPermission, '/crear-insumos') ?
                <div>
                    <Button type='default' onClick={() => showModal()}>Importar</Button>
                    <Button type='icon-secondary-new' onClick={() => navigate('create')} className="fixed right-10 bottom-8 z-50 items-center lg:block hidden"><PlusCircleOutlined /></Button>
                </div>
                : null 
            }
		</div>
        <Table scroll={{ x: 'auto'}} columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false} />

        <Modal title="Cargar Insumo" visible={isModalVisible} footer={null} onCancel={handleCancel}>
            <UploadFile/>
        </Modal>
    </>
    );
}
 
export default Insumos;