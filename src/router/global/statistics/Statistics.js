import React from 'react'
import ChartCom from '../../../components/chart/ChartCom'
import "./Statistics.css"

import { Chart as 
  ChartJS, 
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import { Doughnut , Pie, PolarArea, Bar} from 'react-chartjs-2';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend);

const major = {
  labels: ['IT', 'English', 'Russian', 'DTM'],
  datasets: [
    {
      label: "O'quvchi",
      data: [212, 320, 159, 201],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const region = {
  labels: ['Namangan shahar', 'Pop', 'Uchqurgon', 'Yangi qurgon', 'Chust', 'Chortoq', "Uychi", "To'raqo'rg'on"],
  datasets: [
    {
      label: "O'quvchi",
      data: [212, 320, 159, 201, 56, 29, 77, 200],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',  
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const gender = {
  labels: ["O'g'il bola", "Qiz bola"],
  datasets: [
    {
      label: "O'quvchi",
      data: [712, 554],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',  
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Algoritm',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const dataBar = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [840_000, 1_350_000, 2_100_000, 3_460_000, 5_600_000, 8_600_000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  
  ],
};
function Statistics() {
  return (
    <div className='statistics'>
        <div className="get__navbar get__group-navbar">
        <h3>O'quv markazi Statistikasi</h3>
      </div>
      <div className="statistics__container">
        <div className="statistics__item">
          <ChartCom data={major} options={options} title="Yo'nalish"/>
        </div>
        <div className="statistics__item">
          <ChartCom data={region} options={options} title="Hudud"/>
        </div>
        <div className="statistics__item">
          <ChartCom data={gender} options={options} title="Gender"/>
        </div>
      </div>
        <div className="">
          <Bar options={options} data={dataBar} />;
        </div>
    </div>
  )
}

export default Statistics