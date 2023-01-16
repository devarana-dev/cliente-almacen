import { Button, Divider, Image, Tooltip } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import { Comentarios } from '../../components/Bitacora/Comentarios'
import Loading from '../../components/Elements/Loading'
import { CheckSquareOutlined, CloseSquareOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { updateConfirmedAction, updateVisitaAction } from '../../actions/bitacoraActions'
import { useDispatch, useSelector } from 'react-redux'


export const ViewBitacora = ({isLoadingBitacora, bitacora, onClose, errorBitacora}) => {
    
    const dispatch = useDispatch()

    const { userAuth } = useSelector(state => state.auth)

    useEffect(() => {
        if( bitacora ) {
            setUpdateVisited(bitacora.uid)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingBitacora])

    if( errorBitacora && !isLoadingBitacora ) return <Loading text={`${errorBitacora}, es probable que la url esté mal.`}/>
    if( !bitacora ) return <Loading text='Cargando Bitacora...'/>

    const setUpdateVisited = (uid) => {

        if( 
            bitacora.participantes.find( user => user.id === userAuth.id ) && 
            bitacora.participantes.find( user => user.id === userAuth.id ).pivot_bitacora_users.visited === false
        ) {
            dispatch(updateVisitaAction(uid))
        }
    }   


    const setUpdateConfirmed = (uid) => {
        dispatch(updateConfirmedAction(uid))
    }
  return (
    <div className='grid grid-cols-12 gap-3'> 

        <div className='col-span-12 grid grid-cols-12 gap-3 sticky'>
            <div className='col-span-5 flex items-end'>
                <p className='font-medium'>Fecha: <span className='font-light'>{ moment(bitacora.fecha).format('DD/MM/YYYY') }</span> </p>
            </div>
            <div className='col-span-5 flex items-end'>
                <p className='font-medium'>Hora: <span className='font-light'>{ moment(bitacora.fecha).format('HH:mm') }</span> </p>
            </div>
            <div className="col-span-2 flex items-end">
                
                {
                    bitacora.participantes.find( user => user.id === userAuth.id ) ?
                        <>
                            <p className='pr-2'>Confirmado:</p>
                            { bitacora.participantes.find( user => user.id === userAuth.id ).pivot_bitacora_users.confirmed === false ? (
                                <Tooltip title='Click Para Confirmar' placement="rightTop">
                                    <Button type='icon-danger' onClick={() => setUpdateConfirmed(bitacora.uid)} className='px-2 flex items-start'><CloseSquareOutlined className='text-red-500 text-xl'/></Button>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Confirmado" placement='rightTop'>
                                    <CheckSquareOutlined className='text-green-500 text-xl'/>
                                </Tooltip>
                            )}
                    </>
                    : null
                }
            </div>

            <Divider className='col-span-12 my-2'/>
            <div className='col-span-6'>
                <p className='font-medium'>Tipo Bitacora: <span className='font-light'>{ bitacora.tipo_bitacora.nombre }</span> </p>
            </div>
            <div className='col-span-6'>
                <p className='font-medium'>Autor: <span className='font-light'>{ 
                    `${bitacora.autorInt ? `${bitacora.autorInt.nombre} ${bitacora.autorInt.apellidoPaterno} ${bitacora.autorInt.apellidoMaterno} ` : `${bitacora.autorExt.nombre} ${bitacora.autorExt.apellidoPaterno} ${bitacora.autorExt.apellidoMaterno} ` }`
                }</span> </p>
            </div>
            <div className='col-span-6'>
                <p className='font-medium'>Titulo: <span className='font-light'>{ bitacora.titulo }</span> </p>
            </div>
            { bitacora.actividad && <div className='col-span-6'>
                <p className='font-medium'>Actividad: <span className='font-light'>{ bitacora.actividad }</span> </p>
            </div> }

            {
                bitacora.autorExt && (<div className='col-span-4'>
                    <p className='font-medium'>Empresa: <span className='font-light'>{ bitacora.autorExt.empresa }</span> </p>
                </div> )
            }
        </div>
        
        <Divider className='col-span-12 my-2'/>
        {
            (bitacora.obra && bitacora.obraId !== 0) && (<div className='col-span-4'>
                <p className='font-medium'>Obra: <span className='font-light'>{ bitacora.obra.nombre }</span> </p>
            </div> )

        }
        {
            (bitacora.nivele && bitacora.nivelId !== 0) && (<div className='col-span-4'>
                <p className='font-medium'>Nivel: <span className='font-light'>{ bitacora.nivele.nombre }</span> </p>
            </div>)
        }
        {
            (bitacora.zona && bitacora.zonaId !== 0) && (<div className='col-span-4'>
                <p className='font-medium'>Zona: <span className='font-light'>{ bitacora.zona.nombre }</span> </p>
            </div>)
        }
        
        
       

        {
            bitacora.participantes.length > 0 && (<div className='col-span-12'>
                <p className='font-medium'>Involucrados: </p> 
                <div className='font-light grid grid-cols-3'>
                    { bitacora.participantes.map( (involucrado, index) => (
                        <p key={index} prefix={index} className='font-light flex'>
                            { involucrado.nombre } { involucrado.apellidoPaterno } { involucrado.apellidoMaterno }  
                            <span className='flex items-center px-2'> 
                                { 
                                    involucrado.pivot_bitacora_users.visited ? 
                                        <Tooltip title="Visto">
                                            <EyeOutlined className='px-1 text-green-500 cursor-help' /> 
                                        </Tooltip>
                                            : 
                                        <Tooltip title="No se ha visto">
                                            <EyeInvisibleOutlined className='px-1 text-red-500 cursor-help' /> 
                                        </Tooltip>
                                } 
                                {
                                    involucrado.pivot_bitacora_users.confirmed ?
                                        <Tooltip title="Confirmado">
                                            <CheckSquareOutlined className='px-1 text-green-500 cursor-help' />
                                        </Tooltip>
                                            :
                                        <Tooltip title="No confirmado">
                                            <CloseSquareOutlined className='px-1 text-red-500 cursor-help' />
                                        </Tooltip>
                                }
                            </span> 
                        </p>
                    ))}
                </div>
            </div>)
        }
        <div className='col-span-12'>
            <p className='font-medium'>Descripción: <span className='font-light'>{ bitacora.descripcion }</span> </p>
        </div>

        { bitacora.galeria_bitacoras.length > 0 && <div className='col-span-12'>
            <p className='font-medium'>Imagenes Adjuntos: </p>
            <div className='grid grid-cols-4 gap-3 py-2'>
                <Image.PreviewGroup>
                    { bitacora.galeria_bitacoras.map( (imagen, index) => (
                        <Image
                        key={index} 
                        src={`https://spaces.erp-devarana.mx/${imagen.url}`} 
                        alt={bitacora.titulo + index} 
                        className='object-cover max-w-28 w-full max-h-28 h-full'
                        fallback="data:image/png;base64,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"
                        />
                    ))}
                </Image.PreviewGroup>
            </div>
        </div>}

        <Divider className='col-span-12 my-2'/>

        <div className='col-span-12'>
            {
                bitacora && <Comentarios id={bitacora.id} onClose={onClose} comentarios={bitacora.comentarios_bitacoras} />
            }
        </div>
        
    </div>
  )
}
