
/**
 * CONFIGURAÇÃO SUNIZE - DevPlanner AI
 * 
 * Modelo: PAGAMENTO ÚNICO (Acesso Vitalício)
 */
export const CONFIG = {
  // 1. CHAVE DE API SUNIZE
  SUNIZE_API_KEY: 'SUA_API_KEY_AQUI',
  
  // 2. LINK DE CHECKOUT (URL BASE)
  SUNIZE_CHECKOUT_BASE_URL: 'https://checkout.sunize.com.br/',
  
  // 3. IDs DOS PRODUTOS (PAGAMENTO ÚNICO)
  // Certifique-se de que na Sunize o produto esteja configurado como "Pagamento Único"
  SUNIZE_PRODUCT_IDS: {
    PRO_PLAN: 'ID_PLANO_PRO_UNICO', 
    CAREER_PLAN: 'ID_PLANO_CAREER_UNICO'
  },
  
  // 4. WEBHOOK
  WEBHOOK_URL_INFO: 'Configure na Dashboard da Sunize > Integrações > Webhooks',

  PRICES: {
    PRO: 47,
    CAREER: 97,
    CURRENCY: 'BRL'
  }
};
