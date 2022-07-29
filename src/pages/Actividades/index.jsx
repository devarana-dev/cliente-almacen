
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteActividadAction, getAllActividadAction } from '../../actions/actividadActions';
import { cleanErrorAction } from '../../actions/globalActions';
import { AntdNotification } from '../../components/Elements/Notification';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';

const Actividades = () => {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        const [ dataSource, setDataSource ] = useState([]);
        const {actividades, isLoading, errors, deleted} = useSelector(state => state.actividades);

        useEffect(() => {
                dispatch(getAllActividadAction())

                setDataSource(
                        actividades.map( (item, i) => (
                { key: i, acciones:item.id, ...item}
                        )
                ))
        // eslint-disable-next-line
        }, [])

        useEffect(() => {
                
            setDataSource(
            actividades.map( (item, i) => (
            { key: i, acciones:item.id, ...item }
            ))
        )
        },[actividades])


        const columns = [
                {
                    title: 'Nombre',
                    dataIndex: 'nombre',
                    key: 'nombre',
                    sorter: (a, b) => a.nombre.localeCompare(b.nombre),
                    ...getColumnSearchProps('nombre'),
                },
                {
                    title: 'Estatus',
                    dataIndex: 'estatus',
                    key: 'estatus',
                    render: (text, record) => ( record.status ? 'Activo' : 'Inactivo' ),
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
            dispatch(deleteActividadAction(id))
        }

        useEffect(() => {
            displayAlert()
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
            <h1 className='text-dark text-xl text-center font-medium'>Actividades</h1>
            <div className='py-2 flex justify-between'>
                <Button type='dark' className='visible sm:invisible' onClick={() => navigate('/')}>Inicio</Button>
                <Button type='primary' onClick={() => navigate('create')}>Agregar Nueva Actividad</Button>
            </div>
            <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
        </>
        );
}
 
export default Actividades;