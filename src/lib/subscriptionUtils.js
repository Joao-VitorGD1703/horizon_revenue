/**
 * Determines whether a user currently has active premium access.
 *
 * Rules:
 *  - If subscription_status === 'premium' and cancel_at_period_end is false → active premium.
 *  - If cancel_at_period_end is true but subscription_ends_at is still in the future → still has access (grace period).
 *  - Everything else → trial (no premium access).
 *
 * @param {Object|null} userData - Row from the `users` table
 * @param {string} userData.subscription_status
 * @param {boolean} userData.cancel_at_period_end
 * @param {string|null} userData.subscription_ends_at - ISO timestamp
 * @returns {boolean}
 */
export function hasActiveSubscription(userData) {
  if (!userData) return false

  const { subscription_status, subscription_ends_at } = userData

  // Se a data de término existir e estiver no futuro, o usuário mantém o acesso
  // independentemente do status textual ser 'trial' ou 'premium' ou 'cancelled'
  if (subscription_ends_at && new Date(subscription_ends_at) > new Date()) {
    return true
  }

  // Falback de segurança para contas antigas que sejam premium sem data
  if (subscription_status === 'premium' && !subscription_ends_at) {
    return true
  }

  return false
}

/**
 * Formats a subscription_ends_at timestamp to a human-readable Brazilian date.
 * @param {string|null} isoDate
 * @returns {string}
 */
export function formatSubscriptionEndDate(isoDate) {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
