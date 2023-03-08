
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Select, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteActividadAction, getAllActividadAction } from '../../actions/actividadActions';
import { cleanErrorAction } from '../../actions/globalActions';
import Forbidden from '../../components/Elements/Forbidden';
import { getColumnSearchProps } from '../../hooks/useFilter'
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const initialData = {
    page: 0,
    size: 10,
}

const Actividades = () => {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        const {actividades, isLoading, errors, deleted} = useSelector(state => state.actividades);
        const { userPermission } = useSelector(state => state.permisos);
        const [ filtros, setFiltros ] = useState(initialData);

        useEffect(() => {
                dispatch(getAllActividadAction(filtros))
        // eslint-disable-next-line
        }, [filtros])

        const columns = [
                {
                    title: 'Nombre',
                    dataIndex: 'nombre',
                    key: 'nombre',
                },
                {
                    title: 'Tipo Actividad',
                    dataIndex: 'type',
                    render: (text, record) => (
                        record.type === 'vales_bitacora' ? 'Vales y Bitácora' : record.type === 'vales' ? 'Vales' : 'Bitácora'
                    )
                        
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
                    render: (text, record) => 
                    <div className='flex justify-around'> 
                        { hasPermission(userPermission, 'editar actividades') ? <Button type='icon-warning' onClick={ () => navigate(`${record.id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                        {
                            hasPermission(userPermission, 'eliminar actividades') ? 
                        <Popconfirm placement='topRight' onConfirm={ () => handleDelete(record.id) } title="Deseas eliminar este elemento ?"> 
                            <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                        </Popconfirm> : null
                        }
                    </div>,
                    width: groupPermission(userPermission, ['editar actividades', 'eliminar actividades']) ? 100 : 0,
                    className: groupPermission(userPermission, ['editar actividades', 'eliminar actividades']) ? 'block' : 'hidden',
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
        if(!hasPermission(userPermission, 'ver actividades') && !isLoading ) return <Forbidden/>

        return ( 
        <>
            <div className='py-2 flex justify-end'>          
                {
                    hasPermission(userPermission, 'crear actividades') ?
                    <Button type='icon-secondary-new' onClick={() => navigate('create')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>
                    : null 
                }
                <div className='pb-3 flex justify-end'>
                <Select 
                    placeholder = 'Tipo Actividad'
                    style={{ width : '150px', marginRight: '10px'}}
                    onChange={ (value) => setFiltros({...filtros, type: value}) }
                    allowClear
                >
                    <Select.Option value="vales_bitacora">Vales y Bitácora</Select.Option>
                    <Select.Option value="vales">Vales</Select.Option>
                    <Select.Option value="bitacora">Bitácora</Select.Option>
                </Select>
                <Input type="text" 
                    style={{ width : '250px'}} 
                    allowClear
                    suffix={<SearchOutlined />}
                    placeholder="Buscar"
                    onChange={ (e) => setFiltros({...filtros, search: e.target.value}) }
                    name="busqueda"
                />            
            </div>
                </div>
            <Table scroll={{ x: 'auto'}} columns={columns} dataSource={actividades} loading={isLoading} showSorterTooltip={false}/>
        </>
        );
}
 
export default Actividades;