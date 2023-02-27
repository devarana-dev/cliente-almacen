import { useSelector } from "react-redux";
import { groupPermission, hasPermission } from "../../utils/hasPermission";
import { ValesGraph } from "./ValesGraph";



export default function Home() {

    const { userPermission } = useSelector(state => state.permisos);




    return (
    <> 
        <div className="flex content-center align-middle m-auto w-full" style={{
            height: 'calc(100vh - 130px)'
        }}>
            <div className='grid grid-cols-12 mx-auto w-full'>
                {
                    hasPermission(userPermission, 'crear vales') ?
                    <div className='col-span-12 md:col-span-6'>
                        <ValesGraph />
                    </div>
                    : null
                }
                {
                    groupPermission(userPermission, ['crear bitacora']) ?
                    <div className='col-span-12 md:col-span-6'>
                        {/* <BitacoraGraph /> */}
                        <h1 className='text-center text-dark font-bold py-2' style={{ fontSize: "clamp(16px, 2.5vw, 24px)" }}> Bitácora </h1>
                    </div>
                    : null
                }
            </div>
        </div>
    </>
    )
};
