
import { CheckCircleOutlined, ScheduleOutlined, StopOutlined, SwapOutlined } from '@ant-design/icons';
import { Avatar, Button, Image, Modal, Segmented, Spin, Table, Tag } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getPrestamosAction, getAllPrestamosAction, updatePrestamoAction } from '../../actions/prestamoActions.js';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { cleanErrorAction } from '../../actions/globalActions';
import { hasPermission } from '../../utils/hasPermission.js';

const Prestamo = () => {

    const dispatch = useDispatch();

    const [ dataSource, setDataSource ] = useState([]);
    const { userPermission, isLoading:isLoadingPermission } = useSelector(state => state.permisos);
    const [ value, setValue ] = useState('Todos')
    const [ columns, setColumns ] = useState()
    const { prestamos, isLoading, errors, updated} = useSelector(state => state.prestamos);
    const { userAuth } = useSelector(state => state.auth)
    const [visible, setVisible] = useState(false);
    const [segment, setSegment] = useState(['Todos'])

    const showModal = () => {
      setVisible(true);
    };
  
    const hideModal = () => {
      setVisible(false);
    };

    const [ options, setOptions ] = useState({
        id: 0,
        action: '',
        title: ''
    })

    const setloadDataSource = (value) => {
        setValue(value)
        if ( value === "Todos") {
            setDataSource(prestamos)
            setColumns( hasPermission(userPermission, 'acciones prestamos') ?  defaultColumns.concat(actionsColumns)  : defaultColumns )
        }
        if ( value === "Solicité" ) {
            setColumns( hasPermission(userPermission, 'acciones prestamos') ? prestamosColumns.concat(actionsColumns)  : prestamosColumns )
            setDataSource( prestamos.filter( item => item.owner.id === userAuth.id )  )
        }
        if ( value === "Me Solicitaron") {
            setDataSource(prestamos.filter( item => item.residente.id === userAuth.id ))
            setColumns( hasPermission(userPermission, 'acciones prestamos') ? solicitudesColumns.concat(actionsColumns)  : solicitudesColumns )
        }
    }
    

    useEffect(() => {
        if(hasPermission(userPermission, 'ver prestamos')){
            dispatch(getAllPrestamosAction())
            setSegment(['Todos'])
        }else{
            dispatch(getPrestamosAction())
            setSegment(['Todos', 'Solicité', 'Me Solicitaron'])
        }
        
    // eslint-disable-next-line
    }, [userPermission])

    useEffect(() => {
		setDataSource( prestamos )
        setColumns(hasPermission(userPermission, 'acciones prestamos') ?  defaultColumns.concat(actionsColumns)  : defaultColumns )
        

        
        
    // eslint-disable-next-line
    }, [prestamos])


    const defaultColumns = [
        {
            title: 'Propietario',
            dataIndex: 'record',
            key: 'record',
            sorter: (a, b) => a.residente.nombre.localeCompare(b.residente.nombre),
            ...getColumnSearchProps('record'),
            ellipsis: true,
            render: (text, record) => (
                
                 <>
                 <div className='flex flex-row items-center'>
                 <Avatar crossOrigin='anonymous' src={ <Image src={ record.residente.picture } /> } />
                 <p className='ml-4'> { record.residente.nombre  }  </p>
                </div>
                </>
            )
        },
        {
            title: 'Solicitante',
            dataIndex: 'record',
            key: 'record',
            sorter: (a, b) => a.residente.nombre.localeCompare(b.residente.nombre),
            ...getColumnSearchProps('record'),
            ellipsis: true,
            render: (text, record) => (
                <>
                <div className='flex flex-row items-center'>
                <Avatar crossOrigin='anonymous' src={ <Image src={ record.owner.picture  } /> } />
                <p className='ml-4'> { record.owner.nombre}  </p>
               </div>
               </>
            )
        },
        {
          title: 'Insumo',
          dataIndex: 'insumo',
          key: 'insumo',
          sorter: (a, b) => a.insumo.localeCompare(b.insumo),
          ...getColumnSearchProps('insumo'),
          ellipsis: true,
          render: (text, record) => record.detalle_salida.insumo.nombre
        },
        
        {
          title: 'Cantidad',
          dataIndex: 'cantidad',
          key: 'cantidad',
          sorter: (a, b) => a.nombre.localeCompare(b.cantidad),
          ellipsis: true,
          render: (text, record) => record.detalle_salida.cantidadSolicitada
        },

        {
            title: 'Estatus',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
            <>
                {
                    record.status ===  1 ? // Nuevo
                        
                        <Tag color={'blue'}> Nuevo </Tag>
                    : record.status ===  2 ? // Autorizado
                        <Tag color={'green'}>Autorizado</Tag>
                    : record.status ===  3 ? // Rechazado
                        <Tag color={"red"}>Rechazado</Tag>
                    : record.status ===  4 ? // Devuelto
                        <Tag color={"yellow"}>Devuelto</Tag>
                    : record.status ===  5 ? // Entregado
                        <Tag color={"cyan"}>Entregado</Tag>
                    : null
                }
            </>
            )
        },
        
    ]
    
    const prestamosColumns = [
        {
            title: 'Propietario',
            dataIndex: 'record',
            key: 'record',
            sorter: (a, b) => a.residente.nombre.localeCompare(b.residente.nombre),
            ...getColumnSearchProps('record'),
            ellipsis: true,
            render: (text, record) => (
                <>
                 <div className='flex flex-row items-center'>
                 <Avatar crossOrigin='anonymous' src={ <Image src={ record.residente.picture } /> } />
                 <p className='ml-4'> { record.residente.nombre  }  </p>
                </div>
                </>
            )
        },
        {
          title: 'Insumo',
          dataIndex: 'insumo',
          key: 'insumo',
          sorter: (a, b) => a.insumo.localeCompare(b.insumo),
          ...getColumnSearchProps('insumo'),
          ellipsis: true,
          render: (text, record) => record.detalle_salida.insumo.nombre
        },
        
        {
          title: 'Cantidad',
          dataIndex: 'cantidad',
          key: 'cantidad',
          sorter: (a, b) => a.nombre.localeCompare(b.cantidad),
          ellipsis: true,
          render: (text, record) => record.detalle_salida.cantidadSolicitada
        },

        {
            title: 'Estatus',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
            <>
                {
                    record.status ===  1 ? // Nuevo
                        
                        <Tag color={'blue'}> Nuevo </Tag>
                    : record.status ===  2 ? // Autorizado
                        <Tag color={'green'}>Autorizado</Tag>
                    : record.status ===  3 ? // Rechazado
                        <Tag color={"red"}>Rechazado</Tag>
                    : record.status ===  4 ? // Devuelto
                        <Tag color={"yellow"}>Devuelto</Tag>
                    : record.status ===  5 ? // Entregado
                        <Tag color={"cyan"}>Entregado</Tag>
                    : null
                }
            </>
            )
        }
        
    ]

    const solicitudesColumns = [
        {
            title: 'Solicitante',
            dataIndex: 'record',
            key: 'record',
            sorter: (a, b) => a.residente.nombre.localeCompare(b.residente.nombre),
            ...getColumnSearchProps('record'),
            ellipsis: true,
            render: (text, record) => (
                <>
                 <div className='flex flex-row items-center'>
                 <Avatar crossOrigin='anonymous' src={ <Image src={ record.owner.picture  } /> } />
                 <p className='ml-4'> { record.owner.nombre}  </p>
                </div>
                </>
            )
        },
        {
          title: 'Insumo',
          dataIndex: 'insumo',
          key: 'insumo',
          sorter: (a, b) => a.insumo.localeCompare(b.insumo),
          ...getColumnSearchProps('insumo'),
          ellipsis: true,
          render: (text, record) => record.detalle_salida.insumo.nombre
        },
        
        {
          title: 'Cantidad',
          dataIndex: 'cantidad',
          key: 'cantidad',
          sorter: (a, b) => a.nombre.localeCompare(b.cantidad),
          ellipsis: true,
          render: (text, record) => record.detalle_salida.cantidadSolicitada
        },

        {
            title: 'Estatus',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
            <>
                {
                    record.status ===  1 ? // Nuevo
                        
                        <Tag color={'blue'}> Nuevo </Tag>
                    : record.status ===  2 ? // Autorizado
                        <Tag color={'green'}>Autorizado</Tag>
                    : record.status ===  3 ? // Rechazado
                        <Tag color={"red"}>Rechazado</Tag>
                    : record.status ===  4 ? // Devuelto
                        <Tag color={"yellow"}>Devuelto</Tag>
                    : record.status ===  5 ? // Entregado
                        <Tag color={"cyan"}>Entregado</Tag>
                    : null
                }
            </>
            )
        }
    ]

    const actionsColumns = [{
        title: 'Acciones',
        dataIndex: 'acciones',
        key: 'acciones',
        render: (text, record) => 
        <div className='flex justify-start'> 
            {   
            record.status ===  1 ? // nuevo
                record.belongsTo === userAuth.id ?
                    <Button type='icon-danger' onClick={ () => handleAction(record.id, 'cancel') }> <StopOutlined className='text-xl'/> </Button> 
                :
                <>
                    <Button type='icon-primary' onClick={ () => handleAction(record.id, 'approve') }> <CheckCircleOutlined className='text-xl'/> </Button> 
                    <Button type='icon-danger' onClick={ () =>  handleAction(record.id, 'cancel') }> <StopOutlined className='text-xl'/> </Button> 
                </>
                : record.status === 2 && record.belongsTo === userAuth.id ? // autorizado
                    <Button type='icon-primary' onClick={ () =>  handleAction(record.id, 'return') }> <SwapOutlined className='text-xl'/> </Button>

                : record.status === 4 && record.belongsTo !== userAuth.id ? // Verificar corresponde a almacén?
                    <Button type='icon-danger' onClick={ () =>  handleAction(record.id, 'verify') }> <ScheduleOutlined className='text-xl'/> </Button>
            : null
            }
            
        </div>,
        width: '5%',
    }]

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, updated])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
            dispatch( cleanErrorAction() )
            
        }
        if(updated){
            openNotificationWithIcon('success', 'El insumo se ha actualizado')
        }
    }


    const handleAction = (id, action) => {
        let title = ''
        switch (action) {
            case 'approve':
                title = '¿Apruebas la solicitud de prestamo?'
            break;
            case 'cancel':
                title = '¿Estás seguro que quieres cancelarlo?'
            break;
            case 'return':
                title = '¿Estás seguro que lo has devuelto?'
            break;
            case 'verify':
                title = '¿Estás seguro que te lo han devuelto?'
            break;
            default:
                break;
        }

        setOptions({
            id, 
            action,
            title
        })
        showModal()
        
    }

    const handleSubmit = () => {
        dispatch(updatePrestamoAction(options))
        hideModal()
        setOptions({
            id: 0,
            action: '',
            title: ''
        })
    }
    
    
    if( isLoading || isLoadingPermission ) return <Spin tip='Cargando...' size='large' className='mt-5 mx-auto'/>

    return ( 
    <>
        <div className='py-4 max-w-screen-sm w-full mx-auto'>
            <Segmented block options={segment} value={value} onChange={setloadDataSource} />
        </div>

        <Table scroll={{ x: 'auto'}} rowKey={record => record.id} columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
        <Modal
        visible={visible}
        okText="Si"
        cancelText="Cancelar"
        title="Confirmación"
        footer={[
            <Button type='default' onClick={hideModal}> Cancelar </Button>,
            <Button type='ghost' onClick={handleSubmit}> Enviar </Button>
        ]}
        
      >
        <p>{options.title}</p>
      </Modal>
    </>
    );
}
 
export default Prestamo;