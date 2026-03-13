import React from 'react';
import { 
  Send, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft,
  Plus,
  MessageSquare,
  Zap,
  TrendingUp,
  Sparkles,
  LayoutGrid
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';

interface ManualLead {
  id: string;
  empresa: string;
  socio: string;
  contato: string;
}

export const Mensagens: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [importMode, setImportMode] = React.useState<'spreadsheet' | 'manual'>('spreadsheet');
  
  // Manual Entry States
  const [manualEmpresa, setManualEmpresa] = React.useState('');
  const [manualSocio, setManualSocio] = React.useState('');
  const [manualContato, setManualContato] = React.useState('');
  const [manualLeads, setManualLeads] = React.useState<ManualLead[]>([]);
  const [isParsing, setIsParsing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedCampaign, setSelectedCampaign] = React.useState<any | null>(null);
  const [view, setView] = React.useState<'import' | 'personalize'>('import');
  const [messageTemplate, setMessageTemplate] = React.useState('');
  const [selectedLeads, setSelectedLeads] = React.useState<string[]>([]);
  const [showScripts, setShowScripts] = React.useState(false);
  const [scripts, setScripts] = React.useState([
    { title: 'Abordagem Direta', text: 'Olá {socio}, vi que você é sócio da {empresa}...' },
    { title: 'Quebra de Gelo', text: 'Oi {socio}, tudo bem? Notei que a {empresa}...' },
  ]);

  const handleAddManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Split lines and filter empty ones
    const empresas = manualEmpresa.split('\n').filter(line => line.trim() !== '');
    const socios = manualSocio.split('\n').filter(line => line.trim() !== '');
    const contatos = manualContato.split('\n').filter(line => line.trim() !== '');

    if (empresas.length === 0 || contatos.length === 0) return;

    // Use the maximum length to iterate, but usually they should match
    const maxLength = Math.max(empresas.length, socios.length, contatos.length);
    const newLeadsList: ManualLead[] = [];

    for (let i = 0; i < maxLength; i++) {
      // Only add if we have at least an empresa and a contato for this index
      if (empresas[i] && contatos[i]) {
        newLeadsList.push({
          id: Math.random().toString(36).substr(2, 9),
          empresa: empresas[i].trim(),
          socio: socios[i]?.trim() || '',
          contato: contatos[i].trim()
        });
      }
    }

    setManualLeads([...newLeadsList, ...manualLeads]);
    setManualEmpresa('');
    setManualSocio('');
    setManualContato('');
    setView('personalize');
    setSelectedLeads([...newLeadsList, ...manualLeads].map(l => l.id));
  };

  const handleFileUpload = (file: File) => {
    setIsParsing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        console.log('Dados puros da planilha:', jsonData[0]);

        const mappedLeads: ManualLead[] = jsonData.map(row => {
          // Helper to find column by fuzzy match
          const getVal = (searchTerms: string[]) => {
            const keys = Object.keys(row);
            for (const term of searchTerms) {
              const match = keys.find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === term.toLowerCase().replace(/[^a-z0-9]/g, ''));
              if (match) return row[match];
            }
            return '';
          };

          const empresa = getVal(['razaosocial', 'empresa', 'nomefantasia']);
          const socio = getVal(['nomesocio', 'socio', 'lead', 'nome']);
          let contato = getVal(['telefonesempresa', 'contato', 'whatsapp', 'telefone', 'celular']);
          
          if (typeof contato === 'string' && contato.includes('|')) {
            contato = contato.split('|')[0].trim();
          }

          return {
            id: Math.random().toString(36).substr(2, 9),
            empresa: String(empresa || '').trim(),
            socio: String(socio || '').trim(),
            contato: String(contato || '').trim()
          };
        }).filter(lead => lead.empresa && lead.contato);

        console.log('Leads mapeados:', mappedLeads.length);

        if (mappedLeads.length === 0) {
          alert('Não encontramos as colunas necessárias (Empresa e Contato). Verifique se o cabeçalho está correto.');
        } else {
          setManualLeads(prev => [...mappedLeads, ...prev]);
          setSelectedLeads(mappedLeads.map(l => l.id));
          setView('personalize');
        }
      } catch (err) {
        console.error('Error parsing file:', err);
        alert('Erro ao ler a planilha. Verifique o formato.');
      } finally {
        setIsParsing(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const campaigns = [
    { 
      id: 1, 
      name: 'Campanha Imobiliárias SP', 
      date: '27/02/2026', 
      time: '14:20',
      status: 'Enviando', 
      progress: 65, 
      total: 142,
      processed: 92,
      success: 88,
      failed: 4,
      leads: [
        { empresa: 'Imobiliária Silva', contato: '(11) 98888-7777', status: 'Enviado', resposta: 'Interessado' },
        { empresa: 'Apartamentos Luxo', contato: '(11) 97777-6666', status: 'Erro', resposta: '-' },
        { empresa: 'Bons Negócios', contato: '(11) 96666-5555', status: 'Enviado', resposta: 'Agendar' },
      ]
    },
    { 
      id: 2, 
      name: 'Follow-up Tecnologia Sul', 
      date: '25/02/2026', 
      time: '09:15',
      status: 'Concluído', 
      progress: 100, 
      total: 85,
      processed: 85,
      success: 82,
      failed: 3,
      leads: [
        { empresa: 'Tech Sul SA', contato: '(51) 95555-4444', status: 'Enviado', resposta: 'Convertido' },
        { empresa: 'Inova Soft', contato: '(51) 94444-3333', status: 'Enviado', resposta: 'Fora do Perfil' },
      ]
    },
  ];

  const removeManualLead = (id: string) => {
    setManualLeads(manualLeads.filter(l => l.id !== id));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 pb-12 pt-24"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-6">
        <div>
          {selectedCampaign && (
            <button 
              onClick={() => setSelectedCampaign(null)}
              className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest mb-3 hover:gap-3 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar para Lista
            </button>
          )}
          <h2 className="text-2xl font-black tracking-tighter text-brand-text uppercase leading-none">
            {selectedCampaign ? 'Histórico de Envios' : view === 'personalize' ? 'Personalizar Mensagem' : 'Disparo de Mensagens'}
          </h2>
          <p className="text-sm font-medium text-brand-text-dim mt-1.5">
            {selectedCampaign 
              ? `${selectedCampaign.date}, ${selectedCampaign.time}`
              : view === 'personalize' 
                ? 'Crie um template único para seus leads' 
                : 'Escolha como deseja importar seus leads e inicie suas campanhas.'}
          </p>
        </div>

        {selectedCampaign ? (
          <button className="px-8 py-4 bg-brand-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2 group">
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Atualizar Respostas
          </button>
        ) : (
          view === 'import' ? (
            /* Mode Selector */
            <div className="flex bg-brand-hover/40 p-1 rounded-2xl border border-brand-border/50">
              <button 
                onClick={() => setImportMode('spreadsheet')}
                className={cn(
                  "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                  importMode === 'spreadsheet' ? "bg-brand-card text-brand-primary shadow-sm border border-brand-border" : "text-brand-text-dim hover:text-brand-text"
                )}
              >
                <FileText className="w-4 h-4" />
                Planilha
              </button>
              <button 
                onClick={() => setImportMode('manual')}
                className={cn(
                  "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                  importMode === 'manual' ? "bg-brand-card text-brand-primary shadow-sm border border-brand-border" : "text-brand-text-dim hover:text-brand-text"
                )}
              >
                <Plus className="w-4 h-4" />
                Manual
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setView('import')}
              className="px-6 py-3 rounded-xl text-[10px] font-black text-brand-text-dim uppercase tracking-widest hover:text-brand-text transition-all flex items-center gap-2 border border-brand-border/50"
            >
              <ChevronLeft className="w-4 h-4" />
              Trocar Importação
            </button>
          )
        )}
      </header>

      <AnimatePresence mode="wait">
        {selectedCampaign ? (
          <motion.div 
            key="campaign-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'TOTAL PROCESSADO', value: selectedCampaign.total, icon: LayoutGrid, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
                { label: 'SUCESSO', value: selectedCampaign.success, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { label: 'FALHA', value: selectedCampaign.failed, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 flex flex-col items-start shadow-xl border-brand-border/50">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-current opacity-30", stat.color, stat.bg)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-brand-text-dim uppercase tracking-[0.2em] mb-2">{stat.label}</span>
                  <span className="text-3xl font-black text-brand-text leading-none">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Leads Table */}
            <div className="glass-card overflow-hidden shadow-xl border-brand-border/50">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-hover/30">
                      <th className="px-10 py-6 text-[11px] font-black text-brand-text-dim uppercase tracking-widest border-b border-brand-border">LEAD / EMPRESA</th>
                      <th className="px-10 py-6 text-[11px] font-black text-brand-text-dim uppercase tracking-widest border-b border-brand-border">STATUS DE ENVIO</th>
                      <th className="px-10 py-6 text-[11px] font-black text-brand-text-dim uppercase tracking-widest border-b border-brand-border">ÚLTIMA RESPOSTA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border bg-brand-card/40">
                    {selectedCampaign.leads.map((lead: any, idx: number) => (
                      <tr key={idx} className="hover:bg-brand-hover/20 transition-colors group">
                        <td className="px-10 py-5">
                          <h6 className="font-bold text-brand-text text-sm mb-0.5 group-hover:text-brand-primary transition-colors">{lead.empresa}</h6>
                          <p className="text-[11px] font-medium text-brand-text-dim opacity-70">{lead.contato}</p>
                        </td>
                        <td className="px-10 py-5">
                          <span className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                            lead.status === 'Enviado' ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                          )}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-10 py-5">
                          <span className="text-xs font-bold text-brand-text tracking-wide">{lead.resposta}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="main-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-12"
          >
            {/* Top Area: Import OR Personalize */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                {view === 'import' ? (
                  <div key="import-step">
                    {importMode === 'spreadsheet' ? (
                      <motion.div 
                        key="spreadsheet-import"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                          "glass-card p-12 lg:p-16 border-2 border-dashed flex flex-col items-center justify-center text-center transition-all min-h-[300px]",
                          dragActive ? "border-brand-primary bg-brand-primary/5" : "border-brand-border hover:border-brand-primary/50"
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={(e) => {
                          handleDrag(e);
                          setDragActive(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                      >
                        <input 
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept=".xlsx, .xls, .csv"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                        />
                        <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6">
                          <Upload className={cn("w-10 h-10 text-brand-primary", isParsing && "animate-bounce")} />
                        </div>
                        <h3 className="text-2xl font-black text-brand-text uppercase tracking-tighter mb-3">
                          {isParsing ? 'Processando Leads...' : 'Importar Lista de Contatos'}
                        </h3>
                        <p className="text-brand-text-dim font-medium mb-8 max-w-lg text-base">
                          {isParsing ? 'Estamos organizando seus contatos para a campanha.' : 'Arraste seu arquivo CSV ou Excel aqui para iniciar o enriquecimento e disparo de mensagens.'}
                        </p>
                        <div className="flex gap-4">
                          <button 
                            disabled={isParsing}
                            onClick={() => fileInputRef.current?.click()}
                            className="px-10 py-4 bg-brand-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/30 disabled:opacity-50"
                          >
                            {isParsing ? 'Aguarde...' : 'Selecionar Arquivo'}
                          </button>
                          <a 
                            href="/modeloPlanilhaDisparo.xlsx" 
                            download
                            className="px-12 py-5 bg-brand-bg border border-brand-border text-brand-text rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all text-center flex items-center justify-center"
                          >
                            Baixar Modelo
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="manual-import"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                      >
                        <form onSubmit={handleAddManualLead} className="glass-card p-8 border-brand-primary/20 bg-brand-primary/5">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="space-y-3">
                              <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Empresa</label>
                              <textarea 
                                required
                                value={manualEmpresa}
                                onChange={(e) => setManualEmpresa(e.target.value)}
                                className="w-full px-5 py-4 bg-brand-bg border border-brand-border rounded-2xl text-xs font-bold text-brand-text outline-none focus:border-brand-primary transition-all min-h-[120px] resize-none custom-scrollbar"
                                placeholder="Uma empresa por linha"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Sócio</label>
                              <textarea 
                                required
                                value={manualSocio}
                                onChange={(e) => setManualSocio(e.target.value)}
                                className="w-full px-5 py-4 bg-brand-bg border border-brand-border rounded-2xl text-xs font-bold text-brand-text outline-none focus:border-brand-primary transition-all min-h-[120px] resize-none custom-scrollbar"
                                placeholder="Um sócio por linha"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest ml-1">Contato</label>
                              <textarea 
                                required
                                value={manualContato}
                                onChange={(e) => setManualContato(e.target.value)}
                                className="w-full px-5 py-4 bg-brand-bg border border-brand-border rounded-2xl text-xs font-bold text-brand-text outline-none focus:border-brand-primary transition-all min-h-[120px] resize-none custom-scrollbar"
                                placeholder="Um contato por linha"
                              />
                            </div>
                          </div>
                          <button 
                            type="submit"
                            className="w-full py-5 bg-brand-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/30 flex items-center justify-center gap-3 group"
                          >
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            Processar e Adicionar à Lista
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <motion.div 
                    key="personalize-step"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Scripts Accordion */}
                    <div className="glass-card border-brand-border/40 overflow-hidden">
                      <button 
                        onClick={() => setShowScripts(!showScripts)}
                        className="w-full px-6 py-4 flex justify-between items-center hover:bg-brand-hover/20 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-4 h-4 text-brand-primary" />
                          <span className="text-[10px] font-black text-brand-text uppercase tracking-widest">Scripts e Modelos</span>
                        </div>
                        <Plus className={cn("w-4 h-4 text-brand-text-dim transition-transform", showScripts && "rotate-45")} />
                      </button>
                      
                      <AnimatePresence>
                        {showScripts && (
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden border-t border-brand-border/30 bg-brand-bg/20"
                          >
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {scripts.map((script, i) => (
                                <button 
                                  key={i}
                                  onClick={() => setMessageTemplate(script.text)}
                                  className="p-4 rounded-xl border border-brand-border hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all text-left group"
                                >
                                  <h6 className="text-[10px] font-black text-brand-text uppercase tracking-widest mb-2 group-hover:text-brand-primary">{script.title}</h6>
                                  <p className="text-xs text-brand-text-dim line-clamp-2">{script.text}</p>
                                </button>
                              ))}
                              <button className="p-4 rounded-xl border border-dashed border-brand-border hover:border-brand-primary/40 flex items-center justify-center gap-2 group transition-all">
                                <Plus className="w-4 h-4 text-brand-text-dim group-hover:text-brand-primary" />
                                <span className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest group-hover:text-brand-primary">Novo Script</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message Template Editor */}
                    <div className="glass-card p-8 border-brand-primary/20 bg-brand-primary/5 relative overflow-hidden">
                      <div className="flex gap-3 mb-5">
                        <button 
                          onClick={() => setMessageTemplate(prev => prev + ' {socio}')}
                          className="px-5 py-2.5 bg-brand-card border border-brand-border rounded-lg text-[10px] font-black text-brand-text uppercase tracking-widest hover:border-brand-primary transition-all flex items-center gap-2"
                        >
                          <Plus className="w-3 h-3" /> Nome do Sócio
                        </button>
                        <button 
                          onClick={() => setMessageTemplate(prev => prev + ' {empresa}')}
                          className="px-5 py-2.5 bg-brand-card border border-brand-border rounded-lg text-[10px] font-black text-brand-text uppercase tracking-widest hover:border-brand-primary transition-all flex items-center gap-2"
                        >
                          <Plus className="w-3 h-3" /> Empresa
                        </button>
                      </div>

                      <textarea 
                        value={messageTemplate}
                        onChange={(e) => setMessageTemplate(e.target.value)}
                        className="w-full px-6 py-6 bg-brand-bg/60 border border-brand-border/50 rounded-2xl text-base font-medium text-brand-text outline-none focus:border-brand-primary transition-all min-h-[160px] custom-scrollbar focus:bg-brand-bg transition-colors"
                        placeholder="Escreva sua mensagem aqui... Use os botões acima para variáveis dinâmicas."
                      />
                    </div>

                    {/* Actions Area */}
                    <div className="flex justify-between items-center py-2">
                      <button 
                        onClick={() => {
                          const allIds = manualLeads.map(l => l.id);
                          setSelectedLeads(selectedLeads.length === allIds.length ? [] : allIds);
                        }}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl border border-brand-border hover:bg-brand-hover/30 transition-all text-[10px] font-black text-brand-text uppercase tracking-widest"
                      >
                        <div className={cn(
                          "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all",
                          selectedLeads.length === manualLeads.length ? "bg-brand-primary border-brand-primary" : "border-brand-border"
                        )}>
                          {selectedLeads.length === manualLeads.length && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                        </div>
                        Selecionar Todos ({manualLeads.length})
                      </button>

                      <button className="px-12 py-5 bg-brand-primary text-white rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:bg-brand-accent transition-all shadow-2xl shadow-brand-primary/40 flex items-center gap-3 group">
                        <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" />
                        Iniciar Disparos
                      </button>
                    </div>

                    {/* Leads Table for Selection */}
                    <div className="glass-card overflow-hidden shadow-2xl border-brand-border/30">
                      <div className="max-h-[400px] overflow-y-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-brand-hover/30">
                              <th className="px-8 py-5 w-20"></th>
                              <th className="px-8 py-5 text-[11px] font-black text-brand-text-dim uppercase tracking-widest border-b border-brand-border">EMPRESA</th>
                              <th className="px-8 py-5 text-[11px] font-black text-brand-text-dim uppercase tracking-widest border-b border-brand-border">SÓCIO / LEAD</th>
                              <th className="px-8 py-5 text-[11px] font-black text-brand-text-dim uppercase tracking-widest border-b border-brand-border">WHATSAPP</th>
                              <th className="px-8 py-5 text-[11px] font-black text-brand-text-dim uppercase tracking-widest border-b border-brand-border">STATUS</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brand-border">
                            {manualLeads.length > 0 ? (
                              manualLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-brand-hover/20 transition-colors group">
                                  <td className="px-8 py-6 text-center">
                                    <input 
                                      type="checkbox"
                                      checked={selectedLeads.includes(lead.id)}
                                      onChange={() => {
                                        setSelectedLeads(prev => 
                                          prev.includes(lead.id) ? prev.filter(id => id !== lead.id) : [...prev, lead.id]
                                        );
                                      }}
                                      className="w-5 h-5 rounded-md border-brand-border bg-brand-bg text-brand-primary focus:ring-offset-0 focus:ring-brand-primary appearance-none border-2 checked:bg-brand-primary cursor-pointer transition-all"
                                    />
                                  </td>
                                  <td className="px-8 py-6">
                                    <h6 className="font-bold text-brand-text text-sm transition-colors group-hover:text-brand-primary">{lead.empresa}</h6>
                                  </td>
                                  <td className="px-8 py-6">
                                    <p className="text-sm font-bold text-brand-text">{lead.socio || 'Lead'}</p>
                                  </td>
                                  <td className="px-8 py-6 text-sm font-medium text-brand-text-dim">
                                    {lead.contato}
                                  </td>
                                  <td className="px-8 py-6">
                                    <span className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Pendente</span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                                <tr>
                                  <td colSpan={5} className="px-8 py-20 text-center text-brand-text-dim font-bold uppercase tracking-widest opacity-30">Nenhum lead carregado</td>
                                </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Area: Recent Campaigns (Full Width) */}
            {view === 'import' && (
              <div className="glass-card p-8 shadow-xl border-brand-border/40">
                <h4 className="text-xs font-black text-brand-text uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <Zap className="w-4 h-4 text-brand-primary" />
                  Campanhas Recentes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {campaigns.map((camp, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedCampaign(camp)}
                      className="p-6 rounded-3xl border border-brand-border/50 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all group text-left flex flex-col justify-between h-[170px]"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                            camp.status === 'Concluído' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-brand-primary/10 text-brand-primary border-brand-primary/20 animate-pulse"
                          )}>
                            {camp.status}
                          </span>
                          <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">{camp.date}</p>
                        </div>
                        <h5 className="font-black text-brand-text text-lg leading-tight group-hover:text-brand-primary transition-colors">{camp.name}</h5>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Progresso</span>
                          <span className="text-[10px] font-black text-brand-text tracking-widest font-mono">
                            {Math.floor(camp.total * (camp.progress / 100))}/{camp.total}
                          </span>
                        </div>
                        <div className="h-2 bg-brand-bg/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-primary transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                            style={{ width: `${camp.progress}%` }} 
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
