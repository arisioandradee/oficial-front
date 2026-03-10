import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Shield, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'personal' | 'security'>('personal');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-6 md:px-12 space-y-8 pb-12 pt-24"
    >
      {/* Tabs Header */}
      <div className="flex border-b border-brand-border mb-12">
        <button
          onClick={() => setActiveTab('personal')}
          className={cn(
            "px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative",
            activeTab === 'personal' ? "text-brand-primary" : "text-brand-text-dim hover:text-brand-text"
          )}
        >
          Dados Pessoais
          {activeTab === 'personal' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={cn(
            "px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative",
            activeTab === 'security' ? "text-brand-primary" : "text-brand-text-dim hover:text-brand-text"
          )}
        >
          Segurança
          {activeTab === 'security' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
            />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'personal' ? (
          <motion.div
            key="personal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-brand-text mb-2">Perfil do Usuário</h2>
              <p className="text-brand-text-dim font-medium">Informações utilizadas para relatórios e faturamento.</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Nome Completo</label>
                  <input 
                    type="text" 
                    defaultValue="arisio@dibaisales.com.br"
                    className="w-full px-6 py-4 bg-brand-bg border border-brand-border rounded-xl text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Telefone</label>
                  <input 
                    type="text" 
                    defaultValue="(11) 99999-9999"
                    className="w-full px-6 py-4 bg-brand-bg border border-brand-border rounded-xl text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Empresa</label>
                <input 
                  type="text" 
                  placeholder="Nome da sua empresa"
                  className="w-full px-6 py-4 bg-brand-bg border border-brand-border rounded-xl text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Email Principal</label>
                <input 
                  type="email" 
                  defaultValue="arisio@dibaisales.com.br"
                  disabled
                  className="w-full px-6 py-4 bg-brand-bg border border-brand-border rounded-xl text-sm font-bold text-brand-text-dim/50 cursor-not-allowed"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="bg-brand-primary text-white px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
              >
                {isLoading ? "Atualizando..." : "Atualizar Dados"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="security"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-brand-text mb-2">Alterar Senha</h2>
              <p className="text-brand-text-dim font-medium">Proteja sua conta com uma senha forte.</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Nova Senha</label>
                  <input 
                    type="password" 
                    className="w-full px-6 py-4 bg-brand-bg border border-brand-border rounded-xl text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    className="w-full px-6 py-4 bg-brand-bg border border-brand-border rounded-xl text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="bg-brand-primary text-white px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
              >
                {isLoading ? "Alterando..." : "Alterar Senha"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
