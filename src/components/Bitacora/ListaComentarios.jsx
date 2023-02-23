import React, { useState } from 'react'
import { Avatar, Comment, Image, Tooltip } from 'antd'
import moment from 'moment';
import brokenUser from '../../utils/brokenUser';
import { nanoid } from 'nanoid';


export const ListaComentarios = ({comentarios, preview = true, showDrawer}) => {
    const [visible, setVisible] = useState(false);  
    const [galeria, setGaleria] = useState([]);
  return (
    <div key={nanoid()}>
        {
            comentarios.map( comentario => {
            
                return (
                <>
                    
                    <Comment
                        key={comentario.id}
                        author={`${comentario.user.nombre} ${ comentario.user.apellidoPaterno }`}
                        avatar={
                            <Avatar src={ <Image fallback={brokenUser()} src={comentario.user.picture} /> || '' } />
                        }
                        content={
                            <div className={!preview && `max-h-20 h-auto overflow-y-auto `}>
                                {
                                    comentario.comentario.length > 50 && !preview ?
                                        <p>{comentario.comentario.slice(0, 50)} <span className='text-blue-500 cursor-pointer hover:opacity-60' onClick={() => showDrawer(true)}>ver más</span></p>
                                        :
                                        <p>{comentario.comentario}</p>
                                }
                            </div>                        
                        }
                        datetime={
                            <Tooltip title={moment(comentario.createdAt).format('LT - LL')}>
                                <span>{ moment(comentario.createdAt).fromNow() }</span>
                            </Tooltip>
                        } 
                        actions={
                            comentario.galeria_comentarios.length > 0 ? [
                                <span key="comment-photo" onClick={() => { setVisible(true); setGaleria(comentario.galeria_comentarios) }}> 
                                    { comentario.galeria_comentarios.length > 1 ? `${comentario.galeria_comentarios.length} Fotos` : `${comentario.galeria_comentarios.length} Foto` }
                                </span>
                            ] : []
                    }
                    />

                    { galeria.length > 0 && 
                        <div className='hidden'>
                            <Image.PreviewGroup  preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }} >
                                { galeria && galeria.map( img => <Image key={img.id} src={`https://spaces.erp-devarana.mx/${img.url}`} /> ) }
                            </Image.PreviewGroup>
                        </div>
                    }
                </>
            )}
        )}
       
    </div>
  )
}
