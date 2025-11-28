'use client';

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
  Filler,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface LineChartProps {
  title?: string;
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
  height?: number;
  className?: string;
}

const defaultOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
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
      padding: 12
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        },
        color: '#6B7280'
      }
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          size: 11
        },
        color: '#6B7280'
      }
    }
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2
    },
    point: {
      radius: 4,
      hoverRadius: 6,
      borderWidth: 2
    }
  }
};

export function LineChart({ 
  title, 
  data, 
  options, 
  height = 300, 
  className 
}: LineChartProps) {
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
          <Line data={data} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
}