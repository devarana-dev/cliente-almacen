import { ValesGraph } from "./ValesGraph";



export default function Home() {



    return (
    <> 
        <div className="flex content-center align-middle m-auto h-full w-full">
            <div className='grid grid-cols-12 m-auto w-full'>
                <div className="col-span-12">
                    <ValesGraph />
                </div>
            </div>
        </div>
    </>
    )
};
