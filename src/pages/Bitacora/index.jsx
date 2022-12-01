import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, Table } from 'antd';
// import { hasPermission } from "../../utils/hasPermission";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { getBitacorasAction } from '../../actions/bitacoraActions'
import moment from "moment";
import Loading from "../../components/Elements/Loading";
import { ViewBitacora } from "./view";


const Bitacora = () => {

    // const { userPermission } = useSelector(state => state.permisos);
    const { bitacoras, isLoading, isLoadingBitacora} = useSelector(state => state.bitacoras);
    const [viewBitacora, setViewBitacora] = useState(0);
    const [open, setOpen] = useState(false);
    const [titleDrawer, setTitleDrawer] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        dispatch(getBitacorasAction())
        
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setDataSource(bitacoras)
    }, [bitacoras])

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            render: (text, record) => moment(text).format('DD-MM-YYYY HH:mm:ss')
        },
        {
            title: 'Tipo Bitacora',
            key: 'tipoBitacora',
            render: (text, record) => record.tipo_bitacora.nombre
        },
        {
            title: 'Obra',
            dataIndex: 'obra',
            key: 'obra',
            render: (text, record) => record.obra.nombre
        },
        {
            title: 'Nivel',
            dataIndex: 'nivel',
            key: 'nivel',
            render: (text, record) => record.nivele.nombre
        },
        {
            title: 'Actividad',
            dataIndex: 'actividad',
            key: 'actividad',
            render: (text, record) => record.actividade.nombre
        },
        {
            title: 'Zona',
            dataIndex: 'zona',
            key: 'zona',
            render: (text, record) => record.zona.nombre
        },
        {
            title: 'Personal',
            dataIndex: 'personal',
            key: 'personal',
            render: (text, record) => record.personal.nombre
        },
        {
            title: 'Responsables',
            dataIndex: 'usuario',
            key: 'usuario',
            render: (text, record) => record.users.length
            
        },
        {
            title: 'Titulo',
            dataIndex: 'titulo',
            key: 'titulo',
        }
    ];
    
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
      setViewBitacora(0);
    };
    

    return ( 
    <>
        <div className='py-2 flex justify-end'>      
            <div className="flex gap-10 py-3">
                <div className="flex flex-wrap items-center gap-3">
                </div>
            </div>

            <Button type='icon-secondary-new' onClick={() => navigate('form')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>

        </div>
            <Table columns={columns} scroll={{ x: 'auto'}} rowKey={ record => record.id } dataSource={dataSource} loading={isLoading} showSorterTooltip={false}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setViewBitacora(record.id)
                            showDrawer()
                        }
                    };
                }}
                rowClassName="cursor-pointer"
            />

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
        </>
    );
}
 
export default Bitacora;