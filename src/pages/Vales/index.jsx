
import { CheckCircleOutlined, FrownOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Table, Tag, Modal, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deliverValeAction, getAllValesAction } from '../../actions/valeActions';
import { getColumnSearchProps } from '../../hooks/useFilter'
import {nanoid} from 'nanoid'
import '../../assets/scss/showVale.scss'
import openNotificationWithIcon from '../../hooks/useNotification';
import moment from 'moment';

const ValesSalida = () => {

    const { TextArea } = Input;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { vales, errors, delivered } = useSelector( state => state.vales )
    const [ dataSource, setDataSource ] = useState([]);
    const [ dataNestedSource, setDataNestedSource ] = useState([])
    const [ validarCantidad, setValidarCantidad ] = useState(true)
    const [activeExpRow, setActiveExpRow] = useState();

    const [visible, setVisible] = useState(false);
	
    const [ entrega, setEntrega ] = useState({
        id: 0,
        valeSalidaId: 0,
        insumoId: 0,
        cantidadEntregada: 0,
        comentarios: '',
        type: 1
    })


    const showModal = () => {
        setVisible(true);
    };
    
    const hideModal = () => {
        setVisible(false);
        setValidarCantidad(true)
        setEntrega({
            id: 0,
            valeSalidaId: 0,
            insumoId: 0,
            cantidadEntregada: 0,
            comentarios: '',
            type: 1
        })
    };


    useEffect(() => {
        dispatch(getAllValesAction())
        // eslint-disable-next-line
    }, [])
    

    useEffect(() => {
		setDataSource(
			vales.map( (item, i) => (
				{ 
                    key: i, 
                    residente:`${item.user.nombre} ${item.user.apellidoPaterno} ${item.user.apellidoMaterno}`,
                    personalInfo: `${item.personal.nombre} ${item.personal.apellidoPaterno} ${item.personal.apellidoMaterno}`,
                    actividadInfo: item.actividad.nombre,
                    aciones:item.id, 
                    ...item 
                }
			))
		)
    }, [vales])

    const columns = [
        {
            title: 'Folio',
            dataIndex: 'id',
            key: `id-${nanoid()}`,
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps('id'),
            width: 100
        },
        {
            title: 'Elaborado Por',
            dataIndex: 'residente',
            key: `residente-${nanoid()}`,
            sorter: (a, b) => a.residente.localeCompare(b.residente),
            ...getColumnSearchProps('residente'),
        },
        {
            title: 'Entregar A',
            dataIndex: 'personalInfo',
            key: `personalInfo-${nanoid()}`,
            sorter: (a, b) => a.personalInfo.localeCompare(b.personalInfo),
            ...getColumnSearchProps('personalInfo'),
        },
        {
            title: 'Actividad',
            dataIndex: 'actividadInfo',
            key: `actividadInfo-${nanoid()}`,
            sorter: (a, b) => a.actividadInfo.localeCompare(b.actividadInfo),
            ...getColumnSearchProps('actividadInfo'),
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: `fecha-${nanoid()}`,
            sorter: (a, b) => a.fecha.localeCompare(b.fecha),
            ...getColumnSearchProps('fecha'),
            render: (text, record) => (
                <div>
                    { moment(record.fecha).format('DD/MM/YYYY') }
                </div>
            )
        },
        {
            title: 'Estatus',
            dataIndex: 'statusVale',
            key: 'statusVale',
            render: (text, record, index) => ( 
                record.statusVale === 1 ? <Tag className='mx-auto' key={nanoid(4)} color="green">Sin Entregar</Tag>:
                record.statusVale === 2 ? <Tag className='mx-auto' key={nanoid(4)} color="lime">Parcialmente Entregado Abierto</Tag> :
                record.statusVale === 3 ? <Tag className='mx-auto' key={nanoid(4)} color="magenta">Parcialmente Entregado Cerrado</Tag> :
                record.statusVale === 4 ? <Tag className='mx-auto' key={nanoid(4)} color="blue">Entregado</Tag>:
                record.statusVale === 5 ? <Tag className='mx-auto' key={nanoid(4)} color="red">Cancelado</Tag> :
                record.statusVale === 6 ?  <Tag className='mx-auto' key={nanoid(4)} color="geekblue">Borrador</Tag> :
                record.statusVale === 7 ?  <Tag className='mx-auto' key={nanoid(4)} color="volcano">Cerrado</Tag> : ''
            ),
            filters: [
                { 
                    text: 'Por Entregar',
                    value: 1
                },
                { 
                    text: 'Parcialmente Entregado Abierto',
                    value: 2
                },
                { 
                    text: 'Parcialmente Entregado Cerrado',
                    value: 3
                },
                { 
                    text: 'Entregado',
                    value: 4
                },
                { 
                    text: 'Cancelado',
                    value: 5
                },
                { 
                    text: 'Borrador',
                    value: 6
                },
                { 
                    text: 'Cerrado',
                    value: 7
                },
            ],
            onFilter: (value, record) => record.statusVale === value,
            width: 100
        }
    ]


    const expandedRowRender = (record, index, indent, expanded) => {

        if(expanded){
            setDataNestedSource( record.detalle_salidas )
        }
    
        const columns = [
            {
                title: 'ID Enkontrol',
                dataIndex: 'insumo',
                key: `clave-${nanoid()}`,
                render: item =>  item.claveEnk
            },
            {
                title: 'Nombre',
                dataIndex: 'insumo',
                key: `nombre-${nanoid()}`,
                render: item => item.nombre
            },
            {
                title: 'Unidad de Medida',
                dataIndex: 'insumo',
                key: `unidad-${nanoid()}`,
                render: item => item.unidadMedida
            },
            {
                title: 'Solicitado',
                dataIndex: 'cantidadSolicitada',
                key: `cantidadSolicitada-${nanoid()}`,
                render: item => Number(item)
            },
            {
                title: 'Entregado',
                dataIndex: 'cantidadEntregada',
                key: `cantidadEntregada-${nanoid()}`,
                render: item => Number(item)
            },
            {
                title: 'Pendiente',
                dataIndex: 'detalle_salidas',
                key: `detalle_salidas-${nanoid()}`,
                render: (text, record) => (record.cantidadSolicitada - record.cantidadEntregada )
            },
            {
                title: 'Acciones',
                dataIndex: 'acciones',
                key: `acciones-${nanoid()}`,
                width: 200,
                render: (text, record, index) => (
                    record.status === 1 ?
                    <div key={index} className="flex justify-between">
                        <Button htmlType='button' onClick={ () => handleEntrega(record, 1) } type='primary'> <CheckCircleOutlined /> </Button>
                        <Button htmlType='button' onClick={ () => handleEntrega(record, 2) } type='warning'> <FrownOutlined /> </Button>
                        <Button htmlType='button' onClick={ () => handleEntrega(record, 3) } type='danger'> <StopOutlined /> </Button>
                    </div>
                    : 
                    record.status === 2 ?
                    <div key={index}>
                        <Tag color="blue">Continuar Entrega</Tag> 
                        <Button onClick={ () => handleEntrega(record, 2) } type='warning'> <FrownOutlined /> </Button>
                    </div>
                    : record.status === 3 ? <Tag key={nanoid(4)} color="blue">Entregado</Tag> 
                    : record.status === 4 ? <Tag key={nanoid(4)} color="volcano">Cancelado</Tag>
                    : null
                    
                )
            }
        ]
        return <Table key={nanoid()} columns={columns} dataSource={dataNestedSource} pagination={false} rowKey={nanoid()}  className="nestedTable"/>
    }


    

    const handleEntrega = (record, type) => {

        setEntrega({
            ...entrega,
            id: record.id,
            valeSalidaId: record.valeSalidaId,
            insumoId: record.insumoId,
            type: type,
            cantidadEntregada: type === 1? Number(record.cantidadSolicitada) : Number(entrega.cantidadEntregada),
            cantidadSolicitada: Number(record.cantidadSolicitada)
        })


        showModal()
    }

    const handleSubmit = () => {
        dispatch(deliverValeAction(entrega))
    }

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, delivered])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
        }
        if(delivered){
            openNotificationWithIcon('success', 'Se ha guardado correctamente')
            setEntrega({
                id: 0,
                valeSalidaId: 0,
                insumoId: 0,
                cantidadEntregada: 0,
                comentarios: '',
                type: 1
            })
            hideModal()
        }
    }

    const handleChange = (e) => {
        const { value } = e.target
        setEntrega({ 
            ...entrega, 
            cantidadEntregada: Number(value)
        })
    
        if( (entrega.cantidadSolicitada - buscarEntregado(entrega.valeSalidaId, entrega.id))  < value ){
            setValidarCantidad(false)
        } else {
            setValidarCantidad(true)
        }
    }

    const buscarEntregado = (valeSalidaId, id) => {
        const [{detalle_salidas}] = vales.filter( item => item.id === valeSalidaId)
        const [result] = detalle_salidas.filter( item => item.id === id)
   
        return result.cantidadEntregada
    }
    
    return ( 
        <>
            <h1 className='text-dark text-xl text-center font-medium'>Vales</h1>
            <div className='py-2 flex justify-between'>
                <Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Volver</Button>
                <Button type='primary' onClick={() => navigate('nuevo')} className="ml-5">Agregar Nuevo Vale</Button>
            </div>
            <Table key={123} columns={columns} dataSource={dataSource} expandable={{expandedRowRender, defaultExpandedRowKeys: ['0'], expandedRowKeys: activeExpRow,
            rowExpandable: (record) => true,
            onExpand: (expanded, record) => {
                const keys = [];
                if (expanded) {
                  keys.push(record.key);
                }
                setActiveExpRow(keys);
              }
            }}
            
            />

            <Modal
                title="Confirmación"
                visible={visible}
                onOk={ () => {  entrega.type === 3  ? entrega.comentarios ? handleSubmit() : message.error('Error! Debes una razón ') : handleSubmit() } }
                onCancel={hideModal}
                okText="Enviar"
                cancelText="Cancelar"
                okButtonProps={{ disabled: !validarCantidad }}
            >
                

                {
                    entrega.type === 1 ?
                    <>
                        <p> Estás seguro que has entregado esto? </p>
                        <p>No se podrá modificar después</p>
                    </>
                    :
                    entrega.type === 2 ?
                    <>
                        <p>Estás seguro que harás una entrega parcial, solo tienes 24h para completar la entrega. </p>
                        <p>Cúantos entregarás?</p>
                        <Input className='my-3' type="number" value={entrega.cantidadEntregada} name="cantidadEntrega" onChange={ handleChange } status={ !validarCantidad ? 'error' : null }/>
                        <span className='py-2 text-danger'>
                            { !validarCantidad ? 
                                `No puede ser mayor a ${ entrega.cantidadSolicitada - buscarEntregado(entrega.valeSalidaId, entrega.id) } `
                            : null }
                        </span>
                    </>
                    :
                    entrega.type === 3 ?
                    <>
                        <p>No se entregará <span className='font-bold'>NINGÚN</span> insumo, explica porqué </p>
                        <TextArea className='my-3' value={entrega.comentarios} onChange={ (e) => setEntrega({ ...entrega,  comentarios: e.target.value})}/>
                    </>
                    : null
                }
            </Modal>
        </>    
    );
}
 
export default ValesSalida;