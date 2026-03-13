<template>
  <div class="flex-1 flex text-gray-900 min-h-screen">

    <!-- Coluna esquerda: Conteúdo editorial -->
    <div class="hidden lg:flex flex-col justify-between w-[55%] bg-gray-900 p-12 text-white">
      <div>
        <div class="text-2xl font-extrabold text-primaryRed mb-2 tracking-tight">Horizon Revenue</div>
        <p class="text-gray-400 text-sm">Inteligência artificial para Revenue Management hoteleiro</p>
      </div>

      <div class="flex-1 flex flex-col justify-center py-12 space-y-10">
        <!-- Destaque principal -->
        <div>
          <h2 class="text-3xl font-extrabold mb-4 leading-tight">
            Tome decisões de tarifa com base em dados reais, não em intuição.
          </h2>
          <p class="text-gray-400 leading-relaxed">
            O Horizon Revenue analisa suas tarifas e as dos seus concorrentes lado a lado, e entrega recomendações precisas de ajuste de preço geradas por inteligência artificial — em segundos.
          </p>
        </div>

        <!-- Benefícios -->
        <ul class="space-y-5">
          <li class="flex items-start">
            <div class="bg-primaryRed w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <strong class="block text-white">Análise visual de concorrentes</strong>
              <span class="text-gray-400 text-sm">Importe sua planilha CSV e veja instantaneamente um gráfico comparativo entre sua tarifa e até N concorrentes.</span>
            </div>
          </li>
          <li class="flex items-start">
            <div class="bg-primaryRed w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <strong class="block text-white">IA treinada para hotelaria</strong>
              <span class="text-gray-400 text-sm">Nosso assistente de IA entende RevPAR, sazonalidade e elasticidade de preço — e aplica esses conceitos diretamente na sua análise.</span>
            </div>
          </li>
          <li class="flex items-start">
            <div class="bg-primaryRed w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <strong class="block text-white">Decisões em segundos, não horas</strong>
              <span class="text-gray-400 text-sm">O que levava horas de análise manual em planilhas agora é processado automaticamente para você agir rápido.</span>
            </div>
          </li>
        </ul>

        <!-- Estatística de impacto -->
        <div class="border border-gray-700 bg-gray-800 p-6">
          <div class="text-4xl font-extrabold text-primaryRed mb-1">+15%</div>
          <div class="text-white font-semibold mb-1">de aumento médio no RevPAR</div>
          <div class="text-gray-400 text-sm">em hotéis que adotaram precificação dinâmica guiada por IA nos primeiros 30 dias de uso.</div>
        </div>
      </div>

      <div class="text-gray-600 text-xs">
        © 2026 Horizon Revenue — Todos os direitos reservados
      </div>
    </div>

    <!-- Coluna direita: Formulário -->
    <div class="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
      <div class="bg-white p-8 rounded-none w-full max-w-md shadow-lg border border-gray-200">

        <!-- Tabs -->
        <div class="flex mb-8 border-b border-gray-200">
          <button
            @click="isLogin = true"
            :class="isLogin ? 'border-primaryRed text-primaryRed' : 'border-transparent text-gray-500 hover:text-gray-700'"
            class="flex-1 pb-4 text-center font-bold border-b-2 transition-colors"
          >
            Entrar
          </button>
          <button
            @click="isLogin = false"
            :class="!isLogin ? 'border-primaryRed text-primaryRed' : 'border-transparent text-gray-500 hover:text-gray-700'"
            class="flex-1 pb-4 text-center font-bold border-b-2 transition-colors"
          >
            Criar Conta
          </button>
        </div>

        <!-- Messages -->
        <div v-if="error" class="mb-4 bg-red-50 border border-primaryRed text-primaryRed px-4 py-3 text-sm">
          {{ error }}
        </div>
        <div v-if="success" class="mb-4 bg-green-50 border border-green-500 text-green-700 px-4 py-3 text-sm">
          {{ success }}
        </div>

        <!-- Formulário de Login -->
        <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block mb-1 text-sm text-gray-600 font-medium">Email</label>
            <input v-model="formLogin.email" type="email" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all" required>
          </div>
          <div>
            <label class="block mb-1 text-sm text-gray-600 font-medium">Senha</label>
            <div class="relative">
              <input v-model="formLogin.password" :type="showLoginPassword ? 'text' : 'password'" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 pr-10 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all" required>
              <button type="button" @click="showLoginPassword = !showLoginPassword" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg v-if="!showLoginPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-primaryRed hover:bg-red-700 disabled:opacity-50 py-3 rounded-none font-medium transition-colors text-white mt-4 shadow-sm">
            {{ loading ? 'Entrando...' : 'Acessar Dashboard' }}
          </button>
        </form>

        <!-- Formulário de Cadastro -->
        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block mb-1 text-sm text-gray-600 font-medium">Nome Completo</label>
            <input v-model="formRegister.name" type="text" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all" required>
          </div>
          <div>
            <label class="block mb-1 text-sm text-gray-600 font-medium">Nome do Hotel/Propriedade</label>
            <input v-model="formRegister.hotel_name" type="text" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all">
          </div>
          <div>
            <label class="block mb-1 text-sm text-gray-600 font-medium">Email</label>
            <input v-model="formRegister.email" type="email" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all" required>
          </div>
          <div>
            <label class="block mb-1 text-sm text-gray-600 font-medium">Senha</label>
            <div class="relative">
              <input v-model="formRegister.password" :type="showRegisterPassword ? 'text' : 'password'" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 pr-10 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all" required minlength="6">
              <button type="button" @click="showRegisterPassword = !showRegisterPassword" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg v-if="!showRegisterPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm text-gray-600 font-medium">Confirmar Senha</label>
            <div class="relative">
              <input v-model="formRegister.password_confirm" :type="showRegisterConfirmPassword ? 'text' : 'password'" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 pr-10 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all" required minlength="6">
              <button type="button" @click="showRegisterConfirmPassword = !showRegisterConfirmPassword" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg v-if="!showRegisterConfirmPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-primaryRed hover:bg-red-700 disabled:opacity-50 py-3 rounded-none font-medium transition-colors text-white mt-4 shadow-sm">
            {{ loading ? 'Criando Conta...' : 'Criar Conta' }}
          </button>
        </form>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const router = useRouter()
const route = useRoute()

// Se a URL pedir ?tab=register (ex: Vindo da Landing Page), abre direto a aba de cadastro
const isLogin = ref(route.query.tab !== 'register')
const loading = ref(false)
const error = ref('')
const success = ref('')

const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showRegisterConfirmPassword = ref(false)

const formLogin = ref({
  email: '',
  password: ''
})

const formRegister = ref({
  name: '',
  hotel_name: '',
  email: '',
  password: '',
  password_confirm: ''
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: formLogin.value.email,
      password: formLogin.value.password,
    })

    if (authError) throw authError
    
    // Login com sucesso
    router.push('/dashboard')
  } catch (err) {
    if (err.message.includes('Invalid login credentials')) {
      error.value = 'Email ou senha inválidos.'
    } else {
      error.value = err.message || 'Erro ao fazer login.'
    }
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    if (formRegister.value.password !== formRegister.value.password_confirm) {
      error.value = 'As senhas não coincidem.'
      loading.value = false
      return
    }

    // 1. Cria usuário na Autenticação Nativa do Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formRegister.value.email,
      password: formRegister.value.password,
    })

    if (authError) throw authError

    // 2. Insere os dados extras na tabela customizada 'users' do banco 
    // Mapeando a estrutura SQL fornecida (name, hotel_name, password_hash)
    if (authData.user) {
      const { error: dbError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id, // Vincula o UUID nativo do Auth com o do Public.users
          email: formRegister.value.email,
          name: formRegister.value.name,
          hotel_name: formRegister.value.hotel_name,
          password_hash: 'HASHED_BY_SUPABASE_AUTH', // Não devemos guardar senhas em texto puro na tabela publica, o Supabase já lida com isso.
          subscription_status: 'trial'
        }])

      if (dbError) {
        console.error("Erro ao inserir em public.users:", dbError)
      }
    }
    
    // O usuário criou a conta (estará como 'trial' na tabela).
    // Agora vai direto pro Dashboard provar o valor (Freemium)
    success.value = 'Conta criada com sucesso! Redirecionando...'
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
    
  } catch (err) {
    if (err.message.includes('User already registered')) {
      error.value = 'Este email já está cadastrado.'
    } else {
      error.value = err.message || 'Erro ao criar a conta.'
    }
  } finally {
    loading.value = false
  }
}


</script>
