
import { CheckCircleOutlined, ScheduleOutlined, StopOutlined, SwapOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Image, Modal, Table, Tag } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllPrestamosAction, updatePrestamoAction } from '../../actions/prestamoActions.js';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { cleanErrorAction } from '../../actions/globalActions';

const Prestamo = () => {

    const dispatch = useDispatch();

    const [ dataSource, setDataSource ] = useState([]);
    const { prestamos, isLoading, errors, updated} = useSelector(state => state.prestamos);
    const { userAuth } = useSelector(state => state.auth)

    const [visible, setVisible] = useState(false);

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

    useEffect(() => {
        dispatch(getAllPrestamosAction())
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
		setDataSource( prestamos )
    }, [prestamos])


    const columns = [
        {
            title: 'Corresponde a',
            dataIndex: 'record',
            key: 'record',
            sorter: (a, b) => a.residente.nombre.localeCompare(b.residente.nombre),
            ...getColumnSearchProps('record'),
            ellipsis: true,
            render: (text, record) => (
                <>
                 <div className='flex flex-row items-center'>
                 <Avatar crossOrigin='anonymous' src={ <Image src={ record.belongsTo !== userAuth.id ? record.residente.picture : record.owner.picture  } /> } />
                 <p className='ml-4'> {record.belongsTo === userAuth.id ? record.residente.nombre : record.owner.nombre}  </p>
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
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
            render: (text, record ) => (
            <>
            {
                record.belongsTo === userAuth.id ?
                <Badge status='default' text='Yo pedí' />
                :
                <Badge status='processing' text='Me pidieron' />
            }
            </>
            )
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
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (text, record) => 
            <div className='flex justify-start'> 
                {   
                record.status ===  1 ? // nuevo
                    record.belongsTo === userAuth.id ? 
                    <>
                        <Button type='icon-danger' onClick={ () => handleAction(record.id, 'cancel') }> <StopOutlined className='text-xl'/> </Button> 
                    </>    
                    : 
                    <>
                        <Button type='icon-primary' onClick={ () => handleAction(record.id, 'approve') }> <CheckCircleOutlined className='text-xl'/> </Button> 
                        <Button type='icon-danger' onClick={ () =>  handleAction(record.id, 'cancel') }> <StopOutlined className='text-xl'/> </Button> 
                    </>

                    : record.status === 2 && record.belongsTo === userAuth.id ? // autorizado
                        <Button type='icon-primary' onClick={ () =>  handleAction(record.id, 'return') }> <SwapOutlined className='text-xl'/> </Button>
                    : record.status === 4 && record.belongsTo !== userAuth.id ? // devuelto
                        <Button type='icon-danger' onClick={ () =>  handleAction(record.id, 'verify') }> <ScheduleOutlined className='text-xl'/> </Button>
                : null
                }
                
            </div>,
            width: '5%',
        }
        
    ];



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
                title = '¿Estás seguro que quieres aprovarlo?'
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
    
    


    return ( 
    <>
        <div className='py-2 flex justify-end'>          
        </div>

        <Table scroll={{ x: 'auto'}} rowKey={record => record.id} columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
        <Modal
        visible={visible}
        okText="Si"
        cancelText="Cancelar"
        title="Confirmación"
        footer={[
            <Button type='default' onClick={hideModal}> Cancelar </Button>,
            <Button type='ghost' onClick={handleSubmit}> Guardar</Button>
        ]}
        
      >
        <p>{options.title}</p>
      </Modal>
    </>
    );
}
 
export default Prestamo;