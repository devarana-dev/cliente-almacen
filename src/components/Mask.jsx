import React from 'react'
import Loading from './Elements/Loading'
import { Offline } from 'react-detect-offline'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'



export const Mask = ({text}) => {
    const navigate = useNavigate()
    return (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center" style={{ zIndex: 1001 }} >
                <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full">
                    <div className="flex flex-col gap-y-2">
                        <div className="flex justify-center items-center flex-col">
                            <Loading text={text}/>

                            <Offline>
                                <span className='text-center text-red-500 my-5'> Parece que no tienes conexión, se enviará cuando se reanude tu conexión. </span>
                                <Button type='ghost' onClick={ () => navigate(-1) }>
                                    Salir
                                </Button>
                            </Offline>
                            
                        </div>
                    </div>
                </div>
            </div>
    )
}
