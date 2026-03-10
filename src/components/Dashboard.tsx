import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  Zap, 
  BarChart3,
  Calendar,
  ChevronDown,
  Mail,
  Phone,
  Globe,
  Info,
  ChevronRight,
  X,
  ClipboardList,
  CheckCircle2,
  Clock,
  MessageCircle,
  User,
  Instagram,
  Megaphone
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const lineData = [
  { name: '02/02', leads: 4200, verified: 3180 },
  { name: '03/02', leads: 5100, verified: 4150 },
  { name: '09/02', leads: 4800, verified: 3940 },
  { name: '10/02', leads: 8500, verified: 7320 },
  { name: '11/02', leads: 6300, verified: 5210 },
  { name: '12/02', leads: 9520, verified: 8410 },
  { name: '23/02', leads: 12850, verified: 10680 },
  { name: '25/02', leads: 8420, verified: 7350 },
  { name: '27/02', leads: 9380, verified: 8310 },
];

const sizeData = [
  { name: 'MICROEMPRESA', value: 18450, color: '#06b6d4' },
  { name: 'PEQUENA EMPRESA', value: 32100, color: '#0891b2' },
  { name: 'MÉDIA EMPRESA', value: 15400, color: '#3b82f6' },
  { name: 'GRANDE EMPRESA', value: 8900, color: '#6366f1' },
  { name: 'MULTINACIONAL', value: 1200, color: '#8b5cf6' },
];

const sectorSpecificData: Record<string, any[]> = {
  'Tecnologia': [
    { name: '02/02', leads: 1800, verified: 1600 },
    { name: '03/02', leads: 2500, verified: 2120 },
    { name: '09/02', leads: 2100, verified: 1900 },
    { name: '10/02', leads: 4300, verified: 3850 },
    { name: '11/02', leads: 3200, verified: 2880 },
    { name: '12/02', leads: 5400, verified: 4850 },
    { name: '23/02', leads: 7600, verified: 6520 },
    { name: '25/02', leads: 4300, verified: 3980 },
    { name: '27/02', leads: 5250, verified: 4720 },
  ],
  'Indústria': [
    { name: '02/02', leads: 940, verified: 720 },
    { name: '03/02', leads: 1260, verified: 1030 },
    { name: '09/02', leads: 1150, verified: 925 },
    { name: '10/02', leads: 2120, verified: 1760 },
    { name: '11/02', leads: 1590, verified: 1345 },
    { name: '12/02', leads: 2850, verified: 2375 },
    { name: '23/02', leads: 3200, verified: 2700 },
    { name: '25/02', leads: 2110, verified: 1755 },
    { name: '27/02', leads: 1900, verified: 1550 },
  ],
  'Serviços': [
    { name: '02/02', leads: 1220, verified: 915 },
    { name: '03/02', leads: 1840, verified: 1535 },
    { name: '09/02', leads: 1430, verified: 1125 },
    { name: '10/02', leads: 2780, verified: 2370 },
    { name: '11/02', leads: 1960, verified: 1655 },
    { name: '12/02', leads: 3100, verified: 2590 },
    { name: '23/02', leads: 4150, verified: 3530 },
    { name: '25/02', leads: 2870, verified: 2465 },
    { name: '27/02', leads: 2660, verified: 2255 },
  ],
  'Varejo': [
    { name: '02/02', leads: 815, verified: 610 },
    { name: '03/02', leads: 1230, verified: 920 },
    { name: '09/02', leads: 1025, verified: 718 },
    { name: '10/02', leads: 1860, verified: 1445 },
    { name: '11/02', leads: 1345, verified: 1035 },
    { name: '12/02', leads: 2180, verified: 1765 },
    { name: '23/02', leads: 3120, verified: 2495 },
    { name: '25/02', leads: 1955, verified: 1540 },
    { name: '27/02', leads: 1745, verified: 1335 },
  ],
  'Outros': [
    { name: '02/02', leads: 505, verified: 302 },
    { name: '03/02', leads: 810, verified: 505 },
    { name: '09/02', leads: 608, verified: 404 },
    { name: '10/02', leads: 1220, verified: 812 },
    { name: '11/02', leads: 915, verified: 608 },
    { name: '12/02', leads: 1425, verified: 915 },
    { name: '23/02', leads: 2040, verified: 1425 },
    { name: '25/02', leads: 1218, verified: 810 },
    { name: '27/02', leads: 1015, verified: 708 },
  ]
};

const MetricCard = ({ icon: Icon, label, value, color, description }: any) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="glass-card p-5 flex items-center gap-5 flex-1 min-w-[200px] relative group cursor-help transition-all hover:border-brand-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0`} style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="flex flex-col">
        <p className="text-[10px] font-black text-brand-text-dim tracking-widest uppercase mb-1">{label}</p>
        <h3 className="text-2xl font-black tracking-tight text-brand-text leading-none">{value}</h3>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 bottom-full left-0 mb-4 w-64 p-4 bg-brand-card border border-brand-border rounded-xl shadow-[var(--brand-shadow)] backdrop-blur-xl"
          >
            <div className="absolute -bottom-1.5 left-8 w-3 h-3 bg-brand-card border-r border-b border-brand-border rotate-45" />
            <p className="text-[11px] font-bold text-brand-text-dim uppercase tracking-widest mb-2 flex items-center gap-2">
              <Info className="w-3 h-3 text-brand-primary" />
              O que isso significa?
            </p>
            <p className="text-xs text-brand-text font-medium leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QualityCard = ({ icon: Icon, label, value, subtext, color, description }: any) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="glass-card p-5 flex flex-col gap-4 flex-1 min-w-[160px] relative group cursor-help transition-all hover:border-brand-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-brand-text-dim group-hover:text-brand-primary transition-colors" />
          <p className="text-[10px] font-black text-brand-text-dim tracking-widest uppercase">{label}</p>
        </div>
        <Info className="w-3 h-3 text-brand-text-dim/20 group-hover:text-brand-primary transition-colors" />
      </div>
      
      <div>
        <h3 className="text-2xl font-black tracking-tight text-brand-text mb-1">{value}</h3>
        <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-wider">{subtext}</p>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 bottom-full left-0 mb-4 w-64 p-4 bg-brand-card border border-brand-border rounded-xl shadow-[var(--brand-shadow)] backdrop-blur-xl"
          >
            <div className="absolute -bottom-1.5 left-8 w-3 h-3 bg-brand-card border-r border-b border-brand-border rotate-45" />
            <p className="text-[11px] font-bold text-brand-text-dim uppercase tracking-widest mb-2 flex items-center gap-2">
              <Info className="w-3 h-3 text-brand-primary" />
              O que isso significa?
            </p>
            <p className="text-xs text-brand-text font-medium leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const sectorMetrics: Record<string, any> = {
  'Tecnologia': {
    leads: '2.180',
    verified: '1.850',
    verifiedPerc: '85%',
    icp: '92',
    pipeline: '850K',
    emails: '1.620',
    whatsapp: '980',
    linkedin: '1.950'
  },
  'Indústria': {
    leads: '1.240',
    verified: '620',
    verifiedPerc: '50%',
    icp: '75',
    pipeline: '2.4M',
    emails: '450',
    whatsapp: '310',
    linkedin: '540'
  },
  'Serviços': {
    leads: '850',
    verified: '710',
    verifiedPerc: '83%',
    icp: '88',
    pipeline: '420K',
    emails: '680',
    whatsapp: '520',
    linkedin: '710'
  },
  'Varejo': {
    leads: '450',
    verified: '320',
    verifiedPerc: '71%',
    icp: '65',
    pipeline: '180K',
    emails: '280',
    whatsapp: '410',
    linkedin: '120'
  },
  'Outros': {
    leads: '132',
    verified: '85',
    verifiedPerc: '64%',
    icp: '45',
    pipeline: '50K',
    emails: '65',
    whatsapp: '45',
    linkedin: '35'
  }
};

interface DashboardProps {
  onStartSearch?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartSearch }) => {
  const [selectedSector, setSelectedSector] = React.useState<string | null>(null);
  const [savedLeadsCount, setSavedLeadsCount] = React.useState<number>(0);
  const [isNudgeVisible, setIsNudgeVisible] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => setSavedLeadsCount(data.length))
      .catch(err => console.error(err));
  }, []);

  const currentMetrics = React.useMemo(() => {
    if (selectedSector && sectorMetrics[selectedSector]) {
      return sectorMetrics[selectedSector];
    }
    return {
      leads: '4.852',
      verified: '3.210',
      verifiedPerc: '66%',
      icp: '84',
      pipeline: '1.2M',
      emails: '2.840',
      whatsapp: '1.920',
      linkedin: '3.110'
    };
  }, [selectedSector]);

  const handleSectorClick = (data: any) => {
    if (!data) return;
    const name = data.name || data.activeLabel;
    if (selectedSector === name) {
      setSelectedSector(null);
    } else {
      setSelectedSector(name);
    }
  };

  const filteredLineData = React.useMemo(() => {
    if (!selectedSector) return lineData;
    return sectorSpecificData[selectedSector] || lineData;
  }, [selectedSector]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 pb-12 pt-24"
    >
      {/* Nudge Card / CTA */}
      <AnimatePresence>
        {isNudgeVisible && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-brand-primary to-brand-accent p-8 md:p-12 shadow-2xl shadow-brand-primary/20"
          >
            <button 
              onClick={() => setIsNudgeVisible(false)}
              className="absolute top-6 right-6 z-20 p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-3 leading-tight">
                  Descubra novos leads qualificados agora
                </h3>
                <p className="text-white/80 text-sm font-medium max-w-xl">
                  Nossa inteligência artificial está pronta para minerar os melhores contatos para o seu negócio. Não perca tempo e comece sua próxima prospecção.
                </p>
              </div>
              <button 
                onClick={onStartSearch}
                className="group flex items-center gap-3 bg-white text-brand-primary px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-bg transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Encontrar agora
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex justify-between items-end mt-10">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2 text-brand-text">Dashboard de Inteligência</h2>
          <p className="text-brand-text-dim font-medium">Monitoramento de prospecção e inteligência de dados em tempo real.</p>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={ClipboardList} 
          label="Total de Listas" 
          value="142" 
          color="#6366f1" 
          description="Quantidade total de listas de prospecção criadas ou importadas no sistema."
        />
        <MetricCard 
          icon={CheckCircle2} 
          label="Concluídas" 
          value="128" 
          color="#10b981" 
          description="Número de listas que já tiveram todo o processo de mineração e enriquecimento finalizado."
        />
        <MetricCard 
          icon={Clock} 
          label="Processando" 
          value="14" 
          color="#f59e0b" 
          description="Listas que estão atualmente em fase de mineração de dados ou validação de contatos."
        />
        <MetricCard 
          icon={Users} 
          label="Total de Leads" 
          value="76.050" 
          color="#8b5cf6" 
          description="Volume total de empresas e contatos únicos identificados em todas as suas listas."
        />
      </div>

      {/* Quality Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-brand-text-dim uppercase tracking-[0.2em] ml-1">Qualidade dos Leads</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <QualityCard 
            icon={MessageCircle} 
            label="Com WhatsApp" 
            value="65.403" 
            description="Leads que possuem pelo menos um número de WhatsApp válido e verificado para contato."
          />
          <QualityCard 
            icon={Mail} 
            label="Com Email" 
            value="54.756" 
            description="Leads que possuem endereços de e-mail corporativos válidos identificados."
          />
          <QualityCard 
            icon={User} 
            label="Com Sócios" 
            value="48.672" 
            description="Empresas onde foi possível identificar o quadro societário e decisores."
          />
          <QualityCard 
            icon={Globe} 
            label="Com Website" 
            value="41.067" 
            description="Empresas que possuem um domínio/website oficial identificado na base."
          />
          <QualityCard 
            icon={Instagram} 
            label="Com Instagram" 
            value="35.743" 
            description="Leads que possuem perfil comercial no Instagram vinculado à empresa."
          />
          <QualityCard 
            icon={Megaphone} 
            label="Com Meta Ads" 
            value="21.294" 
            description="Empresas que estão atualmente veiculando anúncios nas plataformas da Meta (Facebook/Instagram)."
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-bold tracking-tight uppercase mb-1 text-brand-text">
                Leads por Estado
              </h3>
              <p className="text-xs font-bold text-brand-text-dim tracking-widest uppercase">Distribuição geográfica dos leads identificados</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-primary" />
                <span className="text-[10px] font-bold text-brand-text-dim uppercase">Volume</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full flex items-center justify-center bg-brand-bg/30 rounded-2xl border border-brand-border/50 relative overflow-hidden p-8">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Stylized Brazil Map SVG */}
              <svg viewBox="0 0 500 500" className="w-full h-full max-w-[300px] drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <path 
                  d="M150,50 L200,30 L300,40 L400,80 L450,150 L420,250 L450,350 L400,450 L300,480 L200,450 L100,400 L50,300 L80,200 L100,100 Z" 
                  fill="currentColor" 
                  className="text-brand-primary/10 stroke-brand-primary/30" 
                  strokeWidth="2"
                />
                {/* Highlighted States (Fictitious dots/areas) */}
                <circle cx="350" cy="400" r="12" className="fill-brand-primary animate-pulse" />
                <circle cx="380" cy="350" r="8" className="fill-brand-primary/60" />
                <circle cx="330" cy="430" r="6" className="fill-brand-primary/40" />
                
                {/* Labels */}
                <text x="370" y="405" className="fill-brand-text text-[14px] font-black uppercase tracking-tighter">SC</text>
                <text x="400" y="355" className="fill-brand-text text-[12px] font-bold opacity-60">PR</text>
                <text x="345" y="435" className="fill-brand-text text-[10px] font-bold opacity-40">RS</text>
              </svg>

              <div className="absolute bottom-0 right-0 bg-brand-card/80 backdrop-blur-md border border-brand-border p-4 rounded-xl shadow-xl">
                  <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    <span className="text-[10px] font-black text-brand-text uppercase tracking-widest">SC: 34.500 Leads</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-60">
                    <div className="w-2 h-2 rounded-full bg-brand-primary/60" />
                    <span className="text-[10px] font-black text-brand-text uppercase tracking-widest">PR: 25.100 Leads</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <div className="w-2 h-2 rounded-full bg-brand-primary/40" />
                    <span className="text-[10px] font-black text-brand-text uppercase tracking-widest">RS: 16.450 Leads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold tracking-tight uppercase mb-1 text-brand-text">Leads por Porte</h3>
              <p className="text-xs font-bold text-brand-text-dim tracking-widest uppercase">Classificação por tamanho da empresa</p>
            </div>
          </div>
          <div className="flex-1 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sizeData} layout="vertical" margin={{ left: 20, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--brand-text-dim)', fontSize: 10, fontWeight: 800 }}
                  width={120}
                />
                <RechartsTooltip 
                  cursor={{ fill: 'var(--brand-hover)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--chart-tooltip-bg)', 
                    border: '1px solid var(--chart-tooltip-border)', 
                    borderRadius: '12px',
                    color: 'var(--brand-text)'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--brand-text)' }}
                  labelStyle={{ color: 'var(--brand-text-dim)', fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]} 
                  barSize={12}
                >
                  {sizeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 pt-6 border-t border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Distribuição Total</span>
              <span className="text-xs font-black text-brand-primary">76.050 EMPRESAS</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

