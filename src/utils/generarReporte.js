import excelJS from "exceljs";
import moment from "moment";
import logo from "../assets/img/LogoAzulDevaranaG.png";



export const generarReporte = async (headers, data, titulo, setDownload , filtros, reportType) => {
    try {
        const workbook = new excelJS.Workbook()
        workbook.addWorksheet("Reporte")
        const worksheet = workbook.getWorksheet("Reporte")

        //  cambiar el formato de fecha de cada registro

        const newData = data.map( registro => {
            const registroNuevo = {...registro}
            registroNuevo.fecha = moment(registro.fecha).format("DD/MM/YYYY")
            return registroNuevo
        })

           
        

        const logoDevarana = workbook.addImage({
            buffer: logo,
            extension: "png",
        })


        worksheet.columns = headers
        worksheet.addRows(newData)


        worksheet.insertRow(1, "")
        worksheet.insertRow(2, "")
        worksheet.insertRow(3, "")
        worksheet.insertRow(4, "")

        if ( reportType === 1) {
            worksheet.mergeCells("A1:B4")
            worksheet.mergeCells("C1:D4")
            worksheet.mergeCells("E1:F4")
            worksheet.addImage(logoDevarana, "A1:B4")
        } else if(reportType === 2){
            worksheet.mergeCells("A1:C4")
            worksheet.mergeCells("D1:H4")
            worksheet.mergeCells("I1:L4")
            worksheet.addImage(logoDevarana, "A1:C4")
        }
     

     
        worksheet.getCell("D1:H4").value = titulo
 
        // FOrmatear date column and its row with moment
        worksheet.getRow(5).font = { bold: true }
        worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'center' }
        
        newData.forEach( (row, index) => {
            console.log(index + 1);
            worksheet.getRow(5).getCell(index+1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFC57B' },
                bgColor: { argb: 'FFC57B' }
            }

        })
        
        

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