import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getCountValeSalidaAction } from '../actions/valeActions';
import Logotipo from "../assets/img/LogoDevarana.png"

export default function Home() {

    const dispatch = useDispatch()
    const { count, isLoading } = useSelector( state => state.vales)
    const [ dataValues, setDataValues ] = useState({})
    ChartJS.register(ArcElement, Tooltip, Legend);
    

    useEffect(() => {
        if(count.length ===  0 || !count){
            dispatch(getCountValeSalidaAction())
        }else{

            setDataValues({
                "Nuevos": count.nuevo,
                "Parciales": count.parcialAbierto,
                "Entregado": count.entregado,
                "Cancelado": count.cancelado,
                // "Cerrado": count.cerrado
            })
        }
    }, [count])

    const data = {
        labels: Object.keys(dataValues),
        datasets: [
            {
                label: '# de vales',
                data: count ? Object.values(dataValues) : [],
                backgroundColor: [
                    'rgba(169, 192, 228, 0.8)',
                    'rgba(214, 71, 103, 0.8)',
                    'rgba(86, 115, 155, 0.8)',
                    'rgba(247, 37, 0, 0.8)',
                    'rgba(255, 107, 44, 0.8)',
                ],
                borderColor: '#ffff',
                // borderColor: [
                //     'rgba(169, 192, 228, 1)',
                //     'rgba(214, 71, 103, 1)',
                //     'rgba(86, 115, 155, 1)',
                //     'rgba(247, 37, 0, 1)',
                //     'rgba(255, 107, 44, 1)',
                // ],
                borderWidth: 2,
            },
        ],
    }

    const options = {
        layout: {
            padding: {
                left: 70,
                right: 70,
                top: 20,
                bottom: 20
            }
        },

        plugins: {
            legend: {
                position: 'bottm',
                align: 'center',
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        centerText: {
            display: true,
            text: count.todos || 0
        },
       
    }

    const plugins = [{
        beforeDraw: (chart) => {
            const { height } = chart;
            const { ctx } = chart;
            ctx.restore();
            const fontSize = (height / 90).toFixed(2);
            ctx.font = `${fontSize}em sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#646375';
            const  text  = `${chart.config.options.centerText.text}`;
            const textX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            const textY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.fillText(text, textX, textY);
            ctx.save();
        },
        afterDraw: (chart, args, options) => {
            const { ctx, chartArea: {top, bottom, left, right, width, height } } = chart
            CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

                var lines = text.split("\n");
            
                for (var i = 0; i < lines.length; i++) {
            
                    var words = lines[i].split(' ');
                    var line = '';
            
                    for (var n = 0; n < words.length; n++) {
                        var testLine = line + words[n] + ' ';
                        var metrics = this.measureText(testLine);
                        var testWidth = metrics.width;
                        if (testWidth > maxWidth && n > 0) {
                            this.fillText(line, x, y);
                            line = words[n] + ' ';
                            y += lineHeight;
                        } else {
                            line = testLine;
                        }
                    }
            
                    this.fillText(line, x, y);
                    y += lineHeight;
                }
            };
            chart.data.datasets.forEach( (dataset, i) => {
                chart.getDatasetMeta(i).data.forEach((datapoint, index) => {

                   
                    const { x, y } = datapoint.tooltipPosition()

                    // DrawLine 
                    const halfHeight = chart.chartArea.top + chart.chartArea.bottom / 2
                    const halfWidth = chart.chartArea.left + chart.chartArea.right / 2
                    const xLine = x >= halfWidth ? x + (height / 7) : x - (height / 7)
                    const yLine = y >= halfHeight ? y + (height / 7) : y - (height / 7)
                    // Line 
                    // ctx.beginPath()
                    // ctx.moveTo(x, y)
                    // ctx.lineTo(xLine, yLine)
                    // ctx.lineTo(xLine + extraLine, yLine)
                    // ctx.strokeStyle = dataset.backgroundColor[index]
                    // ctx.stroke()


                    // Text
                    const textWidth = ctx.measureText(chart.data.labels[index]).width

                    const fontSize = (height / 36).toFixed(2);
                    ctx.font = `bold ${fontSize}px Roboto`;
                    

                    // Control Position
                    const textXpositon = x >= halfWidth ? 'left' : 'right'
                    const plusFivePx = x >= halfWidth ? 2 : - 2
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    
                    ctx.fillStyle = dataset.backgroundColor[index]
                    const textData = chart.data.datasets[0].data[index] + '\n' + chart.data.labels[index]
            
                    ctx.wrapText(textData, xLine + plusFivePx, yLine, 160, 16)
                })
            })
        }
    }]

    CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

        var lines = text.split("\n");
    
        for (var i = 0; i < lines.length; i++) {
    
            var words = lines[i].split(' ');
            var line = '';
    
            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = this.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    this.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
    
            this.fillText(line, x, y);
            y += lineHeight;
        }
    };
    


    return (
        <div className='max-w-screen-md m-auto h-full'>
            <img src={Logotipo} alt="" className='mx-auto block md:hidden max-w-full'/>
            <div className='flex align-middle h-full flex-col justify-center'>
                <h1 className='text-center text-dark text-3xl font-bold uppercase hidden md:block'> Estatus de Vales de Salida de Almacén </h1>
                <p className='uppercase text-center text-dark text-2xl font-medium hidden md:block'>  { moment().format('DD MMMM YY') }  </p>
                <Doughnut data={data} options={options} plugins={plugins} />
            </div>
        </div>
    )
};
