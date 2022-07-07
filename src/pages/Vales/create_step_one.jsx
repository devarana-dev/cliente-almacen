import { Button, Form, Select } from 'antd';

const CreateValesSalida1 = ({current, setCurrent}) => {

    const {Option} = Select;
    return ( 
        <>
            {/* <h1>Información General</h1> */}
            {/* <h1> Añadir Materiales </h1> */}
            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar un Almacén' },
                ]}
                name="almacen"
                hasFeedback
                label="Selecciona un Almacén"
            >
                <Select 
                    placeholder="Selecciona un Almacén"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                    defaultValue={"4"}
                >
                    <Option value="1">Almacén 1</Option>
                    <Option value="2">Almacén 2</Option>
                    <Option value="3">Almacén 3</Option>
                    <Option value="4">Almacén 4</Option>
                    
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar un centro de costo' },
                ]}
                name="centroCosto_id"
                hasFeedback
            >
                <Select 
                    placeholder="Obra / Centro de Costo"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                >
                    <Option value="1">Centro de costo 1</Option>
                    <Option value="2">Centro de costo 2</Option>
                    <Option value="3">Centro de costo 3</Option>
                    <Option value="4">Centro de costo 4</Option>
                    
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar una sección' },
                ]}
                name="seccion_id"
                hasFeedback
            >
                <Select 
                    placeholder="Nivel"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                >
                    <Option value="1">Seccion 1</Option>
                    <Option value="2">Seccion 2</Option>
                    <Option value="3">Seccion 3</Option>
                    <Option value="4">Seccion 4</Option>
                    
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar una zona', type: 'array' },
                ]}
                name="zona_id"
                hasFeedback
            >
                <Select 
                    mode="multiple" placeholder="Selecciona un Prototipo / Zona"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                    >
                    <Option value="1">Zona 1</Option>
                    <Option value="2">Zona 2</Option>
                    <Option value="3">Zona 3</Option>
                    <Option value="4">Zona 4</Option>
                    
                </Select>
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar un tipo de trabajo' },
                ]}
                name="tipoTrabajo_id"
                hasFeedback
            >
                <Select 
                    placeholder="Trabajo a realizar"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                    >
                    <Option value="1">Albañilerias estacionamientos</Option>
                    <Option value="2">33 - Accesorios de iluminacion estacionamientos</Option>
                    <Option value="3">32 - Acabados estacionamientos</Option>
                    <Option value="4">34 - Herrería estacionamientos</Option>
                    
                </Select>
            </Form.Item>
            <Form.Item
                rules={[
                    { required: true, message: 'Debes seleccionar a un jefe de cuadrilla' },
                ]}
                name="jefeCuadrilla_id"
                hasFeedback
            >
                <Select 
                    placeholder="Entregar a"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    size='large'
                    >
                    <Option value="1">Almacén 1</Option>
                    <Option value="2">Almacén 2</Option>
                    <Option value="3">Almacén 3</Option>
                    <Option value="4">Almacén 4</Option>
                    
                </Select>
            </Form.Item>

            <Button type='ghost' htmlType='submit'>
                Continuar
            </Button>
        </>
    );
}
 
export default CreateValesSalida1;