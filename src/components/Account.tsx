import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Shield,
  Check,
  Camera,
  Mail,
  Phone,
  Building2,
  CreditCard,
  Zap,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'personal' | 'security' | 'billing'>('personal');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'personal', label: 'Dados Pessoais', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'billing', label: 'Assinatura & Faturamento', icon: CreditCard },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-12 pb-24 pt-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-brand-primary/20 transition-all duration-700" />

            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-[40px] bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 p-1">
                  <div className="w-full h-full rounded-[38px] bg-brand-bg border-4 border-brand-bg overflow-hidden relative">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arisio"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-3 bg-brand-primary text-white rounded-2xl shadow-xl hover:bg-brand-accent transition-all hover:scale-110 active:scale-95 border-4 border-brand-card">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl font-black text-brand-text uppercase tracking-tighter">Arisio Andrade</h3>
                  <ShieldCheck className="w-5 h-5 text-brand-primary" />
                </div>
                <p className="text-brand-text-dim text-xs font-bold uppercase tracking-widest">arisio@dibaisales.com.br</p>
              </div>

              <div className="mt-8 pt-8 border-t border-brand-border w-full grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-3xl bg-brand-primary/5 border border-brand-primary/10">
                  <p className="text-[9px] font-black text-brand-text-dim uppercase tracking-widest mb-1">Membro Desde</p>
                  <p className="text-sm font-black text-brand-primary uppercase">Fev 2024</p>
                </div>
                <div className="text-center p-4 rounded-3xl bg-brand-primary/5 border border-brand-primary/10">
                  <p className="text-[9px] font-black text-brand-text-dim uppercase tracking-widest mb-1">Plano Atual</p>
                  <p className="text-sm font-black text-brand-primary uppercase flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-brand-primary" />
                    Pro
                  </p>
                </div>
              </div>

              <div className="w-full mt-8 space-y-3">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Perfil Completo</span>
                  <span className="text-[10px] font-black text-brand-primary uppercase">85%</span>
                </div>
                <div className="h-2 bg-brand-primary/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    className="h-full bg-brand-primary"
                  />
                </div>
                <p className="text-[9px] font-bold text-brand-text-dim/60 italic">Adicione sua empresa para atingir 100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card p-2 flex flex-wrap md:flex-nowrap gap-2 bg-brand-card/50 backdrop-blur-3xl sticky top-24 z-10 border border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative",
                  activeTab === tab.id
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                    : "text-brand-text-dim hover:text-brand-text hover:bg-brand-primary/5"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-12"
            >
              {activeTab === 'personal' && (
                <div className="space-y-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-2xl font-black text-brand-text uppercase tracking-tighter mb-2">Dados do Perfil</h4>
                      <p className="text-brand-text-dim font-medium text-sm">Atualize suas informações de contato e profissionais.</p>
                    </div>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3 group">
                        <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest group-focus-within:text-brand-primary transition-colors">Nome Completo</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim/40 group-focus-within:text-brand-primary transition-colors" />
                          <input
                            type="text"
                            defaultValue="Arísio Neto"
                            className="w-full pl-12 pr-6 py-4 bg-brand-bg/50 border border-brand-border rounded-2xl text-[13px] font-bold text-brand-text outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-3 group">
                        <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest group-focus-within:text-brand-primary transition-colors">Telefone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim/40 group-focus-within:text-brand-primary transition-colors" />
                          <input
                            type="text"
                            defaultValue="(11) 99999-9999"
                            className="w-full pl-12 pr-6 py-4 bg-brand-bg/50 border border-brand-border rounded-2xl text-[13px] font-bold text-brand-text outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 group">
                      <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest group-focus-within:text-brand-primary transition-colors">Empresa</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim/40 group-focus-within:text-brand-primary transition-colors" />
                        <input
                          type="text"
                          placeholder="Nome da sua empresa"
                          className="w-full pl-12 pr-6 py-4 bg-brand-bg/50 border border-brand-border rounded-2xl text-[13px] font-bold text-brand-text outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 group opacity-60">
                      <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Email Principal</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim/40" />
                        <input
                          type="email"
                          defaultValue="arisio@dibaisales.com.br"
                          disabled
                          className="w-full pl-12 pr-6 py-4 bg-brand-bg border border-brand-border rounded-2xl text-[13px] font-bold text-brand-text-dim/50 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-brand-primary text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-[0_15px_30px_rgba(var(--brand-primary-rgb),0.3)] disabled:opacity-50 active:scale-95 flex items-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Atualizando...
                          </>
                        ) : "Salvar Alterações"}
                      </button>

                      <AnimatePresence>
                        {showSuccess && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest"
                          >
                            <Check className="w-4 h-4" />
                            Dados salvos com sucesso
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-10">
                  <div>
                    <h4 className="text-2xl font-black text-brand-text uppercase tracking-tighter mb-2">Segurança da Conta</h4>
                    <p className="text-brand-text-dim font-medium text-sm">Gerencie sua senha e configurações de acesso.</p>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3 group">
                        <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest group-focus-within:text-brand-primary transition-colors">Nova Senha</label>
                        <input
                          type="password"
                          className="w-full px-6 py-4 bg-brand-bg/50 border border-brand-border rounded-2xl text-[13px] font-bold text-brand-text outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all"
                        />
                      </div>
                      <div className="space-y-3 group">
                        <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest group-focus-within:text-brand-primary transition-colors">Confirmar Senha</label>
                        <input
                          type="password"
                          className="w-full px-6 py-4 bg-brand-bg/50 border border-brand-border rounded-2xl text-[13px] font-bold text-brand-text outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-brand-primary text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-[0_15px_30px_rgba(var(--brand-primary-rgb),0.3)] disabled:opacity-50 active:scale-95 flex items-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Alterando...
                          </>
                        ) : "Alterar Senha"}
                      </button>
                    </div>
                  </form>

                  <div className="pt-8 border-t border-brand-border">
                    <h5 className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest mb-6 px-1">Dispositivos Conectados</h5>
                    <div className="space-y-4">
                      {[
                        { device: 'MacBook Pro 14"', city: 'Curitiba, Brasil', status: 'Sessão Atual', icon: Shield },
                        { device: 'iPhone 15 Pro', city: 'Curitiba, Brasil', status: 'Último acesso: 2h atrás', icon: Shield },
                      ].map((dev, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-brand-border hover:border-brand-primary/30 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center group-hover:border-brand-primary/30 transition-all">
                              <dev.icon className="w-5 h-5 text-brand-text-dim group-hover:text-brand-primary" />
                            </div>
                            <div>
                              <h6 className="font-bold text-brand-text group-hover:text-brand-primary transition-colors">{dev.device}</h6>
                              <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">{dev.city}</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary px-3 py-1 bg-brand-primary/5 rounded-lg">{dev.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-10">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-2xl font-black text-brand-text uppercase tracking-tighter mb-2">Assinatura</h4>
                      <p className="text-brand-text-dim font-medium text-sm">Gerencie seu plano e métodos de pagamento.</p>
                    </div>
                    <div className="px-5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">Ativo</div>
                  </div>

                  <div className="p-8 rounded-3xl bg-brand-primary text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-12">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Plano Atual</p>
                          <h5 className="text-3xl font-black tracking-tighter uppercase">Professional Pro</h5>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Próxima Fatura</p>
                          <h5 className="text-xl font-black tracking-tighter uppercase">12 Mar 2026</h5>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold opacity-60">R$</span>
                          <span className="text-5xl font-black tracking-tighter">297</span>
                          <span className="text-sm font-bold opacity-60">/mês</span>
                        </div>
                        <button className="px-8 py-3 bg-white text-brand-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                          Trocar Plano
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest px-1">Metodo de Pagamento</h5>
                    <div className="flex items-center justify-between p-6 rounded-2xl border border-brand-border bg-brand-bg/30">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-brand-text-dim" />
                        </div>
                        <div>
                          <h6 className="font-bold text-brand-text">•••• •••• •••• 8842</h6>
                          <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Expira em 08/29</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:text-brand-accent transition-colors">Editar</button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

