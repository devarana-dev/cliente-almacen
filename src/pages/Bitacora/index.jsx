import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Carousel, DatePicker, Drawer, Image, Input, Modal, Select, Table, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { ClearOutlined, ClockCircleOutlined, CloseOutlined,  FilePdfFilled,  FileTextOutlined, LockOutlined,  PlusCircleOutlined, QuestionCircleOutlined, SearchOutlined, UnlockOutlined } from "@ant-design/icons";
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

import { RiFileWarningLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";

const initialData = {
page: 0,
size: 10,
ordenSolicitado: 'DESC',
proyectoId: 1,
}


const Bitacora = () => {

// const { userPermission } = useSelector(state => state.permisos);
const { RangePicker } = DatePicker;
const { bitacoras, isLoading, isLoadingBitacora, bitacora, errorBitacora, isLoadingReport, generatedReport, conteoBitacoras} = useSelector(state => state.bitacoras);
const { etapas } = useSelector(state => state.etapas);
const { usuarios } = useSelector(state => state.usuarios);
const { socket, online } = useSelector(state => state.socket);
const { proyectos } = useSelector(state => state.proyectos);
const [ isModalOpen, setIsModalOpen] = useState(false);
const [ showHelpModal, setShowHelpModal ] = useState(false);
const { userAuth } = useSelector(state => state.auth);
    
// sliderRef
const sliderRef = useRef(null);
const [currentSlide, setCurrentSlide] = useState(0);

const { empresaId } = userAuth || {};

const [ open, setOpen] = useState(false);
const { uid } = useParams()

const dispatch = useDispatch();
const navigate = useNavigate();

const [dataSource, setDataSource] = useState([]);

const [ filtros, setFiltros ] = useState(initialData);
const [ selectedOption, setSelectedOption ] = useState([]);
const [ selectedPreview, setSelectedPreview ] = useState([]);

useLayoutEffect(() => {
    dispatch(getAllUsuariosAction({
        roles: [4, 7, 8]
    }))
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
        render: (text, record) => <span>RV-{record.id}</span>,
        ellipsis: true,
    },
    {
        title: 'Fecha',
        key: 'fecha',
        render: (text, record) => (
            <Tooltip title={`${moment(record.fecha).format("DD-MM-YYYY HH:mm:ss")}`} >
                <p className='hidden lg:block'>
                    {moment(record.fecha).format('D MMM LT')}
                </p>
                <p className="block lg:hidden">
                    {moment(record.fecha).format('D MMM')}
                </p>
            </Tooltip>
        ),
        ellipsis: true,
    },
    {
        title: 'Autor',
        key: 'autor',
        render: (text, record) => 
            <span>
                {
                    <div className="flex align-middle items-center gap-x-2">
                        <Avatar className='hidden lg:block' src={ <Image preview={false} fallback={brokenUser()} src={  record.autorInt.picture || '' } /> } /> 
                        <p>
                            {
                                `${record.autorInt ? `${record.autorInt.nombre} ${record.autorInt.apellidoPaterno}` : `${record.autorExt.nombre} ${record.autorExt.apellidoPaterno} ` }`
                            }
                        </p>
                    </div>
                }
            </span>,
        ellipsis: true,
    },{
        title: 'Proyecto',
        key: 'proyecto',
        render: (text, record) => <span>{record.proyecto.nombre}</span>,
        responsive: ['lg']
    },
    
    {
        title: 'Tipo de Registro',
        key: 'tipoBitacora',
        render: (text, record) => <span>{record.tipo_bitacora.nombre}</span>,
        ellipsis: true,

    },
    {
        title: 'Título',
        key: 'titulo',
        render: (text, record) => <span>
            <Tooltip title={record.titulo}>
                <p className='hidden lg:block'>
                    {record.titulo}
                </p>
                <p className="block lg:hidden">
                    {record.titulo.substring(0, 20)}...
                </p>
            </Tooltip>
        </span>,
        ellipsis: true,
    },
    {
        title: 'Actividad',
        key: 'actividad',
        render: (text, record) => <span>{record.actividad}</span>,
        responsive: ['lg']
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
        isNew: 0,
        etapa: "",
    })
}

const handleChangeProyecto = (value) => {
    setFiltros({
        proyectoId: value,
    })

    setSelectedOption([])
    setSelectedPreview([])
}

const setShowHelp = () => {
    setShowHelpModal(!showHelpModal)
}   

const handleAfterChange = (current) => {
    setCurrentSlide(current);
};

const handleNext = () => {
    sliderRef.current.next();
};

const handlePrev = () => {
    sliderRef.current.prev();
};



return ( 
<>
        <div className="lg:grid hidden grid-cols-6 gap-10 py-5 ">
            <Card 
                text="Todos"
                icon={<FileTextOutlined className='align-middle text-[20px]'/>}
                fn={() => handleSearchTipo()}
                count={conteoBitacoras.total}
                color={'dark'}
                size="md"
            />
            <Card 
                text="Incidencias"
                icon={<RiFileWarningLine className='align-middle text-2xl flex items-center'/>}
                fn={() => handleSearchTipo(1)}
                count={conteoBitacoras.incidencias}
                color={'info'}
                size="md"
            />
            <Card 
                text="Acuerdos"
                icon={<FaRegHandshake className='align-middle text-2xl flex items-center'/>}
                fn={() => handleSearchTipo(2)}
                count={conteoBitacoras.acuerdos}
                color={'primary'}
                size="md"
            />
            <Card 
                text="Eventos"
                icon={<ClockCircleOutlined className='align-middle text-2xl flex items-center'/>}
                fn={() => handleSearchTipo(5)}
                count={conteoBitacoras.eventos}
                color={'secondary'}
                size="md"
            />
            <Card 
                text="Inicio de Trabajos"
                icon={<UnlockOutlined className='align-middle text-2xl flex items-center'/>}
                fn={() => handleSearchTipo(3)}
                count={conteoBitacoras.inicio}
                color={'success'}
                size="md"
            />
            <Card 
                text="Cierre de Trabajos"
                icon={<LockOutlined className='align-middle text-2xl flex items-center'/>}
                fn={() => handleSearchTipo(4)}
                count={conteoBitacoras.cierre}
                color={'danger'}
                size="md"
            />
            
        </div>
        <div className="flex gap-3 py-3 flex-wrap">
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
                value={filtros.proyectoId}
                onChange={ handleChangeProyecto }
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
                className='hidden lg:block'
                style={{
                    width: '100%',
                    maxWidth: '200px'
                }}
                placeholder="Filtrar Por Etapa"
                showSearch
                optionFilterProp="children"
                filterOption={ (input, option) => option.children.toLowerCase().trim().indexOf(input.toLowerCase()) >= 0}
                defaultValue={filtros.etapaId}
                value={filtros.etapaId}
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
                    width: '100%',
                    maxWidth: '200px'
                }}
                className='hidden lg:block'
                placeholder="Filtrar Usuario"
                // onChange={ (e) => { handleSearchByUsuario(e) }}
                showSearch
                optionFilterProp="children"
                filterOption={ (input, option) => option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                value={filtros.userId}
                onChange={ (e) => { setFiltros({ ...filtros, userId: e }) }}
                name="userId"
                options={
                    [
                        {
                            label: 'Interno',
                            options: usuarios.filter(item => item.esInterno === true).map(item => (
                                {
                                    value: item.id,
                                    label: `${item.nombre} ${item.apellidoPaterno}`
                                }
                            ))
                        },
                        {
                            label: 'Externo',
                            options: usuarios.filter(item => item.esInterno === false && item.empresas[0].id === empresaId).map(item => (
                                {
                                    value: item.id,
                                    label: `${item.nombre} ${item.apellidoPaterno}`
                                }
                            ))
                        }
                    ]
                }
            >
                
            </Select> 
            <Select
                className='hidden lg:block'
                style={{
                    width: '100%',
                    maxWidth: '200px'
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
            <div className="flex gap-3">
                <Tooltip title={`${selectedOption.length === 0 ? 'Para generar un reporte selecciona uno o más registros.' : 'Generar Reporte'} `} placement="topRight">
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

            </div>

            
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

        <ModalBitacora 
            setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} selectedPreview={selectedPreview} 
            selectedOption={selectedOption} isLoadingReport={isLoadingReport} generatedReport={generatedReport} proyectoId = { filtros.proyectoId }
            usuarios={usuarios}
        />

        <Modal
            visible={showHelpModal}
            onCancel={() => {setShowHelp(!showHelpModal); handleAfterChange(0) }}
            footer={null}
            width={1000}
            destroyOnClose={true}
            >
            
            <div>
                {/* Siguiente Anterior */}
                <div className="flex justify-between py-6">
                    <Button type="primary" onClick={handlePrev} disabled={currentSlide === 0}>
                        Anterior
                    </Button>
                    {
                            currentSlide === 0 && <h2 className="text-2xl text-dark"> Funciones Generales </h2> ||
                            currentSlide === 1 && <h2 className="text-2xl text-dark"> Nuevo Registro </h2> ||
                            currentSlide === 2 && <h2 className="text-2xl text-dark"> Generar Reporte </h2> ||
                            currentSlide === 3 && <h2 className="text-2xl text-dark"> Funciones Generales | Celular </h2> ||
                            currentSlide === 4 && <h2 className="text-2xl text-dark"> Nuevo Registro | Celular </h2> ||
                            currentSlide === 5 && <h2 className="text-2xl text-dark"> Generar Reporte | Celular </h2>

                    }
                    <Button type="primary" onClick={handleNext} disabled={currentSlide === 5}>
                        Siguiente
                    </Button>
                </div>
            </div>
            <Carousel
                ref={sliderRef}
                afterChange={handleAfterChange}
            >
                <div>
                    <video width="100%" controls src="https://spaces.erp-devarana.mx/tutoriales/tutorial-funciones-generales-bitacora.webm" 
                        poster="https://spaces.erp-devarana.mx/tutoriales/poster/tutorial-funciones-generales-bitacora.png" preload='metadata' />
                </div>
                <div>
                    <video width="100%" controls src="https://spaces.erp-devarana.mx/tutoriales/tutorial-registro-bitacora.webm"
                        poster="https://spaces.erp-devarana.mx/tutoriales/poster/tutorial-registro-bitacora.png" preload='metadata' />
                </div>
                <div>
                    <video width="100%" controls src="https://spaces.erp-devarana.mx/tutoriales/tutorial-reporte-bitacora.webm" 
                        poster="https://spaces.erp-devarana.mx/tutoriales/poster/tutorial-reporte-bitacora.png" preload='metadata' />
                </div>
                <div>
                    <video width="100%" controls src="https://spaces.erp-devarana.mx/tutoriales/tutorial-funciones-generales-bitacora-mobile.webm" 
                        poster="https://spaces.erp-devarana.mx/tutoriales/poster/tutorial-funciones-generales-bitacora-mobile.png" preload='metadata' />
                </div>
                <div>
                    <video width="100%" controls src="https://spaces.erp-devarana.mx/tutoriales/tutorial-registro-bitacora-mobile.webm"
                        poster="https://spaces.erp-devarana.mx/tutoriales/poster/tutorial-registro-bitacora-mobile.png" preload='metadata' />
                </div>
                <div>
                    <video width="100%" controls src="https://spaces.erp-devarana.mx/tutoriales/tutorial-reporte-bitacora-mobile.webm" 
                        poster="https://spaces.erp-devarana.mx/tutoriales/poster/tutorial-reporte-bitacora-mobile.png" preload='metadata' />
                </div>
            </Carousel> 
        </Modal>
    </>
);
}

export default Bitacora;