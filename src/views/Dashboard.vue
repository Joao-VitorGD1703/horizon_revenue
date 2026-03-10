<template>
  <div class="flex-1 p-6 flex flex-col items-center w-full">
    <div class="w-[80%]">
      <!-- Top actions & Ad Banner -->
      <div class="flex flex-col mb-6">
        <div class="flex justify-start mb-4">
          <UploadDropzone @data-parsed="handleDataParsed" />
        </div>
      </div>

      <!-- Main Chart Area -->
      <div class="bg-white p-6 border border-gray-200 shadow-sm w-full min-h-[500px] flex flex-col mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 class="text-xl font-bold text-gray-800">Comparativo de Preços</h2>
          
          <!-- Month View Pagination Controls -->
          <div v-if="revenueData.length > 0" class="flex flex-1 justify-center items-center space-x-4">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 0"
              class="px-3 py-1 text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-none shadow-sm transition-colors"
            >
              &larr; Anterior
            </button>
            <span class="text-sm font-medium text-gray-600 min-w-[180px] text-center">
              {{ periodLabel }}
            </span>
            <button 
              @click="nextPage" 
              :disabled="(currentPage + 1) * 30 >= revenueData.length"
              class="px-3 py-1 text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-none shadow-sm transition-colors"
            >
              Próximo &rarr;
            </button>
          </div>

          <router-link to="/docs" class="text-gray-500 hover:text-primaryRed text-sm font-medium transition-colors whitespace-nowrap">
            Formatação do CSV &rarr;
          </router-link>
        </div>
        <div class="flex-1">
          <RevenueChart :dataset="paginatedChartData" class="h-full min-h-[400px]" />
        </div>
      </div>

      <!-- Data Table Area -->
      <div v-if="revenueData.length > 0" class="bg-white p-6 border border-gray-200 shadow-sm w-full flex flex-col">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Dados Brutos</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-max">
            <thead>
              <tr class="border-b-2 border-gray-100 text-gray-700 bg-gray-50">
                <th class="p-3 font-semibold whitespace-nowrap">Data</th>
                <th class="p-3 font-semibold text-primaryRed">Meu Preço</th>
                <th v-for="comp in competitors" :key="comp" class="p-3 font-semibold text-gray-500">{{ comp }}</th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-600">
              <tr 
                v-for="(row, index) in revenueData" 
                :key="index"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="p-3 font-medium">{{ row.Data }}</td>
                <td class="p-3 font-bold" :class="getPriceClass(row)">R$ {{ row['Meu Preço'] }}</td>
                <td v-for="comp in competitors" :key="comp" class="p-3">R$ {{ row[comp] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <AiInsightsModal :datasetContext="revenueData" :isTrialUser="isTrialUser" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import RevenueChart from '@/components/RevenueChart.vue'
import UploadDropzone from '@/components/UploadDropzone.vue'
import AiInsightsModal from '@/components/AiInsightsModal.vue'
import { supabase } from '@/lib/supabaseClient'

const revenueData = ref([])
const isTrialUser = ref(true)

// Pagination State
const currentPage = ref(0)
const itemsPerPage = 30

const paginatedChartData = computed(() => {
  const start = currentPage.value * itemsPerPage
  const end = start + itemsPerPage
  return revenueData.value.slice(start, end)
})

const periodLabel = computed(() => {
  if (paginatedChartData.value.length === 0) return ''
  const first = paginatedChartData.value[0].Data
  const last = paginatedChartData.value[paginatedChartData.value.length - 1].Data
  return `${first} a ${last}`
})

const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--
}

const nextPage = () => {
  if ((currentPage.value + 1) * itemsPerPage < revenueData.value.length) {
    currentPage.value++
  }
}

const competitors = computed(() => {
  if (revenueData.value.length === 0) return []
  return Object.keys(revenueData.value[0]).filter(k => k !== 'Data' && k !== 'Meu Preço')
})

const getPriceClass = (row) => {
  const myPrice = Number(row['Meu Preço'])
  if (isNaN(myPrice)) return 'text-gray-900'

  const compPrices = competitors.value.map(c => Number(row[c])).filter(p => !isNaN(p))
  if (compPrices.length === 0) return 'text-gray-900'

  const avgPrice = compPrices.reduce((a, b) => a + b, 0) / compPrices.length
  const percentDiff = (myPrice - avgPrice) / avgPrice

  if (percentDiff > 0.20) {
    return 'text-blue-600'
  } else if (percentDiff < -0.15) {
    return 'text-red-600'
  } else {
    return 'text-green-600'
  }
}

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session?.user?.id) {
    const { data: userData, error } = await supabase
      .from('users')
      .select('subscription_status')
      .eq('id', session.user.id)
      .single()

    if (!error && userData) {
      isTrialUser.value = userData.subscription_status !== 'premium' // Só não é trial se for estritamente 'premium'
    } else {
      isTrialUser.value = true
    }
  }
})

const handleDataParsed = (data) => {
  revenueData.value = data
  currentPage.value = 0 // Resetar para a primeira página (primeiro mês) ao subir novo CSV
}
</script>
