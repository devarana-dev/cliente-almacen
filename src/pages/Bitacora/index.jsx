import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, DatePicker, Drawer, Input, Pagination, Select, Table } from 'antd';
// import { hasPermission } from "../../utils/hasPermission";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { getBitacorasAction, getTipoBitacoraAction } from '../../actions/bitacoraActions'
import moment from "moment";
import Loading from "../../components/Elements/Loading";
import { ViewBitacora } from "./view";
import { getAllActividadAction } from "../../actions/actividadActions";
import { getAllPersonalAction } from "../../actions/personalActions";
import { getAllUsuariosAction } from "../../actions/usuarioActions";
import { getAllObraAction } from "../../actions/obraActions";
import { getAllNivelesAction } from "../../actions/nivelActions";
import { ModalBitacora } from "./modal";


const initialData = {
    page: 0,
    size: 10,
    ordenSolicitado: 'DESC',
}


const Bitacora = () => {

    // const { userPermission } = useSelector(state => state.permisos);
    const { RangePicker } = DatePicker;
    const { bitacoras, isLoading, isLoadingBitacora, paginate} = useSelector(state => state.bitacoras);
    const { personal = [] } = useSelector(state => state.personal);
    const { obra } = useSelector(state => state.obras);
    const { niveles } = useSelector(state => state.niveles);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [viewBitacora, setViewBitacora] = useState(0);
    const [open, setOpen] = useState(false);
    const [titleDrawer, setTitleDrawer] = useState('');
    const [ selectedNivel, setSelectedNivel ] = useState([]);
    const [ selectedActividad, setSelectedActividad ] = useState([]);
    const [ selectedZona, setSelectedZona ] = useState([]);
    const [ bitacoraPreview, setBitacoraPreview ] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState([]);

    const [ filtros, setFiltros ] = useState(initialData);
    const [ selectedOption, setSelectedOption ] = useState([]);

    useLayoutEffect(() => {
        dispatch(getAllActividadAction())
        dispatch(getAllPersonalAction())
        dispatch(getAllUsuariosAction())
        dispatch(getAllObraAction())
        dispatch(getAllNivelesAction())
        dispatch(getTipoBitacoraAction())

        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        dispatch(getBitacorasAction(filtros))
        
        // eslint-disable-next-line
    }, [filtros])

    useEffect(() => {
        setDataSource(bitacoras)
    }, [bitacoras])

    // 

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            render: (text, record) => <span onClick={() => showDrawer(record.id)}>{moment(text).format('DD-MM-YYYY HH:mm:ss')}</span>,
        },
        {
            title: 'Tipo Bitacora',
            key: 'tipoBitacora',
            render: (text, record) => <span onClick={() => showDrawer(record.id)}>{record.tipo_bitacora.nombre}</span>
        },
        {
            title: 'Obra',
            dataIndex: 'obra',
            key: 'obra',
            render: (text, record) => <span onClick={() => showDrawer(record.id)}>{record.obra.nombre}</span>
        },
        {
            title: 'Nivel',
            dataIndex: 'nivel',
            key: 'nivel',
            render: (text, record) => <span onClick={() => showDrawer(record.id)}>{record.nivele.nombre}</span>
        },
        {
            title: 'Actividad',
            dataIndex: 'actividad',
            key: 'actividad',
            render: (text, record) => <span onClick={() => showDrawer(record.id)}>{record.actividade.nombre}</span>
        },
        {
            title: 'Zona',
            dataIndex: 'zona',
            key: 'zona',
            render: (text, record) => <span onClick={() => showDrawer(record.id)}>{record.zona.nombre}</span>
        },
        {
            title: 'Personal',
            dataIndex: 'personal',
            key: 'personal',
            render: (text, record) => <span onClick={() => showDrawer(record.id)}>{record.personal.nombre}</span>
        },
        {
            title: 'Responsables',
            dataIndex: 'usuario',
            key: 'usuario',
            render: (text, record) => <span onClick={() => showDrawer(record.id)}>{record.users.length}</span>
            
        },
        {
            title: 'Titulo',
            dataIndex: 'titulo',
            key: 'titulo',
            render: (text, record) => <span onClick={() => showDrawer(record.id)}>{record.titulo}</span>
        }
    ];

    const handleChangeObra =  (id) => {


        if(id){
            const result = obra.find(item => item.id === id);
            setSelectedNivel(result.niveles);
        }else{
            setSelectedNivel([]);
        }

        setFiltros({
            ...filtros,
            obraId: id,
            nivelId: undefined,
            actividadId: undefined,
            zonaId: undefined,
        })
    }

    const handleChangeNivel = (id) => {

        if(id){
            const result = niveles.find(item => item.id === id);
            console.log(result);
            setSelectedActividad(result.actividades);
            setSelectedZona(result.zonas);
        }else{
            setSelectedActividad([]);
            setSelectedZona([]);
        }
       

        setFiltros({
            ...filtros,
            nivelId: id,
            actividadId: undefined,
            zonaId: undefined,
        })
    }

    const handleSearchByDate = (value, dateString) => {
        if ((dateString[0] !== '' && dateString[1] !== '')){
            setFiltros({
                ...filtros,
                page: 0,
                fechaInicio: dateString[0],
                fechaFin: dateString[1],
                filterNames:{
                    ...filtros.filterNames,
                    fechaInicio: moment(dateString[0]).format('DD/MM/YYYY'),
                    fechaFin: moment(dateString[1]).format('DD/MM/YYYY')
                }
            })
        }else if (dateString[0] === '' && dateString[1] === ''){
            setFiltros({
                ...filtros,
                page: 0,
                fechaInicio: '',
                fechaFin: ''
            })
        }
    }
    
    const showDrawer = (id) => {
        setViewBitacora(id)
        setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
      setViewBitacora(0);
    };

    const handleLoadVales = (page, size) => {
        setFiltros({
            ...filtros,
            page: page - 1,
            size,
        })
    }

    const rowSelection = {
        onSelect: (record, selected, selectedRows) => {
            if(selected){
                setSelectedOption([...selectedOption, record.id])
                setBitacoraPreview([...bitacoraPreview, record])
            }else{
                setSelectedOption(selectedOption.filter(item => item !== record.id))
                setBitacoraPreview(bitacoraPreview.filter(item => item.id !== record.id))
            }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            if(selected){
                setSelectedOption([ ...selectedOption, ...bitacoras.map(item => item.id)])
                setBitacoraPreview([...bitacoraPreview, ...bitacoras.map(item => item)])

            }else{
                setSelectedOption(selectedOption.filter(item => !changeRows.map(item => item.id).includes(item)))
                setBitacoraPreview(bitacoraPreview.filter(item => !changeRows.map(item => item.id).includes(item.id)))

            }
        },
    };
  
    return ( 
    <>
        <div className='py-2 flex justify-end'>      
            <div className="flex gap-3 py-3 flex-wrap">
                <Select
                    maxTagCount={"responsive"}
                    allowClear
                    style={{
                        width: '250px',
                    }}
                    placeholder="Filtrar Por Obra"
                    onChange={ (value) => { handleChangeObra(value) }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                    defaultValue={filtros.centroCosto}
                    value={filtros.centroCosto}
                    >
                    {
                            obra.map(item => (
                                <Select.Option key={item.id} value={item.id}>{item.nombre}</Select.Option>
                            ))
                    }
                </Select>  
                <Select
                    maxTagCount={"responsive"}
                    allowClear
                    style={{
                        width: '250px',
                    }}
                    placeholder="Filtrar Nivel"
                    onChange={ (e) => { handleChangeNivel(e) }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                    defaultValue={filtros.nivelId}
                    value={filtros.nivelId}
                    disabled={selectedNivel.length === 0}
                    >
                    {
                         
                        selectedNivel.map(item => (
                            <Select.Option key={item.id} value={item.id}>{item.nombre}</Select.Option>
                        ))
                            
                        
                    }
                </Select> 
                <Select
                    maxTagCount={"responsive"}
                    allowClear
                    style={{
                        width: '250px',
                    }}
                    placeholder="Filtrar Actividad"
                    onChange={ (e) => { setFiltros({
                        ...filtros,
                        actividadId: e,
                    }) }}

                    showSearch
                    optionFilterProp="children"
                    filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                    defaultValue={filtros.centroCosto}
                    value={filtros.actividadId}
                    disabled={selectedActividad.length === 0}
                    >
                    {
                         
                        selectedActividad.map(item => (
                            <Select.Option key={item.id} value={item.id}>{item.nombre}</Select.Option>
                        ))
                            
                        
                    }
                </Select> 
                <Select
                    maxTagCount={"responsive"}
                    allowClear
                    style={{
                        width: '250px',
                    }}
                    placeholder="Filtrar Zona"
                    onChange={ (e) => { setFiltros({
                        ...filtros,
                        zonaId: e,
                    }) }}

                    showSearch
                    optionFilterProp="children"
                    filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                    defaultValue={filtros.zonaId}
                    value={filtros.zonaId}
                    disabled={selectedZona.length === 0}
                    >
                    {
                         
                        selectedZona.map(item => (
                            <Select.Option key={item.id} value={item.id}>{item.nombre}</Select.Option>
                        ))
                            
                        
                    }
                </Select> 
                <Select
                    allowClear
                    style={{
                        width: '300px',
                    }}
                    placeholder="Filtrar Lider Cuadrilla"
                    onChange={ (e) => { setFiltros({
                        ...filtros,
                        personalId: e,
                    }) }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={ (input, option) => option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                    value={filtros.personalId}
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
                    // onChange={ (e) => { handleSearchByUsuario(e) }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={ (input, option) => option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                    value={filtros.residente}
                    name="residente"
                    // defaultValue={ hasPermission(userPermission, 'ver reportes') ? null : userAuth.id }
                    >
                    {
                        
                    }
                </Select> 
                <Select
                    className='hidden lg:block'
                    style={{
                        width: '250px',
                    }}
                    placeholder="Ordenar por: "
                    onChange={ (e) => { setFiltros({ ...filtros, ordenSolicitado: e }) }}
                    showSearch={false}
                    defaultValue={"DESC"}
                    >
                    <Select.Option key={1} value={'DESC'}> Más Reciente  </Select.Option>
                    <Select.Option key={2} value={'ASC'}> Más Antiguo  </Select.Option>
                </Select>

                <Input type="text" 
                            style={{ width : '250px', padding: '0 10px'}} 
                            onChange={ (e) => { setFiltros({ ...filtros, busqueda: e.target.value, page: 0 })  } }
                            allowClear
                            suffix={<SearchOutlined />}
                            placeholder="Buscar"
                            // value={filtros.busqueda}
                            name="busqueda"
                />
                <RangePicker 
                    showToday={true}
                    className="hidden lg:flex" 
                    style={{ width : '350px'}}
                    onCalendarChange={ (value, dateString) => {handleSearchByDate(value, dateString)}}
                    value={(filtros.fechaInicio !== '' && filtros.fechaFin !== '') && (filtros.fechaInicio && filtros.fechaFin) ? [ moment(filtros.fechaInicio), moment(filtros.fechaFin)] : ["", ""]}
                />   
                {/* Generar Bitacora */}
                <Button type='ghost' onClick={() => setIsModalOpen(true)} className="" disabled={bitacoraPreview.length === 0}>
                    Generar Reporte
                </Button>
        </div>

            <Button type='icon-secondary-new' onClick={() => navigate('form')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>

        </div>
            <Table columns={columns} scroll={{ x: 'auto'}} rowKey={ record => record.id } dataSource={dataSource} loading={isLoading} showSorterTooltip={false}
                rowClassName="cursor-pointer"
                rowSelection={{
                    ...rowSelection,
                    // selectedRowKeys: allSelected ? bitacoras.map(item => item.id) : selectedOption,
                    selectedRowKeys: selectedOption,          
                }}
                // pagination={false}                
            />

            {/* <Pagination 
                total={(paginate.totalItem)} 
                current={paginate.currentPage + 1} 
                pageSize={filtros.size} 
                onChange={handleLoadVales} 
                className="w-auto py-4 max-w-max ml-auto"
            /> */}

            <div className="relative">
                <Drawer 
                    title={titleDrawer}
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    visible={open}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose={true}
                    width={window.innerWidth > 1200 ? 800 : 'auto'}
                    headerStyle={{ backgroundColor: '#56739B', padding: '10px 20px' }}
                    closeIcon={<CloseOutlined className="text-white" />}                    
                    maskClosable={false}
                >

                    {
                            // true   &&  // False 
                        isLoadingBitacora && !viewBitacora ?  <Loading/> : <ViewBitacora id={viewBitacora} onClose={onClose} setTitleDrawer={setTitleDrawer}/>
                    }
                    
                </Drawer>
            </div>

            <ModalBitacora setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} bitacoraPreview={bitacoraPreview} selectedOption={selectedOption}/>
        </>
    );
}
 
export default Bitacora;