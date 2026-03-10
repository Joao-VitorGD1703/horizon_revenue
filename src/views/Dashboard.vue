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
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Comparativo de Preços</h2>
          <router-link to="/docs" class="text-gray-500 hover:text-primaryRed text-sm font-medium transition-colors">
            Formatação do CSV &rarr;
          </router-link>
        </div>
        <div class="flex-1">
          <RevenueChart :dataset="revenueData" class="h-full min-h-[400px]" />
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
                <th class="p-3 font-semibold text-gray-500">Concorrente A</th>
                <th class="p-3 font-semibold text-blue-500">Concorrente B</th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-600">
              <tr 
                v-for="(row, index) in revenueData" 
                :key="index"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="p-3 font-medium">{{ row.Data }}</td>
                <td class="p-3 font-bold text-gray-900">R$ {{ row['Meu Preço'] }}</td>
                <td class="p-3">R$ {{ row['Concorrente A'] }}</td>
                <td class="p-3">R$ {{ row['Concorrente B'] }}</td>
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
import { ref, onMounted } from 'vue'
import RevenueChart from '@/components/RevenueChart.vue'
import UploadDropzone from '@/components/UploadDropzone.vue'
import AiInsightsModal from '@/components/AiInsightsModal.vue'
import { supabase } from '@/lib/supabaseClient'

const revenueData = ref([])
const isTrialUser = ref(true)

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
}
</script>
