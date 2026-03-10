<template>
  <div class="flex-1 flex text-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 p-6 flex flex-col shadow-sm">
      <div class="text-xl font-bold text-primaryRed border-b border-gray-100 pb-4 mb-4">
        Horizon Docs
      </div>
      <nav class="space-y-3 flex-1">
        <a href="#formatacao" class="block text-gray-700 font-medium hover:text-primaryRed transition-colors">Formatação CSV</a>
        <router-link to="/dashboard" class="block text-gray-500 hover:text-gray-800 transition-colors mt-8">
          &larr; Voltar ao Dashboard
        </router-link>
      </nav>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-10 overflow-y-auto">
      <div class="max-w-3xl">
        <h1 class="text-3xl font-bold mb-6 text-gray-900">Como formatar sua planilha</h1>
        <p class="text-gray-600 mb-8 leading-relaxed text-lg">
          Para que a inteligência artificial do Horizon possa extrair os melhores insights e para que o gráfico seja desenhado perfeitamente, o CSV/Excel deve ter a seguinte estrutura exata:
        </p>
        
        <div class="bg-white rounded-none p-6 border border-gray-200 shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b-2 border-gray-100 text-gray-700">
                <th class="pb-3 font-semibold">Data</th>
                <th class="pb-3 font-semibold">Meu Preço</th>
                <th class="pb-3 font-semibold">Concorrente A</th>
                <th class="pb-3 font-semibold">Concorrente B</th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-600">
              <tr class="border-b border-gray-100">
                <td class="py-4">2026-03-01</td>
                <td class="py-4">150</td>
                <td class="py-4">145</td>
                <td class="py-4">160</td>
              </tr>
              <tr>
                <td class="py-4">2026-03-02</td>
                <td class="py-4">155</td>
                <td class="py-4">145</td>
                <td class="py-4">150</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
</script>
