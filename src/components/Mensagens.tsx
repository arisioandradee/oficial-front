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
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const Mensagens: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [dragActive, setDragActive] = React.useState(false);

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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-10">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest mb-4 hover:gap-3 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </button>
          <h2 className="text-4xl font-black tracking-tighter text-brand-text uppercase leading-none">Disparo de Mensagens</h2>
          <p className="text-brand-text-dim font-medium mt-2">Importe seus leads e inicie campanhas de prospecção automatizadas.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Import */}
        <div className="lg:col-span-2 space-y-8">
          <div 
            className={cn(
              "glass-card p-12 border-2 border-dashed flex flex-col items-center justify-center text-center transition-all",
              dragActive ? "border-brand-primary bg-brand-primary/5 scale-[0.99]" : "border-brand-border hover:border-brand-primary/50"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => {
              handleDrag(e);
              setDragActive(false);
            }}
          >
            <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center mb-6">
              <Upload className="w-10 h-10 text-brand-primary" />
            </div>
            <h3 className="text-2xl font-black text-brand-text uppercase tracking-tighter mb-2">Importar Lista de Contatos</h3>
            <p className="text-brand-text-dim font-medium mb-8 max-w-md">
              Arraste seu arquivo CSV ou Excel aqui para iniciar o enriquecimento e disparo de mensagens.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-brand-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20">
                Selecionar Arquivo
              </button>
              <button className="px-8 py-4 bg-brand-bg border border-brand-border text-brand-text rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                Baixar Modelo
              </button>
            </div>
          </div>

          <div className="glass-card p-8">
            <h4 className="text-[11px] font-black text-brand-text-dim uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-primary" />
              Campanhas Recentes
            </h4>
            <div className="space-y-4">
              {[
                { name: 'Campanha Imobiliárias SP', date: '27/02/2026', status: 'Enviando', progress: 65, total: 142 },
                { name: 'Follow-up Tecnologia Sul', date: '25/02/2026', status: 'Concluído', progress: 100, total: 85 },
              ].map((camp, i) => (
                <div key={i} className="p-4 rounded-2xl border border-brand-border hover:border-brand-primary/30 transition-all group">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h5 className="font-bold text-brand-text group-hover:text-brand-primary transition-colors">{camp.name}</h5>
                      <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">{camp.date}</p>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                      camp.status === 'Concluído' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-brand-primary/10 text-brand-primary border-brand-primary/20 animate-pulse"
                    )}>
                      {camp.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-brand-bg rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-primary transition-all duration-1000" 
                        style={{ width: `${camp.progress}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-black text-brand-text-dim font-mono">
                      {Math.floor(camp.total * (camp.progress / 100))}/{camp.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Templates & Config */}
        <div className="space-y-8">
          <div className="glass-card p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-[11px] font-black text-brand-text-dim uppercase tracking-widest">Templates</h4>
              <button className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-all">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Primeiro Contato B2B', icon: MessageSquare },
                { title: 'Follow-up Comercial', icon: FileText },
                { title: 'Convite para Demonstração', icon: Zap },
              ].map((temp, i) => (
                <button key={i} className="w-full flex items-center gap-4 p-4 rounded-xl border border-brand-border hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all text-left group">
                  <div className="w-10 h-10 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center group-hover:border-brand-primary/30 transition-all">
                    <temp.icon className="w-5 h-5 text-brand-text-dim group-hover:text-brand-primary" />
                  </div>
                  <span className="text-sm font-bold text-brand-text group-hover:text-brand-primary transition-colors">{temp.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 bg-brand-primary/5 border-brand-primary/20">
            <h4 className="text-[11px] font-black text-brand-primary uppercase tracking-widest mb-4">Dica de Conversão</h4>
            <p className="text-xs font-medium text-brand-text-dim leading-relaxed">
              Mensagens personalizadas com o nome da empresa e o setor aumentam a taxa de resposta em até <span className="text-brand-primary font-bold">45%</span>. Use nossas variáveis dinâmicas!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
