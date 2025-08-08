import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const labels = [];
const dataPoints = [];

for (let i = 1; i <= 5; i++) {
  labels.push(`2025-07-0${i}`);
  dataPoints.push(150 + i); 
}

export default function LineChart({ labels, dataPoints, labelName }) {
  const data = {
    labels,
    datasets: [
      {
        label: labelName,
        data: dataPoints,
        borderColor: 'rgba(29, 161, 242, 1)',  // e.g. your accentBlue
        backgroundColor: 'rgba(29, 161, 242, 0.2)',
        fill: true,
        tension: 0.4,  // smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',  // if you want white legend text for dark mode
        },
      },
      title: {
        display: true,
        text: 'ETF Price History',
        color: '#ffffff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#cccccc', // x-axis labels color
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      y: {
        ticks: {
          color: '#cccccc',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
