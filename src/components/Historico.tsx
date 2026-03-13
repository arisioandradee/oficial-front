import React from 'react';
import { 
  History as HistoryIcon, 
  Download, 
  Trash2, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Calendar as CalendarIcon,
  RefreshCcw,
  FileText,
  ExternalLink,
  Edit2,
  Check,
  X,
  User as UserIcon,
  Building2,
  Plus,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const historyItems = [
  { 
    id: 1, 
    title: 'RS - 1 CNAE(s)', 
    query: 'RS | 1 CNAE(s) | Sit: ATIVA',
    filters: ['RS', '1 CNAE(s)', 'Sit: ATIVA'],
    date: '12/03/2026', 
    time: '16:40:13',
    leads: 69, 
    newLeads: 18,
    cache: 2,
    lists: 1,
    user: 'Super Admin',
    org: 'Melhor Lead',
    status: 'completed'
  },
  { 
    id: 2, 
    title: 'SP - 1 CNAE(s)', 
    query: 'SP | 1 CNAE(s) | Sit: ATIVA',
    filters: ['SP', '1 CNAE(s)', 'Sit: ATIVA'],
    date: '12/03/2026', 
    time: '16:39:07',
    leads: 229, 
    newLeads: 16,
    cache: 4,
    lists: 0,
    user: 'Super Admin',
    org: 'Melhor Lead',
    status: 'completed'
  },
  { 
    id: 3, 
    title: 'Dibai', 
    query: 'Sem filtros',
    filters: [],
    date: '12/03/2026', 
    time: '16:36:05',
    leads: 0, 
    newLeads: 0,
    cache: 0,
    lists: 1,
    user: 'Super Admin',
    org: 'Melhor Lead',
    status: 'completed'
  },
  { 
    id: 4, 
    title: 'CE', 
    query: 'CE | Sit: ATIVA',
    filters: ['CE', 'Sit: ATIVA'],
    date: '10/03/2026', 
    time: '10:50:09',
    leads: 773473, 
    newLeads: 20,
    cache: 0,
    lists: 0,
    user: 'Super Admin',
    org: 'Melhor Lead',
    status: 'completed'
  },
  { 
    id: 5, 
    title: 'AC, AM, DF, MA - 2 CNAE(s)', 
    query: 'AC, AM, DF, MA | 2 CNAE(s) | Sit: ATIVA',
    filters: ['AC, AM, DF, MA', '2 CNAE(s)', 'Sit: ATIVA', '+4'],
    date: '09/03/2026', 
    time: '17:18:28',
    leads: 0, 
    newLeads: 0,
    cache: 0,
    lists: 0,
    user: 'userteste1',
    org: 'Melhor Lead',
    status: 'completed'
  }
];

export const Historico: React.FC = () => {
  const [items, setItems] = React.useState<any[]>(historyItems);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('Todos');
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const [selectedSearch, setSelectedSearch] = React.useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const filters = ['Todos', 'IA Search', 'Manual', 'Processando'];

  const handleEditStart = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const handleEditSave = (id: number) => {
    if (!editValue.trim()) return;
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, title: editValue.trim() } : item
    ));
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.query.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || 
                         (activeFilter === 'IA Search' && item.type === 'IA Search') ||
                         (activeFilter === 'Manual' && item.type === 'Manual') ||
                         (activeFilter === 'Processando' && item.status === 'processing');
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 pb-12 pt-24"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-10">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tighter text-brand-text uppercase leading-none">Historico de Buscas</h2>
          <p className="text-brand-text-dim text-[11px] font-medium">Todas as buscas realizadas por usuários da plataforma</p>
          <p className="text-brand-text-dim text-[11px] font-bold mt-2">35 busca(s) registrada(s)</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-bg border border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-text-dim hover:text-brand-text transition-all">
            <RefreshCcw className="w-3.5 h-3.5" />
            Atualizar
          </button>
        </div>
      </header>

      {/* History Table */}
      <div className="glass-card overflow-hidden">
        {filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-border text-[9px] font-black text-brand-text-dim uppercase tracking-widest bg-brand-bg/30">
                  <th className="py-4 px-4 whitespace-nowrap">Data/Hora</th>
                  <th className="py-4 px-4 whitespace-nowrap">Nome</th>
                  <th className="py-4 px-4 whitespace-nowrap">Filtros</th>
                  <th className="py-4 px-4 text-right whitespace-nowrap">Resultados</th>
                  <th className="py-4 px-4 text-right whitespace-nowrap">Novos</th>
                  <th className="py-4 px-4 text-right whitespace-nowrap">Cache</th>
                  <th className="py-4 px-4 text-center whitespace-nowrap">Listas</th>
                  <th className="py-4 px-4 whitespace-nowrap">Usuario</th>
                  <th className="py-4 px-4 whitespace-nowrap">Organizacao</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => {
                      if (editingId !== item.id) {
                        setSelectedSearch(item);
                        setIsDetailOpen(true);
                      }
                    }}
                    className={cn(
                      "border-b border-brand-border/30 transition-colors group",
                      editingId !== item.id ? "hover:bg-brand-hover/50 cursor-pointer" : "bg-brand-primary/[0.02]"
                    )}
                  >
                    <td className="py-4 px-4 text-[10px] font-bold text-brand-text-dim whitespace-nowrap">
                      {item.date}, {item.time}
                    </td>
                    <td className="py-4 px-4 text-[11px] font-black text-brand-text whitespace-nowrap">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-brand-bg border border-brand-primary rounded px-2 py-1 text-xs w-48 outline-none"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleEditSave(item.id);
                              if (e.key === 'Escape') handleEditCancel();
                            }}
                          />
                          <button onClick={() => handleEditSave(item.id)} className="p-1 hover:bg-emerald-500/10 rounded text-emerald-500">
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleEditCancel()} className="p-1 hover:bg-red-500/10 rounded text-red-500">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group/name">
                          {item.title}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStart(item.id, item.title);
                            }}
                            className="p-1.5 rounded-lg bg-brand-bg border border-brand-border opacity-0 group-hover/name:opacity-100 hover:text-brand-primary hover:border-brand-primary/30 transition-all shadow-sm"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 min-w-[200px]">
                      <div className="flex flex-wrap gap-1.5">
                        {item.filters && item.filters.length > 0 ? (
                          item.filters.map((filter: string, idx: number) => (
                            <span 
                              key={idx}
                              className="px-2 py-0.5 rounded-full bg-brand-bg border border-brand-border text-[9px] font-black text-brand-text-dim uppercase tracking-widest whitespace-nowrap"
                            >
                              {filter}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] italic text-brand-text-dim/50">Sem filtros</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-xs font-bold text-brand-text font-mono">
                      {item.leads > 0 ? item.leads.toLocaleString('pt-BR') : '--'}
                    </td>
                    <td className="py-4 px-4 text-right text-xs font-bold text-emerald-500 font-mono">
                      {item.newLeads > 0 ? item.newLeads : '--'}
                    </td>
                    <td className="py-4 px-4 text-right text-xs font-bold text-brand-primary font-mono">
                      {item.cache > 0 ? item.cache : '--'}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center border text-[10px] font-black",
                          item.lists > 0 
                            ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary" 
                            : "bg-brand-bg border-brand-border text-brand-text-dim opacity-30"
                        )}>
                          {item.lists}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-brand-text-dim whitespace-nowrap uppercase tracking-tighter">
                      {item.user}
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-brand-text-dim whitespace-nowrap uppercase tracking-tighter">
                      {item.org}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text-dim">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text">Nenhum resultado encontrado</h3>
              <p className="text-sm text-brand-text-dim">Tente ajustar seus filtros ou termo de pesquisa.</p>
            </div>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('Todos');
              }}
              className="text-xs font-bold text-brand-primary uppercase tracking-widest hover:underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isDetailOpen && selectedSearch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailOpen(false)}
              className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-brand-card border border-brand-border rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-brand-border flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-brand-text-dim" />
                  <h3 className="text-xl font-black text-brand-text uppercase tracking-tighter">{selectedSearch.title}</h3>
                </div>
                <button onClick={() => setIsDetailOpen(false)} className="p-2 hover:bg-brand-hover rounded-xl transition-colors">
                  <X className="w-5 h-5 text-brand-text-dim" />
                </button>
              </div>
              
              <div className="p-6 space-y-8 overflow-y-auto max-h-[80vh]">
                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-brand-text-dim uppercase tracking-wider">
                    <CalendarIcon className="w-4 h-4" />
                    {selectedSearch.date}, {selectedSearch.time}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-brand-text-dim uppercase tracking-wider">
                    <HistoryIcon className="w-4 h-4" />
                    {selectedSearch.leads.toLocaleString('pt-BR')} resultados
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-brand-text-dim uppercase tracking-wider">
                    <UserIcon className="w-4 h-4" />
                    {selectedSearch.user}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-brand-text-dim uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    {selectedSearch.org}
                  </div>
                </div>

                {/* Lead Summary Cards */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Leads Encontrados</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                        <Plus className="w-3 h-3" />
                        Novos
                      </div>
                      <p className="text-2xl font-black text-brand-text">{selectedSearch.newLeads || 0}</p>
                    </div>
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest">
                        <Database className="w-3 h-3" />
                        Já existentes
                      </div>
                      <p className="text-2xl font-black text-brand-text">{selectedSearch.cache || 0}</p>
                    </div>
                  </div>
                </div>

                {/* Generated Lists */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Listas Geradas</h4>
                  <div className="glass-card p-4 flex items-center justify-between group cursor-pointer hover:border-brand-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                        <FileText className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-text">Lista sem nome</p>
                        <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">1/1 leads</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-widest rounded-full border border-brand-primary/20">
                      Concluida
                    </span>
                  </div>
                </div>

                {/* Filters Used */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Filtros Utilizados</h4>
                  <div className="glass-card p-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-brand-text-dim uppercase tracking-widest">UF</p>
                      <p className="text-sm font-bold text-brand-text">{selectedSearch.filters?.[0] || '---'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-brand-text-dim uppercase tracking-widest">CNAE</p>
                      <p className="text-sm font-bold text-brand-text">1830003</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-brand-text-dim uppercase tracking-widest">Situacao Cadastral</p>
                      <p className="text-sm font-bold text-brand-text">ATIVA</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
