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
  Clock,
  Calendar as CalendarIcon,
  FileText,
  ExternalLink,
  Edit2,
  Check,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const historyItems = [
  { 
    id: 1, 
    title: 'Prospecção de Imobiliárias em São Paulo', 
    query: 'CNAE: 6821800, 6810200 | UF: SP | Capital > 100k',
    date: '27/02/2026', 
    time: '14:30',
    leads: 142, 
    status: 'completed',
    type: 'IA Search',
    category: 'Imobiliário'
  },
  { 
    id: 2, 
    title: 'Desenvolvedores de Software - Região Sul', 
    query: 'CNAE: 6201500 | UF: PR, RS, SC | Empresas Ativas',
    date: '27/02/2026', 
    time: '11:15',
    leads: 85, 
    status: 'completed',
    type: 'Manual',
    category: 'Tecnologia'
  },
  { 
    id: 3, 
    title: 'Indústrias Têxteis em Minas Gerais', 
    query: 'CNAE: 1321900 | UF: MG | Matriz',
    date: '26/02/2026', 
    time: '16:45',
    leads: 23, 
    status: 'completed',
    type: 'IA Search',
    category: 'Indústria'
  },
  { 
    id: 4, 
    title: 'Consultorias Financeiras - Rio de Janeiro', 
    query: 'CNAE: 7020400 | UF: RJ | Com E-mail',
    date: '25/02/2026', 
    time: '09:20',
    leads: 0, 
    status: 'processing',
    type: 'IA Search',
    category: 'Finanças'
  },
  { 
    id: 5, 
    title: 'Varejo de Alimentos - Fortaleza', 
    query: 'CNAE: 4711302 | Município: FORTALEZA | Ativas',
    date: '25/02/2026', 
    time: '08:10',
    leads: 312, 
    status: 'completed',
    type: 'Manual',
    category: 'Varejo'
  },
  { 
    id: 6, 
    title: 'Clínicas Odontológicas - Curitiba', 
    query: 'CNAE: 8630504 | UF: PR | Capital > 50k',
    date: '24/02/2026', 
    time: '15:20',
    leads: 56, 
    status: 'completed',
    type: 'IA Search',
    category: 'Saúde'
  },
  { 
    id: 7, 
    title: 'Escritórios de Advocacia - Brasília', 
    query: 'CNAE: 6911701 | UF: DF | Natureza: 223-2',
    date: '23/02/2026', 
    time: '10:05',
    leads: 128, 
    status: 'completed',
    type: 'Manual',
    category: 'Jurídico'
  },
];

export const Historico: React.FC = () => {
  const [items, setItems] = React.useState<any[]>(historyItems);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('Todos');
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editValue, setEditValue] = React.useState('');

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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
              <HistoryIcon className="w-5 h-5 text-brand-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-brand-text">HISTÓRICO</h2>
          </div>
          <p className="text-brand-text-dim font-medium ml-1">Gerencie suas consultas e exporte relatórios de inteligência.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none glass-card px-6 py-3 flex items-center justify-center gap-3 text-xs font-black tracking-widest uppercase hover:bg-brand-hover transition-all">
            <Download className="w-4 h-4 text-brand-primary" />
            Exportar Tudo
          </button>
          <button 
            onClick={async () => {
              if (confirm('Deseja limpar todo o histórico?')) {
                // In a real app, we'd have an API for this
                setItems([]);
              }
            }}
            className="flex-1 md:flex-none bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-3 flex items-center justify-center gap-3 text-xs font-black tracking-widest uppercase hover:bg-red-500/20 transition-all rounded-xl"
          >
            <Trash2 className="w-4 h-4" />
            Limpar
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="glass-card p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full lg:w-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-2 rounded-lg text-[11px] font-bold tracking-wider transition-all",
                activeFilter === f 
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                  : "text-brand-text-dim hover:text-brand-primary hover:bg-brand-hover"
              )}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
          <input 
            type="text" 
            placeholder="Pesquisar no histórico..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-bg border border-brand-border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:border-brand-primary outline-none transition-all placeholder:text-brand-text-dim/50"
          />
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="glass-card overflow-hidden group hover:border-brand-primary/40 transition-all duration-300"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5 flex-1">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-colors",
                    item.type === 'IA Search' 
                      ? "bg-brand-primary/10 border-brand-primary/20 text-brand-primary" 
                      : "bg-brand-card border-brand-border text-brand-text-dim"
                  )}>
                    {item.type === 'IA Search' ? <Sparkles className="w-6 h-6" /> : <Filter className="w-6 h-6" />}
                  </div>
                  
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                          <input
                            autoFocus
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleEditSave(item.id);
                              if (e.key === 'Escape') handleEditCancel();
                            }}
                            onBlur={() => {
                              setTimeout(() => {
                                if (editingId === item.id) handleEditCancel();
                              }, 200);
                            }}
                            className="flex-1 bg-brand-bg border border-brand-primary rounded-lg px-3 py-1 text-lg font-bold outline-none text-brand-text"
                          />
                          <button 
                            onClick={() => handleEditSave(item.id)}
                            className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={handleEditCancel}
                            className="p-1.5 bg-brand-bg border border-brand-border text-brand-text-dim rounded-lg hover:bg-brand-hover transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-bold text-lg tracking-tight group-hover:text-brand-primary transition-colors text-brand-text">
                            {item.title}
                          </h4>
                          <button 
                            onClick={() => handleEditStart(item.id, item.title)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-brand-text-dim hover:text-brand-primary transition-all"
                            title="Renomear Busca"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      {item.category && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-primary/5 text-brand-primary text-[9px] font-bold uppercase tracking-wider border border-brand-primary/10">
                          {item.category}
                        </span>
                      )}

                      <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                        item.status === 'completed' 
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse"
                      )}>
                        {item.status === 'completed' ? 'Concluído' : 'Processando'}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-brand-text-dim line-clamp-1 opacity-80">{item.query}</p>
                    
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-text-dim/60 uppercase tracking-wider">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-text-dim/60 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        {item.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-primary uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5" />
                        {item.type}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-brand-border pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest mb-0.5">Leads Encontrados</p>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-2xl font-bold tracking-tight font-mono text-brand-text">
                        {item.status === 'processing' ? '--' : item.leads}
                      </span>
                      {item.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      title="Refazer Busca"
                      className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text-dim hover:text-brand-primary hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button 
                      title="Ver Resultados"
                      className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      title="Excluir Lead"
                      className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar for processing items */}
              {item.status === 'processing' && (
                <div className="h-1 w-full bg-brand-bg">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="h-full bg-brand-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-4">
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

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <button className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center text-brand-text-dim hover:text-brand-primary transition-all">1</button>
        <button className="w-8 h-8 rounded-lg hover:bg-brand-hover flex items-center justify-center text-brand-text-dim transition-all">2</button>
        <button className="w-8 h-8 rounded-lg hover:bg-brand-hover flex items-center justify-center text-brand-text-dim transition-all">3</button>
        <span className="text-brand-text-dim px-2">...</span>
        <button className="w-8 h-8 rounded-lg hover:bg-brand-hover flex items-center justify-center text-brand-text-dim transition-all">12</button>
      </div>
    </motion.div>
  );
};
