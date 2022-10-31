import { Select, DatePicker, Input, Table, Pagination, Tag, Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import Download from '../../components/Elements/Download';
import { ClearOutlined, FileExcelOutlined, FilePdfOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getReportesAcumuladosAction, getReportesGeneralAction } from '../../actions/reportesActions';
import { getAllActividadAction } from '../../actions/actividadActions';
import { getAllPersonalAction } from '../../actions/personalActions';
import { getAllUsuariosAction } from '../../actions/usuarioActions';
import { nanoid } from 'nanoid';
import moment from 'moment/moment';
import { getAllObraAction } from '../../actions/obraActions';
import openNotificationWithIcon from '../../hooks/useNotification';
import { generarReporte } from '../../utils/generarReporte';


const initialData = {
    page: 0,
    limit: 10,
    ordenSolicitado: 'DESC',
    type: 'acumulado',
}

const Reportes = () => {
    const dispatch = useDispatch();

    const { paginate, insumos, isLoading, errors } = useSelector(state => state.reportes);

    const { actividades = [] } = useSelector(state => state.actividades);
    const { personal = [] } = useSelector(state => state.personal);
    const { usuarios = [] } = useSelector(state => state.usuarios);
    const { obra } = useSelector(state => state.obras);

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
        }
    ])
    const [filtros, setFiltros] = useState(initialData)
    
    const [reportType, setReportType] = useState(1)

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
            residente: '',
            status: '',
            fechaInicial: "",
            fechaFinal: "",
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
                            <p> { record.totalEntregado || 0} </p>
                        )
                    }
                ])
                setFiltros({
                    ordenSolicitado: 'DESC',
                    type: 'acumulado',
                    page: 0,
                    limit: 10,
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
                    orden: 'DESC'
                })
                
                dispatch(getAllActividadAction())
                dispatch(getAllPersonalAction())
                dispatch(getAllUsuariosAction())
                break;
            default:
                break;
        }
    }

    const handleSearchByCC = (value) => {
        setFiltros({
            ...filtros,
            centroCosto: value
        })
    }

    const handleSearchByName = (e) => {
        const {value} = e.target
        setFiltros({
            ...filtros,
            busqueda: value
        })
        
    }

    const handleSearchByDate = (value, dateString) => {
        if ((dateString[0] !== '' && dateString[1] !== '')){
            setFiltros({
                ...filtros,
                page: 0,
                fechaInicial: dateString[0],
                fechaFinal: dateString[1]
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
        setFiltros({
            ...filtros,
            actividad: value
        })
    }

    const handleSearchByPersonal = (value) => {
        setFiltros({
            ...filtros,
            lider: value
        })
    }

    const handleSearchByUsuario = (value) => {
        setFiltros({
            ...filtros,
            residente: value
        })
    }

    const handleSearchByStatus = (value) => {
        setFiltros({
            ...filtros,
            status: value
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
        let headerFile = []
        let fileTitle = ''
        if(reportType === 1){
            fileTitle = 'ReporteAcumulado'
            headerFile = [
                { key: 'id', header: 'ID EK' },
                { key: 'nombre', width: 60, header: 'Nombre' },
                { key: 'centroCosto', header: 'Centro Costo' },
                { key: 'totalEntregado', header: 'Total Entregado' },
            ]
        } else if (reportType === 2){
            fileTitle = 'ReporteGeneral'
            headerFile = [
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
        }

        await generarReporte(headerFile, insumos, fileTitle, setDownload)
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
                                                >
                                                {
                                                    usuarios.map((usuario) => (
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
                    <Download disabled={download} icon={ <FilePdfOutlined />} fn={() => {}}/>
                    <Download disabled={download} icon={ <FileExcelOutlined />} fn={() => handleReporteExcel()}/>
                    <Button type='icon-secondary-new' onClick={
                        () => {
                            setFiltros({
                                ...initialData,
                                type: filtros.type,
                                fechaInicial: "",
                                fechaFinal: "",
                            })
                        }
                    }><ClearOutlined /></Button>
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

            {
                JSON.stringify(filtros)
            }
        </>
    );
}
 
export default Reportes;
