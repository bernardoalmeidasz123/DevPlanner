
import React, { useState, useEffect } from 'react';
import { Check, Zap, Rocket, Shield, Infinity as InfinityIcon, Bot, Loader2, CreditCard, Lock, CheckCircle2, AlertCircle, Wallet, ExternalLink } from 'lucide-react';
import { useApp } from '../App';
import { CONFIG } from '../config';

const PremiumView: React.FC = () => {
  const { user, upgradeToPremium } = useApp();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [showSunizeSimulation, setShowSunizeSimulation] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [sunizeReady, setSunizeReady] = useState(false);

  useEffect(() => {
    // Verifica se a chave foi preenchida no config.ts
    if (CONFIG.SUNIZE_PUBLIC_KEY && CONFIG.SUNIZE_PUBLIC_KEY !== 'SUA_CHAVE_PUBLICA_SUNIZE_AQUI') {
      setSunizeReady(true);
    }
  }, []);

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
    setSelectedTier(tier);
    setIsProcessing(tier.id);
    
    // Simulação de redirecionamento para o checkout oficial da Sunize
    setTimeout(() => {
      if (sunizeReady) {
        // Lógica real: Redirecionaria para o checkout externo
        // window.location.href = `https://checkout.sunize.com.br/${tier.sunizeId}?key=${CONFIG.SUNIZE_PUBLIC_KEY}`;
        setShowSunizeSimulation(true);
      } else {
        setShowSunizeSimulation(true);
      }
      setIsProcessing(null);
    }, 1500);
  };

  const completePayment = () => {
    setIsProcessing('completing');
    
    // Simula a confirmação de callback que a Sunize enviaria ao seu sistema
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => {
        upgradeToPremium();
        setShowSunizeSimulation(false);
        setIsProcessing(null);
        setPaymentSuccess(false);
      }, 2000);
    }, 2500);
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 relative">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-white">DevPlanner <span className="text-orange-500">Premium</span></h1>
        <p className="text-slate-400 text-lg">Pagamentos processados com segurança via Sunize.</p>
        
        {!sunizeReady && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm mt-4">
            <AlertCircle className="w-4 h-4" />
            <span>Configuração pendente: Insira sua <b>SUNIZE_PUBLIC_KEY</b> no arquivo <b>config.ts</b>.</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <div key={i} className={`relative flex flex-col p-8 rounded-3xl border transition-all hover:scale-[1.02] ${
            tier.popular ? 'bg-indigo-600/5 border-indigo-600 shadow-2xl shadow-indigo-600/10' : 'bg-slate-800/30 border-slate-800'
          }`}>
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                Mais Popular
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
                  <Check className={`w-5 h-5 flex-shrink-0 ${tier.popular ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              disabled={tier.current || isProcessing === tier.id}
              onClick={() => handleUpgradeClick(tier)}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
              tier.current 
              ? 'bg-slate-700 text-slate-400 cursor-default' 
              : tier.popular 
                ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/30' 
                : 'bg-white hover:bg-slate-100 text-slate-900'
            }`}>
              {isProcessing === tier.id ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Gerando Checkout...</span>
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

      {/* Sunize Integration Modal */}
      {showSunizeSimulation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            {paymentSuccess ? (
              <div className="p-12 text-center space-y-4 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Assinatura Ativa!</h2>
                <p className="text-slate-500 text-sm">A Sunize confirmou seu pagamento. Aproveite o DevPlanner Premium!</p>
              </div>
            ) : (
              <>
                <div className="p-6 bg-slate-50 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-500 p-1.5 rounded-lg shadow-sm">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-lg text-slate-800 block leading-none">Checkout Sunize</span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase">API: {CONFIG.SUNIZE_PUBLIC_KEY.substring(0, 10)}...</span>
                    </div>
                  </div>
                  <button onClick={() => setShowSunizeSimulation(false)} className="text-slate-400 hover:text-slate-600">
                    <InfinityIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8 space-y-6">
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-orange-900">{selectedTier?.name}</span>
                      <span className="text-lg font-bold text-orange-600">{selectedTier?.price}</span>
                    </div>
                    <p className="text-xs text-orange-700 opacity-80">Referência: {selectedTier?.sunizeId}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Informações de Pagamento</label>
                      <div className="p-4 border border-slate-200 rounded-xl flex items-center gap-3 bg-white">
                        <CreditCard className="w-5 h-5 text-slate-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-600">Cartão de Crédito ou PIX</p>
                          <p className="text-[10px] text-slate-400">Processado com criptografia Sunize</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs border border-emerald-100">
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    <span>Ambiente seguro. Clique abaixo para simular a conclusão do pagamento na plataforma Sunize.</span>
                  </div>

                  <button 
                    onClick={completePayment}
                    disabled={isProcessing === 'completing'}
                    className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2"
                  >
                    {isProcessing === 'completing' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Confirmando na Sunize...</span>
                      </>
                    ) : (
                      <>Finalizar na Sunize</>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <div className="h-[1px] flex-1 bg-slate-100"></div>
                    <Lock className="w-3 h-3 text-slate-300" />
                    <div className="h-[1px] flex-1 bg-slate-100"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        {[
          { title: 'Checkout Sunize', icon: Wallet, desc: 'Pagamento 100% brasileiro e seguro.' },
          { title: 'IA Ilimitada', icon: Bot, desc: 'Sem restrições de prompts.' },
          { title: 'Acesso Pro', icon: Rocket, desc: 'Todas as ferramentas desbloqueadas.' },
          { title: 'Privacidade', icon: Shield, desc: 'Seus dados protegidos pela LGPD.' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 bg-slate-800/20 rounded-2xl border border-slate-800">
            <div className="p-3 bg-orange-600/10 rounded-xl mb-4">
              <item.icon className="w-6 h-6 text-orange-500" />
            </div>
            <h4 className="font-bold text-slate-100 mb-1">{item.title}</h4>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumView;
