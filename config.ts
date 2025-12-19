
/**
 * CONFIGURAÇÃO SUNIZE - DevPlanner AI
 * 
 * Modelo: PAGAMENTO ÚNICO (Acesso Vitalício)
 */
export const CONFIG = {
  // 1. CHAVE DE API SUNIZE
  SUNIZE_API_KEY: 'ck_3ed30c47a678ce6e53418dc0502934b1',
  
  // 2. LINK DE CHECKOUT (URL BASE)
  SUNIZE_CHECKOUT_BASE_URL: 'https://pay.sunize.com.br/lpULfEjh',
  
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
