import React, { useState } from 'react';
import { Check, Zap, Rocket, ShieldCheck, Target, ChevronLeft, CreditCard, User, Calendar, Lock, ArrowRight, QrCode, FileText, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type CheckoutStep = 'selection' | 'checkout' | 'success';
type PaymentMethod = 'pix' | 'card' | 'boleto';

const PricingCard = ({
  planName, description, price, priceUnit, features, buttonText, onSelect, isPopular = false
}: any) => {
  return (
    <div className={cn(
      "glass-card p-10 flex flex-col relative overflow-hidden group transition-all duration-500",
      "backdrop-blur-[14px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 dark:from-white/5 dark:to-white/[0.02]",
      "hover:border-brand-primary/50 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]",
      "w-full max-w-lg min-h-[500px]",
      isPopular && "ring-2 ring-brand-primary/30 scale-105 z-10 bg-brand-primary/[0.05]"
    )}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-b-2xl shadow-lg shadow-brand-primary/20 whitespace-nowrap">
          Mais Procurado
        </div>
      )}
      
      <div className="mb-8 mt-4">
        <h3 className="text-3xl font-black tracking-tighter text-brand-text mb-3 uppercase">{planName}</h3>
        <p className="text-sm font-medium text-brand-text-dim leading-relaxed">{description}</p>
      </div>

      <div className="mb-10 flex items-baseline gap-2">
        <span className="text-5xl font-black text-brand-text tracking-tighter">R$ {price}</span>
        <span className="text-xs font-black text-brand-text-dim uppercase tracking-widest">{priceUnit}</span>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-text/10 to-transparent mb-10" />

      <ul className="flex flex-col gap-5 text-sm font-semibold text-brand-text-dim mb-12 flex-1">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-brand-primary" />
            </div>
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        onClick={onSelect}
        className={cn(
          "w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all active:scale-95",
          isPopular 
            ? "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-xl shadow-brand-primary/20" 
            : "bg-brand-text/5 border border-brand-text/10 text-brand-text hover:bg-brand-text/10"
        )}
      >
        {buttonText}
      </button>
    </div>
  );
};

export const Planos: React.FC<{ 
  onBack: () => void;
  userCredits?: number;
  setUserCredits?: React.Dispatch<React.SetStateAction<number>>;
}> = ({ onBack, userCredits = 0, setUserCredits }) => {
  const [step, setStep] = useState<CheckoutStep>('selection');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [credits, setCredits] = useState(150);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const plans = [
    {
      planName: "Lead Start",
      description: "Ideal para começar sua prospecção e testar a plataforma.",
      price: "0,00",
      numericPrice: 0,
      priceUnit: "grátis",
      features: [
        "10 créditos iniciais inclusos",
        "Acesso completo à plataforma",
        "Busca básica de leads",
        "Exportação de listas"
      ],
      buttonText: "Começar Grátis"
    },
    {
      planName: "Lead Pro",
      description: "Perfeito para profissionais que buscam volume e filtros avançados.",
      price: "2,50",
      numericPrice: 2.50,
      priceUnit: "/ lead",
      features: [
        "Acesso completo à plataforma",
        "Sem limite de leads por dia",
        "Filtros premium (Receita, CNAE)",
        "Dashboards de performance"
      ],
      buttonText: "Escolher Pro"
    },
    {
      planName: "Lead Elite",
      description: "Acompanhamento estratégico para máxima conversão.",
      price: "4,00",
      numericPrice: 4.00,
      priceUnit: "/ lead",
      isPopular: true,
      features: [
        "Tudo do plano Lead Pro",
        "Calls mensais de alinhamento",
        "Dicas e orientações exclusivas",
        "Mentoria de vendas especializada"
      ],
      buttonText: "Assinar Elite"
    },
    {
      planName: "Lead Max",
      description: "Automação total e escala massiva de comunicação.",
      price: "6,50",
      numericPrice: 6.50,
      priceUnit: "/ lead",
      features: [
        "Tudo do plano Lead Elite",
        "Disparo de mensagens em massa",
        "Automação de fluxos",
        "Suporte Prioritário 24/7"
      ],
      buttonText: "Upgrade para Max"
    }
  ];

  const handlePlanSelect = (plan: any) => {
    if (plan.numericPrice === 0) {
      onBack();
    } else {
      setSelectedPlan(plan);
      setStep('checkout');
    }
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'CUPOMLEAD2026') {
      setAppliedDiscount(0.2); // 20% discount
    } else {
      alert('Cupom inválido');
      setAppliedDiscount(0);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (setUserCredits) {
        setUserCredits(prev => prev + credits);
      }
      setStep('success');
    }, 2500);
  };

  const subtotal = credits * (selectedPlan?.numericPrice || 0);
  const discountAmount = subtotal * appliedDiscount;
  const finalTotal = subtotal - discountAmount;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-brand-text uppercase tracking-tighter mb-4">Pedido Realizado!</h2>
          <p className="text-brand-text-dim font-medium mb-10">
            {paymentMethod === 'card' 
              ? `Seus ${credits} créditos já estão disponíveis.` 
              : `Aguardando confirmação do pagamento (${paymentMethod.toUpperCase()}) para liberar seus créditos.`
            }
          </p>
          <button 
            onClick={onBack}
            className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20"
          >
            Acessar Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  if (step === 'checkout') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-6xl mx-auto px-6 py-24"
      >
        <button 
          onClick={() => {
            setStep('selection');
            setAppliedDiscount(0);
            setCoupon('');
          }}
          className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest mb-12 hover:gap-3 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para Planos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-brand-text uppercase leading-none mb-4">Finalizar Recarga</h2>
              <p className="text-brand-text-dim font-medium">Configure seu volume e escolha a forma de pagamento.</p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-10">
              <div className="glass-card p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-brand-text uppercase tracking-widest">Volume de leads</label>
                  <span className="text-[10px] font-bold text-brand-primary uppercase bg-brand-primary/10 px-3 py-1 rounded-full">Min. 150</span>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    min="150"
                    value={credits}
                    onChange={(e) => setCredits(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-brand-text/5 border border-brand-text/10 rounded-2xl px-6 py-5 text-2xl font-black text-brand-text focus:border-brand-primary/50 outline-none transition-all"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-text-dim text-sm font-bold uppercase tracking-widest pointer-events-none">
                    Leads
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-xs font-black text-brand-text uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-4 h-4 text-brand-primary" />
                  Cupom de Desconto
                </label>
                <div className="flex gap-4">
                  <input 
                    placeholder="EX: CUPOMLEAD2026"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 bg-brand-text/5 border border-brand-text/10 rounded-2xl px-6 py-5 text-xs font-bold text-brand-text uppercase tracking-widest focus:border-brand-primary/50 outline-none transition-all"
                  />
                  <button 
                    type="button"
                    onClick={applyCoupon}
                    className="px-8 bg-brand-text text-brand-bg rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-text/90 transition-all shadow-lg"
                  >
                    Aplicar
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <Check className="w-3 h-3" /> Desconto de 20% aplicado com sucesso!
                  </p>
                )}
              </div>

              <div className="space-y-6">
                <label className="text-xs font-black text-brand-text uppercase tracking-widest">Forma de Pagamento</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'card', icon: CreditCard, label: 'Cartão' },
                    { id: 'pix', icon: QrCode, label: 'PIX' },
                    { id: 'boleto', icon: FileText, label: 'Boleto' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all",
                        paymentMethod === method.id 
                          ? "bg-brand-primary/10 border-brand-primary text-brand-primary shadow-lg shadow-brand-primary/5" 
                          : "bg-brand-text/5 border-brand-text/10 text-brand-text-dim hover:border-brand-text/20"
                      )}
                    >
                      <method.icon className="w-6 h-6" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-dim group-focus-within:text-brand-primary transition-colors" />
                      <input 
                        required
                        placeholder="NOME IGUAL NO CARTÃO"
                        className="w-full bg-brand-text/5 border border-brand-text/10 rounded-2xl pl-16 pr-6 py-5 text-xs font-bold text-brand-text uppercase tracking-widest focus:border-brand-primary/50 outline-none transition-all"
                      />
                    </div>
                    <div className="relative group">
                      <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-dim group-focus-within:text-brand-primary transition-colors" />
                      <input 
                        required
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-brand-text/5 border border-brand-text/10 rounded-2xl pl-16 pr-6 py-5 text-xs font-bold text-brand-text uppercase tracking-widest focus:border-brand-primary/50 outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="relative group">
                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-dim group-focus-within:text-brand-primary transition-colors" />
                        <input 
                          required
                          placeholder="MM/AA"
                          className="w-full bg-brand-text/5 border border-brand-text/10 rounded-2xl pl-16 pr-6 py-5 text-xs font-bold text-brand-text uppercase tracking-widest focus:border-brand-primary/50 outline-none transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-dim group-focus-within:text-brand-primary transition-colors" />
                        <input 
                          required
                          placeholder="CVV"
                          maxLength={4}
                          className="w-full bg-brand-text/5 border border-brand-text/10 rounded-2xl pl-16 pr-6 py-5 text-xs font-bold text-brand-text uppercase tracking-widest focus:border-brand-primary/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="glass-card p-10 text-center space-y-4 bg-brand-primary/[0.02]">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <QrCode className="w-8 h-8 text-brand-primary" />
                    </div>
                    <p className="text-xs font-bold text-brand-text uppercase tracking-widest">QR Code será gerado</p>
                    <p className="text-[10px] text-brand-text-dim font-medium leading-relaxed">Liberação imediata dos créditos após a confirmação do pagamento via PIX.</p>
                  </div>
                )}

                {paymentMethod === 'boleto' && (
                  <div className="glass-card p-10 text-center space-y-4 bg-brand-primary/[0.02]">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-brand-primary" />
                    </div>
                    <p className="text-xs font-bold text-brand-text uppercase tracking-widest">Boleto Bancário</p>
                    <p className="text-[10px] text-brand-text-dim font-medium leading-relaxed">Liberação em até 2 dias úteis após o pagamento do boleto.</p>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={isProcessing || credits < 150}
                className={cn(
                  "w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3",
                  isProcessing || credits < 150
                    ? "bg-brand-text/10 text-brand-text-dim cursor-not-allowed"
                    : "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-2xl shadow-brand-primary/30 active:scale-95"
                )}
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Confirmar {formatCurrency(finalTotal)}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:sticky lg:top-24 space-y-8">
            <div className="glass-card p-10 border-brand-primary/30 bg-brand-primary/[0.02] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Rocket className="w-40 h-40" />
              </div>
              
              <h3 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-8">Resumo do Pedido</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-2xl font-black text-brand-text uppercase tracking-tighter">{selectedPlan?.planName}</span>
                    <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest mt-1">Modalidade</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-brand-text">R$ {selectedPlan?.price}</span>
                    <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest mt-1">Custo/Lead</p>
                  </div>
                </div>

                <div className="w-full h-px bg-brand-text/10" />

                <div className="flex justify-between items-center text-brand-text-dim font-bold text-xs uppercase tracking-widest">
                  <span>Subtotal ({credits} leads)</span>
                  <span className="text-brand-text font-black">{formatCurrency(subtotal)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between items-center text-emerald-500 font-bold text-xs uppercase tracking-widest">
                    <span>Desconto (20%)</span>
                    <span className="font-black">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-8 mt-8 border-t border-brand-text/10 flex justify-between items-center">
                  <span className="text-sm font-black text-brand-text uppercase tracking-widest">Valor Final</span>
                  <span className="text-4xl font-black text-brand-primary tracking-tighter">{formatCurrency(finalTotal)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center justify-center p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest italic">Pagamento Seguro</span>
            </div>
            
            <p className="text-[10px] text-center text-brand-text-dim font-medium leading-relaxed px-4">
              Ao confirmar a recarga, você concorda com nossos termos de uso e política de privacidade para o processo de prospecção.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 space-y-16"
    >
      <header className="text-center max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-brand-text uppercase leading-none mb-6">Planos</h2>
        <p className="text-brand-text-dim font-medium text-xl">Escolha o modelo de prospecção ideal para o seu volume atual.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 justify-items-center">
        {plans.map((plan, idx) => (
          <PricingCard 
            key={idx} 
            {...plan} 
            onSelect={() => handlePlanSelect(plan)}
          />
        ))}
      </div>
    </motion.div>
  );
};
