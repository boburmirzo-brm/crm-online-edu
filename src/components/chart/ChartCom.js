import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut , Pie, PolarArea} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



// const config = {
//   type: 'doughnut',
//   data: data,
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Doughnut Chart'
//       }
//     }
//   },
// };
function ChartCom({data,title}) {
  return <div>
    <h3>{title}</h3>
     <Pie data={data}/>
  </div>;
}

export default ChartCom