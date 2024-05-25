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
  const accountNames = accounts.map((account) => account.name);
  const accountCurrentBalances = accounts.map((account) => account.currentBalance);

  const data: Data = {
    datasets: [
      {
        label: 'Banks',
        data: accountCurrentBalances,
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
      },
    ],
    labels: accountNames,
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
