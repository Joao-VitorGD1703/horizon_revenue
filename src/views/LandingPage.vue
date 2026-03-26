<template>
  <div class="flex-1 flex flex-col bg-gray-50 text-gray-900">
    <!-- Hero Section -->
    <section class="flex flex-col items-center justify-center py-20 px-6 border-b border-gray-200 bg-white">
      <div class="text-center max-w-3xl">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 leading-tight">
          Acelere o Crescimento do seu Hotel com IA
        </h1>
        <p class="text-xl text-gray-600 mb-10 leading-relaxed">
          O Horizon Revenue utiliza inteligência artificial avançada para analisar o mercado em tempo real, garantindo que você nunca deixe dinheiro na mesa nem perca ocupação para a concorrência.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/login?tab=register" class="bg-primaryRed hover:bg-red-700 px-8 py-4 rounded-none font-semibold transition-colors text-white shadow-md text-lg">
            Criar Conta Grátis
          </router-link>
          <router-link to="/login" class="bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-none font-semibold transition-colors text-lg">
            Já sou cliente (Acessar)
          </router-link>
        </div>
      </div>
    </section>

    <!-- Como Ajudamos (Value Proposition) -->
    <section id="como-funciona" class="py-20 px-6 bg-gray-50 border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Como o Horizon Transforma sua Operação</h2>
          <p class="text-lg text-gray-600">Simplificamos a complexidade do Revenue Management em 3 passos práticos.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 border border-gray-200 shadow-sm rounded-none">
            <div class="bg-red-50 w-14 h-14 flex items-center justify-center rounded-none mb-6">
              <UploadCloudIcon class="w-7 h-7 text-primaryRed" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">1. Centralize seus Dados</h3>
            <p class="text-gray-600 leading-relaxed">
              Importe suas planilhas de preços atuais e as tarifas mapeadas dos seus concorrentes diretos com um simples arrastar e soltar.
            </p>
          </div>

          <div class="bg-white p-8 border border-gray-200 shadow-sm rounded-none">
            <div class="bg-red-50 w-14 h-14 flex items-center justify-center rounded-none mb-6">
              <LineChartIcon class="w-7 h-7 text-primaryRed" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">2. Visualize o Cenário</h3>
            <p class="text-gray-600 leading-relaxed">
              Descubra imediatamente os dias onde o seu hotel está precificado muito acima (perdendo ocupação) ou muito abaixo (perdendo receita) do mercado.
            </p>
          </div>

          <div class="bg-white p-8 border border-gray-200 shadow-sm rounded-none">
            <div class="bg-red-50 w-14 h-14 flex items-center justify-center rounded-none mb-6">
              <SparklesIcon class="w-7 h-7 text-primaryRed" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">3. Decida com IA</h3>
            <p class="text-gray-600 leading-relaxed">
              Receba recomendações exatas de ajustes de tarifa do nosso assistente de IA, treinado especificamente para maximizar seu RevPAR.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- O que fazer após criar a conta -->
    <section class="py-20 px-6 bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="md:w-1/2">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">O que você fará após criar a conta?</h2>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            Assim que acessar a plataforma, você poderá utilizar imediatamente a <strong>Geração de Gráfico de Posicionamento</strong> para analisar seu hotel.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start">
              <TrendingUpIcon class="w-6 h-6 text-primaryRed mt-1 mr-3 flex-shrink-0" />
              <div>
                <strong class="block text-gray-900">Visão Visual do Mercado</strong>
                <span class="text-gray-600 block">Descubra de forma clara e intuitiva como suas tarifas se comparam visualmente às dos seus concorrentes.</span>
              </div>
            </li>
            <li class="flex items-start">
              <LineChartIcon class="w-6 h-6 text-primaryRed mt-1 mr-3 flex-shrink-0" />
              <div>
                <strong class="block text-gray-900">Análise de Posicionamento</strong>
                <span class="text-gray-600 block">Identifique rapidamente seu posicionamento de mercado e ajuste sua estratégia com base em dados visuais reais.</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="md:w-1/2 bg-gray-50 p-8 border border-gray-200 shadow-sm rounded-none gap-4">
           <div class="h-64 w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-white">
             <LineChartIcon class="w-16 h-16 mb-4 opacity-50 text-primaryRed" />
             <span class="font-semibold text-gray-600 text-lg">Gráfico de Posicionamento</span>
             <span class="text-sm text-gray-500 mt-2">Visualize seu Hotel vs. Mercado</span>
           </div>
        </div>
      </div>
    </section>

    <!-- Agente de IA Section -->
    <section class="py-20 px-6 bg-gray-50 border-b border-gray-200">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
        <div class="md:w-1/2">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Seu Próprio Agente IA de Precificação</h2>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            Elimine as dúvidas e os achismos. Nosso <strong>Agente de Inteligência Artificial</strong> entende o seu gráfico de posicionamento e fornece estratégias de receita impecáveis.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start">
              <SparklesIcon class="w-6 h-6 text-primaryRed mt-1 mr-3 flex-shrink-0" />
              <div>
                <strong class="block text-gray-900">Sugestões Diretas de Tarifa</strong>
                <span class="text-gray-600 block">Receba recomendações exatas de qual deveria ser o seu preço para maximizar o lucro todos os dias.</span>
              </div>
            </li>
            <li class="flex items-start">
              <CheckCircleIcon class="w-6 h-6 text-primaryRed mt-1 mr-3 flex-shrink-0" />
              <div>
                <strong class="block text-gray-900">Decisões Rápidas e Seguras</strong>
                <span class="text-gray-600 block">Chegue ao melhor posicionamento de mercado de forma automática, economizando horas cruciais de análise tarifária.</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="md:w-1/2 bg-white p-8 border border-gray-200 shadow-sm rounded-none">
           <div class="h-64 w-full flex flex-col items-center justify-center border-2 border-primaryRed bg-red-50 relative overflow-hidden">
             <div class="absolute top-0 right-0 bg-primaryRed text-white text-xs font-bold px-3 py-1">IA Ativada</div>
             <SparklesIcon class="w-16 h-16 mb-4 text-primaryRed" />
             <span class="font-bold text-gray-900 text-xl text-center">Agente Horizon Revenue</span>
             <span class="text-sm text-gray-700 mt-2 text-center px-4 italic leading-relaxed">
               "Sugiro aumentar a tarifa do dia 15 em 12% devido à alta demanda do mercado local e ao seu histórico."
             </span>
           </div>
        </div>
      </div>
    </section>

    <!-- ROI Section -->
    <section class="py-20 px-6 bg-white">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">O Retorno do seu Investimento (ROI)</h2>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            Hotéis que adotaram a precificação dinâmica guiada por IA registraram resultados expressivos já nos primeiros 30 dias de uso.
          </p>
          
          <ul class="space-y-4">
            <li class="flex items-start">
              <CheckCircleIcon class="w-6 h-6 text-primaryRed mt-1 mr-3 flex-shrink-0" />
              <div>
                <strong class="block text-gray-900">Aumento de até 15% no RevPAR</strong>
                <span class="text-gray-600 block">Ajustando as diárias precisamente antes do pico de demanda.</span>
              </div>
            </li>
            <li class="flex items-start">
              <CheckCircleIcon class="w-6 h-6 text-primaryRed mt-1 mr-3 flex-shrink-0" />
              <div>
                <strong class="block text-gray-900">Redução de 80% do tempo de análise</strong>
                <span class="text-gray-600 block">O que levava horas em planilhas agora é processado em segundos pela IA.</span>
              </div>
            </li>
            <li class="flex items-start">
              <CheckCircleIcon class="w-6 h-6 text-primaryRed mt-1 mr-3 flex-shrink-0" />
              <div>
                <strong class="block text-gray-900">Recuperação de Ocupação</strong>
                <span class="text-gray-600 block">Identificação imediata de tarifas fora da realidade do mercado nos períodos de baixa.</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="bg-white p-10 border-2 border-primaryRed shadow-md rounded-none flex flex-col items-center justify-center text-center">
          <div class="bg-red-50 text-primaryRed text-sm font-bold px-4 py-1 uppercase tracking-wide mb-6">Plano Único Profissional</div>
          <div class="mb-4">
            <span class="text-5xl font-extrabold text-gray-900">R$ 49,90</span>
            <span class="text-gray-500"> / mês</span>
          </div>
          <p class="text-gray-600 mb-8">Acesso total à plataforma, análise inteligente de dados via IA e Monitoramento de Concorrentes ilimitado.</p>
          <router-link to="/login?tab=register" class="bg-primaryRed hover:bg-red-700 px-8 py-4 rounded-none font-semibold transition-colors text-white shadow-md text-lg w-full flex items-center justify-center space-x-2">
            <CreditCardIcon class="w-5 h-5" />
            <span>Criar Conta e Assinar</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { UploadCloud as UploadCloudIcon, LineChart as LineChartIcon, Sparkles as SparklesIcon, CheckCircle as CheckCircleIcon, TrendingUp as TrendingUpIcon, CreditCard as CreditCardIcon } from 'lucide-vue-next'
</script>
