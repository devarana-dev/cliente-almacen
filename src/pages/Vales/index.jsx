
import { BellOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, FileTextOutlined, InfoCircleOutlined, PieChartOutlined, PlusCircleOutlined, ShrinkOutlined, StopOutlined, SearchOutlined} from "@ant-design/icons";
import { Avatar, Badge, Button, DatePicker, Image, Input, InputNumber, Modal, Pagination, Select, Table, Tag, Tooltip } from "antd";
import moment from "moment";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import '../../assets/scss/showVale.scss'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelValeAction, completeValeSalida, deliverValeAction, getAllValesAction, getCountValeSalidaAction, getDetalleSalidaAction, cancelDetalleAction, closeValeAction } from "../../actions/valeActions";
import { groupPermission, hasPermission } from "../../utils/hasPermission";
import ekIcon2 from "../../assets/img/Original-EK2.png"
import ekIcon from "../../assets/img/Original-EK.png"
import Card from "../../components/Vales/Card";
import { BsInfoCircle } from "react-icons/bs";
import openNotificationWithIcon from "../../hooks/useNotification";
import brokenUser from "../../utils/brokenUser";
import { useSocket } from "../../hooks/useSocket";
import { getProyectosAction } from "../../actions/proyectosActions";

const ValesSalida = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { RangePicker } = DatePicker;

    const { userPermission } = useSelector(state => state.permisos);
    const { vales, isLoading, paginate, count, detalleSalida, isLoadingDetalles, errors, delivered, updated, deleted } = useSelector( state => state.vales )
    const { socket, online } = useSelector( state => state.socket )
    
    const [ dataSource, setDataSource ] = useState([])
    const [ loadedColumn , setLoad ] = useState(false)
    const [ current, setCurrent ] = useState(1)
    const [ tableReady , setTableReady ] = useState(false)
    const { proyectos } = useSelector(state => state.proyectos);
    const [ activeExpRow, setActiveExpRow] = useState();
    const [ dataNestedSource, setDataNestedSource ] = useState([])
    const [ visible, setVisible ] = useState(false)
    const [ modalProps, setModalProps ] = useState({})
    
    const [ response, setResponse ] = useState("")
    const [ amount, setAmount ] = useState(0)



    const [ filter, setFilter ]  = useState({
        search: '',
        page: 0,
        limit: 10,
        status: [],
        dateInit: '',
        dateEnd: '',
        proyectoId: 1,
        sort: 'DESC',
    })
 

    useEffect(() => {
        dispatch(getCountValeSalidaAction())
        dispatch(getAllValesAction(filter))
        dispatch(getProyectosAction({ status: 1 }))
        setCurrent(current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    useEffect(() => {
        let result = []
            result = vales.map( (item, i) => (
                    { 
                        key: i, 
                        residente:`${item.user.nombre} ${item.user.apellidoPaterno}`,
                        residentePicture: item.user.picture,
                        personalInfo: `${item.personal.nombre} ${item.personal.apellidoPaterno}`,
                        actividadInfo: item.actividad.nombre,
                        aciones:item.id, 
                        esPrestamo: item,
                        ...item 
                    }
            ))
		setDataSource( result )

        if((groupPermission(userPermission, ['entregar vales', 'registrar vales', 'eliminar vales', 'ver vales']) ) && !loadedColumn ){
            setLoad(true)
            setColumns([...columns, actionColumn])
        }
        setTableReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vales, userPermission])

    const actionColumn = {
        title: 'Acciones',
        dataIndex: 'statusValue',
        key: `statusVale`,
        className:"",
        render: (text, record) => (
            <div>
                
                { 
                    record.statusVale === 1 ? 
                    <div className='inline-flex justify-start'>
                        { hasPermission(userPermission, 'entregar vales') ? 
                            <Tooltip title="Entrega Completa" placement='topRight'>
                                <Button type='icon-primary' className='icon' onClick={ () =>  handleEntregaCompleta (record)}> <CheckCircleOutlined className='ml-0 align-middle text-xl' /> </Button>
                            </Tooltip> 
                            : null
                        }
                        {
                            hasPermission(userPermission, 'eliminar vales') ? 
                            <Tooltip title="Cancelar Entrega" placement='topRight'>
                                <Button type='icon-danger' className='icon' onClick={() => handleCancelarVale(record)}> <StopOutlined className='ml-0 align-middle text-xl' /> </Button> 
                            </Tooltip>
                            : null
                        }
                    </div> : 
                   record.statusVale === 3 || record.statusVale === 4 ? 
                    <>
                        { hasPermission(userPermission, 'registrar vales') ? 
                        <Tooltip title="Registrar Enkontrol" placement='topRight'>
                            <Button type='icon-warning' className='icon' onClick={()=> handleAltaEnkontrol(record)}> 
                                <img src={ekIcon} alt="sa" width={16} className="py-0.5" />
                            </Button>
                        </Tooltip>
                        : null
                        }
                    </>
                    : 
                   <div className="h-6 justify-start flex">
                        { record.salidaEnkontrol || record.comentarios ? 
                            <Tooltip title="Ver Información" placement='topRight'>
                                <Button type='icon-danger' className='px-2' onClick={()=>handleShowInformationVale(record)}><BsInfoCircle className='text-xl'/></Button> 
                            </Tooltip>
                            : null 
                        }
                    </div>
                }
            </div>
        ),
        width: '8%'
    }

    const [columns, setColumns] = useState([
        {
            title: 'Folio',
            dataIndex: 'id',
            responsive: ['lg'],
            width: '5%'
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            responsive: ['lg'],
            width: '5%',
            render: (text, record) => (
                <div>
                    { moment(record.fecha).format('D MMM') }
                </div>
            ),
        },
        {
            title: 'Fase',
            dataIndex: 'statusVale',
            width: '5%',
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
            render: (text, record, index) => ( 
                        <div className='w-full justify-center text-center flex relative'>
                            { 
                                record.statusVale === 1 ? <Tag className='m-auto w-full' key={nanoid(4)} color="blue">Nuevo</Tag> :
                                record.statusVale === 2 ? <Tag className='m-auto w-full' key={nanoid(4)} color="orange">Parcial</Tag> :
                                record.statusVale === 3 ? <Tag className='m-auto w-full' key={nanoid(4)} color="orange">Parcial</Tag> :
                                record.statusVale === 4 ? <Tag className='m-auto w-full' key={nanoid(4)} color="green">Entregado</Tag> :
                                record.statusVale === 5 ? <Tag className='m-auto w-full' key={nanoid(4)} color="red">Cancelado</Tag> :
                                record.statusVale === 6 ? <Tag className='m-auto w-full' key={nanoid(4)} color="orange">Parcial</Tag> :
                                record.statusVale === 7 ? <Tag className='m-auto w-full' key={nanoid(4)} color="green">Entregado</Tag> :
                                null
                            }
                        { 
                         
                            record.prestamo?.status === 1? 
                            <Tooltip title="En proceso de aprobación">
                                <Badge className='absolute -right-2 -top-2' count={<ClockCircleOutlined style={{ color: '#f5222d' }} /> } />
                            </Tooltip>
                            : 
                            null
                        } 
                        </div>
                        
            ),
            width: '5%'
        },
        {
            title: 'Solicitante',
            dataIndex: 'residente',
            responsive: ['lg'],
            render: (text, record) => (
                <div className='flex flex-row items-center'>
                    <Avatar src={ <Image fallback={brokenUser()} src={record.residentePicture} /> || '' } />
                    <p className='ml-4'> { record.residente} </p>
                </div>
            ),
            width: '25%'
        },
        {
            title: 'Lider',
            dataIndex: 'personalInfo',
            ellipsis: true,
            width: '22%',
        },
        {
            title: 'Actividad',
            dataIndex: 'actividadInfo',
            ellipsis: true,
            width: '25%',
        },
        
    ]) 


    // * Pagination y Filtros
    const handleLoadVales = (page, limit) => {
        setFilter({
            ...filter,
            page: page -1,
            limit,
        })
    }
    const handleSearchByStatus = (value) => {
        setFilter({
            ...filter,
            status: value,
            page: 0
        })
    }

    const handleSearchByText = (e) => {
        e.preventDefault() 
        const {value} = e.target
        if(value.length > 2){
            setFilter({
                ...filter,
                search: value,
                page: 0
            })
        }else if(value.length === 0){
            handleCleanSearch()
        }

    }

    const handleSearchByDate = (value, dateString) => {
        if ((dateString[0] !== '' && dateString[1] !== '')){
            setFilter({
                ...filter,
                page: 0,
                dateInit: dateString[0],
                dateEnd: dateString[1]
            })
        }else if (dateString[0] === '' && dateString[1] === ''){
            handleCleanSearch()
        }
    }

    const handleCleanSearch = () => {
        setFilter({
            search: '',
            page: 0,
            limit: 10,
            status: [],
            dateInit: '',
            dateEnd: '',
            sort: 'DESC',
        })
    }

    const handleSort = (value) => {
        setFilter({
            ...filter,
            sort: value
        })
    }

    // * End Pagination

    // ? Acciones

    
    const clearFields = () => {
        setResponse("")
        setAmount(0)
    }

    const handleEntregaCompleta = (record) => {
        Modal.confirm({
            title: 'Entrega de Vale',
            icon: <ExclamationCircleOutlined />,
            content: (<div>
                    <p> ¿Estás seguro de realizar una entrega <span className='underline'>total de este vale</span>? </p>
                    <p> No podrá modificarse posteriormente. </p>
                </div>),
            okText: 'Entregar',
            okType: 'ghost',
            width: 600,
            cancelText: 'Cancelar',
            onOk() {
               handleSubmit({ id: record.id, statusVale: record.statusVale, type: 1 })
            }
        })
    }

    const handleEntregaInsumoCompleta = (record) => {
        Modal.confirm({
            title: 'Entrega Completa de Insumo',
            icon: <ExclamationCircleOutlined />,
            content: (<div>
                    <p> ¿Estás seguro de realizar una entrega <span className='underline'>total del insumo solicitado</span>? </p>
                    <p> No podrá modificarse posteriormente. </p>
                </div>),
            okText: 'Entregar',
            okType: 'ghost',
            width: 600,
            cancelText: 'Cancelar',
            onOk() {
                const cantidadTotal = record.cantidadSolicitada - record.cantidadEntregada
                handleSubmit({ id: record.id, valeSalidaId:record.valeSalidaId, statusVale: record.statusVale, type: 2, insumoId: record.insumoId, cantidadEntregada: cantidadTotal, comentarios: record.comentarios })
            }
        })
    }

    const handleCancelarVale = (record) => {
        setVisible(true)

        let onTimeCommentario = ""
        setModalProps({
            title: 'Cancelar Vale',
            icon: <ExclamationCircleOutlined />,
            content: (
                <div>
                    <p> ¿Estás seguro de realizar la <span className='underline'>cancelación-cierre</span> de este vale ? </p>
                    <label htmlFor="">Describe el motivo</label>
                    <Input.TextArea className='my-3' onChange={(e) => {setResponse(e.target.value); onTimeCommentario = e.target.value }}/>
                </div>
            ),
            fn: () => { 
                    handleSubmit({ id: record.id, type: 3, comentarios: onTimeCommentario }) 
                }
        })

        
    }

    const handleCancelInsumo = (record) => {
        setVisible(true)
        let onTimeCommentario = ""
        setModalProps({
            title: 'Cancelar Insumo',
            icon: <ExclamationCircleOutlined />,
            content: (
                <div>
                    <p> ¿Estás seguro de realizar la <span className='underline'>cancelación de entrega del insumo</span> solicitado ? </p>
                    <label htmlFor="">Describe el motivo</label>
                    <Input.TextArea className='my-3' onChange={(e) => {setResponse(e.target.value); onTimeCommentario = e.target.value }}/>
                </div>
            ),
            fn: () => { 
                    handleSubmit({ id: record.id, type: 4, comentarios: onTimeCommentario }) 
                }
        })
    }

    const handleEntregaParcial = (record) => {
        
        clearFields()
        setVisible(true)
        let onTimeAmount = ""
        const maxAmount = record.cantidadSolicitada - record.cantidadEntregada      
        setModalProps({
            title: 'Entrega Parcial de Insumo',
            icon: <ExclamationCircleOutlined />,
            content: (
                <div>
                    <p>Estás a punto de realizar una entrega <span className='underline'>parcial del insumo solicitado</span>, solo tienes este día para completar la entrega. </p>
                    <label>Por favor indica qué cantidad entregarás ahora:</label>
                    <InputNumber 
                        className='my-3 block w-full'
                        onChange={(value) => { setAmount( Math.min(value, maxAmount) ); onTimeAmount = Math.min(value, maxAmount) }} 
                        min={0.01}
                        max={maxAmount}
                        />
                    <p className={`text-xs ${ amount > maxAmount? 'text-red-500 ' : 'text-gray-500 ' }`}>*La cantidad máxima es de {maxAmount} unidades</p>
                </div>
            ),
            fn: () => { 
                handleSubmit({ id: record.id, valeSalidaId:record.valeSalidaId, statusVale: record.statusVale, type: 2, insumoId: record.insumoId, cantidadEntregada: onTimeAmount, comentarios: record.comentarios })
            }
        })

    }

    const handleAltaEnkontrol = (record) => {
        
        setVisible(true)
        
        
        let onTimeFolio = ""
        setModalProps({
            title: 'Registro Enkontrol',
            icon: <ekIcon2 />,
            content: (
                <div>
                     <p>Ingresa el <span className="font-bold">folio</span> de Enkontrol una vez generado</p>
                    <Input className='my-3' onChange={(e) => {setResponse(e.target.value); onTimeFolio = e.target.value }}/>
                </div>
            ),
            fn: () => { 
                    handleSubmit({ id: record.id, type: 5, salidaEnkontrol: onTimeFolio }) 
                }
        })
    }    


    const handleShowInformationVale = (record) => {
        Modal.info({
            title: 'Información del Vale',
            icon: <InfoCircleOutlined />,
            width: 600,
            content: (
                <div>
                    <div className='inline-flex pb-5'>
                            <p className='pr-2'>Estatus:</p>
                            { 
                            record.statusVale === 1 ? <Tag className='m-auto w-full' key={nanoid(4)} color="blue">Nuevo</Tag> :
                            record.statusVale === 2 ? <Tag className='m-auto w-full' key={nanoid(4)} color="orange">Parcial</Tag> :
                            record.statusVale === 3 ? <Tag className='m-auto w-full' key={nanoid(4)} color="orange">Parcial</Tag> :
                            record.statusVale === 4 ? <Tag className='m-auto w-full' key={nanoid(4)} color="green">Entregado</Tag> :
                            record.statusVale === 5 ? <Tag className='m-auto w-full' key={nanoid(4)} color="red">Cancelado</Tag> :
                            record.statusVale === 6 ? <Tag className='m-auto w-full' key={nanoid(4)} color="orange">Parcial</Tag> :
                            record.statusVale === 7 ? <Tag className='m-auto w-full' key={nanoid(4)} color="green">Entregado</Tag> :
                            null }
                    </div>
                    <h2> Folio: </h2>
                    <p className='font-bold'> {record.id } </p>
                    <h2> Actividad: </h2>
                    <p className='font-bold'> {record.actividadInfo } </p>
                        { record.comentarios ? 
                            <> 
                                <h2> Comentarios: </h2>
                                <p className='font-bold'> {record.comentarios } </p> 
                            </>
                        : 
                        null }
                        { record.salidaEnkontrol ? 
                            <> 
                                <h2> Folio de salida Enkontrol: </h2>
                                <p className='font-bold'> {record.salidaEnkontrol } </p> 
                            </>
                        : 
                        null }
                </div>      
                ),
        })
    }

    const handleShowInformationInsumo = (record) => {
        Modal.info({
            title: 'Información del Insumo',
            icon: <InfoCircleOutlined />,
            width: 600,
            content: (
                <div>
                    {record.insumo ? 
                    <>
                            <div className='inline-flex pb-5'>
                            <p className='pr-2'>Estatus:</p>
                            {  
                                record.status === 1 ?<Tag className='text-center' color="blue"> Nuevo </Tag> :
                                record.status === 2 ?<Tag className='text-center' color="orange">Parcial</Tag>  :
                                record.status === 3 ? <Tag className='text-center' color="green">Entregado</Tag>  :
                                record.status === 4 ? <Tag className='text-center' color="red">Cancelado</Tag> :
                                record.status === 5 ? <Tag className='text-center' color="magenta">Cerrado</Tag> :
                                record.status === 6 ? <Tag className='text-center' color="volcano">Parcial</Tag>
                            : null
                            }
                            </div>
                            <h2> Insumo: </h2>
                            <p className='font-bold'> { record.insumo.nombre } </p>
                            <h2> Unidad:  </h2>
                            <p className='font-bold'>{ record.insumo.unidadMedida }</p>
                            <h2> Cantidad Solicitada: </h2>
                            <p className='font-bold text-dark'>{ Number(record.cantidadSolicitada) }</p>
                            <h2> Cantidad Entregada: </h2>
                            <p className='font-bold text-green-500'>{ Number(record.cantidadEntregada) }</p>
                            <h2> Cantidad Pendiente: </h2>
                            <p className='font-bold text-red-500'>{ Number(record.cantidadSolicitada) - Number(record.cantidadEntregada) }</p>
                            {
                                record.comentarios?
                                <> 
                                    <h2> Observaciones: </h2>
                                    <p className="font-bold">{ record.comentarios }</p>
                                </>
                            : null }   
                        </>
                    : null }
                </div>         
                ),
        })
    }

    const handleSubmit = (value) => {
        switch (value.type) {
            case 1:
                dispatch(completeValeSalida(value))
                break
            case 2:
                dispatch(deliverValeAction(value))
                break
            case 3:
                // Cancelar Vale
                dispatch(cancelValeAction(value))
                break
            case 4: 
                dispatch(cancelDetalleAction(value))
                break
            case 5:
                dispatch(closeValeAction(value))
            break
            default:
                break;
        }
    }
    // ? End Acciones

    // Table Nested Data
    const expandedRowRender = (record, index, indent, expanded) => {
        
        if(expanded){
            setDataNestedSource( detalleSalida )
        }
        
        const columns = [
            {
                title: 'Enkontrol',
                dataIndex: 'insumo',
                key: `clave-${nanoid()}`,
                render: item =>  item.claveEnk,
                responsive: ['lg'],
                width: '7%'
            },
            {
                title: 'Estatus',
                dataIndex: 'acciones',
                key: `acciones-${nanoid()}`,
                render: (text, record, index) => (
                    // record.prestamo.status !== 1 ?
                        record.status === 1 ? <Tag key={index} className='w-full text-center' color="blue"> Nuevo </Tag>
                        : record.status === 2 ? <Tag key={index} className='w-full text-center' color="orange">Parcial</Tag> 
                        : record.status === 6 ? <Tag key={index} className='w-full text-center' color="volcano">Parcial</Tag>
                        : record.status === 3 ? <Tag key={index} className='w-full text-center' color="green">Entregado</Tag> 
                        : record.status === 4 ? <Tag key={index} className='w-full text-center' color="red">Cancelado</Tag>
                        : record.status === 5 ? <Tag key={index} className='w-full text-center' color="magenta">Cerrado</Tag>
                        : null
                    // : <Tag key={index} className='w-full text-center' color="red"> Sin Aprobar </Tag>
                ),
                width: '6%'
            },
            {
                title: 'Nombre',
                dataIndex: 'insumo',
                key: `nombre-${nanoid()}`,
                // render: item => item.nombre,
                render: (text, record) => (
                    <div className='flex items-center align-middle' key={record.id}>
                        { record.prestamo? 
                            <Tooltip  title={ `Prestamo de ${record.prestamo.residente.nombre} ${record.prestamo.residente.apellidoPaterno}` }><ShrinkOutlined className="mx-1 text-blue-500" /></Tooltip>
                            : null 
                        }
                        { record.insumo.nombre }
                    </div>
                ),
                ellipsis: true,
                width: '39%'
            },
            {
                title: 'CC',
                dataIndex: 'centroCosto',
                key: `cc-${nanoid()}`,
                render: (text, record) => (
                    <div className='flex items-center align-middle'>
                        { record.insumo.centroCosto }
                    </div>
                ),
                responsive: ['lg'],
            },
            {
                title: 'U.Medida',
                dataIndex: 'insumo',
                key: `unidad-${nanoid()}`,
                render: item => item.unidadMedida,
                width: '10%',
                responsive: ['lg']
            },
            {
                title: 'Solicitado',
                dataIndex: 'cantidadSolicitada',
                key: `cantidadSolicitada-${nanoid()}`,
                render: item => Number(item),
                width: '10%'
            },
            {
                title: 'Entregado',
                dataIndex: 'cantidadEntregada',
                key: `cantidadEntregada-${nanoid()}`,
                render: item => Number(item),
                width: '10%',
                responsive: ['lg']
            },
            {
                title: 'Pendiente',
                dataIndex: 'detalle_salidas',
                key: `detalle_salidas-${nanoid()}`,
                render: (text, record) => (record.cantidadSolicitada - record.cantidadEntregada ),
                width: '10%'
            },
            {
                // Detalle Estatus / Acciones
                title: 'Acciones',
                dataIndex: 'acciones',
                key: `acciones-${nanoid()}`,
                render: (text, record, index) => (
                    record.status === 1 || record.status === 2?
                    <div key={index} className="inline-flex align-middle">
                        {
                            hasPermission(userPermission, 'entregar vales') ? 
                            <>
                                <Tooltip placement='topRight' title="Entrega Completa">
                                    <Button className="icon" htmlType='button' onClick={ () => handleEntregaInsumoCompleta(record) } type='icon-primary'> 
                                        <CheckCircleOutlined className='align-middle text-xl' /> 
                                    </Button>
                                </Tooltip>
                                <Tooltip placement='topRight' title="Entrega Parcial">
                                    <Button className="icon" htmlType='button' onClick={ () => handleEntregaParcial(record) } type='icon-warning'> 
                                        <PieChartOutlined className='align-middle text-xl' /> 
                                    </Button> 
                                </Tooltip>
                            </>
                            : null
                        }
                        {
                            hasPermission(userPermission, 'eliminar vales') ? 
                            <Tooltip placement='topRight' title="Cancelar Insumo"> 
                                <Button className="icon" htmlType='button' onClick={ () => handleCancelInsumo(record) } type='icon-danger'> 
                                    <StopOutlined className='align-middle text-xl' /> 
                                </Button> 
                            </Tooltip>
                            : null
                        }
                    </div>
                    :  
                    <div className="inline-flex align-middle py-0.5" key={index}> 
                        <Button type='icon-warning' onClick={ () => { handleShowInformationInsumo(record) } } htmlType='button' className='icon'>
                            <BsInfoCircle className='text-xl align-middle' /> 
                        </Button>
                    </div>

                ),
            },
 
        ]

        if(!isLoadingDetalles){  
            return <Table render={true} bordered key={record => record.id } scroll={{ x: 'auto' }} columns={columns} dataSource={dataNestedSource} pagination={false} className="nestedTable"/>
        }

    }
    // End Table Nested Data

    // ? Alertas

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, delivered, updated, deleted])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
        }
        if(delivered){
            openNotificationWithIcon('success', 'Se ha guardado correctamente')
            setVisible(false)
            clearFields()
        }
        if(updated){
            openNotificationWithIcon('success', 'Se ha guardado correctamente')
            setVisible(false)
            clearFields()
        }
        if(deleted){
            openNotificationWithIcon('success', 'Se ha cancelado correctamente')
            setVisible(false)
            clearFields()
         }
    }

    // ? End Alertas


    useEffect(() => {
        if( online ){
            socket.on('nuevo-vale', (data) => {
                dispatch(getCountValeSalidaAction())
                dispatch(getAllValesAction(filter)) 
            })
        }  
    // eslint-disable-next-line
    }, [online])

    const handleChangeProyecto = (value) => {
        
        setFilter({
            ...filter,
            proyectoId: value,
        })
    }

    
    return ( 

        <>
            { hasPermission(userPermission, 'crear vales') ?
            //  Validamos Permiso para Crear Vale
                    <Button type='icon-secondary-new' onClick={() => navigate('nuevo')} className="lg:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>
            : null 
            // Fin Validación Permiso Para Crear Vale
            }


            <div className="lg:grid hidden grid-cols-4 gap-10 py-5 ">
                <Card   
                    text="Todos"
                    icon={<FileTextOutlined className='align-middle text-base sm:text-3xl'/>}
                    fn={() => handleCleanSearch()}
                    count={count.todos}
                    color={'dark'}
                />
                <Card   
                    text="Nuevos"
                    icon={ <BellOutlined className='align-middle text-base sm:text-3xl'/>}
                    fn={() => handleSearchByStatus([1]) }
                    count={count.nuevo}
                    color={'info'}
                />
                <Card   
                    text="Parciales"
                    icon={<PieChartOutlined className='align-middle text-base sm:text-3xl'/>}
                    fn={() => handleSearchByStatus( [2] )}
                    count={count.parcialAbierto}
                    color={'warning'}
                />
                <Card   
                    text="Sin Registro EK"
                    icon={<img src={ekIcon2} alt="" />}
                    fn={() => handleSearchByStatus( [3, 4] )}
                    count={count.entregado + count.parcialCerrado}
                    color={'primary'}
                />
            </div> 

            <div className='inline-flex items-center pb-3 w-full'>
            <Select
                style={{
                    width: '100%',
                    maxWidth: '200px'
                }}
                placeholder="Filtrar Por Proyecto"
                showSearch
                optionFilterProp="children"
                filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                defaultValue={1}
                value={filter.proyectoId}
                onChange={ handleChangeProyecto }
            >
                {
                    proyectos.map(item => (
                        <Select.Option key={item.id} value={item.id}>{item.nombre}</Select.Option>
                    ))
                }
            </Select>

                <Input type="text" 
                    placeholder='Buscar'
                    allowClear
                    className='mx-3' 
                    style={{ width : '250px', height: '32px'}} 
                    onChange={ handleSearchByText }
                    suffix={ <SearchOutlined className='text-xl' /> }
                />
                <RangePicker showToday={true}  className="mx-3 hidden lg:flex" style={{ width : '350px'}} onCalendarChange={ (value, dateString) => {handleSearchByDate(value, dateString); } }/>         
                <Select
                    mode="multiple"
                    allowClear
                    className='mx-3'
                    style={{
                        width: '200px',
                    }}
                    placeholder="Filtrar Por Estatus"
                    maxTagCount= 'responsive'
                    onChange={ (e) => { handleSearchByStatus(e) }}
                    showSearch={false}
                    >
                    <Select.Option key={1} value={1}> Nuevo </Select.Option>
                    <Select.Option key={2} value={2}> Parcial Abierto </Select.Option>
                    <Select.Option key={6} value={6}> Parcial Cerrado </Select.Option>
                    <Select.Option key={4} value={4}> Entregado </Select.Option>
                    <Select.Option key={5} value={5}> Cancelado </Select.Option>
                    <Select.Option key={7} value={7}> Enkontrol </Select.Option>
                </Select>
                <Select
                    className='mx-3 hidden lg:block'
                    style={{
                        width: '200px',
                    }}
                    placeholder="Ordenar por: "
                    onChange={ (e) => { handleSort(e) }}
                    showSearch={false}
                    defaultValue={"DESC"}
                    >
                    <Select.Option key={1} value={'ASC'}> Primeros Registros </Select.Option>
                    <Select.Option key={2} value={'DESC'}> Últimos Registros </Select.Option>
                </Select>    
            </div> 


            {
                tableReady? 
                <>
                <Table 
                    className='tableVales' 
                    loading={isLoading}
                    pagination={false}
                    render={true}
                    scroll={{ x: 'auto' }} 
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={ record => record.id } 
                    expandable={{
                        expandedRowRender, 
                        expandedRowKeys: activeExpRow,
                        rowExpandable: (record) => true,
                        onExpand: (expanded, record) => {       
                            // Al expandir la fila, se obtiene el detalle de la orden
                            if(expanded){
                                dispatch( getDetalleSalidaAction({'id':record.id}) )
                                setActiveExpRow([record.id]);
                            }else{
                                setActiveExpRow([]);
                            }
                        }
                    }}
                />
                <Pagination 
                    total={(paginate.totalItem)} 
                    current={paginate.currentPage + 1} 
                    pageSize={filter.limit} 
                    onChange={handleLoadVales} 
                    className="w-auto py-4 max-w-max ml-auto"
                />
                </>
            : null }


            <Modal
                title={modalProps.title}
                destroyOnClose={true}
                footer={[
                    <Button key={1} type='default' onClick={() => setVisible(false)}> Cancelar </Button>,
                    <Button key={2} type='ghost' onClick={modalProps.fn} disabled={ !( response !== "" || Number(amount) > 0) }> Enviar</Button>
                ]}
                open={visible}
                visible={visible}
                onCancel={() => { setVisible(false); clearFields() }}
                width={600}
                icon={modalProps.icon}
                >
                    { modalProps.content }
            </Modal>

        </> 
    );
}
 
export default ValesSalida;