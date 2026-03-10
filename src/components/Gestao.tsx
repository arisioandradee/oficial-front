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
  ChevronUp,
  X,
  Mail,
  Lock,
  User as UserIcon,
  Shield,
  ToggleLeft as Toggle,
  LayoutGrid
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
      },
      {
        id: 'u3',
        nome: 'Vendedor 1',
        email: 'vendedor1@melhorlead.com.br',
        perfil: 'Interno',
        status: 'Ativo',
        criadoEm: '05/03/2026'
      }
    ]
  }
];

const allUsers: User[] = [
  {
    id: 'u1',
    nome: 'Org Admin',
    email: 'orgadmin@exemplo.com.br',
    perfil: 'Administrador',
    status: 'Ativo',
    criadoEm: '04/03/2026',
    organizacao: 'Empresa Exemplo'
  },
  {
    id: 'u2',
    nome: 'Admin Melhor Lead',
    email: 'admin@melhorlead.com.br',
    perfil: 'Administrador',
    status: 'Ativo',
    criadoEm: '01/03/2026',
    organizacao: 'Melhor Lead'
  },
  {
    id: 'u3',
    nome: 'Vendedor 1',
    email: 'vendedor1@melhorlead.com.br',
    perfil: 'Interno',
    status: 'Ativo',
    criadoEm: '05/03/2026',
    organizacao: 'Melhor Lead'
  }
];

export const Gestao: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'organizacoes' | 'usuarios'>('organizacoes');
  const [view, setView] = React.useState<'list' | 'detail'>('list');
  const [selectedOrg, setSelectedOrg] = React.useState<Organization | null>(null);
  const [isNewOrgModalOpen, setIsNewOrgModalOpen] = React.useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleOpenOrg = (org: Organization) => {
    setSelectedOrg(org);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedOrg(null);
  };

  const filteredOrgs = mockOrganizations.filter(org => 
    org.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    org.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = allUsers.filter(user => 
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organizacao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 pb-12 pt-24"
    >
      <header className="flex flex-col items-center text-center gap-4 mt-10">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-brand-text uppercase leading-none mb-2">Gestão</h2>
          <p className="text-brand-text-dim font-medium max-w-2xl mx-auto">
            Gerencie as organizações e usuários da plataforma em um só lugar.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-brand-bg border border-brand-border rounded-2xl w-fit mx-auto">
        <button
          onClick={() => { setActiveTab('organizacoes'); setView('list'); }}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'organizacoes' 
              ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
              : "text-brand-text-dim hover:text-brand-text hover:bg-brand-hover"
          )}
        >
          <Building2 className="w-4 h-4" />
          Organizações
        </button>
        <button
          onClick={() => setActiveTab('usuarios')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'usuarios' 
              ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
              : "text-brand-text-dim hover:text-brand-text hover:bg-brand-hover"
          )}
        >
          <Users className="w-4 h-4" />
          Usuários
        </button>
      </div>

      <div className="space-y-8">
        {activeTab === 'organizacoes' ? (
          view === 'list' ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar organizações..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:border-brand-primary outline-none transition-all placeholder:text-brand-text-dim/50"
                  />
                </div>
                <button 
                  onClick={() => setIsNewOrgModalOpen(true)}
                  className="bg-brand-primary text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nova Organização
                </button>
              </div>

              <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-bg/50">
                      <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Nome</th>
                      <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Slug</th>
                      <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Usuários</th>
                      <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Cota de Leads</th>
                      <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Status</th>
                      <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrgs.map((org) => (
                      <tr key={org.id} className="border-b border-brand-border hover:bg-brand-hover transition-colors group">
                        <td className="p-4">
                          <button 
                            onClick={() => handleOpenOrg(org)}
                            className="text-sm font-bold text-brand-primary hover:underline"
                          >
                            {org.nome}
                          </button>
                        </td>
                        <td className="p-4 text-xs font-medium text-brand-text-dim">{org.slug}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-xs font-bold text-brand-text">
                            <Users className="w-3.5 h-3.5 text-brand-text-dim" />
                            {org.usuariosCount}
                          </div>
                        </td>
                        <td className="p-4 text-xs font-bold text-brand-text">{org.cotaLeads}</td>
                        <td className="p-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                            org.status === 'Ativa' ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                          )}>
                            {org.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-3">
                            <button 
                              onClick={() => handleOpenOrg(org)}
                              className="text-[10px] font-black text-brand-text-dim hover:text-brand-primary uppercase tracking-widest transition-colors"
                            >
                              Editar
                            </button>
                            <button className="flex items-center justify-center">
                              <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative border border-emerald-500/30">
                                <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                              </div>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:gap-3 transition-all w-fit"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar para lista
              </button>
              
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black tracking-tighter text-brand-text uppercase leading-none">{selectedOrg?.nome}</h2>
                <p className="text-brand-text-dim text-xs font-medium uppercase tracking-widest">Slug: {selectedOrg?.slug}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                    <Users className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest mb-1">Usuários</p>
                    <p className="text-2xl font-black text-brand-text">{selectedOrg?.usuariosCount}</p>
                  </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                    <Zap className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest mb-1">Cota de Leads</p>
                    <p className="text-2xl font-black text-brand-text">{selectedOrg?.cotaLeads}</p>
                  </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                    <CheckCircle2 className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest mb-1">Status</p>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border bg-brand-primary/10 text-brand-primary border-brand-primary/20">
                      {selectedOrg?.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h3 className="text-xl font-black text-brand-text uppercase tracking-tighter">Usuários da Organização</h3>
                  <button 
                    onClick={() => setIsNewUserModalOpen(true)}
                    className="bg-brand-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2"
                  >
                    <Plus className="w-3 h-3" />
                    Novo Usuário
                  </button>
                </div>

                <div className="glass-card overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-border bg-brand-bg/50">
                        <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Nome</th>
                        <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Email</th>
                        <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Perfil</th>
                        <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Status</th>
                        <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Criado em</th>
                        <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrg?.usuarios.map((user) => (
                        <tr key={user.id} className="border-b border-brand-border hover:bg-brand-hover transition-colors group">
                          <td className="p-4 text-sm font-bold text-brand-text">{user.nome}</td>
                          <td className="p-4 text-xs font-medium text-brand-text-dim">{user.email}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full bg-brand-bg border border-brand-border text-[9px] font-bold text-brand-text-dim uppercase tracking-wider">
                              {user.perfil}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                              user.status === 'Ativo' ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                            )}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 text-xs font-medium text-brand-text-dim">{user.criadoEm}</td>
                          <td className="p-4">
                            <div className="flex items-center justify-end gap-3">
                              <button className="text-brand-text-dim hover:text-brand-primary transition-colors">
                                <UserIcon className="w-4 h-4" />
                              </button>
                              <button className="flex items-center justify-center">
                                <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative border border-emerald-500/30">
                                  <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                                </div>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                <input 
                  type="text" 
                  placeholder="Pesquisar usuários..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:border-brand-primary outline-none transition-all placeholder:text-brand-text-dim/50"
                />
              </div>
              <button 
                onClick={() => setIsNewUserModalOpen(true)}
                className="bg-brand-primary text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Novo Usuário
              </button>
            </div>

            <div className="glass-card overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-bg/50">
                    <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Nome</th>
                    <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Email</th>
                    <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Organização</th>
                    <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Perfil</th>
                    <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Status</th>
                    <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-brand-border hover:bg-brand-hover transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">
                            {user.nome.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-brand-text">{user.nome}</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs font-medium text-brand-text-dim">{user.email}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-text">
                          <Building2 className="w-3.5 h-3.5 text-brand-text-dim" />
                          {user.organizacao}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full bg-brand-bg border border-brand-border text-[9px] font-bold text-brand-text-dim uppercase tracking-wider">
                          {user.perfil}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                          user.status === 'Ativo' ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                        )}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-3">
                          <button className="text-brand-text-dim hover:text-brand-primary transition-colors">
                            <UserIcon className="w-4 h-4" />
                          </button>
                          <button className="flex items-center justify-center">
                            <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative border border-emerald-500/30">
                              <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Modals (Reused from previous implementation) */}
      <AnimatePresence>
        {isNewOrgModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewOrgModalOpen(false)}
              className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-brand-card border border-brand-border rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-brand-border flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-brand-text uppercase tracking-tighter">Nova Organização</h3>
                  <p className="text-xs text-brand-text-dim font-medium">Preencha os dados da nova empresa.</p>
                </div>
                <button onClick={() => setIsNewOrgModalOpen(false)} className="p-2 hover:bg-brand-hover rounded-xl transition-colors">
                  <X className="w-5 h-5 text-brand-text-dim" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Nome</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                    <input 
                      type="text" 
                      placeholder="Nome da empresa"
                      className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Slug</label>
                  <div className="relative">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                    <input 
                      type="text" 
                      placeholder="empresa-exemplo"
                      className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Cota de Leads</label>
                  <div className="relative">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                    <input 
                      type="number" 
                      placeholder="1000"
                      className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setIsNewOrgModalOpen(false)}
                  className="w-full bg-brand-primary text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 mt-4"
                >
                  Criar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNewUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewUserModalOpen(false)}
              className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-brand-card border border-brand-border rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-brand-border flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-brand-text uppercase tracking-tighter">Novo Usuário</h3>
                  <p className="text-xs text-brand-text-dim font-medium">Preencha os dados para adicionar um usuário.</p>
                </div>
                <button onClick={() => setIsNewUserModalOpen(false)} className="p-2 hover:bg-brand-hover rounded-xl transition-colors">
                  <X className="w-5 h-5 text-brand-text-dim" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Nome</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                    <input 
                      type="text" 
                      placeholder="Nome completo"
                      className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                    <input 
                      type="email" 
                      placeholder="email@exemplo.com"
                      className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Perfil</label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                    <select className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer">
                      <option value="Interno">Interno</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Externo">Externo</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim pointer-events-none" />
                  </div>
                </div>
                {!selectedOrg && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Organização</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                      <select className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-brand-text outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer">
                        <option value="">Selecione uma organização</option>
                        {mockOrganizations.map(org => (
                          <option key={org.id} value={org.id}>{org.nome}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim pointer-events-none" />
                    </div>
                  </div>
                )}
                <button 
                  onClick={() => setIsNewUserModalOpen(false)}
                  className="w-full bg-brand-primary text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 mt-4"
                >
                  Criar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
