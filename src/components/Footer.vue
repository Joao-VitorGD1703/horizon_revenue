<template>
  <footer class="bg-gray-900 text-gray-300 py-8 border-t border-gray-800 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Logo / Brand -->
        <div class="flex items-center space-x-2 mb-4 md:mb-0">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
            <span class="text-white font-bold text-sm">HR</span>
          </div>
          <span class="text-xl font-bold text-white tracking-tight">Horizon Revenue</span>
        </div>

        <!-- Links / Info -->
        <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
          <p>© {{ new Date().getFullYear() }} Horizon Revenue. Todos os direitos reservados.</p>
        </div>

        <!-- Contact Email -->
        <div class="mt-4 md:mt-0 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a href="mailto:techflowdigitallmtd@gmail.com" class="hover:text-white transition-colors">
            techflowdigitallmtd@gmail.com
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>
