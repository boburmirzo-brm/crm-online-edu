import React from 'react'
import ChartCom from '../../../components/chart/ChartCom'
import "./Statistics.css"

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

function Statistics() {
  return (
    <div className='statistics'>
      <h3 className='global__title'>O'quv markazi Statistikasi</h3>
      <div className="statistics__container">
        <div className="statistics__item">
          <ChartCom data={major} title="Yo'nalish"/>
        </div>
        <div className="statistics__item">
          <ChartCom data={region} title="Hudud"/>
        </div>
        <div className="statistics__item">
          <ChartCom data={gender} title="Gender"/>
        </div>
      </div>
    </div>
  )
}

export default Statistics