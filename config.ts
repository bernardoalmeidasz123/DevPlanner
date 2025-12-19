
/**
 * Configurações globais do DevPlanner AI para Sunize
 */
export const CONFIG = {
  // Sua chave de API Sunize (usada para identificação/tracking se necessário)
  SUNIZE_API_KEY: 'SUA_CHAVE_API_SUNIZE_AQUI',
  
  // URL Base do Checkout Sunize (Geralmente segue este padrão)
  SUNIZE_CHECKOUT_BASE_URL: 'https://checkout.sunize.com.br/',
  
  // IDs dos produtos/checkouts gerados na sua dashboard Sunize
  // Você deve substituir 'ID_...' pelos códigos reais dos seus produtos
  SUNIZE_PRODUCT_IDS: {
    MONTHLY: 'ID_DO_SEU_PRODUTO_MENSAL',
    ANNUAL: 'ID_DO_SEU_PRODUTO_ANUAL'
  },
  
  // Preços em BRL para exibição na UI
  PRICES: {
    MONTHLY: 12,
    ANNUAL: 99,
    CURRENCY: 'BRL'
  }
};
