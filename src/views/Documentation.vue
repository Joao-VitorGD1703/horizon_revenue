<template>
  <div class="flex-1 flex text-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 p-6 flex flex-col shadow-sm sticky top-0 h-screen overflow-y-auto">
      <div class="text-xl font-bold text-primaryRed border-b border-gray-100 pb-4 mb-4">
        Horizon Docs
      </div>
      <nav class="space-y-2 flex-1 text-sm">
        <a href="#formatacao" class="block text-gray-700 font-medium hover:text-primaryRed transition-colors py-1">Formatação do CSV</a>
        <a href="#colunas" class="block text-gray-600 hover:text-primaryRed transition-colors py-1 pl-3">Colunas obrigatórias</a>
        <a href="#exemplo" class="block text-gray-600 hover:text-primaryRed transition-colors py-1 pl-3">Exemplo de arquivo</a>
        <a href="#porque-csv" class="block text-gray-700 font-medium hover:text-primaryRed transition-colors py-1 mt-2">Por que usar CSV?</a>
        <a href="#boas-praticas" class="block text-gray-700 font-medium hover:text-primaryRed transition-colors py-1">Boas práticas</a>
        <a href="#faq" class="block text-gray-700 font-medium hover:text-primaryRed transition-colors py-1">Perguntas frequentes</a>
        <a href="#estrategia" class="block text-gray-700 font-medium hover:text-primaryRed transition-colors py-1">Estratégia de preços</a>
        <router-link to="/dashboard" class="block text-gray-400 hover:text-gray-700 transition-colors mt-8 py-1">
          ← Voltar ao Dashboard
        </router-link>
      </nav>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-10 overflow-y-auto">
      <div class="max-w-3xl">

        <!-- Intro -->
        <h1 class="text-3xl font-bold mb-4 text-gray-900">Documentação do Horizon Revenue</h1>
        <p class="text-gray-600 mb-10 leading-relaxed text-lg">
          Aprenda como importar, formatar e interpretar seus dados de precificação para extrair o máximo de valor da análise de IA do Horizon Revenue.
        </p>

        <!-- Seção 1: Formatação -->
        <section id="formatacao" class="mb-14 scroll-mt-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-100 pb-3">Formatação do CSV</h2>
          <p class="text-gray-600 mb-6 leading-relaxed">
            O Horizon Revenue aceita arquivos no formato <strong>CSV (Comma-Separated Values)</strong> exportados diretamente de planilhas como Microsoft Excel, Google Sheets ou LibreOffice Calc. A estrutura do arquivo precisa seguir um padrão específico para que a inteligência artificial consiga interpretar corretamente os dados.
          </p>

          <h3 id="colunas" class="text-lg font-bold text-gray-900 mb-3 scroll-mt-8">Colunas obrigatórias</h3>
          <div class="bg-white rounded-none p-6 border border-gray-200 shadow-sm mb-6">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="border-b-2 border-gray-100 text-gray-700">
                  <th class="pb-3 pr-6 font-semibold">Coluna</th>
                  <th class="pb-3 pr-6 font-semibold">Formato</th>
                  <th class="pb-3 font-semibold">Descrição</th>
                </tr>
              </thead>
              <tbody class="text-gray-600">
                <tr class="border-b border-gray-100">
                  <td class="py-3 pr-6 font-mono text-primaryRed font-semibold">Data</td>
                  <td class="py-3 pr-6"><code class="bg-gray-100 px-2 py-0.5 rounded text-xs">AAAA-MM-DD</code></td>
                  <td class="py-3">Data da tarifa no formato ISO. Ex: <code class="bg-gray-50 px-1 text-xs">2026-03-15</code></td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="py-3 pr-6 font-mono text-primaryRed font-semibold">Meu Preço</td>
                  <td class="py-3 pr-6"><code class="bg-gray-100 px-2 py-0.5 rounded text-xs">número</code></td>
                  <td class="py-3">Sua tarifa praticada naquela data. Use ponto como separador decimal.</td>
                </tr>
                <tr>
                  <td class="py-3 pr-6 font-mono text-gray-500 font-semibold">Concorrente X</td>
                  <td class="py-3 pr-6"><code class="bg-gray-100 px-2 py-0.5 rounded text-xs">número</code></td>
                  <td class="py-3">Tarifa do concorrente naquela data. Você pode ter quantas colunas de concorrentes quiser.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="exemplo" class="text-lg font-bold text-gray-900 mb-3 scroll-mt-8">Exemplo de arquivo</h3>
          <div class="bg-gray-900 rounded-none p-4 mb-4">
            <pre class="text-green-400 text-sm overflow-x-auto font-mono leading-relaxed">Data,Meu Preço,Hotel Vizinho,Pousada Central
2026-03-01,150,145,160
2026-03-02,155,145,150
2026-03-03,180,170,175
2026-03-04,120,140,135
2026-03-05,200,195,210</pre>
          </div>
          <p class="text-gray-500 text-sm">💡 Dica: Exporte diretamente do Excel clicando em <strong>Arquivo → Salvar como → CSV UTF-8</strong>.</p>
        </section>

        <!-- Seção 2: Por que CSV -->
        <section id="porque-csv" class="mb-14 scroll-mt-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-100 pb-3">Por que usar CSV?</h2>
          <p class="text-gray-600 mb-4 leading-relaxed">
            O CSV é o formato mais universal e compatível para intercâmbio de dados entre sistemas. Ao contrário de formatos proprietários como <code>.xlsx</code>, o CSV pode ser aberto, editado e exportado por praticamente qualquer ferramenta — desde o mais simples editor de texto até sistemas de Revenue Management avançados.
          </p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-green-50 border border-green-200 p-4">
              <h4 class="font-bold text-green-800 mb-2">✓ Vantagens</h4>
              <ul class="text-green-700 text-sm space-y-1">
                <li>Compatível com Excel, Google Sheets e Calc</li>
                <li>Leve e rápido de processar</li>
                <li>Sem dependência de software específico</li>
                <li>Fácil de automatizar e integrar</li>
              </ul>
            </div>
            <div class="bg-blue-50 border border-blue-200 p-4">
              <h4 class="font-bold text-blue-800 mb-2">📌 Exportando do Google Sheets</h4>
              <ol class="text-blue-700 text-sm space-y-1">
                <li>1. Abra a planilha no Google Sheets</li>
                <li>2. Clique em <strong>Arquivo → Fazer download</strong></li>
                <li>3. Escolha <strong>Valores separados por vírgulas (.csv)</strong></li>
                <li>4. Faça o upload no Horizon Revenue</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- Seção 3: Boas práticas -->
        <section id="boas-praticas" class="mb-14 scroll-mt-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-100 pb-3">Boas práticas de coleta de dados</h2>
          <p class="text-gray-600 mb-6 leading-relaxed">
            A qualidade da análise depende diretamente da qualidade dos dados inseridos. Seguir estas práticas garante que a IA do Horizon Revenue produza recomendações precisas e acionáveis.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start">
              <div class="bg-red-50 w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                <svg class="w-4 h-4 text-primaryRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <strong class="block text-gray-900">Colete dados dos concorrentes diariamente</strong>
                <span class="text-gray-600 text-sm">O Horizon Revenue é mais eficaz quando os dados são coletados com a mesma frequência. Idealmente, registre as tarifas toda manhã antes das 10h, quando os hotéis costumam atualizar os preços para o dia.</span>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-red-50 w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                <svg class="w-4 h-4 text-primaryRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <strong class="block text-gray-900">Compare apartamentos equivalentes</strong>
                <span class="text-gray-600 text-sm">Sempre compare o mesmo tipo de quarto entre os concorrentes. Uma suíte master do seu hotel vs. um quarto standard do concorrente não é uma comparação justa e distorce a análise de IA.</span>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-red-50 w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                <svg class="w-4 h-4 text-primaryRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <strong class="block text-gray-900">Mantenha consistência nos nomes dos concorrentes</strong>
                <span class="text-gray-600 text-sm">Use sempre o mesmo nome para cada concorrente nas diferentes planilhas (ex: "Hotel Alpha" sempre, nunca "Hotel Alpha" em um mês e "H. Alpha" em outro). Isso garante que o histórico seja lido corretamente.</span>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-red-50 w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                <svg class="w-4 h-4 text-primaryRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <strong class="block text-gray-900">Inclua dados de períodos de alta e baixa temporada</strong>
                <span class="text-gray-600 text-sm">A IA produz insights mais robustos quando tem dados de diferentes períodos de demanda. Quanto mais histórico você fornecer, mais precisas serão as recomendações de ajuste de tarifa.</span>
              </div>
            </li>
          </ul>
        </section>

        <!-- Seção 4: FAQ -->
        <section id="faq" class="mb-14 scroll-mt-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-100 pb-3">Perguntas frequentes</h2>
          <div class="space-y-4">

            <details class="bg-white border border-gray-200 p-5 group">
              <summary class="font-semibold text-gray-900 cursor-pointer select-none flex justify-between items-center">
                Quantos concorrentes posso monitorar?
                <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                No plano Premium, não há limite. Você pode adicionar quantas colunas de concorrentes precisar. O gráfico se adapta automaticamente e a IA considera todos eles na análise. Recomendamos monitorar entre 3 e 8 concorrentes diretos para análises mais focadas.
              </p>
            </details>

            <details class="bg-white border border-gray-200 p-5 group">
              <summary class="font-semibold text-gray-900 cursor-pointer select-none flex justify-between items-center">
                Posso importar planilhas do Excel (.xlsx) diretamente?
                <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                O sistema atualmente processa arquivos CSV. Para usar uma planilha Excel, exporte-a em formato CSV antes de fazer o upload: no Excel, use <strong>Arquivo → Salvar como → CSV UTF-8 (delimitado por vírgulas)</strong>. O processo leva menos de 30 segundos.
              </p>
            </details>

            <details class="bg-white border border-gray-200 p-5 group">
              <summary class="font-semibold text-gray-900 cursor-pointer select-none flex justify-between items-center">
                O que as cores na tabela de dados significam?
                <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                Na tabela de dados brutos do Dashboard, a coluna "Meu Preço" é colorida de acordo com sua posição em relação à média dos concorrentes:
              </p>
              <ul class="mt-2 space-y-1 text-sm">
                <li><span class="text-blue-600 font-semibold">Azul</span> — Sua tarifa está mais de 20% acima da média. Risco de perder ocupação.</li>
                <li><span class="text-red-600 font-semibold">Vermelho</span> — Sua tarifa está mais de 15% abaixo da média. Você pode estar deixando receita na mesa.</li>
                <li><span class="text-green-600 font-semibold">Verde</span> — Sua tarifa está competitiva, dentro da faixa saudável de mercado.</li>
              </ul>
            </details>

            <details class="bg-white border border-gray-200 p-5 group">
              <summary class="font-semibold text-gray-900 cursor-pointer select-none flex justify-between items-center">
                Meus dados de tarifa ficam salvos no sistema?
                <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                Atualmente, os dados são processados localmente no seu navegador durante a sessão. Ao fechar a aba ou fazer logout, os dados não persistem. Recomendamos manter sua planilha CSV organizada e atualizada para importar sempre que necessário.
              </p>
            </details>

          </div>
        </section>

        <!-- Seção 5: Estratégia de preços -->
        <section id="estrategia" class="mb-10 scroll-mt-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-100 pb-3">Conceitos de estratégia de preços</h2>
          <p class="text-gray-600 mb-6 leading-relaxed">
            Para interpretar melhor as recomendações da IA, é importante entender os conceitos fundamentais de Revenue Management hoteleiro.
          </p>

          <div class="space-y-4">
            <div class="bg-white border border-gray-200 p-5 shadow-sm">
              <h4 class="font-bold text-gray-900 mb-2">RevPAR — Receita por Apartamento Disponível</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                O RevPAR (Revenue Per Available Room) é a principal métrica de eficiência financeira de um hotel. Calculado como <strong>Diária Média × Taxa de Ocupação</strong>, ele captura a performance combinada de ocupação e preço. O objetivo do Horizon Revenue é maximizar o RevPAR, não apenas a ocupação ou o preço isoladamente.
              </p>
            </div>
            <div class="bg-white border border-gray-200 p-5 shadow-sm">
              <h4 class="font-bold text-gray-900 mb-2">Precificação Dinâmica</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                Ao contrário de uma tarifa fixa, a precificação dinâmica ajusta os preços com base em variáveis como demanda do mercado, disponibilidade dos concorrentes, sazonalidade e antecedência da reserva. Hotéis que adotam precificação dinâmica apresentam, em média, aumento de 10–20% no RevPAR comparado a tarifas estáticas.
              </p>
            </div>
            <div class="bg-white border border-gray-200 p-5 shadow-sm">
              <h4 class="font-bold text-gray-900 mb-2">Janela de Reserva (Booking Window)</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                É o período entre a data da reserva e a data do check-in. Reservas feitas com muita antecedência geralmente aceitam tarifas mais altas. Reservas de última hora competem com a disponibilidade sobrante e costumam demandar descontos. A IA do Horizon considera esse padrão ao recomendar ajustes de preço futuros.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup>
</script>
