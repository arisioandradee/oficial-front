import React from 'react';
import { 
  FileText, 
  Upload, 
  Trash2, 
  Play, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  Mail, 
  User, 
  Globe, 
  Instagram, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  RefreshCcw,
  Edit2,
  Phone,
  FileSpreadsheet,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface LeadEnriquecido {
  id: string;
  cnpj: string;
  razaoSocial: string;
  uf: string;
  porte: string;
  contato: number;
  digital: number;
  status: 'Rico' | 'Pobre' | 'Pendente';
  socios: {
    nome: string;
    telefone: string;
    whatsapp: string;
    email: string;
  }[];
}

const mockLeads: LeadEnriquecido[] = [
  {
    id: '1',
    cnpj: '51.903.665/0001-46',
    razaoSocial: 'DIBAI SALES ASSESSORIA LTDA',
    uf: 'RS',
    porte: '-',
    contato: 100,
    digital: 0,
    status: 'Rico',
    socios: [
      {
        nome: 'MATHEUS ANTONIO DIBAI NEVES',
        telefone: '5531996035365',
        whatsapp: '5551995897509',
        email: 'dibaimatheus8@gmail.com'
      }
    ]
  }
];

const mockHistory = [
  { id: 'h1', name: 'Imobiliárias Curitiba', date: '11/03/2026', leads: 42, status: 'Concluído', type: 'excel' },
  { id: 'h2', name: 'Restaurantes Jardins SP', date: '08/03/2026', leads: 128, status: 'Concluído', type: 'manual' },
  { id: 'h3', name: 'Tech Startups BH', date: '05/03/2026', leads: 15, status: 'Processando', type: 'excel' },
];

export const Enriquecimento: React.FC = () => {
  const [view, setView] = React.useState<'form' | 'results'>('form');
  const [activeTab, setActiveTab] = React.useState<'manual' | 'excel' | 'history'>('manual');
  const [listName, setListName] = React.useState('');
  const [cnpjs, setCnpjs] = React.useState('');
  const [excelFile, setExcelFile] = React.useState<File | null>(null);
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null);

  const validCnpjsCount = cnpjs.split('\n').filter(line => line.trim().length >= 14).length;

  const handleStart = () => {
    setView('results');
  };

  const handleClear = () => {
    setListName('');
    setCnpjs('');
    setExcelFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExcelFile(e.target.files[0]);
    }
  };

  if (view === 'results') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 pb-12 pt-24"
      >
        {/* Header Results */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('form')} className="p-2 hover:bg-brand-hover rounded-full transition-colors">
              <RefreshCcw className="w-5 h-5 text-brand-text-dim rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-black text-brand-text uppercase tracking-tighter">{listName || 'TESTE2'}</h2>
              <Edit2 className="w-4 h-4 text-brand-text-dim cursor-pointer hover:text-brand-primary transition-colors" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
              <Download className="w-4 h-4" />
              Exportar XLSX
            </button>
            <button className="flex items-center gap-2 bg-brand-card border border-brand-border text-brand-text px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-hover transition-all">
              <Upload className="w-4 h-4" />
              Reimportar CSV
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
              Concluído
            </span>
            <p className="text-sm font-bold text-brand-text">
              <span className="text-brand-primary">1 / 1</span> leads processados
            </p>
          </div>
          <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">
            Concluído em: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-brand-text-dim uppercase tracking-[0.2em] ml-1">Etapas do Enriquecimento</h3>
          <div className="flex flex-wrap items-center gap-4">
            {[
              { label: 'Dados CNPJ', icon: FileText, count: '1/1', perc: '100%' },
              { label: 'Sócios', icon: User, count: '1/1', perc: '100%' },
              { label: 'WhatsApp', icon: MessageCircle, count: '1/1', perc: '100%' },
              { label: 'Email', icon: Mail, count: '1/1', perc: '100%' },
              { label: 'Redes Sociais', icon: Globe, count: '0/1', perc: '0%', inactive: true },
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-xl border transition-all",
                  step.inactive 
                    ? "bg-brand-bg border-brand-border opacity-50" 
                    : "bg-brand-primary/5 border-brand-primary/20"
                )}>
                  <step.icon className={cn("w-4 h-4", step.inactive ? "text-brand-text-dim" : "text-brand-primary")} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-brand-text uppercase tracking-widest leading-none mb-1">{step.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-brand-primary">{step.count}</span>
                      <span className="text-[9px] font-medium text-brand-text-dim">({step.perc})</span>
                    </div>
                  </div>
                </div>
                {idx < 4 && <div className="hidden lg:block w-8 h-px bg-brand-border" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-brand-text-dim uppercase tracking-[0.2em] ml-1">Leads Enriquecidos</h3>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-border bg-brand-bg">
                  <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">CNPJ</th>
                  <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Razão Social</th>
                  <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">UF</th>
                  <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Porte</th>
                  <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest text-center">Contato</th>
                  <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest text-center">Digital</th>
                  <th className="p-4 text-[10px] font-black text-brand-text-dim uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockLeads.map((lead) => (
                  <React.Fragment key={lead.id}>
                    <tr 
                      className={cn(
                        "border-b border-brand-border hover:bg-brand-hover transition-colors cursor-pointer",
                        expandedRow === lead.id && "bg-brand-hover"
                      )}
                      onClick={() => setExpandedRow(expandedRow === lead.id ? null : lead.id)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {expandedRow === lead.id ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 text-brand-text-dim" />}
                          <span className="text-xs font-bold text-brand-primary">{lead.cnpj}</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs font-bold text-brand-text uppercase">{lead.razaoSocial}</td>
                      <td className="p-4 text-xs font-bold text-brand-text-dim">{lead.uf}</td>
                      <td className="p-4 text-xs font-bold text-brand-text-dim">{lead.porte}</td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded border border-emerald-500/20">
                          C: {lead.contato}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[10px] font-black rounded border border-red-500/20">
                          D: {lead.digital}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedRow === lead.id && (
                        <tr>
                          <td colSpan={7} className="p-0">
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-brand-bg/50"
                            >
                              <div className="p-6 space-y-4">
                                <h4 className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Sócios e Contatos</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {lead.socios.map((socio, sIdx) => (
                                    <div key={sIdx} className="glass-card p-4 border-brand-primary/10">
                                      <p className="text-xs font-black text-brand-text uppercase mb-3">{socio.nome}</p>
                                      <div className="flex flex-wrap gap-3">
                                        <div className="flex items-center gap-2 px-2 py-1 bg-brand-bg rounded border border-brand-border">
                                          <MessageCircle className="w-3 h-3 text-emerald-500" />
                                          <span className="text-[10px] font-bold text-brand-text-dim">{socio.whatsapp}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-2 py-1 bg-brand-bg rounded border border-brand-border">
                                          <Phone className="w-3 h-3 text-brand-primary" />
                                          <span className="text-[10px] font-bold text-brand-text-dim">{socio.telefone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-2 py-1 bg-brand-bg rounded border border-brand-border">
                                          <Mail className="w-3 h-3 text-brand-primary" />
                                          <span className="text-[10px] font-bold text-brand-text-dim">{socio.email}</span>
                                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-2">
            <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Exibindo 1 de 1 leads</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-brand-card border border-brand-border rounded-lg text-[10px] font-black text-brand-text-dim uppercase tracking-widest hover:bg-brand-hover transition-all disabled:opacity-50" disabled>Anterior</button>
              <span className="text-[10px] font-bold text-brand-text">1/1</span>
              <button className="px-3 py-1 bg-brand-card border border-brand-border rounded-lg text-[10px] font-black text-brand-text-dim uppercase tracking-widest hover:bg-brand-hover transition-all disabled:opacity-50" disabled>Próxima</button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 pb-12 pt-24"
    >
      <header className="flex flex-col items-center text-center gap-4 mt-10">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-brand-text uppercase leading-none mb-2">
            {activeTab === 'history' ? 'Histórico de Enriquecimento' : 'Novo Enriquecimento'}
          </h2>
          <p className="text-brand-text-dim font-medium max-w-2xl mx-auto">
            {activeTab === 'manual' && 'Cole os CNPJs abaixo (um por linha, separados por vírgula ou ponto e vírgula).'}
            {activeTab === 'excel' && 'Suba uma planilha Excel (.xlsx ou .csv) contendo uma coluna com os CNPJs.'}
            {activeTab === 'history' && 'Consulte e revisite todas as suas listas processadas anteriormente.'}
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-brand-bg border border-brand-border rounded-2xl w-fit mx-auto">
        <button
          onClick={() => setActiveTab('manual')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'manual' 
              ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
              : "text-brand-text-dim hover:text-brand-text hover:bg-brand-hover"
          )}
        >
          <FileText className="w-4 h-4" />
          Manual
        </button>
        <button
          onClick={() => setActiveTab('excel')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'excel' 
              ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
              : "text-brand-text-dim hover:text-brand-text hover:bg-brand-hover"
          )}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Planilha
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'history' 
              ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
              : "text-brand-text-dim hover:text-brand-text hover:bg-brand-hover"
          )}
        >
          <Clock className="w-4 h-4" />
          Histórico
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'history' ? (
          <motion.div 
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {mockHistory.map((item) => (
              <div key={item.id} className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-brand-primary/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                    {item.type === 'excel' ? <FileSpreadsheet className="w-6 h-6 text-brand-primary" /> : <FileText className="w-6 h-6 text-brand-primary" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text group-hover:text-brand-primary transition-colors">{item.name}</h4>
                    <p className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest leading-none mt-1">{item.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest mb-1">Total Leads</p>
                    <p className="text-sm font-black text-brand-text">{item.leads}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest border",
                      item.status === 'Concluído' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20 animate-pulse"
                    )}>
                      {item.status}
                    </span>
                    <button 
                      onClick={() => {
                        setListName(item.name);
                        setView('results');
                      }}
                      className="p-3 bg-brand-bg border border-brand-border text-brand-text rounded-xl hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all active:scale-95 shadow-lg group-hover:shadow-brand-primary/20"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card p-8 space-y-8 max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-[0.2em] ml-1">Nome da lista</label>
                <input 
                  type="text" 
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder="Ex: Restaurantes SP, Tech Startups RJ..."
                  className="w-full px-6 py-4 bg-brand-bg border border-brand-border rounded-2xl text-sm font-bold text-brand-text outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all placeholder:text-brand-text-dim/50"
                />
              </div>

              {activeTab === 'manual' ? (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-[0.2em] ml-1">CNPJs</label>
                  <textarea 
                    value={cnpjs}
                    onChange={(e) => setCnpjs(e.target.value)}
                    rows={6}
                    className="w-full px-6 py-4 bg-brand-bg border border-brand-border rounded-2xl text-sm font-bold text-brand-text outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all resize-none font-mono placeholder:text-brand-text-dim/50"
                    placeholder="33014556000196&#10;00000000000191&#10;11222333000181"
                  />
                  <div className="flex items-center gap-2 text-emerald-500 pt-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Válidos: {validCnpjsCount}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-[0.2em] ml-1">Upload de Arquivo</label>
                  <div 
                    className={cn(
                      "relative group cursor-pointer",
                      excelFile ? "border-brand-primary bg-brand-primary/5" : "border-brand-border hover:border-brand-primary/50"
                    )}
                  >
                    <input 
                      type="file" 
                      accept=".xlsx, .xls, .csv"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-inherit rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-all">
                      <div className={cn(
                        "p-4 rounded-full transition-all",
                        excelFile ? "bg-brand-primary text-white" : "bg-brand-hover text-brand-text-dim group-hover:text-brand-primary"
                      )}>
                        <Upload className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-brand-text">
                          {excelFile ? excelFile.name : 'Clique ou arraste sua planilha aqui'}
                        </p>
                        <p className="text-xs text-brand-text-dim mt-1">
                          Suporta .xlsx, .xls e .csv (Máx 50MB)
                        </p>
                      </div>
                    </div>
                  </div>
                  {excelFile && (
                    <div className="flex items-center gap-2 text-emerald-500 pt-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">Arquivo pronto para processar</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={handleStart}
                className="flex-1 bg-brand-primary text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 group mt-4"
              >
                <Play className="w-4 h-4 fill-current" />
                Iniciar Enriquecimento {activeTab === 'manual' 
                  ? (validCnpjsCount > 0 ? `(${validCnpjsCount} CNPJs)` : '(Exemplo)')
                  : (excelFile ? '(Planilha Selecionada)' : '(Exemplo)')}
              </button>
              <button 
                onClick={handleClear}
                className="px-8 py-5 bg-brand-hover border border-brand-border text-brand-text rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-brand-border transition-all mt-4"
              >
                Limpar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
