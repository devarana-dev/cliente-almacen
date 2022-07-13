import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllValesAction } from '../../actions/valeActions';

const ValesSalida = () => {

    const dispatch = useDispatch()
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
            <Table columns={columns} dataSource={dataSource} />
        </>    
    );
}
 
export default ValesSalida;