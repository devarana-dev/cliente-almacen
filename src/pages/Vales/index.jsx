import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAllValesAction } from '../../actions/valeActions';

const ValesSalida = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { vales } = useSelector( state => state.vales )
    const [ dataSource, setDataSource ] = useState([]);
    

    useEffect(() => {
        dispatch(getAllValesAction())
    }, [])

    const columns = [
        {
            
        }
    ]

    return ( 
        <>
            <h1 className='text-dark text-xl text-center font-medium'>Vales</h1>
            <div className='py-2 flex justify-between'>
                <Button type='dark' className='visible sm:invisible' onClick={() => navigate('/acciones')}>Volver</Button>
                <Button type='primary' onClick={() => navigate('create')}>Agregar Nuevo Vale</Button>
            </div>
            <Table columns={columns} dataSource={dataSource} />
        </>    
    );
}
 
export default ValesSalida;