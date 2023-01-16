import React from 'react'
import Loading from './Elements/Loading'

export const Mask = ({text}) => {
  return (

        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center" style={{ zIndex: 1001 }} >
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full">
                <div className="flex flex-col gap-y-2">
                    <div className="flex justify-center items-center">
                        <Loading text={text}/>
                    </div>
                </div>
            </div>
        </div>
  )
}
