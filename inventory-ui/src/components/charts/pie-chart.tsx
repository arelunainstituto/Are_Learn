'use client';

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
  title?: string;
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
  height?: number;
  className?: string;
}

const defaultOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
        },
        generateLabels: (chart) => {
          const data = chart.data;
          if (data.labels && data.datasets.length) {
            const dataset = data.datasets[0];
            return data.labels.map((label, i) => {
              const value = dataset.data[i] as number;
              const total = (dataset.data as number[]).reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              
              const backgroundColor = Array.isArray(dataset.backgroundColor) 
                ? dataset.backgroundColor[i] as string 
                : dataset.backgroundColor as string;
              const borderColor = Array.isArray(dataset.borderColor) 
                ? dataset.borderColor[i] as string 
                : dataset.borderColor as string;
              
              return {
                text: `${label} (${percentage}%)`,
                fillStyle: backgroundColor,
                strokeStyle: borderColor,
                lineWidth: dataset.borderWidth as number,
                hidden: false,
                index: i,
                pointStyle: 'circle'
              };
            });
          }
          return [];
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      padding: 12,
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.parsed;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        }
      }
    }
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: '#ffffff'
    }
  }
};

export function PieChart({ 
  title, 
  data, 
  options, 
  height = 300, 
  className 
}: PieChartProps) {
  const chartOptions = {
    ...defaultOptions,
    ...options
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <Pie data={data} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
}