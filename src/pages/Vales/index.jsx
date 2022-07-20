
import { CheckCircleOutlined, FrownOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Table, Tag, Modal, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deliverValeAction, getAllValesAction } from '../../actions/valeActions';
import { getColumnSearchProps } from '../../hooks/useFilter'
import {nanoid} from 'nanoid'
import '../../assets/scss/showVale.scss'
import { AntdNotification } from '../../components/Elements/Notification';

const ValesSalida = () => {

    const { TextArea } = Input;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { vales, errors } = useSelector( state => state.vales )
    const [ dataSource, setDataSource ] = useState([]);
    const [ dataNestedSource, setDataNestedSource ] = useState([])
    const [ validarCantidad, setValidarCantidad ] = useState(true)

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
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps('id'),
            width: 100
        },
        {
            title: 'Elaborado Por',
            dataIndex: 'residente',
            key: `residente-${nanoid(4)}`,
            sorter: (a, b) => a.residente.localeCompare(b.residente),
            ...getColumnSearchProps('residente'),
        },
        {
            title: 'Entregar A',
            dataIndex: 'personalInfo',
            key: `personalInfo-${nanoid(4)}`,
            sorter: (a, b) => a.personalInfo.localeCompare(b.personalInfo),
            ...getColumnSearchProps('personalInfo'),
        },
        {
            title: 'Actividad',
            dataIndex: 'actividadInfo',
            key: `actividadInfo-${nanoid(4)}`,
            sorter: (a, b) => a.actividadInfo.localeCompare(b.actividadInfo),
            ...getColumnSearchProps('actividadInfo'),
        },
        {
            title: 'Estatus',
            dataIndex: 'statusVale',
            key: 'statusVale',
            render: (text, record, index) => ( 
                record.statusVale === 1 ? <Tag key={nanoid(4)} color="green">Por Entregar</Tag>:
                record.statusVale === 2 ? <Tag key={nanoid(4)} color="lime">Borrador</Tag> :
                record.statusVale === 3 ? <Tag key={nanoid(4)} color="geekblue">Entregado</Tag> : ''
             ),
            filters: [
                { 
                    text: 'Por Entregar',
                    value: 1
                },
                { 
                    text: 'Borrador',
                    value: 2
                },
                { 
                    text: 'Entregado',
                    value: 3
                },
            ],
            onFilter: (value, record) => record.statusVale === value,
            width: 100
        }
    ]


    const expandedRowRender = (record, index, indent, expanded) => {

        if(expanded){
            setDataNestedSource(record.detalle_salidas)
        }
    
        const columns = [
            {
                title: 'ID Enkontrol',
                dataIndex: 'insumo',
                key: `insumo-${nanoid(3)}`,
                render: item =>  item.claveEnk
            },
            {
                title: 'Nombre',
                dataIndex: 'insumo',
                key: `insumo-${nanoid(4)}`,
                render: item => item.nombre
            },
            {
                title: 'Unidad de Medida',
                dataIndex: 'insumo',
                key: `insumo-${nanoid(5)}`,
                render: item => item.unidadMedida
            },
            {
                title: 'Solicitado',
                dataIndex: 'cantidadSolicitada',
                key: `cantidadSolicitada-${nanoid(5)}`,
                render: item => Number(item)
            },
            {
                title: 'Entregado',
                dataIndex: 'cantidadEntregada',
                key: `cantidadEntregada-${nanoid(5)}`,
                render: item => Number(item)
            },
            {
                title: 'Pendiente',
                dataIndex: 'detalle_salidas',
                key: `detalle_salidas-${nanoid(5)}`,
                render: (text, record) => (record.cantidadSolicitada - record.cantidadEntregada )
            },
            {
                title: 'Acciones',
                dataIndex: 'acciones',
                key: `acciones`,
                render: (text, record, index) => (
                    record.status === 1 ?
                    <div key={index} className="flex justify-between">
                        <Button onClick={ () => handleEntrega(record, 1) } type='primary'> <CheckCircleOutlined /> </Button>
                        <Button onClick={ () => handleEntrega(record, 2) } type='warning'> <FrownOutlined /> </Button>
                        <Button onClick={ () => handleEntrega(record, 3) } type='danger'> <StopOutlined /> </Button>
                    </div>
                    : null
                )
            }
        ]
        return <Table columns={columns} dataSource={dataNestedSource} pagination={false} rowKey={nanoid(4)} className="nestedTable"/>
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

    const handleChange = (e) => {

        const { value, name } = e.target
        setEntrega({ 
            ...entrega, 
            cantidadEntregada: Number(value)
        })
        
        if( entrega.cantidadSolicitada <= value ){
            setValidarCantidad(false)
        } else {
            setValidarCantidad(true)
        }
    }
    
    return ( 
        <>
            {  (errors && errors.length > 0) && <AntdNotification errors={errors} type='error'/>}
            <h1 className='text-dark text-xl text-center font-medium'>Vales</h1>
            <div className='py-2 flex justify-between'>
                <Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Volver</Button>
                <Button type='primary' onClick={() => navigate('nuevo')} className="ml-5">Agregar Nuevo Vale</Button>
            </div>
            <Table columns={columns} dataSource={dataSource} expandable={{expandedRowRender, defaultExpandedRowKeys: ['0']}}/>

            <Modal
                title="Confirmación"
                visible={visible}
                onOk={handleSubmit}
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
                                `No puede ser mayor a ${entrega.cantidadSolicitada } `
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