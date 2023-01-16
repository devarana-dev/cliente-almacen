import { Button, Divider, Form, Input, Popconfirm, Select, Spin, Table, Modal, message, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllInsumosAction } from "../../actions/insumoActions";
import {nanoid} from 'nanoid'
import {  CloseCircleOutlined, ExclamationCircleOutlined, ShrinkOutlined } from "@ant-design/icons";
import { createValeAction } from "../../actions/valeActions";
import "../../assets/scss/steps.scss"
import openNotificationWithIcon from "../../hooks/useNotification";
import { getAllUsuariosAction } from "../../actions/usuarioActions";

const ListaInsumos = ({current, setCurrent, setVale, vale}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { Option } = Select
    const [ form ] = Form.useForm();
    const { insumos, isLoading, errors } = useSelector( state => state.insumos )
    const { created, errors:errorsVale } = useSelector(state => state.vales)
    const { userAuth } = useSelector( state => state.auth )
    const { usuarios } = useSelector( state => state.usuarios)
    
    const [ dataSource, setDataSource ] = useState([]);
    const [ unidad, setUnidad ] = useState('')
    const [ insumo, setInsumo ] = useState({
        id: '',
        cantidadSolicitada: 0,
        residentePrestamo: null
    })

    const { listaInsumos } = vale

    useEffect(() => {
        dispatch(getAllInsumosAction())
        dispatch(getAllUsuariosAction())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        
        setDataSource(
            listaInsumos.map( (item, i) => (
                { key: i, acciones:item.uuid, ...item }
            ))
		)
    }, [listaInsumos])

    const searchUnidad = (id) => {
        const [result] = insumos.filter( item => item.id === id )
        setUnidad(result.unidadMedida);
    }
    

    const columns = [
        {
            title: 'Insumo',
            dataIndex: 'nombre',
            key: 'nombre',
            ellipsis: true,
            render:(text, record) => (
                <div className="flex items-center text-dark"> 
                { record.residentePrestamo ? 
                    <Tooltip title={ `Prestamo de ${usuarios.map( item => item.id === record.residentePrestamo? `${item.nombre} ${item.apellidoPaterno}` : null  )}`  }><ShrinkOutlined className="mx-1"/></Tooltip>
                : null } 
                { record.nombre } 
                </div>
            )
        },
        {
            title: 'Unidad',
            dataIndex: 'unidadMedida',
            key: 'unidadMedida',
            ellipsis: true,
            width: 80
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidadSolicitada',
            key: 'cantidadSolicitada',
            width: 80
        },
        {
            title: 'Acción',
            dataIndex: 'acciones',
            key: 'acciones',
            width: 60,
            className: 'text-center',
            render: (uuid) => 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(uuid) } title="Deseas eliminar este elemento ?"> 
                    <Button type='icon-danger'> <CloseCircleOutlined className="text-xl" /></Button> 
                </Popconfirm>
        }
    ]

    const handleChange = (e) => {
        setInsumo({
            ...insumo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        
        if(Number(insumo.cantidadSolicitada ) > 0 && insumo.cantidadSolicitada !== ''){
            const [result] = insumos.filter( item => item.id === insumo.id )

            setVale({
                ...vale,
                listaInsumos: [...listaInsumos, {...insumo, ...result, ...{uuid: nanoid(6)} }],
            })

            form.resetFields()
            setUnidad('')
            setInsumo({
                residentePrestamo: null
            })
        }else {
            message.error('El insumo debe ser mayor a 0');
        }
    }

    const verificarPrestamo = () => {
        listaInsumos.some( item => item.residentePrestamo ) ? setVale({...vale, statusVale: 8 }) : setVale({...vale, statusVale:1 })
    }


    const handleDelete = (uuid) => {
        setVale({
            ...vale,
            listaInsumos: listaInsumos.filter(item => item.uuid !== uuid)
        })
    }

    const confirm = (opt) => {
        let content = ''
        let fn = () => {}

        switch (opt) {
            case 1:
                content = "¿Has terminado el vale de salida?"
                fn = () => handleSubmitVale()
            break;
            case 2:
                content = "¿Estás seguro que deseas cancelar? Esto borrará lo que has registrado"
                fn = () => navigate('/vales-salida')
            break;
                
            default:
                break;
        }

        
        Modal.confirm({
          title: 'Confirmar',
          icon: <ExclamationCircleOutlined />,
          width: 600,
          content:  <>
                     <p> {content} </p>
                    { 
                        vale.statusVale === 8 ? <span className="text-xs text-secondary">Recuerda: Los prestamos deben ser aprobados, de lo contrario no se podrán entregar. </span> : null
                    }
                    </>,
          okText: 'Confirmar',
          cancelText: 'Cancelar',
          onOk: () => fn()
        });
    };
    
    const handleSubmitVale = () => {
        dispatch(createValeAction(vale))
    }

    const handlePrestamo = (e) => {
        setInsumo({...insumo, residentePrestamo: e })
    }

    useEffect(() => {
        verificarPrestamo()
        // eslint-disable-next-line
    }, [listaInsumos])

    useEffect(() => {
        displayAlert()
        // eslint-disable-next-line
    }, [errors, created, errorsVale])

    const displayAlert = () => {
        if(errors || errorsVale){
            openNotificationWithIcon('error', errors || errorsVale)
        }
        if(created){
            openNotificationWithIcon('success', 'El vale ha sido creado correctamente')
            navigate('/vales-salida')
        }
    }

    return ( 
    <>

    <Table columns={columns} dataSource={dataSource} scroll={{ y: 150 }} style={{height: 250}} className="create-vale" loading={isLoading} />

    <Form
        layout="horizontal"
        onFinish={handleSubmit}
        form={form}
        className="steps-form"
    >
        <Form.Item
            className="w-full"
            label="Buscar Insumo"
            name="nombre"
            hasFeedback
            rules={[
                { required: true, message: "Selecciona un insumo" },
            ]}
        >

            <Select
                notFoundContent={isLoading ? <Spin size="small" /> : null}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                showSearch
                onChange={ (e) => {searchUnidad(e); setInsumo({...insumo, id: e }) } }
            > 
                {
                    insumos.filter( item => item.centroCosto === vale.centroCosto && item.status === true ).map( item => (
                        <Option key={item.id} value={item.id}>{`${item.nombre}  |  ${item.unidadMedida}`}</Option>
                    ))
                }
            </Select>

        </Form.Item>

        <div className="grid grid-cols-2 gap-5">
            <Form.Item 
                className=" w-full col-span-1"
                label="Cantidad"
                name="cantidadSolicitada"
                hasFeedback
                rules={[
                    { required: true, message: "Digita una cantidad"  }
                ]}
                
            >
                <Input type="number" step={0.01} className="w-full" name="cantidadSolicitada" value={insumo.cantidadSolicitada} onChange={ handleChange }/>
            </Form.Item>
            <Form.Item 
                className=" w-full col-span-1"
                label="Unidad"
                name="unidad"
                tooltip="Esto solo es informativo"
            >
                <Input name="unidad" readOnly placeholder={unidad} />
            </Form.Item>
        </div>

        <Divider className="mb-1 mt-0"/>

        <Form.Item
            className="w-full"
            label="Solicitar Prestamo A:"
            name="residentePrestamo"
        >
             <Select
                notFoundContent={isLoading ? <Spin size="small" /> : null}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                showSearch
                onChange={ (e) => { handlePrestamo(e) } }
            > 
                <Option key={0} value={0}> </Option>
                {
                usuarios.filter( item => item.role.permisos.map( item => item.permisos === 'acciones prestamos' ).includes(true) && userAuth.id !== item.id)
                .map( item => ( <Option key={item.id} value={item.id}>{`${item.nombre} ${item.apellidoPaterno} `}</Option> )
                )
                }
            </Select>
            <span className="text-xs text-secondary">Nota: Los prestamos deberán ser aprobados por la persona a quien se le solicita.</span>
        </Form.Item>

        <Button type="primary" className="block mx-auto" htmlType="submit"> Agregar </Button>

    </Form>
    <Divider />

    <div className="flex justify-between w-full">
        <Button type='danger' htmlType='button' onClick={ () => confirm(2) }>
            Cancelar
        </Button>
        <Button type='ghost' htmlType='button' onClick={ () => confirm(1)  } disabled={ !listaInsumos.length > 0 || isLoading} >
            { isLoading ? <Spin size="small" /> : 'Enviar' }
        </Button>

    </div>

    </>
    );
}
 
export default ListaInsumos;