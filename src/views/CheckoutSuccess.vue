<template>
  <div class="flex-1 flex flex-col bg-gray-50 text-gray-900">

    <!-- Hero de confirmação -->
    <section class="bg-white border-b border-gray-200 py-14 px-6">
      <div class="max-w-2xl mx-auto text-center">

        <!-- Estado: Processando -->
        <div v-if="isLoading" class="flex flex-col items-center space-y-4">
          <svg class="animate-spin h-12 w-12 text-primaryRed" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h1 class="text-3xl font-extrabold text-gray-900">Ativando sua assinatura...</h1>
          <p class="text-gray-500">Por favor, não feche esta página. Estamos confirmando seu pagamento.</p>
        </div>

        <!-- Estado: Sucesso -->
        <div v-else-if="success" class="flex flex-col items-center space-y-4">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h1 class="text-4xl font-extrabold text-gray-900">Bem-vindo ao Premium! ✦</h1>
          <p class="text-lg text-gray-600 max-w-md">Sua assinatura foi ativada com sucesso. Agora você tem acesso completo a todos os recursos do Horizon Revenue.</p>
          <p class="text-sm text-gray-400">Redirecionando para o Dashboard em instantes...</p>
        </div>

        <!-- Estado: Erro -->
        <div v-else class="flex flex-col items-center space-y-4">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-2">
            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <h1 class="text-3xl font-extrabold text-gray-900">Algo deu errado</h1>
          <p class="text-gray-600 max-w-md">{{ errorMessage }}</p>
          <button @click="router.push('/dashboard')" class="mt-4 bg-primaryRed text-white px-8 py-3 rounded-none hover:bg-red-700 transition font-semibold">
            Voltar ao Dashboard
          </button>
        </div>

      </div>
    </section>

    <!-- Conteúdo editorial: O que você desbloqueou -->
    <section class="py-16 px-6 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-900 mb-10 text-center">O que está incluído no seu plano Premium</h2>
        <div class="grid md:grid-cols-3 gap-6">

          <div class="bg-white p-6 border border-gray-200 shadow-sm">
            <div class="bg-red-50 w-12 h-12 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primaryRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Análise Comparativa Completa</h3>
            <p class="text-gray-600 text-sm leading-relaxed">Visualize graficamente sua tarifa versus múltiplos concorrentes e identifique oportunidades de receita em tempo real.</p>
          </div>

          <div class="bg-white p-6 border border-gray-200 shadow-sm">
            <div class="bg-red-50 w-12 h-12 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primaryRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">IA de Revenue Management</h3>
            <p class="text-gray-600 text-sm leading-relaxed">Seu assistente de IA analisa seus dados e gera recomendações precisas de ajuste de tarifa para maximizar seu RevPAR.</p>
          </div>

          <div class="bg-white p-6 border border-gray-200 shadow-sm">
            <div class="bg-red-50 w-12 h-12 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primaryRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Monitoramento Contínuo</h3>
            <p class="text-gray-600 text-sm leading-relaxed">Importações ilimitadas de planilhas CSV para monitorar o mercado quantas vezes precisar, sem restrições.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- Dica de como começar -->
    <section class="py-12 px-6 bg-white border-t border-gray-200">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Como aproveitar ao máximo o Horizon Revenue</h2>
        <ol class="space-y-4">
          <li class="flex items-start">
            <span class="bg-primaryRed text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 mr-4">1</span>
            <div>
              <strong class="block text-gray-900">Prepare sua planilha CSV</strong>
              <span class="text-gray-600 text-sm">Organize seus dados com as colunas: <code class="bg-gray-100 px-1 text-xs">Data</code>, <code class="bg-gray-100 px-1 text-xs">Meu Preço</code> e uma coluna para cada concorrente. Consulte a <router-link to="/docs" class="text-primaryRed hover:underline">documentação de formatação</router-link> para o formato exato.</span>
            </div>
          </li>
          <li class="flex items-start">
            <span class="bg-primaryRed text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 mr-4">2</span>
            <div>
              <strong class="block text-gray-900">Importe seus dados no Dashboard</strong>
              <span class="text-gray-600 text-sm">Arraste e solte o arquivo diretamente na área de upload do Dashboard. O gráfico é gerado automaticamente em segundos.</span>
            </div>
          </li>
          <li class="flex items-start">
            <span class="bg-primaryRed text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 mr-4">3</span>
            <div>
              <strong class="block text-gray-900">Consulte a IA para decisões estratégicas</strong>
              <span class="text-gray-600 text-sm">Clique no botão de IA no Dashboard e descreva sua situação. O assistente analisará seus dados e sugerirá ajustes de tarifa com justificativa técnica.</span>
            </div>
          </li>
        </ol>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const router = useRouter()
const isLoading = ref(true)
const success = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user?.id) {
      throw new Error('Usuário não autenticado. Faça login para validar seu pagamento.')
    }

    const { error } = await supabase
      .from('users')
      .update({ subscription_status: 'premium' })
      .eq('id', session.user.id)

    if (error) throw error

    success.value = true

    await supabase.auth.refreshSession()

    setTimeout(() => {
      router.push('/dashboard')
    }, 4000)

  } catch (err) {
    console.error(err)
    errorMessage.value = err.message || 'Ocorreu um erro ao atualizar seu status. Entre em contato com o suporte.'
  } finally {
    isLoading.value = false
  }
})
</script>
