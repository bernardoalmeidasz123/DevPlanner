
/**
 * CONFIGURAÇÃO SUNIZE - DevPlanner AI
 * 
 * Este é o único lugar onde você precisa mexer para integrar os pagamentos.
 */
export const CONFIG = {
  // 1. CHAVE DE API SUNIZE
  // Use para chamadas de servidor (Backend) ou identificação.
  SUNIZE_API_KEY: 'SUA_API_KEY_AQUI',
  
  // 2. LINK DE CHECKOUT (URL BASE)
  // O link oficial da Sunize para redirecionamento.
  SUNIZE_CHECKOUT_BASE_URL: 'https://checkout.sunize.com.br/',
  
  // 3. IDs DOS PRODUTOS (SLUGS)
  // Localize o "Link de Venda" na Sunize e pegue o código final.
  // Exemplo: se o link for https://checkout.sunize.com.br/abcd123, o ID é 'abcd123'
  SUNIZE_PRODUCT_IDS: {
    MONTHLY: 'ID_MENSAL_DA_SUNIZE', 
    ANNUAL: 'ID_ANUAL_DA_SUNIZE'
  },
  
  // 4. WEBHOOK (PARA SUA REFERÊNCIA)
  // Você deve cadastrar esta URL na DASHBOARD da Sunize:
  // URL recomendada: https://seu-backend.com/api/webhooks/sunize
  WEBHOOK_URL_INFO: 'Configure na Dashboard da Sunize > Integrações > Webhooks',

  PRICES: {
    MONTHLY: 12,
    ANNUAL: 99,
    CURRENCY: 'BRL'
  }
};
