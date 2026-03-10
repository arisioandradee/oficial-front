import React from 'react';
import { Check, Zap, Rocket, ShieldCheck, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const PlanCard = ({ title, price, features, icon: Icon, recommended, onSelect }: any) => (
  <div className={cn(
    "glass-card p-8 flex flex-col relative overflow-hidden group",
    recommended && "border-brand-primary/50 shadow-[0_0_40px_rgba(99,102,241,0.1)]"
  )}>
    {recommended && (
      <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl">
        Recomendado
      </div>
    )}
    
    <div className="mb-8">
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-6 border",
        recommended ? "bg-brand-primary/10 border-brand-primary/20 text-brand-primary" : "bg-brand-bg border-brand-border text-brand-text-dim"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-black tracking-tighter uppercase mb-2 text-brand-text">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black tracking-tight text-brand-text">R$ {price}</span>
        <span className="text-sm font-bold text-brand-text-dim uppercase tracking-widest">/mês</span>
      </div>
    </div>

    <div className="space-y-4 mb-10 flex-1">
      {features.map((feature: string, i: number) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-emerald-500" />
          </div>
          <span className="text-sm font-medium text-brand-text-dim leading-tight">{feature}</span>
        </div>
      ))}
    </div>

    <button 
      onClick={onSelect}
      className={cn(
        "w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]",
        recommended 
          ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-accent" 
          : "bg-brand-bg border border-brand-border text-brand-text hover:bg-white/5"
      )}
    >
      Assinar Agora
    </button>
  </div>
);

export const Planos: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 pb-12 pt-24"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-10">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest mb-4 hover:gap-3 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </button>
          <h2 className="text-4xl font-black tracking-tighter text-brand-text uppercase leading-none">Escolha o seu plano</h2>
          <p className="text-brand-text-dim font-medium mt-2">Acelere sua prospecção com inteligência de dados ilimitada.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PlanCard 
          title="Starter"
          price="197"
          icon={Zap}
          features={[
            "Até 1.000 leads/mês",
            "Busca assistida por IA básica",
            "Exportação CSV",
            "Suporte via e-mail",
            "1 usuário"
          ]}
        />
        <PlanCard 
          title="Pro"
          price="497"
          icon={Rocket}
          recommended
          features={[
            "Leads ilimitados",
            "IA de mineração avançada",
            "Filtros premium (Faturamento, Capital)",
            "Exportação ilimitada",
            "Até 5 usuários",
            "Suporte prioritário"
          ]}
        />
        <PlanCard 
          title="Enterprise"
          price="997"
          icon={ShieldCheck}
          features={[
            "Tudo do plano Pro",
            "API de integração direta",
            "Enriquecimento de dados customizado",
            "Gerente de conta dedicado",
            "Usuários ilimitados",
            "SLA de 99.9%"
          ]}
        />
      </div>

      <div className="glass-card p-10 bg-brand-primary/5 border-brand-primary/20 text-center">
        <h3 className="text-xl font-black text-brand-text uppercase tracking-tighter mb-2">Precisa de algo customizado?</h3>
        <p className="text-brand-text-dim font-medium mb-6">Fale com nosso time de especialistas para um plano sob medida para sua operação.</p>
        <button className="px-10 py-4 bg-brand-text text-brand-bg rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all">
          Falar com Consultor
        </button>
      </div>
    </motion.div>
  );
};
