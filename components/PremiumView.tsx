
import React, { useState } from 'react';
import { Check, Rocket, Shield, Infinity as InfinityIcon, Bot, Loader2, ExternalLink, Wallet, Star } from 'lucide-react';
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
      features: ['Até 5 tarefas', 'Calendário básico', '1 Resumo de IA por dia', 'Dashboard padrão'],
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
      features: [
        'Tarefas ilimitadas',
        'Assistente de IA ilimitado',
        'Automação de vagas',
        'Organização por projetos',
        'Notificações inteligentes',
        'Temas personalizados'
      ],
      cta: 'Assinar Agora',
      current: user.isPremium,
      popular: true
    },
    {
      id: 'career',
      name: 'Career Pro',
      price: `R$ ${CONFIG.PRICES.ANNUAL}`,
      period: '/ano',
      sunizeId: CONFIG.SUNIZE_PRODUCT_IDS.ANNUAL,
      features: [
        'Todos os recursos Pro Dev',
        'Prep para entrevistas exclusivo',
        'Integração com GitHub',
        '2 meses grátis',
        'Suporte prioritário'
      ],
      cta: 'Assinar Anual',
      current: false,
      popular: false
    }
  ];

  const handleUpgradeClick = (tier: any) => {
    if (tier.id === 'free' || tier.current) return;
    
    setIsRedirecting(tier.id);
    
    // Constrói a URL oficial do checkout Sunize
    // O padrão da Sunize é geralmente o base_url + o ID do checkout
    const checkoutUrl = `${CONFIG.SUNIZE_CHECKOUT_BASE_URL}${tier.sunizeId}`;
    
    // Pequeno delay apenas para feedback visual de "processando"
    setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 800);
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">
          <Wallet className="w-3 h-3" />
          Checkout Seguro Sunize
        </div>
        <h1 className="text-4xl font-extrabold text-white">
          Evolua sua Carreira com o <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Premium</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Ao clicar em assinar, você será redirecionado para a plataforma oficial da <b>Sunize</b> para concluir o pagamento com segurança.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <div key={i} className={`relative flex flex-col p-8 rounded-3xl border transition-all hover:scale-[1.02] ${
            tier.popular 
            ? 'bg-orange-500/5 border-orange-500 shadow-2xl shadow-orange-600/10' 
            : 'bg-slate-800/30 border-slate-800'
          }`}>
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                Mais Recomendado
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                {tier.period && <span className="text-slate-500 font-medium">{tier.period}</span>}
              </div>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {tier.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className={`w-5 h-5 flex-shrink-0 ${tier.popular ? 'text-orange-400' : 'text-slate-500'}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              disabled={tier.current || isRedirecting !== null}
              onClick={() => handleUpgradeClick(tier)}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
              tier.current 
              ? 'bg-slate-700 text-slate-400 cursor-default' 
              : tier.popular 
                ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/30' 
                : 'bg-white hover:bg-slate-100 text-slate-900'
            }`}>
              {isRedirecting === tier.id ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Redirecionando...</span>
                </>
              ) : (
                <>
                  {tier.cta}
                  {!tier.current && tier.id !== 'free' && <ExternalLink className="w-4 h-4" />}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-slate-800/20 border border-slate-800 text-center space-y-4">
        <h4 className="text-slate-100 font-bold flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Como funciona a ativação?
        </h4>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Após o pagamento na Sunize, nossa integração via <b>Webhook</b> processará sua assinatura automaticamente. 
          Seu acesso Premium será liberado assim que o pagamento for confirmado (instantes para PIX e Cartão).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {[
          { title: 'Checkout Oficial', icon: Wallet, desc: 'Pague via PIX ou Cartão pela Sunize.' },
          { title: 'IA Sem Limites', icon: Bot, desc: 'Assistente Gemini Pro disponível 24/7.' },
          { title: 'Ativação via Webhook', icon: Rocket, desc: 'Acesso liberado automaticamente.' },
          { title: 'Suporte Dev', icon: Star, desc: 'Prioridade no atendimento técnico.' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 bg-slate-800/10 rounded-2xl border border-slate-800/50">
            <div className="p-3 bg-orange-600/10 rounded-xl mb-4">
              <item.icon className="w-6 h-6 text-orange-500" />
            </div>
            <h4 className="font-bold text-slate-100 mb-1 text-sm">{item.title}</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumView;
