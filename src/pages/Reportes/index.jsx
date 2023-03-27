import { Select, DatePicker, Input, Table, Pagination, Tag, Button, Tooltip, Modal } from 'antd';
import { useEffect, useState } from 'react';
import Download from '../../components/Elements/Download';
import { ClearOutlined, FileExcelOutlined, FilePdfOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { cleanGenerarReporteAction, generarReportePdfAcumuladoAction, generarReportePdfGeneralAction, generateReporteAcumuladoAction, generateReporteGeneralAction, getReportesAcumuladosAction, getReportesGeneralAction } from '../../actions/reportesActions';
import { getAllActividadAction } from '../../actions/actividadActions';
import { getAllPersonalAction } from '../../actions/personalActions';
import { getAllUsuariosAction } from '../../actions/usuarioActions';
import { nanoid } from 'nanoid';
import moment from 'moment/moment';
import { getAllObraAction } from '../../actions/obraActions';
import openNotificationWithIcon from '../../hooks/useNotification';
import { generarReporte } from '../../utils/generarReporte';
import Loading from '../../components/Elements/Loading';
import { hasPermission } from '../../utils/hasPermission';


const initialData = {
    page: 0,
    limit: 10,
    ordenSolicitado: 'DESC',
    type: 'acumulado',
    filterNames: { }
}

const Reportes = () => {
    const dispatch = useDispatch();

    const { userPermission } = useSelector(state => state.permisos);
    const { paginate, insumos, isLoading, errors, generar, isGeneratingReport } = useSelector(state => state.reportes);
    const { userAuth } = useSelector(state => state.auth);

    const { actividades = [] } = useSelector(state => state.actividades);
    const { personal = [] } = useSelector(state => state.personal);
    const { obra } = useSelector(state => state.obras);
    const { usuarios = [] } = useSelector(state => state.usuarios);
    const [ showHelpModal, setShowHelpModal ] = useState(false);

    const [download, setDownload] = useState(false);

    const { RangePicker } = DatePicker;
    const [columns, setColumns] = useState([
        {
            title: 'Nombre',
            dataIndex: 'nombre',
        },
        {
            title: 'Centro Costo',
            dataIndex: 'centroCosto',
        },
        {
            title: 'Total Entregado', 
            dataIndex: 'totalEntregado',
            render: (text, record) => (
                <p> { (record.totalEntregado && typeof (record.totalEntregado) !==  'object' )? record.totalEntregado : "0.00" } </p>
            )
        }
    ])
    const [filtros, setFiltros] = useState(initialData)
    
    const [reportType, setReportType] = useState(1)
    
    const [reporte, setReporte] = useState({
        headerFile: [],
        fileTitle: '',
        data: [],
        reportType: 0
    })
  

    useEffect(() => {
        dispatch(getAllObraAction())
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if(filtros.type === 'acumulado') {
            dispatch(getReportesAcumuladosAction(filtros))
        }else if(filtros.type === 'general') {
            dispatch(getReportesGeneralAction(filtros))
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtros])


    const handleCleanFiltros = () => {
        setFiltros({
            page: 0,
            limit: 10,
            centroCosto: [],
            busqueda: '',
            actividad: '',
            lider: '',
            residente: hasPermission(userPermission, 'ver reportes') ? '' : userAuth?.id,
            status: '',
            fechaInicial: "",
            fechaFinal: "",
            filterNames: { }
        })
    }

    const handleSelectReport = (value) => {
        handleCleanFiltros()
        setReportType(value)
        switch (value) {
            case 1:
                setColumns([
                    {
                        title: 'Nombre',
                        dataIndex: 'nombre',
                    },
                    {
                        title: 'Centro Costo',
                        dataIndex: 'centroCosto',
                    },
                    {
                        title: 'Total Entregado', 
                        dataIndex: 'totalEntregado',
                        render: (text, record) => (
                            <p> { (record.totalEntregado && typeof (record.totalEntregado) !==  'object' )? record.totalEntregado : 0.00 } </p>
                        )
                    }
                ])
                setFiltros({
                    ordenSolicitado: 'DESC',
                    type: 'acumulado',
                    page: 0,
                    limit: 10,
                    filterNames: { }
                })
                break;
            case 2:
                setColumns([
                    {
                        title: 'ID',
                        dataIndex: 'folio',
                        width: 50,
                    },
                    {
                        title: 'ID EK',
                        dataIndex: 'claveEnk',
                        width: 80,
                    },
                    {
                        title: 'Nombre',
                        dataIndex: 'insumoNombre',
                        ellipsis: true,
                    },
                    {
                        title: 'Usuario',
                        dataIndex: 'usuario',
                        ellipsis: true,
                        width: 200,
                    },
                    {
                        title: 'Personal',
                        dataIndex: 'personal',
                        ellipsis: true,
                        width: 200,
                    },
                    {
                        title: 'Actividad',
                        dataIndex: 'actividadNombre',
                        ellipsis: true,
                        width: 200,
                    },
                    {
                        title: 'EK',
                        dataIndex: 'salidaEnkontrol',
                        render: (text, record) => {
                            return record.salidaEnkontrol ? record.salidaEnkontrol : 'No registrado o Entregado'
                        },
                        width: 80,
                        ellipsis: true,

                    },
                    {
                        title: 'Fecha',
                        dataIndex: 'fecha',
                        render: (text, record) => {
                            return record.fecha ? moment(record.fecha).format('DD/MM/YYYY') : 'No registrado'
                        },
                        width: 100,
                    },
                    {
                        title: 'CC',
                        dataIndex: 'centroCosto',
                        width: 50,
                        
                    },
                    {
                        title: 'Solicitado',
                        dataIndex: 'cantidadSolicitada',
                        width: 100,
                    },
                    {
                        title: 'Entregado',
                        dataIndex: 'cantidadEntregada',
                        width: 100,
                    },
                    {
                        title: 'Estado',
                        dataIndex: 'status',
                        width: 100,
                        render: (text, record) => {
                            return (
                                record.status === 3 ? <Tag color="green">Entregado</Tag> : 
                                record.status === 1 ? <Tag color="blue">Pendiente</Tag> :
                                record.status === 4 ? <Tag color="red">Cancelado</Tag> : null 
                            )
                        }                        
                    },
                ])
                setFiltros({
                    page: 0,
                    limit: 10,
                    type: 'general',
                    orden: 'DESC',
                    filterNames: { }
                })
                
                dispatch(getAllActividadAction())
                dispatch(getAllPersonalAction())
                dispatch(getAllUsuariosAction({ esInterno: 1 }))
                break;
            default:
                break;
        }
    }

    const handleSearchByCC = (value = []) => {

        // obtener el centroCosto de las obras seleccionadas
        const valueName =  value.toString()

        setFiltros({
            ...filtros,
            centroCosto: value,
            filterNames:{
                ...filtros.filterNames,
                centroCosto: valueName.trim()
            }
        })
    }

    const handleSearchByName = (e) => {
        const {value} = e.target
        setFiltros({
            ...filtros,
            busqueda: value,
            filterNames:{
                ...filtros.filterNames,
                busqueda: value.trim()
            }
        })
        
    }

    const handleSearchByDate = (value, dateString) => {
        if ((dateString[0] !== '' && dateString[1] !== '')){
            setFiltros({
                ...filtros,
                page: 0,
                fechaInicial: dateString[0],
                fechaFinal: dateString[1],
                filterNames:{
                    ...filtros.filterNames,
                    fechaInicial: moment(dateString[0]).format('DD/MM/YYYY'),
                    fechaFinal: moment(dateString[1]).format('DD/MM/YYYY')
                }
            })
        }else if (dateString[0] === '' && dateString[1] === ''){
            setFiltros({
                ...filtros,
                page: 0,
                fechaInicial: '',
                fechaFinal: ''
            })
        }
    }

    const handleLoadVales = (page, limit) => {
        setFiltros({
            ...filtros,
            page: page - 1,
            limit,
        })
    }

    const handleSortSolicitados = (value) => {
        setFiltros({
            ...filtros,
            ordenSolicitado: value
        })
    }

    const handleSearchByActividad = (value) => {

        const actividadNombre = actividades.find(actividad => actividad.id === value)

        setFiltros({
            ...filtros,
            actividad: value,
            filterNames:{
                ...filtros.filterNames,
                actividad: actividadNombre ? actividadNombre.nombre : ''
            }
        })
    }

    const handleSearchByPersonal = (value) => {

        const personaNombre = personal.find(item => item.id === value )
        
        setFiltros({
            ...filtros,
            lider: value,
            filterNames:{
                ...filtros.filterNames,
                personal: personaNombre ? `${personaNombre.nombre.trim()} ${personaNombre.apellidoPaterno.trim()} ${personaNombre.apellidoMaterno ? `"${personaNombre.apellidoMaterno.trim()}"` : ''}` : ''
            }
        })
    }

    const handleSearchByUsuario = (value) => {

        const usuarioNombre = usuarios.find(item => item.id === value)
        setFiltros({
            ...filtros,
            residente: value,
            filterNames:{
                ...filtros.filterNames,
                usuario: usuarioNombre ? `${usuarioNombre.nombre.trim()} ${usuarioNombre.apellidoPaterno.trim()} ${usuarioNombre.apellidoMaterno ? `"${usuarioNombre.apellidoMaterno.trim()}"` : ''}` : ''
            }
        })
    }

    const handleSearchByStatus = (value) => {

        setFiltros({
            ...filtros,
            status: value,
            filterNames:{
                ...filtros.filterNames,
                status: value === 1 ? 'Pendiente' : value === 3 ? 'Entregado' : value === 4 ? 'Cancelado' : ''
            }
        })
    }


       // ? Alertas

       useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors])

    const displayAlert = () => {
        if(errors){
            openNotificationWithIcon('error', errors)
        }
    }

    // ? End Alertas


    const handleReporteExcel = async () => {
        setDownload(true)
        if(reportType === 1){

            setReporte({
                ...reporte,
                fileTitle: 'ReporteAcumulado',
                headerFile : [
                    { key: 'claveEnk', header: 'ID EK', width: 15},
                    { key: 'nombre', header: 'Nombre', width: 60},
                    { key: 'centroCosto', header: 'Centro Costo', width: 15},
                    { key: 'totalEntregado', header: 'Total Entregado', width: 15},
                ]
            })
            dispatch(generateReporteAcumuladoAction(filtros))
            
        } else if (reportType === 2){
            setReporte({
                ...reporte,
                fileTitle: 'ReporteGeneral',
                headerFile : [
                    { key: "id", header: "ID" },
                    { key: "folio", header: "Folio Vale", width: 13 },
                    { key: "insumoNombre", header: "Nombre Insumo", width: 60 },
                    { key: "claveEnk", header: "Clave Enkontrol", width: 15 },
                    { key: "centroCosto", header: "CC", width: 10 },
                    { key: "cantidadSolicitada", header: "Cantidad Solicitada", width: 20 },
                    { key: "cantidadEntregada", header: "Cantidad Entregada", width: 20 },
                    { key: "actividadNombre", header: "Actividad", width: 25 },
                    { key: "personal", header: "Personal", width: 35 },
                    { key: "usuario", header: "Usuario", width: 30 },
                    { key: "salidaEnkontrol", header: "Folio Salida EK", width: 15 },
                    { key: "fecha", header: "Fecha", width: 15  },
                ]
            })
            dispatch(generateReporteGeneralAction(filtros))
        }
    }

    useEffect(() => {
        if(generar.length > 0){
            generarReporte(reporte.headerFile, generar, reporte.fileTitle, setDownload, filtros, reportType)
            dispatch(cleanGenerarReporteAction())
        }    
    // eslint-disable-next-line
    }, [generar])

    // eslint-disable-next-line
    const getReporteGeneral = () => {
        if( reportType === 2 ){
            dispatch(generarReportePdfGeneralAction(filtros))
        }
        else if(reportType === 1){
            dispatch(generarReportePdfAcumuladoAction(filtros))
        }
    }

    const setShowHelp = () => {
        setShowHelpModal(!showHelpModal)
    }   
    
    return ( 
        <>
            <div className="flex gap-10 py-3">
                <div className="flex flex-wrap items-center gap-3">
                    <Select
                        style={{
                            width: '250px',
                        }}
                        onChange={ handleSelectReport }
                        showSearch={false}
                        defaultValue={1}
                        >
                        <Select.Option key={1} value={1}> Acumulado </Select.Option>
                        <Select.Option key={2} value={2}> Reporte General </Select.Option>
                    </Select>
                    <Select
                        mode='multiple'
                        maxTagCount={"responsive"}
                        allowClear
                        style={{
                            width: '250px',
                        }}
                        placeholder="Filtrar Por Centro de Costo"
                        onChange={ (e) => { handleSearchByCC(e) }}
                        showSearch
                        optionFilterProp="children"
                        filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                        defaultValue={filtros.centroCosto}
                        value={filtros.centroCosto}
                        >
                        {
                            obra.reduce((acc, item) => {
                            if(!acc.includes(item.centroCosto)){
                                acc.push(item.centroCosto)
                            }
                            return acc
                            }, []).map((item, index) => (
                                <Select.Option key={index} value={item}>{item}</Select.Option>
                            ))
                            
                        }
                    </Select>  
                    {
                        reportType === 1 || reportType === 2 ? (
                            <>
                                <Input type="text" 
                                    style={{ width : '250px'}} 
                                    onChange={ (e) => { handleSearchByName(e) }}
                                    allowClear
                                    suffix={<SearchOutlined />}
                                    placeholder="Buscar"
                                    value={filtros.busqueda}
                                    name="busqueda"
                                />
                                <RangePicker 
                                    showToday={true}  
                                    className="hidden lg:flex" 
                                    style={{ width : '350px'}}
                                    onCalendarChange={ (value, dateString) => {handleSearchByDate(value, dateString)}}
                                    value={(filtros.fechaInicial !== '' && filtros.fechaFinal !== '') && (filtros.fechaInicial && filtros.fechaFinal) ? [ moment(filtros.fechaInicial), moment(filtros.fechaFinal)] : ["", ""]}
                                />         
                                
                                {
                                    reportType === 2 ? (
                                        <>
                                            <Select
                                                showSearch
                                                allowClear
                                                style={{
                                                    width: '250px',
                                                }}
                                                placeholder="Filtrar Actividad"
                                                onChange={ (e) => { handleSearchByActividad(e) }}                                               
                                                optionFilterProp="children"
                                                filterOption={ (input, option) => option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                                                value={filtros.actividad}
                                                name="actividad"
                                                >
                                                {
                                                    actividades.map((actividad) => (
                                                        <Select.Option key={actividad.id} value={actividad.id}> {actividad.nombre} </Select.Option>
                                                    ))
                                                }
                                            </Select> 
                                            <Select
                                                allowClear
                                                style={{
                                                    width: '300px',
                                                }}
                                                placeholder="Filtrar Lider Cuadrilla"
                                                onChange={ (e) => { handleSearchByPersonal(e) }}
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={ (input, option) => option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                                                value={filtros.lider}
                                                name="lider"
                                                >
                                                {
                                                    personal.map((personal) => (
                                                        <Select.Option key={personal.id} value={personal.id}> {personal.nombre} ({personal.apellidoMaterno}) {personal.apellidoPaterno} </Select.Option>
                                                    ))
                                                }
                                            </Select> 
                                            <Select
                                                allowClear
                                                style={{
                                                    width: '250px',
                                                }}
                                                placeholder="Filtrar Usuario"
                                                onChange={ (e) => { handleSearchByUsuario(e) }}
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={ (input, option) => option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                                                value={filtros.residente}
                                                name="residente"
                                                defaultValue={ hasPermission(userPermission, 'ver reportes') ? null : userAuth.id }
                                                >
                                                {
                                                    hasPermission(userPermission, 'ver reportes')?
                                                    usuarios.map((usuario) => (
                                                        <Select.Option key={usuario.id} value={usuario.id}> {usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}  </Select.Option>
                                                    ))
                                                    : 
                                                    usuarios.filter(usuario => usuario.id === userAuth.id).map((usuario) => (
                                                        <Select.Option key={usuario.id} value={usuario.id}> {usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}  </Select.Option>
                                                    ))
                                                }
                                            </Select> 
                                            <Select
                                                style={{
                                                    width: '250px',
                                                }}
                                                placeholder="Ordenar por Estatus "
                                                onChange={ (e) => { handleSearchByStatus(e) }}
                                                showSearch={false}
                                                value={filtros.status}
                                                name="status"
                                                >
                                                <Select.Option key={1} value=""> Todos   </Select.Option>
                                                <Select.Option key={2} value={1}> Pendiente   </Select.Option>
                                                <Select.Option key={3} value={3}> Entregado   </Select.Option>
                                                <Select.Option key={4} value={4}> Cancelado </Select.Option>
                                            </Select>
                                        </>
                                    ) : null
                                }
                            </>
                        ) : null
                    }
                    {
                        reportType === 1 ? (
                            <Select
                                className='hidden lg:block'
                                style={{
                                    width: '250px',
                                }}
                                placeholder="Ordenar por: "
                                onChange={ (e) => { handleSortSolicitados(e) }}
                                showSearch={false}
                                defaultValue={"DESC"}
                                >
                                <Select.Option key={1} value={'DESC'}> Más Solicitado  </Select.Option>
                                <Select.Option key={2} value={'ASC'}> Menos Solicitado </Select.Option>
                            </Select>
                        ) : null
                    }
                </div>
                <div className="my-auto inline-flex gap-x-3">
                    <Download disabled={download} icon={ <FilePdfOutlined />} fn={() => {getReporteGeneral()}}/>
                    <Tooltip title="Descargar Reporte">
                        <div>
                            <Download disabled={download} icon={ <FileExcelOutlined />} fn={() => handleReporteExcel()}/>
                        </div>
                    </Tooltip>
                    <Tooltip title="Limpiar Filtros">
                        <Button type='icon-secondary-new' title='Limpiar Filtros' onClick={
                            () => {
                                setFiltros({
                                    ...initialData,
                                    type: filtros.type,
                                    fechaInicial: "",
                                    fechaFinal: "",
                                })
                            }
                        }><ClearOutlined /></Button>
                    </Tooltip>
                    <Tooltip title="Ayuda">
                        <Button type='icon-primary-new' title='Ayuda' onClick={() => {setShowHelp(!showHelpModal)}}><QuestionCircleOutlined /></Button>
                    </Tooltip>
                </div>
            </div>  

            <Table
                columns={columns}
                dataSource={insumos}
                pagination={false}
                scroll={{ y: 'auto' }}
                loading={ isLoading }
                rowKey={record => record.id+nanoid()}
            />
            <Pagination 
                total={(paginate.totalItem)} 
                current={paginate.currentPage + 1} 
                pageSize={filtros.limit} 
                onChange={handleLoadVales} 
                className="w-auto py-4 max-w-max ml-auto"
            />

            {isGeneratingReport ? 
            <div>
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full">
                        <div className="flex flex-col gap-y-2">
                            <div className="flex justify-center items-center">
                                <Loading text={"Generando Reporte..."}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            : null}

            <Modal
                open={showHelpModal}
                onCancel={() => {setShowHelp(!showHelpModal)}}
                footer={null}
                width={1000}
                destroyOnClose={true}
            >
                <video width="100%" height="100%" controls src='https://spaces.erp-devarana.mx/tutoriales/tutorial-reportes.webm' preload='none' autoPlay />
            </Modal>
           
        </>
    );
}
 
export default Reportes;
