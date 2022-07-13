import { Button, Divider, Form, Input, Popconfirm, Select, Spin, Table, Modal, notification} from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllInsumosAction } from "../../actions/insumoActions";
import {nanoid} from 'nanoid'
import {  DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { createValeAction } from "../../actions/valeActions";

const ListaInsumos = ({current, setCurrent, setVale, vale}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { Option } = Select
    const [ form ] = Form.useForm();
    const { insumos, isLoading, errors } = useSelector( state => state.insumos )
    
    const [ dataSource, setDataSource ] = useState([]);
    const [ unidad, setUnidad ] = useState('')
    const [ insumo, setInsumo ] = useState({
        id: '',
        cantidad: 0
    })

    const { listaInsumos } = vale


    useEffect(() => {
        dispatch(getAllInsumosAction())
    }, [])

    useEffect(() => {
        setDataSource(
            listaInsumos.map( (item, i) => (
                { key: i, acciones:item.uuid, ...item }
            ))
		)
    }, [listaInsumos])

    const searchUnidad = (id) => {
        const [result] = insumos.filter( item => item.id !== id )
        setUnidad(result.unidadMedida);
    }
    

    const columns = [
        {
            title: 'Insumo',
            dataIndex: 'nombre',
            key: 'nombre'
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
            width: 100
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            width: 100,
            render: (uuid) => 
                <Popconfirm placement='topRight' onConfirm={ () => handleDelete(uuid) } title="Deseas eliminar este elemento ?"> 
                    <Button type='danger'> <DeleteOutlined className='font-bold text-sm'/> </Button> 
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
        const [result] = insumos.filter( item => item.id !== insumo.id )

        setVale({
            ...vale,
            listaInsumos: [...listaInsumos, {...insumo, ...result, ...{uuid: nanoid(6)} }],
        })
        form.resetFields()
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
                content = "¿Deseas guardarlo en borrador y terminar después?"
                fn = () => handleSubmitVale()
            break;
            case 3:
                content = "¿Estás seguro que deseas cancelar? Esto borrará lo que has registrado"
                fn = () => navigate('/acciones')
            break;
            case 4:
                content = "¿Estás seguro que deseas cancelar? Esto borrará lo que has registrado"
                fn = () => navigate('/vales-salida')
            break;
                
            default:
                break;
        }

        
        Modal.confirm({
          title: 'Confirmar',
          icon: <ExclamationCircleOutlined />,
          content: content,
          okText: 'Confirmar',
          cancelText: 'Cancelar',
          onOk: () => fn()
        });
    };
    
    
    const handleSubmitVale = () => {

        dispatch(createValeAction(vale))

        if(!errors){                
            notification.success({
                message: "Vale creado",
                description: "El vale ha sido creado correctamente",
                duration: 2,
            });
            navigate("/vales-salida");
        }
    }
    return ( 
    <>

    <Table columns={columns} dataSource={dataSource} scroll={{ y: 180 }} style={{height: 250}}/>

    <Form
        layout="horizontal"
        className="pt-5"
        size="large"
        onFinish={handleSubmit}
        form={form}
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
                onChange={ (e) => {searchUnidad(e); setInsumo({  id: e})} }
            > 
                {
                    insumos.map(item => (
                        <Option key={item.id} value={item.id}>{`${item.nombre}`}</Option>
                    ))
                }
            </Select>

        </Form.Item>

        <div className="grid grid-cols-2 gap-5">
            <Form.Item 
                className=" w-full col-span-1"
                label="Cantidad"
                name="cantidad"
                hasFeedback
                rules={[
                    { required: true, message: "Digita una cantidad", min: 0  }
                ]}
                
            >
                <Input min={ 0 } name="cantidad" onChange={ handleChange }/>
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

        <Button type="ghost" className="block mx-auto" htmlType="submit"> Agregar </Button>

    </Form>
    <Divider />

    <div className="flex justify-between w-full">
        <Button type='dark' htmlType='button' onClick={ () => setCurrent(0) }>
            Regresar
        </Button>
        <Button type='warning' htmlType='button' onClick={ async () => { const statusValue = 2; await setVale({ ...vale, statusVale: statusValue }); confirm(2)} }>
            Borrador
        </Button>        
        <Button type='primary' htmlType='button' onClick={ async () => { const statusValue = 1; await setVale({ ...vale, statusVale: statusValue }); confirm(1)  }} >
            Crear
        </Button>
        <Button type='danger' htmlType='button' onClick={ () => confirm(3) } className="block sm:hidden">
            Salir
        </Button>
        <Button type='danger' htmlType='button' onClick={ () => confirm(4) } className="hidden sm:block">
            Salir
        </Button>
    </div>

    </>
    );
}
 
export default ListaInsumos;