
import { CheckCircleOutlined, EditOutlined, PlusCircleOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPrestamosAction } from '../../actions/prestamoActions.js';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { cleanErrorAction } from '../../actions/globalActions';
// import { groupPermission, hasPermission } from '../../utils/hasPermission';
// import Forbidden from '../../components/Elements/Forbidden';

const Prestamo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ dataSource, setDataSource ] = useState([]);
    const { prestamos, isLoading, errors, deleted} = useSelector(state => state.prestamos);
    const { userAuth } = useSelector(state => state.auth)
    // const { userPermission } = useSelector(state => state.permisos);

    useEffect(() => {
        dispatch(getAllPrestamosAction())
    // eslint-disable-next-line
    }, [])

    useEffect(() => {

		setDataSource( prestamos )
    },[prestamos])


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
                {   record.belongsTo === userAuth.id ? record.residente.nombre : record.owner.nombre  }
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
                {record.belongsTo === userAuth.id ? 'Yo pedí' : 'Me pidieron'}
            </>
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (id) => 
            <div className='flex justify-start'> 
                <Button type='icon-primary' onClick={ () => navigate(`${id}`) }> <CheckCircleOutlined className='text-xl'/> </Button> 
                <Button type='icon-danger' onClick={ () => navigate(`${id}`) }> <StopOutlined className='text-xl'/> </Button> 
            </div>,
            width: '5%',
        }
        
    ];



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


    return ( 
    <>
        <div className='py-2 flex justify-end'>          
            {
                <Button type='icon-secondary-new' onClick={() => navigate('create')} className="fixed right-10 lg:bottom-8 bottom-28 z-50 items-center"><PlusCircleOutlined /></Button>
            }
        </div>

        <Table scroll={{ x: 'auto'}}  columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
    </>
    );
}
 
export default Prestamo;