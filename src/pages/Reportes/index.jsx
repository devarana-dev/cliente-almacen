import { Select, DatePicker, Input, Table, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import Download from '../../components/Elements/Download';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getReportesAcumuladosAction, getReportesGeneralAction } from '../../actions/reportesActions';
import { getAllActividadAction } from '../../actions/actividadActions';
import { getAllPersonalAction } from '../../actions/personalActions';
import { getAllUsuariosAction } from '../../actions/usuarioActions';
import { nanoid } from 'nanoid';
import moment from 'moment/moment';
import { getAllObraAction } from '../../actions/obraActions';

const Reportes = () => {
    const dispatch = useDispatch();

    const { paginate, insumos, isLoading } = useSelector(state => state.reportes);

    const { actividades } = useSelector(state => state.actividades);
    const { personal } = useSelector(state => state.personal);
    const { usuarios } = useSelector(state => state.usuarios);
    const { obra } = useSelector(state => state.obras);

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
    const [filtros, setFiltros] = useState({
        page: 0,
        limit: 10,
        ordenSolicitado: 'DESC',
        type: 'acumulado',
    })
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
                        title: 'Clave EK',
                        dataIndex: 'claveEnk',
                        width: 100,
                    },
                    {
                        title: 'Nombre',
                        dataIndex: 'insumoNombre',
                        ellipsis: true,
                    },

                    {
                        title: 'Actividad',
                        dataIndex: 'actividadNombre',
                        ellipsis: true,
                        width: 200,
                    },
                    {
                        title: 'Personal',
                        dataIndex: 'personal',
                        ellipsis: true,
                    },
                    {
                        title: 'Usuario',
                        dataIndex: 'usuario',
                       
                        ellipsis: true,
                        width: 200,
                    },
                    {
                        title: 'EK',
                        dataIndex: 'salidaEnkontrol',
                        render: (text, record) => {
                            return record.salidaEnkontrol ? record.salidaEnkontrol : 'No registrado o Entregado'
                        },
                        width: 50,
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
                                />
                                <RangePicker 
                                    showToday={true}  
                                    className="hidden lg:flex" 
                                    style={{ width : '350px'}}
                                    onCalendarChange={ (value, dateString) => {handleSearchByDate(value, dateString)}}
                                    // format="DD/MM/YYYY"
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
                                                >
                                                {
                                                    usuarios.map((usuario) => (
                                                        <Select.Option key={usuario.id} value={usuario.id}> {usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}  </Select.Option>
                                                    ))
                                                }
                                            </Select> 
                                            {/* <Select
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
                                            </Select> */}
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
                <div className="my-auto">
                    <Download fn={() => console.log('Hola')}/>
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
