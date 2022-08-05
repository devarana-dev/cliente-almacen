
import { BellOutlined, CheckCircleOutlined, DeleteOutlined, FileTextOutlined, FrownOutlined, PieChartOutlined, PlusCircleOutlined, StopOutlined } from '@ant-design/icons';
import { cancelDetalleAction, cancelValeAction, closeValeAction, completeValeSalida, deliverValeAction, getAllValesAction, getCountValeSalidaAction, searchValeAction } from '../../actions/valeActions';
import { Button, Table, Tag, Modal, Input, Badge, Avatar, Image } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getColumnSearchProps } from '../../hooks/useFilter'
import { nanoid } from 'nanoid'
import '../../assets/scss/showVale.scss'
import ekIcon from "../../assets/img/Original-EK.png"
import ekIcon2 from "../../assets/img/Original-EK2.png"
import Logotipo from "../../assets/img/LogoDevarana.png"
import openNotificationWithIcon from '../../hooks/useNotification';
import moment from 'moment';
import { hasPermission } from '../../utils/hasPermission';
import Forbidden from '../../components/Elements/Forbidden';
import { ResizableTitle } from "../../utils/resizableTable";

const ValesSalida = () => {

    const { TextArea } = Input;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { vales, errors, delivered, updated, isLoading, count } = useSelector( state => state.vales )
    const { userPermission } = useSelector(state => state.permisos);
    const [ dataSource, setDataSource ] = useState([]);
    const [ dataNestedSource, setDataNestedSource ] = useState([])
    const [ validarCantidad, setValidarCantidad ] = useState(true)
    const [activeExpRow, setActiveExpRow] = useState();
    const [ loadedColumn , setLoad ] = useState(false)


    const [ visible, setVisible] = useState(
        {
            entrega: false,
            cancelar: false,
            cerrar: false,
            enktrl:false
        }
    );
	
    const [ entrega, setEntrega ] = useState({
        id: 0,
        valeSalidaId: 0,
        insumoId: 0,
        cantidadEntregada: 0,
        type: 1
    })

    const [ cancel, setCancel ] = useState({
        type: 0,
        comentarios: '',
        id:0
    })

    const [ enkontrol, setEnkontrol ] = useState({
        comentarios: '',
        id:0
    })

    const showModal = (props) => {
        setVisible(props);
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

    const actionColumn = {
        title: 'Acciones',
        dataIndex: 'statusValue',
        key: `statusVale`,
        render: (text, record) => (
            <div>
                { 
                    record.statusVale === 1 ? 
                    <div className='flex justify-between'>
                        { hasPermission(userPermission, '/editar-vales') ? 
                            <Button type='icon-primary' className='icon' onClick={ () => handleEntrega(record, 3)}> <CheckCircleOutlined className='ml-0 align-middle text-xl' /> </Button> : null
                        }
                        {
                            hasPermission(userPermission, '/eliminar-vales') ? <Button type='icon-danger' className='icon' onClick={() => handleCancel(1, record.id)}> <DeleteOutlined className='ml-0 align-middle text-xl' /> </Button> : null
                        }
                    </div> : 
                    record.statusVale === 2 || record.statusVale === 4 || record.statusVale === 3 ? 
                    <Button type='icon-warning' className='icon' onClick={()=> handleClose(record.id)}> 
                        <img src={ekIcon} alt="sa" width={16} className="py-0.5" />
                    </Button>
                    : <div className="h-6"> - </div>
                }
            </div>
        ),
        width: 80
    }

    useEffect(() => {
            dispatch(getAllValesAction())
            dispatch(getCountValeSalidaAction())
        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
		setDataSource(
			vales.map( (item, i) => (
				{ 
                    key: i, 
                    residente:`${item.user.nombre} ${item.user.apellidoPaterno}`,
                    residentePicture: item.user.picture,
                    personalInfo: `${item.personal.nombre} ${item.personal.apellidoPaterno}`,
                    actividadInfo: item.actividad.nombre,
                    aciones:item.id, 
                    ...item 
                }
			))
		)

        if((hasPermission(userPermission, '/editar-vales') || hasPermission(userPermission, '/eliminar-vales') ) && !loadedColumn){
            setLoad(true)
            setColumns([...columns, actionColumn])
        }
    }, [vales])

    const [columns, setColumns] = useState([
        {
            title: 'Folio',
            dataIndex: 'id',
            key: `id-${nanoid()}`,
            responsive: ['md'],
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps('id'),
            width: 100
        },
        {
            title: 'Solicitante',
            dataIndex: 'residente',
            responsive: ['md'],
            key: `residente-${nanoid()}`,
            sorter: (a, b) => a.residente.localeCompare(b.residente),
            ...getColumnSearchProps('residente'),
            // width: 450,
            render: (text, record) => (
                <div className='flex flex-row items-center'>
                    <Avatar crossOrigin='anonymous' src={ <Image src={record.residentePicture} /> || '' } />
                    <p className='ml-4'> { record.residente} </p>
                </div>
            )
        },
        {
            title: 'Lider',
            dataIndex: 'personalInfo',
            key: `personalInfo-${nanoid()}`,
            ellipsis: true,
            sorter: (a, b) => a.personalInfo.localeCompare(b.personalInfo),
            ...getColumnSearchProps('personalInfo'),
            // width: 450
        },
        {
            title: 'Actividad',
            dataIndex: 'actividadInfo',
            key: `actividadInfo-${nanoid()}`,
            ellipsis: true,
            sorter: (a, b) => a.actividadInfo.localeCompare(b.actividadInfo),
            ...getColumnSearchProps('actividadInfo'),
            width: 200
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: `fecha-${nanoid()}`,
            ...getColumnSearchProps('fecha'),
            responsive: ['md'],
            width: 70,
            render: (text, record) => (
                <div>
                    { moment(record.fecha).format('D MMM') }
                </div>
            ),
        },
        {
            title: 'Fase',
            dataIndex: 'statusVale',
            key: `statusVale-${nanoid()}`,
            width: 70,
            className: 'text-center',
            render: (text, record) => (
            record.statusVale === 1 || record.statusVale === 2? 
                <div className='flex items-center justify-end'>
                    <Badge color={'green'}  className="align-middle justify-center items-center text-center mx-auto" />
                    <p className='text-xs w-16 hidden sm:block'> Abierto </p>
                </div>
            :
            record.statusVale === 3 || record.statusVale === 4 || record.statusVale === 5? 
                <div className='flex items-center justify-end'>
                    <Badge color={'red'}  className="align-middle justify-center items-center text-center mx-auto" />
                    <p className='text-xs w-16 hidden sm:block'> Cerrado </p>
                </div>
            :
            record.statusVale === 7 || record.statusVale === 6 ? 
                <div className='flex items-center justify-end'>
                    <Badge color={'orange'}  className="align-middle justify-center items-center text-center mx-auto" />
                    <p className='text-xs w-16 hidden sm:block'> Registrado </p>
                </div>
            : ''
            ),
        },
        {
            title: 'Estatus',
            dataIndex: 'statusVale',
            key: 'statusVale',
            render: (text, record, index) => ( 
                record.statusVale === 1 ? 
                    <div className='w-full justify-center text-center flex'>
                        <Tag className='m-auto w-full' key={nanoid(4)} color="blue">Nuevo</Tag>
                    </div>
                :
                record.statusVale === 2 ? 
                    <div className='w-full justify-center text-center flex'>
                        <Tag className='m-auto w-full' key={nanoid(4)} color="orange">Parcial</Tag> 
                    </div>
                :
                record.statusVale === 3 ? 
                    <div className='w-full justify-center text-center flex'>
                        <Tag className='m-auto w-full' key={nanoid(4)} color="orange">Parcial</Tag> 
                    </div>
                :
                record.statusVale === 4 ? 
                    <div className='w-full justify-center text-center flex'>
                        <Tag className='m-auto w-full' key={nanoid(4)} color="green">Entregado</Tag>
                    </div>
                :
                record.statusVale === 5 ? 
                    <div className='w-full justify-center text-center flex'>
                        <Tag className='m-auto w-full' key={nanoid(4)} color="red">Cancelado</Tag> 
                    </div>
                :
                record.statusVale === 6 ? 
                    <div className='w-full justify-center text-center flex'>
                        <Tag className='m-auto w-full' key={nanoid(4)} color="orange">Parcial</Tag> 
                    </div>
                :
                record.statusVale === 7 ? 
                    <div className='w-full justify-center text-center flex'>
                        <Tag className='m-auto w-full' key={nanoid(4)} color="green">Entregado</Tag>
                    </div>
                : ''
            ),
            filters: [
                { 
                    text: 'Por Entregar',
                    value: 1
                },
                { 
                    text: 'Parcial Entregado Abierto',
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
                    text: 'Enkontrol',
                    value: 7
                },
            ],
            onFilter: (value, record) => record.statusVale === value,
            width: 100
        },
    ])  

    const expandedRowRender = (record, index, indent, expanded) => {

        if(expanded){
            setDataNestedSource( record.detalle_salidas )
        }
    
        const columns = [
            {
                title: 'Enkontrol',
                dataIndex: 'insumo',
                key: `clave-${nanoid()}`,
                render: item =>  item.claveEnk,
                responsive: ['md'],
                width: 100
            },
            {
                title: 'Nombre',
                dataIndex: 'insumo',
                key: `nombre-${nanoid()}`,
                render: item => item.nombre,
            },
            {
                title: 'U.Medida',
                dataIndex: 'insumo',
                key: `unidad-${nanoid()}`,
                render: item => item.unidadMedida,
                width: 100,
                responsive: ['md']
            },
            {
                title: 'Solicitado',
                dataIndex: 'cantidadSolicitada',
                key: `cantidadSolicitada-${nanoid()}`,
                render: item => Number(item),
                width: 100
            },
            {
                title: 'Entregado',
                dataIndex: 'cantidadEntregada',
                key: `cantidadEntregada-${nanoid()}`,
                render: item => Number(item),
                width: 100,
                responsive: ['md']
            },
            {
                title: 'Pendiente',
                dataIndex: 'detalle_salidas',
                key: `detalle_salidas-${nanoid()}`,
                render: (text, record) => (record.cantidadSolicitada - record.cantidadEntregada ),
                width: 100
            },
            {

                title: 'Estatus',
                dataIndex: 'acciones',
                key: `acciones-${nanoid()}`,
                render: (text, record, index) => (
                    record.status === 1 ?
                    <Tag color="blue" className='w-full text-center'> Nuevo </Tag>
                    : 
                    record.status === 2 ?
                    <Tag key={index} className='w-full text-center' color="orange">Parcial</Tag> 
                    : record.status === 3 ? <Tag key={index} className='w-full text-center' color="green">Entregado</Tag> 
                    : record.status === 4 ? <Tag key={index} className='w-full text-center' color="red">Cancelado</Tag>
                    : record.status === 5 ? <Tag key={index} className='w-full text-center' color="magenta">Cerrado</Tag>
                    : record.status === 6 ? <Tag key={index} className='w-full text-center' color="orange">Parcial</Tag>
                    : null
                ),
                width: 100
            },
            {
                // Detalle Estatus / Acciones
                title: 'Acciones',
                dataIndex: 'acciones',
                key: `acciones-${nanoid()}`,
                render: (text, record, index) => (
                    hasPermission(userPermission, '/editar-vales') || hasPermission(userPermission, '/eliminar-vales') ?
                        record.status === 1 ?
                        <div key={index} className="flex justify-between">
                            {
                                hasPermission(userPermission, '/editar-vales') ? 
                                <>
                                    <Button className="icon" htmlType='button' onClick={ () => handleEntrega(record, 1) } type='icon-primary'> <CheckCircleOutlined className='ml-0 align-middle text-xl' /> </Button>
                                    <Button className="icon" htmlType='button' onClick={ () => handleEntrega(record, 2) } type='icon-warning'> <FrownOutlined className='ml-0 align-middle text-xl' /> </Button> 
                                </>
                                : null
                            }
                            {
                                hasPermission(userPermission, '/eliminar-vales') ? <Button className="icon" htmlType='button' onClick={ () => handleCancel(2, record.id) } type='icon-danger'> <StopOutlined className='ml-0 align-middle text-xl' /> </Button> : null
                            }
                            
                        </div>
                        : 
                        record.status === 2 ?
                        <Button className="icon" onClick={ () => handleEntrega(record, 2) } type='icon-warning'> <PieChartOutlined className='ml-0 align-middle text-xl'/> </Button>
                        : <div className="h-6"> - </div>
                    : null
                ),
                width: hasPermission(userPermission, '/editar-vales') || hasPermission(userPermission, '/eliminar-vales') ? 80: 0,
                className: hasPermission(userPermission, '/editar-vales') || hasPermission(userPermission, '/eliminar-vales') ? 'block' : 'hidden',
            }
        ]
        return <Table bordered  key={record => record.id} scroll={{ x: 'auto' }} columns={columns} dataSource={dataNestedSource} pagination={false} rowKey={nanoid()}  className="nestedTable"/>
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


        showModal({
            entrega: true,
            cancelar: false,
            cerrar: false,
            enktrl: false
        })

    }

    const handleCancel = (type, id) => {
        showModal ({
            entrega: false,
            cancelar: true,
            cerrar: false,
            enktrl: false
        })

        setCancel({
            ...cancel,
            type,
            id
        })
    }

    const handleClose = (id) =>{
        showModal ({
            entrega: false,
            cancelar: false,
            cerrar: false,
            enktrl: true
        })

        setEnkontrol({
            ...enkontrol,
            id
        })
    }

    const handleSubmitClose = () => {
        dispatch(closeValeAction(enkontrol))
    }

    const handleSubmitCancel = () => {
        if (cancel.type === 1 ) {
            dispatch(cancelValeAction(cancel))
        }
        if( cancel.type === 2){
           
            dispatch(cancelDetalleAction(cancel))
        }
    }

    const handleSubmit = () => {
        if(entrega.type === 3){
            dispatch(completeValeSalida(entrega))
        }else{ 
            dispatch(deliverValeAction(entrega))
        }
    }

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, delivered, updated])

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
        if(updated){
            openNotificationWithIcon('success', 'Se ha guardado correctamente')
            setCancel({
                type: 0,
                comentarios: '',
                id:0
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

    // const handleResize = (index) =>
    // (_, { size }) => {
    //     const newColumns = [...columns];
    //     newColumns[index] = { ...newColumns[index], width: size.width };
    //     setColumns(newColumns);
    // };

    // const mergeColumns = columns.map((col, index) => ({
    //     ...col,
    //     onHeaderCell: (column) => ({
    //     width: column.width,
    //     onResize: handleResize(index),
    //     }),
    // }));+


    if(!hasPermission(userPermission, '/ver-vales') && !isLoading ) return <Forbidden/>
    
    return ( 
        <>
            <img src={Logotipo} alt="" className='mx-auto block md:hidden max-w-full py-2'/>
            <h1 className='text-center text-dark text-3xl font-bold pt-5 uppercase hidden md:block py-2'> Vales </h1>
            {
                hasPermission(userPermission, '/crear-vales') ?
                <Button type='icon-secondary-new' onClick={() => navigate('nuevo')} className="fixed right-10 bottom-8 hidden lg:block z-50 items-center"><PlusCircleOutlined /></Button>
                : null 
            }
                <div className="md:grid hidden grid-cols-4 gap-10 py-5 ">
                    <div className="p-1 sm:p-5 shadow-md bg-white rounded-sm col-span-1 cursor-pointer" onClick={ () => dispatch(searchValeAction()) }>
                        <div className="flex sm:justify-between justify-center flex-wrap gap-x-5">
                            <div className="text-white bg-gradient-to-tr from-dark to-dark-lighter sm:w-16 sm:h-16 w-12 h-12 -mt-10 p-4 rounded-md shadow align-middle flex">
                                <div className="text-base sm:text-3xl  w-full justify-center flex m-auto">
                                    <FileTextOutlined className='align-middle'/>
                                </div>
                            </div>
                                <div className="sm:text-right text-center sm:py-0 pt-2">
                                <p className="text-custom-dark2 font-light sm:text-base text-sm">Todos</p>
                                <h1 className="lg:text-2xl text-lg text-custom-dark">{count.todos}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="p-1 sm:p-5 shadow-md bg-white rounded-sm col-span-1 cursor-pointer" onClick={ () => dispatch(searchValeAction({statusVale: 1})) }>
                        <div className="flex sm:justify-between justify-center flex-wrap gap-x-5">
                            <div className="text-white bg-gradient-to-tr from-info to-info-lighter sm:w-16 sm:h-16 w-12 h-12 -mt-10 p-4 rounded-md shadow align-middle flex">
                                <div className="text-base sm:text-3xl w-full justify-center flex m-auto">
                                    <BellOutlined className='align-middle'/>
                                </div>
                            </div>
                                <div className="sm:text-right text-center sm:py-0 pt-2">
                                <p className="text-custom-dark2 font-light sm:text-base text-sm">Nuevos</p>
                                <h1 className="lg:text-2xl text-lg text-custom-dark">{count.nuevo}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="p-1 sm:p-5 shadow-md bg-white rounded-sm col-span-1 cursor-pointer" onClick={ () => dispatch(searchValeAction({statusVale: 2})) }>
                        <div className="flex sm:justify-between justify-center flex-wrap gap-x-5">
                            <div className="text-white bg-gradient-to-tr from-warning to-warning-lighter sm:w-16 sm:h-16 w-12 h-12 -mt-10 p-4 rounded-md shadow align-middle flex">
                                <div className="text-base sm:text-3xl  w-full justify-center flex m-auto">
                                    <PieChartOutlined className='align-middle'/>
                                </div>
                            </div>
                                <div className="sm:text-right text-center sm:py-0 pt-2">
                                <p className="text-custom-dark2 font-light sm:text-base text-sm">Pendientes</p>
                                <h1 className="lg:text-2xl text-lg text-custom-dark">{count.parcialAbierto}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="p-1 sm:p-5 shadow-md bg-white rounded-sm col-span-1 cursor-pointer" onClick={ () => dispatch(searchValeAction({statusVale: 7})) }>
                        <div className="flex sm:justify-between justify-center flex-wrap gap-x-5">
                            <div className="text-white bg-gradient-to-tr from-primary to-primary-lighter sm:w-16 sm:h-16 w-12 h-12 -mt-10 p-5 rounded-md shadow align-middle flex">
                                <div className="text-base sm:text-3xl  w-full justify-center flex m-auto">
                                    <img src={ekIcon2} alt="" />
                                </div>
                            </div>
                                <div className="sm:text-right text-center sm:py-0 pt-2">
                                <p className="text-custom-dark2 font-light sm:text-base text-sm">Cerrados</p>
                                <h1 className="lg:text-2xl text-lg text-custom-dark">{count.cerrado}</h1>
                            </div>
                        </div>
                    </div>
                </div>               
           
            <Table 
            className='tableVales' 
            loading={isLoading} 
            render={true}
            scroll={{ x: 'auto' }} 
            key={123} 
            columns={columns} 
            dataSource={dataSource} 
            expandable={{
                expandedRowRender, 
                defaultExpandedRowKeys: ['0'], 
                expandedRowKeys: activeExpRow,
                rowExpandable: (record) => true,
                onExpand: (expanded, record) => {
                    const keys = [];
                    if (expanded) {
                    keys.push(record.key);
                    }
                    setActiveExpRow(keys);
                }
            }}
            // components={{
            //     header: {
            //         cell: ResizableTitle,
            //     },
            // }}  

            />

            <Modal
                title="Confirmación"
                visible={visible.entrega}
                onOk={ () => handleSubmit() }
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
                        <p> Estás seguro que se ha entregado todos los insumos del vale? </p>
                        <p>No se podrá modificar después</p>
                    </>
                    : null
                }
            </Modal>

            <Modal
                title="Confirmación"
                visible={visible.cancelar}
                onOk={ () => handleSubmitCancel() }
                onCancel={hideModal}
                okText="Enviar"
                cancelText="Cancelar"
                okButtonProps={{ disabled: !cancel.comentarios }}
                >
                    <p>No se entregará <span className='font-bold'>NINGÚN</span> insumo, explica porqué </p>
                    <TextArea className='my-3' value={cancel.comentarios} onChange={ (e) => setCancel({ ...cancel,  comentarios: e.target.value})}/>
            </Modal> 

            <Modal
                title="Subir Enkontrol"
                visible={visible.enktrl}
                onOk={ () => handleSubmitClose() }
                onCancel={hideModal}
                okText="Enviar"
                cancelText="Cancelar"
                okButtonProps={{ disabled: !enkontrol.comentarios }}
                >
                    <p>Ingresa el folio de enkontrol una vez generado</p>
                    <TextArea className='my-3' value={enkontrol.comentarios} onChange={ (e) => setEnkontrol({ ...enkontrol,  comentarios: e.target.value})}/>
            </Modal>
        </>    
    );
}
 
export default ValesSalida;