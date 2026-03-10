import React from 'react';
import { Upload, ArrowLeft, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

interface PlaceholderPageProps {
  title: string;
  icon: any;
  onBack: () => void;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, icon: Icon, onBack }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-16 max-w-xl w-full text-center"
      >
        <div className="w-24 h-24 rounded-3xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-8">
          <Icon className="w-10 h-10 text-brand-primary" />
        </div>
        <h2 className="text-4xl font-black italic tracking-tighter mb-4">{title}</h2>
        <p className="text-brand-text-dim font-medium mb-12">
          Em breve você poderá {title === 'Nossos Planos' ? 'gerenciar sua assinatura e upgrade' : 'importar seus contatos'} diretamente por aqui.
          <br />
          <span className="text-brand-primary font-bold">Em desenvolvimento!!</span>
        </p>
        <button 
          onClick={onBack}
          className="glass-card px-8 py-4 flex items-center gap-3 text-xs font-black tracking-widest uppercase hover:bg-white/5 transition-all mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Dashboard
        </button>
      </motion.div>
    </div>
  );
};
