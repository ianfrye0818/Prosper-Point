'use client';
import { Doughnut } from 'react-chartjs-2';
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js';

Chartjs.register(ArcElement, Tooltip, Legend);

type Data = {
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
  labels: string[];
};

export default function DoughnutChart({ accounts }: DoughnutChartProps) {
  const data: Data = {
    datasets: [
      {
        label: 'Banks',
        data: [1250, 2500, 3700],
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
      },
    ],
    labels: ['Bank1', 'Bank2', 'Bank3'],
  };
  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
