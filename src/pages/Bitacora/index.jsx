import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, DatePicker, Drawer, Image, Input, Modal, Select, Table, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { ClearOutlined, CloseOutlined,  FilePdfFilled,  FileTextOutlined,  PlusCircleOutlined, QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { getBitacoraAction, getBitacorasAction, getTipoBitacoraAction } from '../../actions/bitacoraActions'
import moment from "moment";
import Loading from "../../components/Elements/Loading";
import { ViewBitacora } from "./view";
import { getAllUsuariosAction } from "../../actions/usuarioActions";
import { ModalBitacora } from "./modal";
import { getEtapasAction } from "../../actions/etapasActions";
import Card from "../../components/Vales/Card";
import brokenUser from "../../utils/brokenUser";
import { getProyectosAction } from "../../actions/proyectosActions";

import { MdOutlineMarkChatUnread } from "react-icons/md";
import { RiFileWarningLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";
import { BsFillCalendarCheckFill, BsFillForwardFill } from "react-icons/bs";

const initialData = {
    page: 0,
    size: 10,
    ordenSolicitado: 'DESC',
    proyectoId: 1,
}


const Bitacora = () => {

    // const { userPermission } = useSelector(state => state.permisos);
    const { RangePicker } = DatePicker;
    const { bitacoras, isLoading, isLoadingBitacora, bitacora, errorBitacora, isLoadingReport, generatedReporte, conteoBitacoras} = useSelector(state => state.bitacoras);
    const { etapas } = useSelector(state => state.etapas);
    const { usuarios } = useSelector(state => state.usuarios);
    const { socket, online } = useSelector(state => state.socket);
    const { proyectos } = useSelector(state => state.proyectos);
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const [ showHelpModal, setShowHelpModal ] = useState(false);

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
        dispatch(getProyectosAction({
            status: 1
        }))

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
            title: 'Folio',
            key: 'uid',
            render: (text, record) => <span>RV-{record.id}</span>
        },
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
            title: 'Autor',
            key: 'autor',
            render: (text, record) => 
                <span>
                    {
                        <div className="flex align-middle items-center gap-x-2">
                            <Avatar src={ <Image preview={false} fallback={brokenUser()} src={  record.autorInt?.picture || record.autorExt?.picture || '' } /> } /> 
                            <p>
                                {
                                    `${record.autorInt ? `${record.autorInt.nombre} ${record.autorInt.apellidoPaterno} ${record.autorInt.apellidoMaterno} ` : `${record.autorExt.nombre} ${record.autorExt.apellidoPaterno} ${record.autorExt.apellidoMaterno} ` }`
                                }
                            </p>
                        </div>
                    }
                </span>
        },{
            title: 'Proyecto',
            key: 'proyecto',
            render: (text, record) => <span>{record.proyecto?.nombre || 'Royal View'}</span>
        },
        
        {
            title: 'Tipo de Registro',
            key: 'tipoBitacora',
            render: (text, record) => <span>{record.tipo_bitacora.nombre}</span>
        },
        {
            title: 'Titulo',
            key: 'titulo',
            render: (text, record) => <span>{record.titulo}</span>
        },
        {
            title: 'Actividad',
            key: 'actividad',
            render: (text, record) => <span>{record.actividad}</span>
        }       
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


    useEffect(() => {
        if( online ){
            socket.on('nueva-bitacora', (data) => {
                dispatch(getBitacorasAction(filtros))
            })
        }  
    // eslint-disable-next-line
    }, [online])


    const handleSearchNew = () => {
        setFiltros({
            ...filtros,
            page: 0,
            isNew: 1
        })
    }

    const handleSearchTipo = (value) => {
        setFiltros({
            ...filtros,
            page: 0,
            tipoBitacoraId: value,
            isNew: 0
        })
    }


    const setShowHelp = () => {
        setShowHelpModal(!showHelpModal)
    }   

    return ( 
    <>
            <div className="lg:grid hidden grid-cols-6 gap-10 py-5 ">
                <Card 
                    text="Todos"
                    icon={<FileTextOutlined className='align-middle text-[20px]'/>}
                    fn={() => handleSearchTipo()}
                    count={conteoBitacoras.total}
                    color={'dark'}
                    size="sm"
                />
                <Card 
                    text="Nuevos"
                    icon={<MdOutlineMarkChatUnread className='align-middle text-2xl flex items-center'/>}
                    fn={() => handleSearchNew()}
                    count={conteoBitacoras.noVisto}
                    color={'info'}
                    size="sm"
                />
                <Card 
                    text="Incidencias"
                    icon={<RiFileWarningLine className='align-middle text-2xl flex items-center'/>}
                    fn={() => handleSearchTipo(1)}
                    count={conteoBitacoras.incidencias}
                    color={'warning'}
                    size="sm"
                />
                <Card 
                    text="Acuerdos"
                    icon={<FaRegHandshake className='align-middle text-2xl flex items-center'/>}
                    fn={() => handleSearchTipo(2)}
                    count={conteoBitacoras.acuerdos}
                    color={'primary'}
                    size="sm"
                />
                <Card 
                    text="Inicio de Trabajos"
                    icon={<BsFillForwardFill className='align-middle text-2xl flex items-center'/>}
                    fn={() => handleSearchTipo(3)}
                    count={conteoBitacoras.inicio}
                    color={'secondary'}
                    size="sm"
                />
                <Card 
                    text="Cierre de Trabajos"
                    icon={<BsFillCalendarCheckFill className='align-middle text-2xl flex items-center'/>}
                    fn={() => handleSearchTipo(4)}
                    count={conteoBitacoras.cierre}
                    color={'orange'}
                    size="sm"
                />
            </div>
            <div className="flex gap-3 py-3 flex-wrap">
                <Select
                    style={{
                        width: '200px',
                    }}
                    placeholder="Filtrar Por Proyecto"
                    showSearch
                    optionFilterProp="children"
                    filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                    defaultValue={1}
                    value={filtros.proyectoId}
                    onChange={ (value) => { setFiltros({...filtros, proyectoId: value}) }}
                >
                    {
                        proyectos.map(item => (
                            <Select.Option key={item.id} value={item.id}>{item.nombre}</Select.Option>
                        ))
                    }
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
                    value={filtros.userId}
                    onChange={ (e) => { setFiltros({ ...filtros, userId: e }) }}
                    name="userId"
                    >
                    {
                        
                        usuarios.map(item => (
                            <Select.Option key={item.id} value={item.id}>{`${item.nombre} ${item.apellidoPaterno}`}</Select.Option>
                        ))
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
                        style={{ width : '200px', height: '32px'}} 
                        onChange={ (e) => { setFiltros({ ...filtros, busqueda: e.target.value, page: 0 })  } }
                        allowClear
                        suffix={<SearchOutlined />}
                        placeholder="Buscar"
                        // value={filtros.busqueda}
                        name="busqueda"
                        value={filtros.busqueda}
                />
                <RangePicker 
                    showToday={true}
                    className="hidden lg:flex" 
                    style={{ width : '350px', height: '32px'}}
                    onCalendarChange={ (value, dateString) => {handleSearchByDate(value, dateString)}}
                    value={(filtros.fechaInicio !== '' && filtros.fechaFin !== '') && (filtros.fechaInicio && filtros.fechaFin) ? [ moment(filtros.fechaInicio), moment(filtros.fechaFin)] : ["", ""]}
                />   
                <Tooltip title={`${selectedOption.length === 0 ? 'Para generar un reporte selecciona una opción' : 'Generar Reporte'} `} placement="topRight">
                    <Button type='icon-secondary-new' onClick={() => setIsModalOpen(true)} className="" disabled={selectedOption.length === 0}>
                        <FilePdfFilled className='py-0'/> 
                    </Button>
                </Tooltip>
                <Tooltip title="Limpiar Filtros">
                    <Button type='icon-secondary-new' title='Limpiar Filtros' onClick={
                        () => {
                            setFiltros({
                                ...initialData,
                            })
                        }
                    }><ClearOutlined /></Button>
                </Tooltip>
                <Tooltip title="Ayuda">
                    <Button type='icon-primary-new' title='Ayuda' onClick={() => {setShowHelp(!showHelpModal)}}><QuestionCircleOutlined /></Button>
                </Tooltip>

                
                <Button type='icon-secondary-new' onClick={() => navigate('form')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>
            </div>
            <Table columns={columns} scroll={{ x: 'auto'}} rowKey={ record => record.uid } dataSource={dataSource} loading={isLoading} showSorterTooltip={false}
                rowClassName="cursor-pointer"
                rowSelection={{
                    ...rowSelection,
                    selectedRowKeys: selectedOption,          
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            showDrawer(record.uid)
                        }, // click row
                    
                    }}
                }
            />

            <div className="relative">
                <Drawer 
                    title={ bitacora ? `${bitacora.titulo}` : 'Reporte'}
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    open={open}
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

            <ModalBitacora setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} selectedPreview={selectedPreview} selectedOption={selectedOption} isLoadingReport={isLoadingReport} generatedReporte={generatedReporte} proyectoId = { filtros.proyectoId } />

            <Modal
                open={showHelpModal}
                onCancel={() => {setShowHelp(!showHelpModal)}}
                footer={null}
                width={1000}
                destroyOnClose={true}
             >
            
            </Modal>
        </>
    );
}
 
export default Bitacora;