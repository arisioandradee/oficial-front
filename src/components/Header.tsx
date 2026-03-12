import React from 'react';
import { cn } from '../lib/utils';
import { 
  Bell, 
  ChevronDown, 
  User, 
  Sun, 
  Moon, 
  LogOut,
  Target,
  BarChart3,
  Search,
  Clock,
  Zap,
  ShieldCheck,
  Sparkles,
  FileText,
  Database,
  Building2,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
  hideNav?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, theme, toggleTheme, onLogout, hideNav = false }) => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isUpdatesOpen, setIsUpdatesOpen] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  const updatesRef = React.useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'busca', label: 'Busca', icon: Search },
    { id: 'enriquecimento', label: 'Enriquecimento', icon: Database },
    { id: 'historico', label: 'Histórico', icon: Clock },
    { id: 'disparo-importar', label: 'Mensagens', icon: Zap },
    { id: 'gestao', label: 'Gestão', icon: ShieldCheck },
  ];

  const updateNotes = [
    { date: '05/03/2026', title: 'Atualização Visual', description: 'Nova interface do dashboard e melhorias na navegação.' },
    { date: '01/03/2026', title: 'Inteligência Artificial', description: 'Melhoria no algoritmo de mineração de leads.' },
  ];

  const notifications = [
    { id: 1, text: 'Veja a nota de atualização do dia 05/03/2026', time: 'Agora', type: 'update' },
    { id: 2, text: 'Seu relatório de leads está pronto para exportação.', time: '2h atrás', type: 'system' },
    { id: 3, text: 'Nova empresa encontrada baseada no seu perfil.', time: '5h atrás', type: 'lead' },
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (updatesRef.current && !updatesRef.current.contains(event.target as Node)) {
        setIsUpdatesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-40 h-16 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border shadow-sm transition-all duration-300"
      >
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center transition-all bg-transparent shrink-0">
              <img 
                src={theme === 'light' ? "/logoNavPreta.png" : "/favicon.png"} 
                alt="Melhor Lead" 
                className={cn("object-contain transition-all", theme === 'light' ? "w-11 h-11 translate-y-[1px]" : "w-10 h-10")} 
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-sm tracking-tight leading-none text-brand-text">MELHOR LEAD</h1>
              <p className="text-[8px] text-brand-primary font-bold tracking-widest">INTELIGÊNCIA B2B</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          {!hideNav && (
            <nav className="flex items-center bg-brand-hover/40 p-1 rounded-full border border-brand-border/50">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-200 text-[11px] font-bold tracking-wider uppercase",
                    activeTab === item.id 
                      ? "bg-brand-card text-brand-primary shadow-sm border border-brand-border" 
                      : "text-brand-text-dim hover:text-brand-text hover:bg-brand-hover/50"
                  )}
                >
                  <item.icon className={cn("w-3.5 h-3.5", activeTab === item.id ? "text-brand-primary" : "text-brand-text-dim")} />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          {/* Unified Action & Profile Capsule */}
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex items-center gap-1 p-1 bg-brand-card/50 border border-brand-border rounded-full shadow-sm transition-all duration-200",
              (isProfileOpen || isNotificationsOpen || isUpdatesOpen) && "border-brand-primary bg-brand-card shadow-lg"
            )}>
              {/* Theme Toggle Button (Always visible for accessibility) */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-brand-text-dim hover:text-brand-text hover:bg-brand-hover transition-all duration-200"
                title="Alternar tema"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {!hideNav && (
                <>
                  {/* Update Notes Dropdown */}
                  <div className="relative" ref={updatesRef}>
                    <button 
                      onClick={() => {
                        setIsUpdatesOpen(!isUpdatesOpen);
                        setIsNotificationsOpen(false);
                        setIsProfileOpen(false);
                      }}
                      className={cn(
                        "p-2 rounded-full transition-all duration-200 relative",
                        isUpdatesOpen ? "bg-brand-primary/10 text-brand-primary" : "text-brand-text-dim hover:text-brand-text hover:bg-brand-hover"
                      )}
                    >
                      <FileText className="w-4 h-4" />
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                    </button>

                    <AnimatePresence>
                      {isUpdatesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-80 bg-brand-card border border-brand-border rounded-2xl shadow-[var(--brand-shadow)] overflow-hidden z-50"
                        >
                          <div className="p-4 border-b border-brand-border bg-brand-primary/5">
                            <h4 className="text-xs font-black text-brand-primary uppercase tracking-widest flex items-center gap-2">
                              <Sparkles className="w-3 h-3" />
                              Notas de Atualização
                            </h4>
                          </div>
                          <div className="max-h-[400px] overflow-y-auto p-2">
                            {updateNotes.map((note, idx) => (
                              <div key={idx} className="p-3 rounded-xl hover:bg-brand-hover transition-colors group">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{note.date}</span>
                                  <span className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Novidade</span>
                                </div>
                                <h5 className="text-sm font-bold text-brand-text mb-1">{note.title}</h5>
                                <p className="text-xs text-brand-text-dim font-medium leading-relaxed">{note.description}</p>
                              </div>
                            ))}
                          </div>
                          <div className="p-3 bg-brand-bg/50 border-t border-brand-border">
                            <button className="w-full py-2 text-[10px] font-black text-brand-text-dim hover:text-brand-primary uppercase tracking-widest transition-colors">
                              Ver histórico completo
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Notifications Dropdown */}
                  <div className="relative" ref={notificationsRef}>
                    <button 
                      onClick={() => {
                        setIsNotificationsOpen(!isNotificationsOpen);
                        setIsUpdatesOpen(false);
                        setIsProfileOpen(false);
                      }}
                      className={cn(
                        "p-2 rounded-full transition-all duration-200 relative",
                        isNotificationsOpen ? "bg-brand-primary/10 text-brand-primary" : "text-brand-text-dim hover:text-brand-text hover:bg-brand-hover"
                      )}
                    >
                      <Bell className="w-4 h-4" />
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-primary rounded-full" />
                    </button>

                    <AnimatePresence>
                      {isNotificationsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-80 bg-brand-card border border-brand-border rounded-2xl shadow-[var(--brand-shadow)] overflow-hidden z-50"
                        >
                          <div className="p-4 border-b border-brand-border bg-brand-primary/5">
                            <h4 className="text-xs font-black text-brand-primary uppercase tracking-widest">Notificações</h4>
                          </div>
                          <div className="max-h-[400px] overflow-y-auto">
                            {notifications.map((notif) => (
                              <button 
                                key={notif.id}
                                className="w-full p-4 text-left hover:bg-brand-hover transition-colors border-b border-brand-border last:border-0 group"
                              >
                                <div className="flex justify-between items-start mb-1">
                                  <span className={cn(
                                    "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded",
                                    notif.type === 'update' ? "bg-brand-primary/10 text-brand-primary" : "bg-brand-bg text-brand-text-dim"
                                  )}>
                                    {notif.type === 'update' ? 'Atualização' : 'Sistema'}
                                  </span>
                                  <span className="text-[9px] font-bold text-brand-text-dim uppercase tracking-widest">{notif.time}</span>
                                </div>
                                <p className="text-xs font-bold text-brand-text leading-relaxed group-hover:text-brand-primary transition-colors">
                                  {notif.text}
                                </p>
                              </button>
                            ))}
                          </div>
                          <div className="p-3 bg-brand-bg/50 border-t border-brand-border">
                            <button className="w-full py-2 text-[10px] font-black text-brand-text-dim hover:text-brand-primary uppercase tracking-widest transition-colors">
                              Marcar todas como lidas
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => {
                        setIsProfileOpen(!isProfileOpen);
                        setIsUpdatesOpen(false);
                        setIsNotificationsOpen(false);
                      }}
                      className="flex items-center gap-2 pl-1 pr-2 hover:bg-brand-hover rounded-full transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-sm">
                        A
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-brand-text-dim transition-transform duration-200", isProfileOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-80 bg-brand-card border border-brand-border rounded-2xl shadow-[var(--brand-shadow)] overflow-hidden z-50"
                        >
                          {/* User Info Header */}
                          <div className="p-6 flex items-center gap-4 border-b border-brand-border">
                            <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-2xl">
                              A
                            </div>
                            <div>
                              <h4 className="text-lg font-black text-brand-text leading-tight">Arisio</h4>
                              <p className="text-sm text-brand-text-dim font-medium">arisiosaf@gmail.com</p>
                            </div>
                          </div>

                          {/* Menu Options */}
                          <div className="p-2 border-b border-brand-border">
                            <button 
                              onClick={() => {
                                setActiveTab('account');
                                setIsProfileOpen(false);
                              }}
                              className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brand-hover transition-colors group text-left",
                                activeTab === 'account' ? "text-brand-primary bg-brand-hover/50" : "text-brand-text-dim hover:text-brand-text"
                              )}
                            >
                              <User className={cn("w-4 h-4", activeTab === 'account' ? "text-brand-primary" : "group-hover:text-brand-primary")} />
                              <span className="text-sm font-bold">Minha conta</span>
                            </button>
                            <button 
                              onClick={() => {
                                setActiveTab('planos');
                                setIsProfileOpen(false);
                              }}
                              className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brand-hover transition-colors group text-left",
                                activeTab === 'planos' ? "text-brand-primary bg-brand-hover/50" : "text-brand-text-dim hover:text-brand-text"
                              )}
                            >
                              <ShieldCheck className={cn("w-4 h-4", activeTab === 'planos' ? "text-brand-primary" : "group-hover:text-brand-primary")} />
                              <span className="text-sm font-bold">Planos</span>
                            </button>
                          </div>

                          {/* Theme Toggle */}
                          <div className="p-4 border-b border-brand-border">
                            <p className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest mb-3">Configuração do menu</p>
                            <div className="flex p-1 bg-brand-bg/50 rounded-xl border border-brand-border">
                              <button 
                                onClick={() => theme !== 'light' && toggleTheme()}
                                className={cn(
                                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all",
                                  theme === 'light' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-dim hover:text-brand-text"
                                )}
                              >
                                <Sun className="w-4 h-4" />
                                Claro
                              </button>
                              <button 
                                onClick={() => theme !== 'dark' && toggleTheme()}
                                className={cn(
                                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all",
                                  theme === 'dark' ? "bg-brand-card text-brand-primary shadow-sm" : "text-brand-text-dim hover:text-brand-text"
                                )}
                              >
                                <Moon className="w-4 h-4" />
                                Escuro
                              </button>
                            </div>
                          </div>

                          {/* Logout */}
                          <div className="p-2">
                            <button 
                              onClick={() => setShowLogoutConfirm(true)}
                              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-brand-text-dim hover:text-red-500 transition-colors group"
                            >
                              <LogOut className="w-4 h-4" />
                              <span className="text-sm font-bold">Sair</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-brand-bg/80 backdrop-blur-xl cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-[calc(100%-3rem)] max-w-sm glass-card p-10 flex flex-col items-center text-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-brand-primary/20 bg-brand-card/50"
            >
              <div className="w-20 h-20 rounded-[32px] bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20">
                <LogOut className="w-10 h-10 text-red-500" />
              </div>
              
              <h3 className="text-2xl font-black text-brand-text uppercase tracking-tighter mb-4">Deseja realmente sair?</h3>
              <p className="text-sm font-medium text-brand-text-dim mb-10 leading-relaxed">
                Você será desconectado da sua conta. Precisará entrar novamente para acessar seus leads.
              </p>
              
              <div className="flex flex-col w-full gap-4">
                <button 
                  onClick={onLogout}
                  className="w-full py-5 bg-red-500 text-white rounded-[20px] text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                >
                  Confirmar saída
                </button>
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-5 bg-brand-bg border border-brand-border text-brand-text-dim rounded-[20px] text-[11px] font-black uppercase tracking-widest hover:bg-brand-hover hover:text-brand-text transition-all active:scale-95"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
