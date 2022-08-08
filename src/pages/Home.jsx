import { FilterOutlined } from '@ant-design/icons';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getCountValeSalidaAction } from '../actions/valeActions';
import Logotipo from "../assets/img/LogoDevarana.png"

export default function Home() {

    const dispatch = useDispatch()
    const { count } = useSelector( state => state.vales)
    const [ dataValues, setDataValues ] = useState({})

    const [filter, setFilter] = useState("")
    const [filterDate, setFilterDate ] = useState("Todos")
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
                "Cerrado": count.cerrado
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
                left: 80,
                right: 80,
                top: 50,
                bottom: 50
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
        aspectRatio: 1.1,
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
            const { ctx, chartArea: { height, width } } = chart
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
                    const xLine = x >= halfWidth ? x + 0 : x - 0
                    const yLine = y >= halfHeight ? y + 0 : y - 0
                    // Line 
                    // ctx.beginPath()
                    // ctx.moveTo(x, y)
                    // ctx.lineTo(xLine, yLine)
                    // ctx.lineTo(xLine, yLine)
                    // ctx.strokeStyle = dataset.backgroundColor[index]
                    // ctx.stroke()


                    // Text
                    // const textWidth = ctx.measureText(chart.data.labels[index]).width

                    const fontSize = (height / 38).toFixed(2);
                    ctx.font = `bold ${fontSize}px Roboto`;
                    
                    

                    // Control Position
                    // const textXpositon = x >= halfWidth ? 'left' : 'right'
                    const plusFivePx = x >= halfWidth ? 0 : - 0
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    
                    ctx.fillStyle = "#ffffff"
                    // ctx.fillStyle = dataset.backgroundColor[index]
                    
                    const textData = chart.data.datasets[0].data[index] > 0 ? chart.data.datasets[0].data[index] + '\n' + chart.data.labels[index]  : '' 
            
                    ctx.wrapText(textData, xLine + plusFivePx, yLine, 250, 16)
                })
            })
        },
    }]

    CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

        let lines = text.split("\n");
    
        for (let i = 0; i < lines.length; i++) {
    
            let words = lines[i].split(' ');
            let line = '';
    
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = this.measureText(testLine);
                let testWidth = metrics.width;
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
    
    const handleFilter = ( type ) => {
        setFilter(type)
        dispatch(getCountValeSalidaAction({type}))

        switch (type) {
            case "hoy":
                setFilterDate(moment().format('DD MMMM'))
            break;
            case "semana":
                setFilterDate(moment().startOf('week').format('DD MMMM') + ' - ' + moment().endOf('week').format('DD MMMM'))
            break;
            case "mes":
                setFilterDate(moment().startOf('month').format('DD MMMM') + ' - ' + moment().endOf('month').format('DD MMMM'))
            break;
            default:
                setFilterDate("Todos")
            break;
        }
    }

    return (
       <> 
        <div className="max-w-screen-md grid grid-cols-12 m-auto md:h-auto h-full">
            <div className="col-span-12">
                <img src={Logotipo} alt="" className='mx-auto block md:hidden max-w-full'/>
                <h1 className='text-center text-dark text-3xl font-bold uppercase hidden md:block'> Estatus de Vales de Salida de Almacén </h1>
                <p className='uppercase text-center text-dark text-2xl font-medium hidden md:block'>  { filterDate }  </p>
            </div>
            <div className="col-span-12 md:col-span-10">
                <Doughnut data={data} options={options} plugins={plugins} />
            </div>
            <div className="col-span-0 md:col-span-2 md:block hidden">
                <div className='flex'>
                    <div>
                        <p className='inline-flex items-center text-dark font-medium'><FilterOutlined className='text-2xl mr-2'/> Filtrar </p>
                        <ul>
                            <li className={`pl-8 cursor-pointer ${!filter? 'font-bold': ''}`} onClick={() => dispatch(handleFilter())}> <p>Todos</p></li>
                            <li className={`pl-8 cursor-pointer ${filter === 'hoy' ? 'font-bold': ''}`} onClick={() => dispatch(handleFilter("hoy"))}> <p>Hoy</p></li>
                            <li className={`pl-8 cursor-pointer ${filter === 'semana' ? 'font-bold': ''}`} onClick={() => dispatch(handleFilter("semana"))}><p>Esta Semana</p></li>
                            <li className={`pl-8 cursor-pointer ${filter === 'mes' ? 'font-bold': ''}`} onClick={() => dispatch(handleFilter("mes"))}><p>Este mes</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
};
