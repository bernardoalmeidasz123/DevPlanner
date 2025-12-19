
import React, { useState } from 'react';
import { Check, Rocket, Shield, ExternalLink, Wallet, Loader2, Star } from 'lucide-react';
import { useApp } from '../App';
import { CONFIG } from '../config';

const PremiumView: React.FC = () => {
  const { user } = useApp();
  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);

  const tiers = [
    {
      id: 'free',
      name: 'Plano Gratuito',
      price: `R$ 0`,
      features: ['Até 5 tarefas', 'Calendário básico', 'IA com limite'],
      cta: 'Plano Atual',
      current: !user.isPremium,
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Dev',
      price: `R$ ${CONFIG.PRICES.MONTHLY}`,
      period: '/mês',
      sunizeId: CONFIG.SUNIZE_PRODUCT_IDS.MONTHLY,
      features: ['Tarefas ilimitadas', 'IA ilimitada', 'Notificações Push', 'Dashboard Pro'],
      cta: 'Assinar Pro',
      current: user.isPremium,
      popular: true
    },
    {
      id: 'career',
      name: 'Career Pro',
      price: `R$ ${CONFIG.PRICES.ANNUAL}`,
      period: '/ano',
      sunizeId: CONFIG.SUNIZE_PRODUCT_IDS.ANNUAL,
      features: ['Tudo do Pro', 'Prep para Entrevistas', '2 Meses Grátis', 'Suporte VIP'],
      cta: 'Assinar Anual',
      current: false,
      popular: false
    }
  ];

  const handleUpgrade = (tier: any) => {
    if (tier.id === 'free' || tier.current) return;
    
    setIsRedirecting(tier.id);
    
    // O LINK DO CHECKOUT é gerado aqui combinando a URL Base + o ID do Produto
    const checkoutLink = `${CONFIG.SUNIZE_CHECKOUT_BASE_URL}${tier.sunizeId}`;
    
    // Redireciona para o checkout oficial da Sunize
    setTimeout(() => {
      window.location.href = checkoutLink;
    }, 500);
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-bold uppercase">
          <Shield className="w-3 h-3" />
          Checkout Seguro via Sunize
        </div>
        <h1 className="text-4xl font-extrabold text-white">Escolha seu plano</h1>
        <p className="text-slate-400">
          Pagamento processado pela Sunize. Acesso liberado via <b>Webhook</b> instantâneo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div key={tier.id} className={`relative flex flex-col p-8 rounded-3xl border transition-all ${
            tier.popular ? 'bg-orange-500/5 border-orange-500 shadow-xl' : 'bg-slate-800/30 border-slate-800'
          }`}>
            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-white">{tier.price}</span>
              {tier.period && <span className="text-slate-500">{tier.period}</span>}
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className={`w-5 h-5 ${tier.popular ? 'text-orange-400' : 'text-slate-500'}`} />
                  {f}
                </li>
              ))}
            </ul>

            <button 
              disabled={tier.current || isRedirecting !== null}
              onClick={() => handleUpgrade(tier)}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                tier.current ? 'bg-slate-700 text-slate-500' : 
                tier.popular ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20' : 
                'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isRedirecting === tier.id ? <Loader2 className="w-5 h-5 animate-spin" /> : tier.cta}
              {!tier.current && tier.id !== 'free' && <ExternalLink className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
        <p className="text-xs text-slate-500">
          O <b>Webhook</b> de confirmação deve ser configurado na sua conta Sunize apontando para seu backend.<br/>
          Sua <b>API Key</b> (configurada no config.ts) pode ser usada para validar as transações.
        </p>
      </div>
    </div>
  );
};

export default PremiumView;
