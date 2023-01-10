
import { Divider, Drawer } from 'antd'
import React, { useState } from 'react'
import { ListaComentarios } from './ListaComentarios'
import { NuevoComentario } from './NuevoComentario'

export const Comentarios = ({id, onClose, comentarios}) => {
    
    const [open, setOpen] = useState(false);

    const showDrawer = () => setOpen(true);
    const onCloseSecond = () => setOpen(false);

    // first 3 elements in the array
    let lastComentarios =  comentarios.slice(0, 3)



    return (
        <>
            <Drawer title="Comentarios" placement="right" closable={true} onClose={onCloseSecond} visible={open} width={500}>
                <ListaComentarios comentarios={comentarios}/>           
            </Drawer>

            {
                comentarios.length > 0 && (
                <>
                    <div>
                        <p className='font-medium'>Comentarios {comentarios.length > 0 && <span className='text-xs cursor-pointer text-blue-500 hover:opacity-60 font-light' onClick={showDrawer}>ver más</span> } </p>
                        <ListaComentarios comentarios={lastComentarios} preview={false} showDrawer={showDrawer} />
                    </div>
                    <Divider/>
                </>
                )
                
            }
            

            
            <NuevoComentario id={id} onClose={onClose} /> 
        </>
    )
}
