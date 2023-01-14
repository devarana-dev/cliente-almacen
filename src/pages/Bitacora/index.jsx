import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, DatePicker, Drawer, Input, Select, Table, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined,  PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { getBitacoraAction, getBitacorasAction, getTipoBitacoraAction } from '../../actions/bitacoraActions'
import moment from "moment";
import Loading from "../../components/Elements/Loading";
import { ViewBitacora } from "./view";
import { getAllUsuariosAction } from "../../actions/usuarioActions";
import { ModalBitacora } from "./modal";
import { getEtapasAction } from "../../actions/etapasActions";
// import { hasPermission } from "../../utils/hasPermission";


const initialData = {
    page: 0,
    size: 10,
    ordenSolicitado: 'DESC',
}


const Bitacora = () => {

    // const { userPermission } = useSelector(state => state.permisos);
    const { RangePicker } = DatePicker;
    const { bitacoras, isLoading, isLoadingBitacora, bitacora, errorBitacora} = useSelector(state => state.bitacoras);
    const { etapas } = useSelector(state => state.etapas);
    const [ isModalOpen, setIsModalOpen] = useState(false);

    const [ open, setOpen] = useState(false);
    const {uid} = useParams()
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState([]);

    const [ filtros, setFiltros ] = useState(initialData);
    const [ selectedOption, setSelectedOption ] = useState([]);
    const [ selectedPreview, setSelectedPreview ] = useState([]);

    useLayoutEffect(() => {
        dispatch(getAllUsuariosAction())
        dispatch(getTipoBitacoraAction())
        dispatch(getEtapasAction())

        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        dispatch(getBitacorasAction(filtros))
        // eslint-disable-next-line
    }, [filtros])

    useEffect(() => {
        if (uid){
            dispatch(getBitacoraAction( uid ))
        }
        // eslint-disable-next-line
    }, [uid])

    useEffect(() => {
        setDataSource(bitacoras)
    }, [bitacoras])

    useEffect(() => {
        if(uid ){
            showDrawer(uid)
        }  
        // eslint-disable-next-line 
    }, [uid])

    

    const columns = [
        {
            title: 'Fecha',
            key: 'fecha',
            render: (text, record) => (
                <Tooltip title={`${moment(record.fecha).format("DD-MM-YYYY HH:mm:ss")}`} >
                    {moment(record.fecha).format('D MMM LT')}
                </Tooltip>
            ),
        },
        {
            title: 'Titulo',
            key: 'titulo',
            render: (text, record) => <span onClick={() => showDrawer(record.uid)}>{record.titulo}</span>
        },
        {
            title: 'Tipo Bitacora',
            key: 'tipoBitacora',
            render: (text, record) => <span onClick={() => showDrawer(record.uid)}>{record.tipo_bitacora.nombre}</span>
        },
        {
            title: 'Actividad',
            key: 'actividad',
            render: (text, record) => <span onClick={() => showDrawer(record.uid)}>{record.actividad}</span>
        },
        {
            title: 'Autor',
            key: 'autor',
            render: (text, record) => 
                <span onClick={() => showDrawer(record.uid)}>
                    {
                        record.autorInt ? `${record.autorInt.nombre} ${record.autorInt.apellidoPaterno}` : `${record.autorExt.nombre} ${record.autorExt.apellidoPaterno}`
                    }
                </span>
        },        
    ];


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
    
    const showDrawer = (uid) => {
        dispatch(getBitacoraAction( uid ))
        setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    //   clean params
        navigate('/bitacora')
    };

    const rowSelection = {
        onSelect: (record, selected, selectedRows) => {
            if (selected){
                setSelectedOption([...selectedOption, record.uid])
                setSelectedPreview([...selectedPreview, record])
            }else{
                setSelectedOption(selectedOption.filter(item => item !== record.uid))
            }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            if (selected){
                setSelectedOption([...selectedOption, ...bitacoras.map(item => item.uid) ])
                setSelectedPreview([...selectedPreview, ...bitacoras])
            }else{
                setSelectedOption([])
                setSelectedPreview([])
            }
        }
    };


    if(isLoading){
        return <Loading />
    }
  
    return ( 
    <>
            <div className="flex gap-3 py-3 flex-wrap">
                <Select
                    maxTagCount={"responsive"}
                    allowClear
                    style={{
                        width: '200px',
                    }}
                    placeholder="Filtrar Por Proyecto"
                    showSearch
                    optionFilterProp="children"
                    filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                    defaultValue={filtros.proyectoId}
                    value={filtros.proyectoId}
                >
                    <Select.Option key={0} value={0}>Royal View</Select.Option>
                </Select>
                <Select
                    maxTagCount={"responsive"}
                    allowClear
                    style={{
                        width: '200px',
                    }}
                    placeholder="Filtrar Por Etapa"
                    showSearch
                    optionFilterProp="children"
                    filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                    defaultValue={filtros.etapa}
                    value={filtros.etapa}
                    onChange={ (value) => { setFiltros({...filtros, etapaId: value}) }}
                >
                    {
                        etapas.map(item => (
                            <Select.Option key={item.id} value={item.id}>{item.nombre}</Select.Option>
                        ))
                    }
                </Select>
                <Select
                    allowClear
                    style={{
                        width: '200px',
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
                        width: '200px',
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
                            style={{ width : '200px', padding: '0 10px'}} 
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
                <Button type='ghost' onClick={() => setIsModalOpen(true)} className="" disabled={selectedOption.length === 0}>
                    Generar Reporte
                </Button>
                <Button type='icon-secondary-new' onClick={() => navigate('form')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>
            </div>
            <Table columns={columns} scroll={{ x: 'auto'}} rowKey={ record => record.uid } dataSource={dataSource} loading={isLoading} showSorterTooltip={false}
                rowClassName="cursor-pointer"
                rowSelection={{
                    ...rowSelection,
                    selectedRowKeys: selectedOption,          
                }}
            />

            <div className="relative">
                <Drawer 
                    title={ bitacora ? `${bitacora.titulo}` : 'Reporte'}
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
                        
                        isLoadingBitacora && isLoading && !isLoadingBitacora && !bitacora ?  <Loading/> : <ViewBitacora isLoadingBitacora={isLoadingBitacora} bitacora={bitacora} onClose={onClose} errorBitacora = {errorBitacora}/>
                    }
                    
                </Drawer>
            </div>

            <ModalBitacora setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} selectedPreview={selectedPreview} selectedOption={selectedOption} />
        </>
    );
}
 
export default Bitacora;