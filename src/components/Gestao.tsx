import React from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Users, 
  Zap, 
  CheckCircle2, 
  ChevronLeft,
  ChevronDown,
  X,
  Mail,
  Lock,
  User as UserIcon,
  Shield,
  LayoutGrid,
  Calendar,
  FileText,
  AlertCircle,
  Info,
  RefreshCcw,
  ExternalLink,
  ChevronRight,
  Database,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface User {
  id: string;
  nome: string;
  email: string;
  perfil: 'Administrador' | 'Interno' | 'Externo';
  status: 'Ativo' | 'Inativo';
  criadoEm: string;
  organizacao?: string;
}

interface Organization {
  id: string;
  nome: string;
  slug: string;
  usuariosCount: number;
  cotaLeads: string;
  status: 'Ativa' | 'Inativa';
  usuarios: User[];
}

interface LogEntry {
  id: string;
  nivel: 'Erro' | 'Info';
  data: string;
  hora: string;
  origem: string;
  mensagem: string;
  lista: string;
  organizacao: string;
  detalhes?: any;
}

const mockOrganizations: Organization[] = [
  {
    id: '1',
    nome: 'Empresa Exemplo',
    slug: 'empresa-exemplo',
    usuariosCount: 1,
    cotaLeads: '0 / 1.000',
    status: 'Ativa',
    usuarios: [
      {
        id: 'u1',
        nome: 'Org Admin',
        email: 'orgadmin@exemplo.com.br',
        perfil: 'Administrador',
        status: 'Ativo',
        criadoEm: '04/03/2026'
      }
    ]
  },
  {
    id: '2',
    nome: 'Melhor Lead',
    slug: 'melhor-lead',
    usuariosCount: 2,
    cotaLeads: '9 / 10.000',
    status: 'Ativa',
    usuarios: [
      {
        id: 'u2',
        nome: 'Admin Melhor Lead',
        email: 'admin@melhorlead.com.br',
        perfil: 'Administrador',
        status: 'Ativo',
        criadoEm: '01/03/2026'
      }
    ]
  }
];

const mockLogs: LogEntry[] = [
  {
    id: 'l1',
    nivel: 'Erro',
    data: '12/03/2026',
    hora: '16:41:29',
    origem: 'Descoberta de Website',
    mensagem: 'Erro de autenticacao no servico Descoberta de Website. Verifique as credenciais da API.',
    lista: '---',
    organizacao: '---',
    detalhes: {
        error: "Apify actor start failed (401): { \"error\": { \"type\": \"token-not-provided\", \"message\": \"Authentication token was not provided\" } }",
        jobId: "11",
        leadId: "7c5e8e6b-ff16-4d85-b397-90a382e9a38b",
        attempt: 3,
        jobName: "discover-website"
    }
  },
  {
    id: 'l2',
    nivel: 'Erro',
    data: '12/03/2026',
    hora: '16:41:25',
    origem: 'Descoberta de Website',
    mensagem: 'Erro de autenticacao no servico Descoberta de Website. Verifique as credenciais da API.',
    lista: '---',
    organizacao: '---'
  },
  {
    id: 'l3',
    nivel: 'Erro',
    data: '12/03/2026',
    hora: '16:41:23',
    origem: 'Descoberta de Website',
    mensagem: 'Erro de autenticacao no servico Descoberta de Website. Verifique as credenciais da API.',
    lista: '---',
    organizacao: '---'
  },
  {
    id: 'l4',
    nivel: 'Erro',
    data: '12/03/2026',
    hora: '16:36:12',
    origem: 'Descoberta de Website',
    mensagem: 'Erro de autenticacao no servico Descoberta de Website. Verifique as credenciais da API.',
    lista: '---',
    organizacao: '---'
  }
];

export const Gestao: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'organizacoes' | 'usuarios' | 'logs'>('organizacoes');
  const [view, setView] = React.useState<'list' | 'detail'>('list');
  const [selectedOrg, setSelectedOrg] = React.useState<Organization | null>(null);
  const [selectedLog, setSelectedLog] = React.useState<LogEntry | null>(null);
  
  const [isNewOrgModalOpen, setIsNewOrgModalOpen] = React.useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = React.useState(false);
  const [isAddBonusModalOpen, setIsAddBonusModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleBack = () => {
    setView('list');
    setSelectedOrg(null);
  };

  const navItems = [
    { id: 'organizacoes', label: 'Organizações', icon: Building2 },
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'logs', label: 'Logs de Processamento', icon: History },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] pt-16">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-bg border-r border-brand-border flex flex-col sticky top-16 h-[calc(100vh-4rem)]">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setView('list'); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                activeTab === item.id 
                  ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20" 
                  : "text-brand-text-dim hover:text-brand-text hover:bg-brand-hover"
              )}
            >
              <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-white" : "text-brand-text-dim")} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <motion.div 
          key={activeTab + view}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full px-4 py-12 space-y-8"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-border pb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-brand-text uppercase tracking-tighter leading-none">
                {navItems.find(i => i.id === activeTab)?.label}
              </h1>
              <p className="text-brand-text-dim text-sm font-medium">
                {activeTab === 'organizacoes' && 'Gerencie as conexões e limites de cada empresa'}
                {activeTab === 'usuarios' && 'Controle o acesso de todos os membros da plataforma'}
                {activeTab === 'logs' && 'Histórico de eventos e erros no processamento de listas'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {activeTab === 'logs' ? (
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-text-dim hover:text-brand-text transition-all">
                  <RefreshCcw className="w-3.5 h-3.5" />
                  Atualizar
                </button>
              ) : (
                <button 
                  onClick={() => activeTab === 'organizacoes' ? setIsNewOrgModalOpen(true) : setIsNewUserModalOpen(true)}
                  className="bg-brand-primary text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {activeTab === 'organizacoes' ? 'Nova Organização' : 'Novo Usuário'}
                </button>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="space-y-6">
            {activeTab === 'logs' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <div className="flex gap-2">
                     <div className="px-4 py-2 rounded-xl bg-brand-bg border border-brand-border flex items-center gap-2 cursor-pointer hover:bg-brand-hover transition-colors">
                        <span className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Todos os níveis</span>
                        <ChevronDown className="w-3 h-3 text-brand-text-dim" />
                     </div>
                     <div className="px-4 py-2 rounded-xl bg-brand-bg border border-brand-border flex items-center gap-2 cursor-pointer hover:bg-brand-hover transition-colors">
                        <span className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Todas as origens</span>
                        <ChevronDown className="w-3 h-3 text-brand-text-dim" />
                     </div>
                   </div>
                   <span className="text-[11px] font-bold text-brand-text-dim uppercase tracking-widest">{mockLogs.length} registro(s)</span>
                </div>

                <div className="glass-card overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-border text-[9px] font-black text-brand-text-dim uppercase tracking-widest bg-brand-bg/30">
                        <th className="py-4 px-6">Nível</th>
                        <th className="py-4 px-6">Data/Hora</th>
                        <th className="py-4 px-6">Origem</th>
                        <th className="py-4 px-6">Mensagem</th>
                        <th className="py-4 px-6">Lista</th>
                        <th className="py-4 px-6">Organizacao</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLogs.map((log) => (
                        <tr 
                          key={log.id} 
                          onClick={() => log.detalhes && setSelectedLog(log)}
                          className={cn(
                            "border-b border-brand-border/30 transition-colors group",
                            log.detalhes ? "cursor-pointer hover:bg-brand-hover/50" : "hover:bg-brand-hover/20"
                          )}
                        >
                          <td className="py-4 px-6">
                            <span className={cn(
                              "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit",
                              log.nivel === 'Erro' ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                            )}>
                              {log.nivel === 'Erro' ? <AlertCircle className="w-3 h-3" /> : <Info className="w-3 h-3" />}
                              {log.nivel}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-[10px] font-bold text-brand-text-dim">
                            {log.data}, {log.hora}
                          </td>
                          <td className="py-4 px-6 text-[11px] font-black text-brand-text uppercase tracking-tighter">
                            {log.origem}
                          </td>
                          <td className="py-4 px-6 text-xs font-medium text-brand-text-dim max-w-md truncate">
                            {log.mensagem}
                          </td>
                          <td className="py-4 px-6 text-[10px] font-bold text-brand-text-dim">
                            {log.lista}
                          </td>
                          <td className="py-4 px-6 text-[10px] font-bold text-brand-text-dim">
                            {log.organizacao}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
                <div className="glass-card overflow-hidden">
                   {/* Table content for Orgs/Users remains active through state but now cleaner */}
                   {activeTab === 'organizacoes' ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-brand-border bg-brand-bg/50">
                                    <th className="p-6 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Nome</th>
                                    <th className="p-6 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Slug</th>
                                    <th className="p-6 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Status</th>
                                    <th className="p-6 text-[10px] font-black text-brand-text-dim uppercase tracking-widest text-right">Controles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockOrganizations.map((org) => (
                                    <tr key={org.id} className="border-b border-brand-border hover:bg-brand-hover/50 transition-colors">
                                        <td className="p-6">
                                            <p className="text-sm font-bold text-brand-text">{org.nome}</p>
                                        </td>
                                        <td className="p-6 text-xs text-brand-text-dim">{org.slug}</td>
                                        <td className="p-6">
                                            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                                                {org.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">Gerenciar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                   ) : (
                      <div className="p-12 text-center space-y-4">
                         <Users className="w-12 h-12 text-brand-text-dim/20 mx-auto" />
                         <p className="text-brand-text-dim text-sm font-medium">Selecione uma organização para gerenciar usuários</p>
                      </div>
                   )}
                </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Log Detail Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLog(null)}
              className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0c] border border-brand-border rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-brand-border flex justify-between items-center bg-red-500/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-brand-text uppercase tracking-tighter">{selectedLog.origem}</h3>
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Evento de Erro Crítico</p>
                  </div>
                </div>
                <button onClick={() => setSelectedLog(null)} className="p-2 hover:bg-brand-hover rounded-xl transition-colors">
                  <X className="w-5 h-5 text-brand-text-dim" />
                </button>
              </div>
              
              <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
                <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Mensagem</h4>
                    <p className="text-sm font-bold text-brand-text leading-relaxed">{selectedLog.mensagem}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Data/Hora</p>
                        <p className="text-xs font-bold text-brand-text">{selectedLog.data}, {selectedLog.hora}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">ID do Evento</p>
                        <p className="text-xs font-bold text-brand-text font-mono truncate">{selectedLog.id}</p>
                    </div>
                </div>

                {selectedLog.detalhes && (
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Detalhes Técnicos Raw</h4>
                        <div className="bg-[#050505] border border-brand-border rounded-2xl p-6 overflow-x-auto">
                            <pre className="text-[11px] font-mono text-brand-text-dim leading-relaxed">
                                {JSON.stringify(selectedLog.detalhes, null, 4)}
                            </pre>
                        </div>
                    </div>
                )}
              </div>

              <div className="p-6 border-t border-brand-border bg-brand-bg/30 flex justify-end gap-3">
                 <button className="px-8 py-3 rounded-xl border border-brand-border text-[10px] font-black text-brand-text uppercase tracking-widest hover:bg-brand-hover transition-all">
                    Copiar Detalhes
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Other Modals (Reuse placeholders or existing) */}
      <AnimatePresence>
        {isNewOrgModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsNewOrgModalOpen(false)} className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass-card p-8">
                    <h3 className="text-xl font-black text-brand-text uppercase mb-6">Nova Organização</h3>
                    <div className="space-y-4">
                        <input type="text" placeholder="Nome da Empresa" className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 outline-none" />
                        <button className="w-full bg-brand-primary text-white py-4 rounded-xl font-black uppercase text-xs">Criar agora</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};
