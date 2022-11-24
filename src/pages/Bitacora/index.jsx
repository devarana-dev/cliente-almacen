import { useNavigate } from "react-router-dom";
import { hasPermission } from "../../utils/hasPermission";
import { Button, Input, Table } from 'antd';
import { useSelector } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";


const Bitacora = () => {

    const { userPermission } = useSelector(state => state.permisos);
    const navigate = useNavigate()
    


    const isLoading = false
    const columns = [
    ]

    const dataSource = [
    ]
    return ( 
    <>
        <div className='py-2 flex justify-end'>      
            <div className="flex gap-10 py-3">
                <div className="flex flex-wrap items-center gap-3">
                </div>
            </div>

            <Button type='icon-secondary-new' onClick={() => navigate('create')} className="md:flex hidden fixed right-10 lg:bottom-8 bottom-28 z-50"><PlusCircleOutlined className='py-1'/></Button>

        </div>
            <Table columns={columns} scroll={{ x: 'auto'}}  dataSource={dataSource} loading={isLoading} showSorterTooltip={false}/>
        </>
    );
}
 
export default Bitacora;