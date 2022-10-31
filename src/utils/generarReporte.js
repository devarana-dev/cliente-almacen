import excelJS from "exceljs";
import moment from "moment";


export const generarReporte = async (headers, data, titulo, setDownload) => {

    const workbook = new excelJS.Workbook()
    workbook.addWorksheet("Reporte")
    const worksheet = workbook.getWorksheet("Reporte")


    worksheet.columns = headers

    //  cambiar el formato de fecha de cada registro

    const newData = data.map( registro => {
        const registroNuevo = {...registro}
        registroNuevo.fecha = moment(registro.fecha).format("DD/MM/YYYY")
        return registroNuevo
    })


    worksheet.addRows(newData)

    // FOrmatear date column and its row with moment
    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }


    const uint8Array = await workbook.xlsx.writeBuffer()
    const blob = new Blob([uint8Array], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${titulo}_${moment().format("DD-MM-YYYY_HH-mm")}.xlsx`
    a.click()
    a.remove()

    await setDownload(false)

}