import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllValesAction } from '../actions/valeActions';

export default function Home() {

    const dispatch = useDispatch()
    const { vales, isLoading } = useSelector( state => state.vales)
    const [ dataValues, setDataValues ] = useState({})
    ChartJS.register(ArcElement, Tooltip, Legend);
    

    useEffect(() => {
        if(vales.length ===  0 || !vales){
            dispatch(getAllValesAction())
        }else{
            const result = vales.reduce(( prev, curr) => (( prev[curr.statusVale] = prev[curr.statusVale]  +1 || 1 ), prev), {} )
            setDataValues({
                ...(result[1] ? {'Sin Entregar': result[1] } : null),
                ...(result[2] ? {'Parcial Abierto': result[2] } : null),
                ...(result[3] ? {'Parcial Cerrado': result[3] } : null),
                ...(result[4] ? {'Entregado': result[4] } : null),
                ...(result[5] ? {'Cancelado': result[5] } : null),
                ...(result[7] ? {'Cerrado': result[7] } : null),
            })
        }

    }, [vales])

    const data = {
        labels: Object.keys(dataValues),
        datasets: [
            {
                label: '# de vales',
                data: vales ? Object.values(vales.reduce(( prev, curr) => (( prev[curr.statusVale] = prev[curr.statusVale] + 1 || 1 ), prev), {})) : [],
                backgroundColor: [
                    'rgba(0, 160, 93, 0.8)',
                    'rgba(233, 196, 20, 0.8)',
                    'rgba(251, 84, 37, 0.8)',
                    'rgba(86, 115, 155, 0.8)',
                    'rgba(234, 31, 3, 0.8)',
                    'rgba(255, 107, 44, 0.8)',
                ],
                borderColor: [
                    'rgba(0, 160, 93, 1)',
                    'rgba(233, 196, 20, 1)',
                    'rgba(251, 84, 37, 1)',
                    'rgba(86, 115, 155, 1)',
                    'rgba(234, 31, 3, 1)',
                    'rgba(255, 107, 44, 1)',
                ],
                borderWidth: 1,
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
            text: vales.length
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
