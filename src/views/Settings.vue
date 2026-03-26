<template>
  <div class="flex-1 p-6 flex flex-col items-center w-full min-h-[80vh] bg-gray-50">
    <div class="w-full max-w-2xl bg-white p-8 border border-gray-200 shadow-sm mt-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Configurações da Conta</h2>

      <!-- Div de Status -->
      <div v-if="successMessage" class="mb-6 bg-green-50 border-l-4 border-green-500 p-4 text-green-700 text-sm shadow-sm transition-all flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm shadow-sm transition-all flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        {{ errorMessage }}
      </div>

      <div v-if="isLoading" class="flex justify-center py-10 opacity-70">
        <span class="text-gray-500 font-medium animate-pulse">Carregando dados...</span>
      </div>

      <form v-else @submit.prevent="updateProfile" class="space-y-6">
        <div>
          <label class="block mb-1 text-sm text-gray-600 font-semibold" for="userName">Seu Mome</label>
          <input 
            id="userName"
            v-model="form.name" 
            type="text" 
            class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-3 text-gray-800 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all shadow-sm"
            required
          >
        </div>
        
        <div>
          <label class="block mb-1 text-sm text-gray-600 font-semibold" for="hotelName">Nome do Hotel ou Propriedade</label>
          <input 
            id="hotelName"
            v-model="form.hotel_name" 
            type="text" 
            class="w-full bg-gray-50 border border-gray-300 rounded-none px-4 py-3 text-gray-800 focus:outline-none focus:border-primaryRed focus:ring-1 focus:ring-primaryRed transition-all shadow-sm"
            required
          >
        </div>

        <div class="pt-4 border-t border-gray-100 flex justify-end">
          <button 
            type="button" 
            @click="router.push('/dashboard')" 
            class="mr-4 px-6 py-2 border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors font-medium rounded-none disabled:opacity-50"
            :disabled="isSaving"
          >
            Cancelar
          </button>
          
          <button 
            type="submit" 
            class="bg-primaryRed hover:bg-red-700 disabled:opacity-75 disabled:cursor-not-allowed px-8 py-2 rounded-none font-medium transition-colors text-white shadow-sm flex items-center"
            :disabled="isSaving"
          >
            <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSaving ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </div>
      </form>

      <!-- Div de Assinatura -->
      <div v-if="!isLoading" class="mt-10 pt-8 border-t border-gray-200">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Assinatura</h3>
        <div class="bg-gray-50 p-6 border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p class="text-sm text-gray-600 font-semibold mb-1">Plano Atual</p>
            <p class="text-lg flex items-center gap-2 font-bold" :class="isEffectivelyPremium ? 'text-primaryRed' : 'text-gray-800'">
              {{ isEffectivelyPremium ? 'Premium ✦' : 'Trial' }}
            </p>
            <!-- Grace period notice -->
            <p v-if="cancelAtPeriodEnd && subscriptionEndsAt" class="mt-1 text-sm text-amber-600 font-medium">
              ⏳ Cancelamento agendado — acesso Premium até {{ formattedEndDate }}
            </p>
          </div>
          <!-- Only show cancel button if premium AND not already scheduled for cancellation -->
          <div class="mt-4 sm:mt-0" v-if="isEffectivelyPremium && !cancelAtPeriodEnd">
            <button 
              type="button" 
              @click="cancelSubscription" 
              class="px-4 py-2 bg-white border border-red-500 text-red-600 hover:bg-red-50 rounded-none transition-colors font-medium text-sm flex items-center disabled:opacity-50"
              :disabled="isCancelling"
            >
              <svg v-if="isCancelling" class="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isCancelling ? 'Cancelando...' : 'Cancelar Assinatura' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import { hasActiveSubscription, formatSubscriptionEndDate } from '@/lib/subscriptionUtils'

const router = useRouter()

const form = ref({
  name: '',
  hotel_name: ''
})

const isLoading = ref(true)
const isSaving = ref(false)
const isCancelling = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const subscriptionStatus = ref('trial')
const cancelAtPeriodEnd = ref(false)
const subscriptionEndsAt = ref(null)

const isEffectivelyPremium = computed(() =>
  hasActiveSubscription({
    subscription_status: subscriptionStatus.value,
    cancel_at_period_end: cancelAtPeriodEnd.value,
    subscription_ends_at: subscriptionEndsAt.value
  })
)

const formattedEndDate = computed(() => formatSubscriptionEndDate(subscriptionEndsAt.value))

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.id) {
    // Redirecionar para login caso não esteja logado, protegendo a rota
    router.push('/login')
    return
  }

  try {
    const { data: userData, error } = await supabase
      .from('users')
      .select('name, hotel_name, subscription_status, cancel_at_period_end, subscription_ends_at')
      .eq('id', session.user.id)
      .single()

    if (error) throw error

    if (userData) {
      form.value.name = userData.name || ''
      form.value.hotel_name = userData.hotel_name || ''
      subscriptionStatus.value = userData.subscription_status || 'trial'
      cancelAtPeriodEnd.value = userData.cancel_at_period_end || false
      subscriptionEndsAt.value = userData.subscription_ends_at || null
    }
  } catch (err) {
    errorMessage.value = 'Erro ao buscar dados da conta. Verifique sua conexão.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})

const updateProfile = async () => {
  isSaving.value = true
  successMessage.value = ''
  errorMessage.value = ''
  
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) throw new Error('Usuário não autenticado')

    const { error } = await supabase
      .from('users')
      .update({ 
        name: form.value.name, 
        hotel_name: form.value.hotel_name 
      })
      .eq('id', session.user.id)

    if (error) throw error
    
    // Sucesso, avisa o front para re-renderizar headers (que são escutados via evento session ou recarregando via authState)
    // Para simplificar e garantir a atualização no header imediatamente, vamos disparar refresh de auth explicitamente:
    await supabase.auth.refreshSession()
    
    successMessage.value = 'Perfil atualizado com sucesso!'
    
    // Opcionalmente apagar a mensagem após alguns segundos
    setTimeout(() => {
      successMessage.value = ''
    }, 4000)
    
  } catch (err) {
    errorMessage.value = err.message || 'Houve um erro ao atualizar os dados'
    console.error(err)
  } finally {
    isSaving.value = false
  }
}

const cancelSubscription = async () => {
  if (!confirm('Você tem certeza que deseja cancelar sua assinatura Premium? Você continuará com acesso até o fim do período pago.')) return;

  isCancelling.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.user?.id) throw new Error('Usuário não autenticado');

    const backendUrl = import.meta.env.VITE_STRIPE_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(`${backendUrl}/api/stripe/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: session.user.id })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || 'Erro ao cancelar assinatura');
    }

    // Update local state — access remains until subscription_ends_at
    cancelAtPeriodEnd.value = true;
    if (data.subscription_ends_at) {
      subscriptionEndsAt.value = data.subscription_ends_at;
    }

    successMessage.value = subscriptionEndsAt.value
      ? `Cancelamento agendado. Seu acesso Premium vai até ${formatSubscriptionEndDate(subscriptionEndsAt.value)}.`
      : 'Cancelamento agendado. Você manterá o acesso até o fim do período pago.';
    
  } catch (err) {
    errorMessage.value = err.message || 'Erro de rede ao tentar cancelar a assinatura.';
    console.error(err);
  } finally {
    isCancelling.value = false;
  }
}
</script>
