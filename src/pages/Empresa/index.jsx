
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEmpresaAction, getAllEmpresaAction } from '../../actions/empresaActions';
import { cleanErrorAction } from '../../actions/globalActions';
import Forbidden from '../../components/Elements/Forbidden';
import openNotificationWithIcon from '../../hooks/useNotification';
import { groupPermission, hasPermission } from '../../utils/hasPermission';

const Empresa = () => {

        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { empresas, isLoading, errors, deleted} = useSelector(state => state.empresas);
        const { userPermission } = useSelector(state => state.permisos);

        useEffect(() => {
            dispatch(getAllEmpresaAction())
        // eslint-disable-next-line
        }, [])

        const columns = [
                {
                    title: 'Nombre Completo',
                    dataIndex: 'nombreCompleto',
                    key: 'nombre',
                },
                {
                    title: 'Nombre Corto',
                    dataIndex: 'nombreCorto',
                    key: 'nombreCorto',
                },
                {
                    title: 'RFC',
                    dataIndex: 'rfc',
                    key: 'rfc',
                },
                {
                    title: 'Telefono',
                    dataIndex: 'telefono',
                    key: 'telefono',
                },
                {
                    title: 'Estatus',
                    key: 'status',
                    render: (record) => ( record.status ? <span>Activo</span> : <span>Inactivo</span> ),
                },                
                {
                    title: 'Acciones',
                    dataIndex: 'acciones',
                    key: 'acciones',
                    render: (id) => 
                    <div className='flex justify-around'> 
                        { hasPermission(userPermission, 'editar empresas') ? <Button type='icon-warning' onClick={ () => navigate(`${id}`) }> <EditOutlined className='text-xl'/> </Button>  : null } 
                        {
                            hasPermission(userPermission, 'eliminar empresas') ? 
                        <Popconfirm placement='topRight' onConfirm={ () => handleDelete(id) } title="Deseas eliminar este elemento ?"> 
                            <Button type='icon-danger'> <DeleteOutlined className='text-xl'/> </Button> 
                        </Popconfirm> : null
                        }
                    </div>,
                    width: groupPermission(userPermission, ['editar empresas', 'eliminar empresas']) ? 100 : 0,
                    className: groupPermission(userPermission, ['editar empresas', 'eliminar empresas']) ? 'block' : 'hidden',
                }
        ];

        const handleDelete = (id) => {
            dispatch(deleteEmpresaAction(id))
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
        if(!hasPermission(userPermission, 'ver empresas') && !isLoading ) return <Forbidden/>

        return ( 
        <>
            <div className='py-2 flex justify-end'>          
                {
                    hasPermission(userPermission, 'crear empresas') ?
                    <Button type='icon-secondary-new' onClick={() => navigate('create')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>
                    : null 
                }
                </div>
            <Table scroll={{ x: 'auto'}} columns={columns} dataSource={empresas} loading={isLoading} showSorterTooltip={false} rowKey={record => record.id} />
        </>
        );
}
 
export default Empresa;