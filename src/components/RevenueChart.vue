<template>
  <div class="w-full h-full min-h-[400px]">
    <Line v-if="chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
    <div v-else class="text-gray-400 bg-gray-50 text-sm flex items-center justify-center h-full border-2 border-dashed border-gray-200 rounded-xl">
      Nenhum dado para visualizar.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  dataset: {
    type: Array,
    required: true,
    default: () => []
  }
})

const chartData = computed(() => {
  if (!props.dataset || props.dataset.length === 0) {
    return { labels: [], datasets: [] }
  }

  const labels = props.dataset.map(row => row.Data)
  
  // Extract all keys except 'Data' and 'Meu Preço'
  const competitors = Object.keys(props.dataset[0]).filter(k => k !== 'Data' && k !== 'Meu Preço')

  // Colors mapping for dynamically assigned competitors
  const compColors = ['#9ca3af', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#fb923c']

  const datasets = [
    {
      label: 'Meu Preço',
      data: props.dataset.map(row => row['Meu Preço']),
      borderColor: '#dc2626', // Primary Red
      backgroundColor: '#dc2626',
      borderWidth: 3,
      tension: 0.4
    }
  ]

  competitors.forEach((comp, index) => {
    const color = compColors[index % compColors.length]
    datasets.push({
      label: comp,
      data: props.dataset.map(row => row[comp]),
      borderColor: color,
      backgroundColor: color,
      borderWidth: 1.5,
      tension: 0.4,
      borderDash: [5, 5]
    })
  })

  return { labels, datasets }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#4b5563' // text-gray-600
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  scales: {
    x: {
      grid: {
        color: '#f3f4f6' // gray-100
      },
      ticks: {
        color: '#6b7280' // text-gray-500
      }
    },
    y: {
      grid: {
        color: '#f3f4f6'
      },
      ticks: {
        color: '#6b7280'
      }
    }
  }
}
</script>
