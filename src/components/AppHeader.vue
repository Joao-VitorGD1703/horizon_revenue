<template>
  <header class="bg-primaryRed text-white shadow-md flex items-center justify-between px-6 py-4">
    <!-- Logo -->
    <router-link to="/" class="flex items-center space-x-3 transition-opacity hover:opacity-90">
      <div class="bg-white text-primaryRed p-1.5 shadow-sm rounded-none">
        <ActivityIcon class="w-6 h-6" />
      </div>
      <span class="text-2xl font-bold tracking-tight uppercase">Horizon Revenue</span>
    </router-link>

    <div class="flex items-center space-x-6">
      <!-- Sair da Conta (Logout) -->
      <button v-if="route.path !== '/'" @click="logout" class="text-white/90 hover:text-white transition-colors border border-red-400 hover:bg-red-700 p-2 rounded-none" title="Sair da conta">
        <LogOutIcon class="w-5 h-5" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { Activity as ActivityIcon, LogOut as LogOutIcon } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const logout = () => {
  router.push('/login')
}
</script>
