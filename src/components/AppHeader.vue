<template>
  <header class="bg-primaryRed text-white shadow-md flex items-center justify-between px-6 py-4">
    <!-- Logo -->
    <router-link to="/" class="flex items-center space-x-3 transition-opacity hover:opacity-90 w-1/3">
      <div class="bg-white text-primaryRed p-1.5 shadow-sm rounded-none">
        <ActivityIcon class="w-6 h-6" />
      </div>
      <span class="text-2xl font-bold tracking-tight uppercase hidden md:inline-block">Horizon Revenue</span>
    </router-link>

    <!-- Center Info (User Name & Hotel) -->
    <div class="flex-1 flex justify-center text-center w-1/3">
      <div v-if="route.path === '/dashboard' && (userName || hotelName)" class="flex items-center space-x-2 text-white">
        <span v-if="userName" class="text-base font-bold">{{ userName }}</span>
        <span v-if="userName && hotelName" class="text-red-300">/</span>
        <span v-if="hotelName" class="text-base text-red-100 font-medium">{{ hotelName }}</span>
      </div>
    </div>

    <!-- Right Actions -->
    <div class="flex items-center space-x-4 justify-end w-1/3">
      <!-- Configurações -->
      <router-link v-if="isLoggedIn && route.path !== '/'" to="/settings" class="text-white/90 hover:text-white transition-colors border border-transparent hover:border-red-400 p-2 rounded-none" title="Configurações">
        <SettingsIcon class="w-5 h-5" />
      </router-link>

      <!-- Sair da Conta (Logout) -->
      <button v-if="isLoggedIn && route.path !== '/'" @click="logout" class="text-white/90 hover:text-white transition-colors border border-red-400 hover:bg-red-700 p-2 rounded-none" title="Sair da conta">
        <LogOutIcon class="w-5 h-5" />
      </button>
      <button v-else-if="route.path !== '/' && !isLoggedIn" @click="logout" class="text-white/90 hover:text-white transition-colors border border-red-400 hover:bg-red-700 p-2 rounded-none" title="Sair da conta">
        <LogOutIcon class="w-5 h-5" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Activity as ActivityIcon, LogOut as LogOutIcon, Settings as SettingsIcon } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const router = useRouter()
const route = useRoute()

const userName = ref('')
const hotelName = ref('')
const isLoggedIn = ref(false)
const isTrialUser = ref(false)

const fetchUser = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session?.user?.id) {
    isLoggedIn.value = true
    const { data: userData, error } = await supabase
      .from('users')
      .select('name, hotel_name, subscription_status')
      .eq('id', session.user.id)
      .single()

    if (!error && userData) {
      userName.value = userData.name || ''
      hotelName.value = userData.hotel_name || ''
      // Só não é trial se for garantidamente 'premium'
      isTrialUser.value = userData.subscription_status !== 'premium'
    }
  } else {
    isLoggedIn.value = false
    isTrialUser.value = false
    userName.value = ''
    hotelName.value = ''
  }
}

onMounted(() => {
  fetchUser()

  supabase.auth.onAuthStateChange((_, session) => {
    if (session?.user) {
      fetchUser()
    } else {
      isLoggedIn.value = false
      isTrialUser.value = false
      userName.value = ''
      hotelName.value = ''
    }
  })
})

const logout = async () => {
  await supabase.auth.signOut()
  isLoggedIn.value = false
  isTrialUser.value = false
  userName.value = ''
  hotelName.value = ''
  router.push('/login')
}
</script>
