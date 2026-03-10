<template>
  <div class="min-h-screen flex flex-col text-gray-900 bg-gray-50">
    <AppHeader />
    <main class="flex-1 flex flex-col">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>
