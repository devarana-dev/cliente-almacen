import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllValesAction, getCountValeSalidaAction } from '../actions/valeActions';

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
                "Cerrado": count.cerrado
            })
            console.log(count);


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
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
            },
        },
        centerText: {
            display: true,
            text: count.todos || 0
        },
        doughnutlabel: {
            labels: [{
              text: '550',
              font: {
                size: 20,
                weight: 'bold'
              }
            }, {
              text: 'total'
            }]
          }
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
        }
    }]

    return (
        <div className='max-w-screen-md mx-auto'>
            <Doughnut data={data} options={options} plugins={plugins}/>
        </div>
    )
};
