import React from 'react';
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
import { Line } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
import { memberChartDataState, MemberChartData } from '../../recoil/memberAtoms';
import { useMemberChartData } from '../../hooks/useMemberChartData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Member Signup Chart',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Signup Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Member Count',
      },
      beginAtZero: true,
    },
  },
};

export function MemberChart() {
    useMemberChartData(); // This hook will fetch and set the chart data
  const memberChartData = useRecoilValue(memberChartDataState);

  const labels = memberChartData.map(item => item.signup_date);
  const datasets = [
    {
      label: 'Member Count',
      data: memberChartData.map(item => item.member_count),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ];

  const data = {
    labels,
    datasets,
  };

  return <Line options={options} data={data} />;
}
