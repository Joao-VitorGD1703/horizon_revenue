<template>
  <div>
    <!-- Floating Button -->
    <button 
      @click="isOpen = true"
      class="fixed bottom-6 right-6 bg-primaryRed text-white p-4 rounded-full shadow-lg hover:shadow-red-500/50 hover:bg-red-700 transition-all z-40"
    >
      <BotIcon class="w-6 h-6" />
    </button>

    <!-- Modal -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div class="bg-white border border-gray-200 rounded-none w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col h-[80vh]">
        
        <!-- Header -->
        <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div class="flex items-center space-x-2">
            <SparklesIcon class="w-5 h-5 text-primaryRed" />
            <h3 class="font-semibold text-gray-800">AI Insights</h3>
          </div>
          <button @click="isOpen = false" class="text-gray-400 hover:text-gray-700 transition-colors">
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Chat Area -->
        <div class="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
          <div v-for="(msg, i) in messages" :key="i" class="flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
            <div 
              class="max-w-[80%] p-3 text-sm leading-relaxed shadow-sm"
              :class="msg.role === 'user' ? 'bg-primaryRed text-white rounded-2xl rounded-tr-none' : 'bg-gray-50 text-gray-800 border border-gray-200 rounded-none'"
            >
              <div v-if="msg.role === 'ai'" class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-200">
                <BotIcon class="w-5 h-5 text-primaryRed" />
                <span class="font-bold text-sm text-gray-700">Insights do Horizon AI</span>
              </div>
              <div 
                class="prose prose-sm md:prose-base max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-primaryRed prose-strong:text-gray-900 prose-ul:list-disc prose-ul:pl-5 marker:text-primaryRed prose-hr:border-gray-300 prose-hr:border-t-2 prose-hr:my-6 text-gray-700" 
                v-html="msg.content"
              ></div>
            </div>
          </div>
          <div v-if="isLoading" class="flex justify-start">
            <div class="bg-gray-100 rounded-none p-3 text-sm text-gray-500 border border-gray-200 shadow-sm">
              Analisando dados...
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 border-t border-gray-200 bg-gray-50">
          <form v-if="!isTrialUser" @submit.prevent="sendMessage" class="flex space-x-2">
            <input 
              v-model="inputRaw" 
              type="text" 
              placeholder="Pergunte sobre sua estratégia..." 
              class="flex-1 bg-white border border-gray-300 rounded-none px-4 py-2 text-sm focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed text-gray-800 transition-all"
              :disabled="isLoading"
            />
            <button 
              type="submit" 
              class="bg-primaryRed text-white p-2 text-sm rounded-none hover:bg-red-700 disabled:opacity-50 transition-colors shadow-sm"
              :disabled="!inputRaw.trim() || isLoading"
            >
              <SendIcon class="w-5 h-5" />
            </button>
          </form>
          <div v-else class="flex flex-col items-center justify-center p-2 text-center">
            <p class="text-sm text-gray-600 mb-2">
              <span class="font-bold text-gray-800">Assinatura Premium Necessária</span> para enviar mensagens e conversar com a Inteligência Artificial.
            </p>
            <button @click="handleUpgrade" class="w-full bg-primaryRed text-white p-2 text-sm font-semibold rounded-none hover:bg-red-700 transition-colors shadow-sm inline-block disabled:opacity-50" :disabled="isCheckoutLoading">
              {{ isCheckoutLoading ? 'Redirecionando...' : 'Fazer Upgrade Agora' }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bot as BotIcon, X as XIcon, Sparkles as SparklesIcon, Send as SendIcon } from 'lucide-vue-next'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { marked } from 'marked'
import { supabase } from '@/lib/supabaseClient'

const props = defineProps({
  datasetContext: {
    type: Array,
    default: () => []
  },
  isTrialUser: {
    type: Boolean,
    default: true
  }
})

const isOpen = ref(false)
const isLoading = ref(false)
const isCheckoutLoading = ref(false)
const inputRaw = ref('')

const messages = ref([
  { role: 'ai', content: 'Olá! Faça o upload dos seus dados e me pergunte sobre as melhores estratégias de precificação.' }
])

const sendMessage = async () => {
  if (!inputRaw.value.trim() || isLoading.value) return

  const userMsg = inputRaw.value
  messages.value.push({ role: 'user', content: userMsg })
  inputRaw.value = ''
  isLoading.value = true

  try {
    if (props.isTrialUser) {
      setTimeout(() => {
        messages.value.push({ 
          role: 'ai', 
          content: `### Acesso Restrito: Plano Pro Necessário
---
Para liberar o **Horizon AI** e receber análises avançadas do seu RevPAR, você precisa de uma assinatura ativa.

**Faça o upgrade agora por R$ 49,90 para desbloquear:**
* Insights ilimitados
* Análise de competidores
* Recomendações de disparo estratégico

<br>
**Clique no botão de Upgrade abaixo para prosseguir.**` 
        })
        isLoading.value = false
      }, 1000)
      return
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey || apiKey === 'coloque_sua_chave_aqui') {
      messages.value.push({ role: 'ai', content: 'Por favor, configure a sua VITE_GEMINI_API_KEY no arquivo .env na raiz do projeto para que eu possa funcionar!' });
      isLoading.value = false;
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Fast and cheap model suitable for tasks

    const dataContext = JSON.stringify(props.datasetContext)
    const prompt = `Você é um especialista em Revenue Management Hoteleiro focado na otimização do RevPAR (Revenue Per Available Room).
O usuário forneceu esta tabela de dados JSON contendo as datas, o preço atual do usuário e o preço de 2 concorrentes principais (A e B): 
${dataContext}

Pergunta correspondente a esses dados: "${userMsg}"

Você deve redigir um relatório analítico curto, altamente profissional e estruturado.
Regras de formatação (OBRIGATÓRIO):
1. Comece com um cabeçalho H3 (###) contendo um título resumo da análise.
2. Separe cada tópico ou mudança de assunto importante com uma linha horizontal (use ---).
3. Use parágrafos curtos.
4. Destaque datas e dados numéricos sempre em **negrito**.
5. Se listar sugestões ou pontos de atenção, use sempre Bullet Points.
6. Seja direto, como um verdadeiro consultor sênior de Revenue Management hoteleiro.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const formattedHtmlText = marked.parse(text)

    messages.value.push({ 
      role: 'ai', 
      content: formattedHtmlText 
    })

  } catch (error) {
    console.error("Gemini AI Error:", error);
    messages.value.push({ role: 'ai', content: `Erro ao conectar à inteligência artificial: ${error.message || 'Verifique o console para mais detalhes.'}` })
  } finally {
    isLoading.value = false
  }
}

const handleUpgrade = async () => {
  isCheckoutLoading.value = true
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session?.user?.id) {
       console.error("User is not authenticated", sessionError)
       alert("Erro de autenticação. Por favor, faça login novamente.")
       isCheckoutLoading.value = false
       return
    }

    const backendUrl = import.meta.env.VITE_STRIPE_BACKEND_URL || 'http://localhost:3000'
    const response = await fetch(`${backendUrl}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: session.user.id })
    })

    const data = await response.json()

    if (response.ok && data.url) {
      // Redirect to Stripe Checkout
      window.location.href = data.url
    } else {
      console.error("Failed to create checkout session:", data)
      alert("Erro ao criar sessão de pagamento: " + (data.error || "Tente novamente."))
    }
  } catch (err) {
    console.error("Payment request error:", err)
    alert("Erro de rede ao tentar criar o pagamento.")
  } finally {
    isCheckoutLoading.value = false
  }
}
</script>
