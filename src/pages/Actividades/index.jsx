
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteActividadAction, getAllActividadAction } from '../../actions/actividadActions';
import { cleanErrorAction } from '../../actions/globalActions';
import Forbidden from '../../components/Elements/Forbidden';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const Actividades = () => {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        const [ dataSource, setDataSource ] = useState([]);
        const {actividades, isLoading, errors, deleted} = useSelector(state => state.actividades);
        const { userPermission } = useSelector(state => state.permisos);

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
                        { hasPermission(userPermission, '/editar-actividades') ? <Button type='icon-warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                        {
                            hasPermission(userPermission, '/eliminar-actividades') ? 
                        <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                            <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                        </Popconfirm> : null
                        }
                    </div>,
                    width: groupPermission(userPermission, ['/editar-actividades', '/eliminar-actividades']) ? 100 : 0,
                    className: groupPermission(userPermission, ['/editar-actividades', '/eliminar-actividades']) ? 'block' : 'hidden',
                }
                
        ];

        const handleDelete = (id) => {
            dispatch(deleteActividadAction(id))
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

        if(!hasPermission(userPermission, '/ver-actividades') && !isLoading ) return <Forbidden/>

        return ( 
        <>
            <h1 className='text-dark text-xl text-center font-medium'>Actividades</h1>
            <div className='py-2 flex justify-end'>          
                {
                    hasPermission(userPermission, '/crear-actividades') ?
                  <Button type='icon-secondary-new' onClick={() => navigate('create')} className="fixed right-10 bottom-8 z-50 items-center"><PlusCircleOutlined /></Button>
                    : null 
                }
                </div>
            <Table columns={columns} dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
        </>
        );
}
 
export default Actividades;