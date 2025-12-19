
import React, { useState } from 'react';
import { Check, Rocket, Shield, ExternalLink, Loader2, Star, Zap } from 'lucide-react';
import { useApp } from '../App';
import { CONFIG } from '../config';

const PremiumView: React.FC = () => {
  const { user } = useApp();
  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);

  const tiers = [
    {
      id: 'free',
      name: 'Plano Básico',
      price: `Grátis`,
      period: 'Para sempre',
      features: ['Até 5 tarefas', 'Calendário básico', 'IA com limites diários'],
      cta: 'Plano Atual',
      current: !user.isPremium,
      popular: false
    },
    {
      id: 'pro',
      name: 'Dev Pro',
      price: `R$ ${CONFIG.PRICES.PRO}`,
      period: 'Pagamento Único',
      sunizeId: CONFIG.SUNIZE_PRODUCT_IDS.PRO_PLAN,
      features: ['Acesso Vitalício', 'Tarefas ilimitadas', 'IA sem limites', 'Dashboard Pro'],
      cta: 'Comprar Agora',
      current: user.isPremium,
      popular: true
    },
    {
      id: 'career',
      name: 'Career Expert',
      price: `R$ ${CONFIG.PRICES.CAREER}`,
      period: 'Pagamento Único',
      sunizeId: CONFIG.SUNIZE_PRODUCT_IDS.CAREER_PLAN,
      features: ['Tudo do Pro', 'Acesso Vitalício', 'Prep para Entrevistas', 'Suporte Prioritário'],
      cta: 'Garanta sua Vaga',
      current: false,
      popular: false
    }
  ];

  const handleUpgrade = (tier: any) => {
    if (tier.id === 'free' || tier.current) return;
    
    setIsRedirecting(tier.id);
    
    // Concatena a URL de checkout com o ID do produto único
    const checkoutLink = `${CONFIG.SUNIZE_CHECKOUT_BASE_URL}${tier.sunizeId}`;
    
    // Simula carregamento e redireciona
    setTimeout(() => {
      window.location.href = checkoutLink;
    }, 500);
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3 h-3 fill-indigo-400" />
          Acesso Vitalício Liberado
        </div>
        <h1 className="text-4xl font-extrabold text-white">Invista na sua carreira</h1>
        <p className="text-slate-400 text-lg">
          Sem mensalidades. Pague uma vez e use o <b>DevPlanner AI</b> para sempre.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div key={tier.id} className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
            tier.popular ? 'bg-indigo-600/5 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10' : 'bg-slate-800/30 border-slate-800'
          }`}>
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                Mais Vendido
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
            <div className="flex flex-col mb-8">
              <span className="text-4xl font-bold text-white">{tier.price}</span>
              <span className="text-sm font-medium text-slate-500 mt-1">{tier.period}</span>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className={`w-5 h-5 flex-shrink-0 ${tier.popular ? 'text-indigo-400' : 'text-slate-500'}`} />
                  {f}
                </li>
              ))}
            </ul>

            <button 
              disabled={tier.current || isRedirecting !== null}
              onClick={() => handleUpgrade(tier)}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                tier.current ? 'bg-slate-700 text-slate-500 cursor-default' : 
                tier.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 
                'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isRedirecting === tier.id ? <Loader2 className="w-5 h-5 animate-spin" /> : tier.cta}
              {!tier.current && tier.id !== 'free' && <ExternalLink className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="p-4 flex flex-col items-center text-center gap-2">
          <Shield className="w-8 h-8 text-emerald-500" />
          <p className="text-sm font-semibold text-slate-200">Compra Segura</p>
          <p className="text-xs text-slate-500">Seus dados estão protegidos pela Sunize.</p>
        </div>
        <div className="p-4 flex flex-col items-center text-center gap-2">
          <Rocket className="w-8 h-8 text-indigo-400" />
          <p className="text-sm font-semibold text-slate-200">Acesso Instantâneo</p>
          <p className="text-xs text-slate-500">Liberado via Webhook após o pagamento.</p>
        </div>
        <div className="p-4 flex flex-col items-center text-center gap-2">
          <Star className="w-8 h-8 text-amber-400" />
          <p className="text-sm font-semibold text-slate-200">Sem Assinatura</p>
          <p className="text-xs text-slate-500">Sem cobranças surpresas no cartão.</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumView;
