<template>
  <div class="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50 text-gray-900 min-h-[80vh]">
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
          <input v-model="formLogin.password" type="password" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all" required>
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
          <input v-model="formRegister.password" type="password" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all" required minlength="6">
        </div>
        <div>
          <label class="block mb-1 text-sm text-gray-600 font-medium">Confirmar Senha</label>
          <input v-model="formRegister.password_confirm" type="password" class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-2 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all" required minlength="6">
        </div>
        <button type="submit" :disabled="loading" class="w-full bg-primaryRed hover:bg-red-700 disabled:opacity-50 py-3 rounded-none font-medium transition-colors text-white mt-4 shadow-sm">
          {{ loading ? 'Criando Conta...' : 'Criar Conta' }}
        </button>
      </form>


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
