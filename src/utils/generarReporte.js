
import { Workbook } from "exceljs";
import moment from "moment";


export const generarReporte = async (headers, data, titulo, setDownload , filtros, reportType) => {
    try {
        const workbook = new Workbook();
        workbook.addWorksheet("Reporte")
        const worksheet = workbook.getWorksheet("Reporte")

        //  cambiar el formato de fecha de cada registro

        let newData = data.map( registro => {
            const registroNuevo = {...registro}
            registroNuevo.fecha = moment(registro.fecha).format("DD/MM/YYYY")
            return registroNuevo
        })

        const logoDevarana = workbook.addImage({
            base64: "data:image/png;base64,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",
            extension: "png",
        })

       
        worksheet.columns = headers

        worksheet.insertRow(1, "")
        worksheet.insertRow(2, "")
        worksheet.insertRow(3, "")
        worksheet.insertRow(4, "")

        // FOrmatear date column and its row with moment
        worksheet.getRow(5).font = { bold: true, color: { argb: "FFFFFF" } }
        worksheet.getRow(5).height = 30
        worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'center' }

        headers.forEach( (row, index) => {

    
            worksheet.getRow(5).getCell(index + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '56739B' },
                bgColor: { argb: '56739B' },
                color: { argb: 'FFFFFF' }
            }
        })
                
        const { filterNames } = filtros

        if ( reportType === 1) {
            // Reporte acumulado
            
            // Merge de Logo
            worksheet.mergeCells("A1:A4")

            // Merge de Titulo
            worksheet.mergeCells("B1:B2")
            worksheet.mergeCells("B3:B4")

            // Merge de Filtros
            worksheet.mergeCells("C1:D1")
            worksheet.mergeCells("C2:D2")
            worksheet.mergeCells("C3:D3")
            worksheet.mergeCells("C4:D4")

            worksheet.getCell("B1:B2").value = `Reporte de Acumulados `
            worksheet.getCell("B1:B4").font = { size: 18, bold: true, color: { argb: "646375" } }
            worksheet.getCell("B1:B4").alignment = { vertical: "middle", horizontal: "center" }
            
            worksheet.getCell("B3:B4").value = `Vales de salida de almacén`
            worksheet.getCell("B3:B4").font = { size: 16, bold: true, color: { argb: "646375" } }
            worksheet.getCell("B3:B4").alignment = { vertical: "middle", horizontal: "center" }

            // Logo con padding
            worksheet.addImage(logoDevarana, {
                tl: { col: .25, row: .5 },
                ext: { width: 70, height: 70 },
            })

           
            
            worksheet.getCell("C1:D1").value = `Centro de Costo: ${filterNames.centroCosto ? filterNames.centroCosto : " - " }` 
            worksheet.getCell("C2:D2").value = `Fecha Inicio: ${ filterNames.fechaInicial?  filterNames.fechaInicial : " - " } `
            worksheet.getCell("C3:D3").value = `Fecha Fin: ${ filterNames.fechaFinal? filterNames.fechaFinal : " - " }` 
            worksheet.getCell("C4:D4").value = `Busqueda: ${filterNames.busqueda? filterNames.busqueda : " - " }` 

            worksheet.getColumn(1).alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getColumn(4).alignment = { vertical: 'middle', horizontal: 'center' }

            
            worksheet.getCell("C1:D1").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("C2:D2").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("C3:D3").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("C4:D4").font = { size: 12, bold: true, color: { argb: "646375" } }
            
            worksheet.getCell("C1:D1").alignment = { vertical: 'middle', horizontal: 'left' }
            worksheet.getCell("C2:D2").alignment = { vertical: 'middle', horizontal: 'left' }
            worksheet.getCell("C3:D3").alignment = { vertical: 'middle', horizontal: 'left' }
            worksheet.getCell("C4:D4").alignment = { vertical: 'middle', horizontal: 'left' }


            newData = newData.map( registro => {
                // si registro.totalEntregado es null, entonces se le asigna 0
                registro.totalEntregado = registro.totalEntregado ? registro.totalEntregado : "0.00"
                return registro
            } )


        } else if(reportType === 2){
            // Reporte General

            // Merge de Logo
            worksheet.mergeCells("A1:B4")

            // Merge de Titulo
            worksheet.mergeCells("C1:F2")
            worksheet.mergeCells("C3:F4")

            // Merge de Filtros
            worksheet.mergeCells("G1:H1")
            worksheet.mergeCells("G2:H2")
            worksheet.mergeCells("G3:H3")
            worksheet.mergeCells("G4:H4")

            worksheet.addImage(logoDevarana, {
                tl: { col: .6, row: .5 },
                ext: { width: 70, height: 70 },
            })
            

            worksheet.getCell("C1:F2").value = "Reporte General"  
            worksheet.getCell("C1:F4").font = { size: 18, bold: true, color: { argb: "646375" } }
            worksheet.getCell("C1:F4").alignment = { vertical: "middle", horizontal: "center" }
            worksheet.getCell("C3:F4").value = "Vales de salida de almacén"  
            worksheet.getCell("C3:F4").font = { size: 16, bold: true, color: { argb: "646375" } }
            worksheet.getCell("C3:F4").alignment = { vertical: "middle", horizontal: "center" }

            worksheet.getCell("G1:H1").value = `Centro de Costo: ${filterNames.centroCosto ? filterNames.centroCosto : " - " }`
            worksheet.getCell("G2:H2").value = `Fecha Inicio: ${ filterNames.fechaInicial?  filterNames.fechaInicial : " - " } `
            worksheet.getCell("G3:H3").value = `Fecha Fin: ${ filterNames.fechaFinal? filterNames.fechaFinal : " - " }`
            worksheet.getCell("G4:H4").value = `Busqueda: ${filterNames.busqueda? filterNames.busqueda : " - " }`
            worksheet.getCell("I1").value = `Actividad: ${filterNames.actividad? filterNames.actividad : " - " }`
            worksheet.getCell("I2").value = `Lider de Cuadrilla: ${filterNames.personal? filterNames.personal : " - " }`
            worksheet.getCell("I3").value = `Usuario: ${filterNames.usuario? filterNames.usuario : " - " }`
            worksheet.getCell("I4").value = `Estatus: ${filterNames.status? filterNames.status : " - " }`

            worksheet.getCell("G1:H1").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("G2:H2").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("G3:H3").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("G4:H4").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("I1").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("I2").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("I3").font = { size: 12, bold: true, color: { argb: "646375" } }
            worksheet.getCell("I4").font = { size: 12, bold: true, color: { argb: "646375" } }
        
        }

   
        worksheet.addRows(newData)


        const uint8Array = await workbook.xlsx.writeBuffer()
        const blob = new Blob([uint8Array], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${titulo}_${moment().format("DD-MM-YYYY_HH-mm")}.xlsx`
        a.click()
        a.remove()

        await setDownload(false)
    } catch (error) {
        
        console.log(error);
    }

}