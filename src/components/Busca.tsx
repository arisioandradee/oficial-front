import React from 'react';
import { 
  Search, 
  Sparkles, 
  Rocket,
  Filter,
  ChevronDown,
  LayoutGrid,
  MapPin,
  Database,
  ToggleLeft,
  Code,
  CheckCircle2,
  Zap,
  Clock,
  Calendar,
  Cloud,
  Download,
  CheckSquare,
  Check,
  MoreHorizontal,
  Building2,
  DollarSign,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  Info,
  Plus,
  FileText,
  MousePointer2,
  Users,
  ShieldCheck,
  Globe,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { searchLeadsWithAI } from '../services/gemini';

const FilterItem = ({ title, icon: Icon, active, onClick, children }: any) => (
  <div className="w-full">
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-6 py-4 hover:bg-brand-hover transition-all group relative",
        active && "bg-brand-primary/5"
      )}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary" />}
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
          active ? "bg-brand-primary/10 text-brand-primary" : "bg-brand-bg text-brand-text-dim group-hover:text-brand-text group-hover:bg-brand-hover"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <span className={cn("text-[11px] font-bold uppercase tracking-widest", active ? "text-brand-primary" : "text-brand-text-dim group-hover:text-brand-text")}>{title}</span>
      </div>
      <ChevronDown className={cn("w-3 h-3 transition-transform", active ? "rotate-180 text-brand-primary/60" : "text-brand-text-dim/40 group-hover:text-brand-text-dim")} />
    </button>
    {active && children && (
      <div className="px-6 pb-4 animate-in slide-in-from-top-2 duration-200">
        {children}
      </div>
    )}
  </div>
);


const LeadDetailsModal = ({ lead, onClose }: { lead: any; onClose: () => void }) => {
  if (!lead) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-bg/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        className="w-full max-w-2xl bg-brand-card border border-brand-border rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-10 pb-8 bg-gradient-to-b from-brand-primary/5 to-transparent relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 rounded-full border border-brand-border flex items-center justify-center hover:bg-white/5 transition-all hover:scale-110 active:scale-95"
          >
            <X className="w-6 h-6 text-brand-text-dim" />
          </button>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest border border-brand-primary/30">
                {lead.status}
              </span>
              <div className="h-1 w-1 rounded-full bg-brand-text-dim/30" />
              <span className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest opacity-50 font-mono">
                ID: {lead.id || Math.floor(Math.random() * 1000000)}
              </span>
            </div>
            <div>
              <h3 className="text-4xl font-black tracking-tighter uppercase leading-[0.9] mb-3 text-brand-text">{lead.name}</h3>
              <p className="text-base font-bold text-brand-text-dim/60 uppercase tracking-tight">Razão Social: {lead.name} LTDA</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-brand-border text-xs font-mono font-bold text-brand-primary">
                {lead.cnpj}
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-brand-border">
                <Database className="w-4 h-4 text-brand-primary" />
                <span className="text-[11px] font-black text-brand-text-dim uppercase tracking-widest">{lead.natureza || "Natureza não informada"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content - Compact Grid */}
        <div className="px-10 py-8 grid grid-cols-2 gap-8 border-t border-brand-border/50">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <Info className="w-4 h-4 text-brand-primary" />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-widest">Dados Cadastrais</h4>
              </div>
              <div className="space-y-3 pl-11">
                {[
                  { label: 'Abertura', value: lead.abertura || '02/11/2005', mono: true },
                  { label: 'Capital', value: lead.capital.startsWith('R$') ? lead.capital : `R$ ${lead.capital}`, mono: true, color: 'text-emerald-500' },
                  { label: 'Porte', value: lead.porte || 'Micro Empresa' },
                  { label: 'Faturamento', value: lead.faturamento, badge: true }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <span className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest group-hover:text-white transition-colors">{item.label}</span>
                    {item.badge ? (
                      <span className="px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-widest border border-brand-primary/20">{item.value}</span>
                    ) : (
                      <span className={cn("text-xs font-black", item.mono && "font-mono", item.color)}>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-widest">Localização</h4>
              </div>
              <div className="pl-11 space-y-2">
                <p className="text-sm font-black uppercase tracking-tight leading-none">{lead.endereco || "ENDEREÇO NÃO INFORMADO"}</p>
                <p className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">{lead.localizacao || "CIDADE — UF"}</p>
                <p className="text-[10px] font-mono text-brand-text-dim/50">CEP: {lead.cep || "00000000"}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-brand-primary" />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-widest">Canais de Contato</h4>
              </div>
              <div className="pl-11 space-y-3">
                <div className="flex items-center gap-3 text-brand-text-dim/30 italic text-[11px] font-medium">
                  <Phone className="w-3.5 h-3.5" />
                  {lead.telefone || "Sem telefone registrado"}
                </div>
                <div className="flex items-center gap-3 text-brand-text-dim/30 italic text-[11px] font-medium">
                  <Mail className="w-3.5 h-3.5" />
                  {lead.email || "Sem email registrado"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-brand-primary" />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-widest">Atividade Econômica</h4>
              </div>
              <div className="pl-11 space-y-2 relative group">
                <Building2 className="absolute -right-4 top-0 w-16 h-16 text-brand-primary/5 group-hover:text-brand-primary/10 transition-colors" />
                <p className="text-[9px] font-black text-brand-primary uppercase tracking-widest">CNAE Principal</p>
                <p className="text-4xl font-black tracking-tighter font-mono leading-none">{lead.cnae || "0000000"}</p>
                <p className="text-[11px] font-bold text-brand-text-dim uppercase tracking-wider leading-tight">{lead.atividade || "Atividade não informada"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-10 bg-brand-bg/20 border-t border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">
              Lead disponível para exportação
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-brand-text-dim hover:text-brand-text transition-colors"
            >
              Fechar
            </button>
            <button 
              onClick={() => {
                const savedLeadsRaw = localStorage.getItem('dibai_saved_leads');
                const savedLeads = savedLeadsRaw ? JSON.parse(savedLeadsRaw) : [];
                
                // Check if the lead is already saved
                if (!savedLeads.some((l: any) => l.cnpj === lead.cnpj)) {
                  savedLeads.push(lead);
                  localStorage.setItem('dibai_saved_leads', JSON.stringify(savedLeads));
                }
                alert('Lead salvo com sucesso!');
              }}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 text-white text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              Salvar Lead
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LeadCard = ({ company, onClick, isSelected, onToggleSelect }: any) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={onClick}
    className={cn(
      "glass-card p-6 group hover:border-brand-primary/50 transition-all relative cursor-pointer h-full flex flex-col",
      isSelected && "border-brand-primary bg-brand-primary/5"
    )}
  >
    <div className="flex items-start justify-between mb-6">
      <div className="flex flex-col gap-2">
        <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest w-fit border border-emerald-500/20">
          {company.status}
        </span>
        <h4 className="text-lg font-black tracking-tight leading-tight group-hover:text-brand-primary transition-colors text-brand-text">
          {company.name}
        </h4>
        <p className="text-[10px] font-mono text-brand-text-dim uppercase tracking-wider">
          CNPJ: {company.cnpj}
        </p>
      </div>
      <div className="flex gap-2">
        <button className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center hover:bg-white/5 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-brand-text-dim" />
        </button>
        <button 
          onClick={(e) => onToggleSelect(company.cnpj, e)}
          className={cn(
            "w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center",
            isSelected ? "bg-brand-primary border-brand-primary" : "border-brand-border group-hover:border-brand-primary"
          )}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </button>
      </div>
    </div>

    <div className="h-px bg-brand-border w-full mb-6" />

    <div className="grid grid-cols-2 gap-6 flex-1">
      <div className="space-y-1">
        <p className="text-[9px] font-black text-brand-text-dim uppercase tracking-widest">Capital Social</p>
        <p className="text-sm font-black text-emerald-500 font-mono">
          {company.capital.startsWith('R$') ? company.capital : `R$ ${company.capital}`}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-[9px] font-black text-brand-text-dim uppercase tracking-widest">Est. Faturamento</p>
        <p className="text-sm font-black text-brand-primary uppercase tracking-tight">
          {company.faturamento}
        </p>
      </div>
    </div>

    <div className="mt-6 flex items-center gap-4">
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-card bg-brand-card flex items-center justify-center overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/${company.name + i}/32/32`} 
              alt="Avatar" 
              className="w-full h-full object-cover grayscale opacity-50"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
      <p className="text-[9px] font-bold text-brand-text-dim uppercase tracking-wider">Sócios Identificados</p>
    </div>
  </motion.div>
);

export const Busca: React.FC<{ 
  credits: number; 
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  onNavigateToPlans: () => void;
}> = ({ credits, setCredits, onNavigateToPlans }) => {
  const [showResults, setShowResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState<any>(null);
  const [iaQuery, setIaQuery] = React.useState('');
  const [leads, setLeads] = React.useState<any[]>([]);
  const [selectedLeads, setSelectedLeads] = React.useState<Set<string>>(new Set());
  
  // Filter States
  const [openFilters, setOpenFilters] = React.useState<string[]>([]);
  const [resultsCount, setResultsCount] = React.useState('100');
  const [razaoSocial, setRazaoSocial] = React.useState('');
  const [isSaveModalOpen, setIsSaveModalOpen] = React.useState(false);
  const [searchName, setSearchName] = React.useState('');
  const [savedSearches, setSavedSearches] = React.useState<string[]>([]);
  const [isSavedSearchesOpen, setIsSavedSearchesOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSavedSearchesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Segment Filter
  const [isSegmentOpen, setIsSegmentOpen] = React.useState(false);
  const [selectedSegments, setSelectedSegments] = React.useState<string[]>([]);
  const [segmentSearch, setSegmentSearch] = React.useState('');

  // CNAE Filter
  const [isCnaeOpen, setIsCnaeOpen] = React.useState(false);
  const [selectedCnaes, setSelectedCnaes] = React.useState<string[]>([]);
  const [expandedCnaes, setExpandedCnaes] = React.useState<string[]>(['03']);
  const [cnaeSearch, setCnaeSearch] = React.useState('');
  
  // Location Filter
  const [isRegionOpen, setIsRegionOpen] = React.useState(false);
  const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);
  const [isStateOpen, setIsStateOpen] = React.useState(false);
  const [selectedStates, setSelectedStates] = React.useState<string[]>([]);
  const [isCityOpen, setIsCityOpen] = React.useState(false);
  const [selectedCities, setSelectedCities] = React.useState<string[]>([]);
  const [citySearch, setCitySearch] = React.useState('');
  const [availableCities, setAvailableCities] = React.useState<any[]>([]);
  const [isCityLoading, setIsCityLoading] = React.useState(false);
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = React.useState(false);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = React.useState<string[]>([]);
  const [neighborhoodSearch, setNeighborhoodSearch] = React.useState('');
  const [availableNeighborhoods, setAvailableNeighborhoods] = React.useState<string[]>([]);
  const [isNeighborhoodLoading, setIsNeighborhoodLoading] = React.useState(false);

  const regionsToStates: Record<string, string[]> = {
    "Norte": ["Acre", "Amapá", "Amazonas", "Pará", "Rondônia", "Roraima", "Tocantins"],
    "Nordeste": ["Alagoas", "Bahia", "Ceará", "Maranhão", "Paraíba", "Pernambuco", "Piauí", "Rio Grande do Norte", "Sergipe"],
    "Centro-Oeste": ["Distrito Federal", "Goiás", "Mato Grosso", "Mato Grosso do Sul"],
    "Sudeste": ["Espírito Santo", "Minas Gerais", "Rio de Janeiro", "São Paulo"],
    "Sul": ["Paraná", "Rio Grande do Sul", "Santa Catarina"]
  };

  const handleOpenLocationDropdown = (dropdown: 'region' | 'state' | 'city' | 'neighborhood') => {
    setIsRegionOpen(dropdown === 'region' ? !isRegionOpen : false);
    setIsStateOpen(dropdown === 'state' ? !isStateOpen : false);
    setIsCityOpen(dropdown === 'city' ? !isCityOpen : false);
    setIsNeighborhoodOpen(dropdown === 'neighborhood' ? !isNeighborhoodOpen : false);
  };

  const stateToUF: Record<string, string> = {
    "Acre": "AC", "Alagoas": "AL", "Amapá": "AP", "Amazonas": "AM", "Bahia": "BA",
    "Ceará": "CE", "Distrito Federal": "DF", "Espírito Santo": "ES", "Goiás": "GO",
    "Maranhão": "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS", "Minas Gerais": "MG",
    "Pará": "PA", "Paraíba": "PB", "Paraná": "PR", "Pernambuco": "PE", "Piauí": "PI",
    "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN", "Rio Grande do Sul": "RS",
    "Rondônia": "RO", "Roraima": "RR", "Santa Catarina": "SC", "São Paulo": "SP",
    "Sergipe": "SE", "Tocantins": "TO"
  };

  React.useEffect(() => {
    const fetchCities = async () => {
      if (selectedStates.length === 0) {
        setAvailableCities([]);
        setSelectedCities([]);
        return;
      }

      setIsCityLoading(true);
      try {
        const fetchPromises = selectedStates.map(state => 
          fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateToUF[state]}/municipios`)
            .then(res => res.json())
        );

        const results = await Promise.all(fetchPromises);
        const allCities = results.flat().map((city: any) => ({
          id: city.id,
          nome: city.nome
        })).sort((a: any, b: any) => a.nome.localeCompare(b.nome));
        setAvailableCities(allCities);
        
        // Remove cities that are no longer in the available list
        setSelectedCities(prev => prev.filter(cityName => allCities.some((c: any) => c.nome === cityName)));
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      } finally {
        setIsCityLoading(false);
      }
    };

    fetchCities();
  }, [selectedStates]);

  React.useEffect(() => {
    const fetchNeighborhoods = async () => {
      if (selectedCities.length === 0) {
        setAvailableNeighborhoods([]);
        setSelectedNeighborhoods([]);
        return;
      }

      setIsNeighborhoodLoading(true);
      try {
        // Find IDs for selected cities
        const selectedCityIds = availableCities
          .filter(city => selectedCities.includes(city.nome))
          .map(city => city.id);

        const fetchPromises = selectedCityIds.map(cityId => 
          fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cityId}/distritos`)
            .then(res => res.json())
        );

        const results = await Promise.all(fetchPromises);
        const allNeighborhoods = results.flat().map((n: any) => n.nome).sort();
        setAvailableNeighborhoods(allNeighborhoods);
        
        // Remove neighborhoods that are no longer available
        setSelectedNeighborhoods(prev => prev.filter(n => allNeighborhoods.includes(n)));
      } catch (error) {
        console.error("Erro ao buscar bairros:", error);
      } finally {
        setIsNeighborhoodLoading(false);
      }
    };

    fetchNeighborhoods();
  }, [selectedCities]);

  // Faturamento & Porte Filter States
  const [selectedFaturamento, setSelectedFaturamento] = React.useState<string[]>([]);
  const [selectedPorte, setSelectedPorte] = React.useState<string[]>([]);
  const [isFaturamentoDropdownOpen, setIsFaturamentoDropdownOpen] = React.useState(false);
  const [isPorteDropdownOpen, setIsPorteDropdownOpen] = React.useState(false);

  // New Filter States
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('Todos');
  const [selectedWebsite, setSelectedWebsite] = React.useState('Todas');
  const [selectedNatureza, setSelectedNatureza] = React.useState<string[]>([]);
  const [isNaturezaOpen, setIsNaturezaOpen] = React.useState(false);
  const [naturezaSearch, setNaturezaSearch] = React.useState('');
  const [capitalMin, setCapitalMin] = React.useState('');
  const [capitalMax, setCapitalMax] = React.useState('');

  const segments = [
    "Abatedouros",
    "Academias (1 atividades econômicas)",
    "Açougues e peixarias",
    "Administração pública",
    "Aeroportos",
    "Agência de publicidade",
    "Agências de Recursos humanos"
  ];

  const cnaes = [
    { id: '01', label: '01 - AGRICULTURA, PECUÁRIA E SERVIÇOS RELACIONADOS' },
    { id: '02', label: '02 - PRODUÇÃO FLORESTAL' },
    { 
      id: '03', 
      label: '03 - PESCA E AQÜICULTURA',
      children: [
        { id: '031', label: '031 - PESCA' },
        { id: '032', label: '032 - AQÜICULTURA' }
      ]
    },
    { id: '05', label: '05 - EXTRAÇÃO DE CARVÃO MINERAL' },
    { id: '06', label: '06 - EXTRAÇÃO DE PETRÓLEO E GÁS NATURAL' }
  ];

  const states = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
    "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
    "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
    "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
    "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ];

  const billingOptions = [
    { id: '81k', label: 'Até R$ 81 mil' },
    { id: '360k', label: 'Até R$ 360 mil' },
    { id: '4.8m', label: 'R$ 360k - R$ 4.8M' },
    { id: '10m', label: 'Até R$ 10M' },
    { id: '300m', label: 'R$ 10M - R$ 300M' },
    { id: 'above300m', label: 'Acima de R$ 300M' }
  ];

  const sizeOptions = [
    { id: 'mei', label: 'MEI' },
    { id: 'me', label: 'Microempresa (ME)' },
    { id: 'epp', label: 'Empresa de Pequeno Porte (EPP)' },
    { id: 'pequena', label: 'Pequena' },
    { id: 'media', label: 'Média' },
    { id: 'grande', label: 'Grande' }
  ];

  const naturezaOptions = [
    "Órgão Público do Poder Executivo Federal",
    "Órgão Público do Poder Executivo Estadual ou do Distrito Federal",
    "Órgão Público do Poder Executivo Municipal",
    "Órgão Público do Poder Legislativo Federal",
    "Órgão Público do Poder Legislativo Estadual ou do Distrito Federal",
    "Órgão Público do Poder Legislativo Municipal",
    "Órgão Público do Poder Judiciário Federal",
    "Órgão Público do Poder Judiciário Estadual",
    "Autarquia Federal"
  ];

  const filteredNatureza = naturezaOptions.filter(n => 
    n.toLowerCase().includes(naturezaSearch.toLowerCase())
  );

  const filteredSegments = segments.filter(s => 
    s.toLowerCase().includes(segmentSearch.toLowerCase())
  );

  const toggleSegment = (segment: string) => {
    setSelectedSegments(prev => 
      prev.includes(segment) 
        ? prev.filter(s => s !== segment) 
        : [...prev, segment]
    );
  };

  const toggleCnae = (id: string) => {
    setSelectedCnaes(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleExpandCnae = (id: string) => {
    setExpandedCnaes(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredCnaes = React.useMemo(() => {
    if (!cnaeSearch) return cnaes;
    const search = cnaeSearch.toLowerCase();
    return cnaes.filter(c => 
      c.label.toLowerCase().includes(search) || 
      c.children?.some(child => child.label.toLowerCase().includes(search))
    );
  }, [cnaeSearch]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setShowResults(false);
    setSelectedLeads(new Set());
    
    try {
      // Construct a query from filters if iaQuery is empty
      let query = iaQuery;
      if (!query.trim()) {
        const filterParts = [];
        if (selectedSegments.length > 0) filterParts.push(`segmentos: ${selectedSegments.join(', ')}`);
        if (selectedCnaes.length > 0) filterParts.push(`CNAEs: ${selectedCnaes.join(', ')}`);
        if (selectedStates.length > 0) filterParts.push(`estados: ${selectedStates.join(', ')}`);
        if (selectedCities.length > 0) filterParts.push(`cidades: ${selectedCities.join(', ')}`);
        if (selectedNeighborhoods.length > 0) filterParts.push(`bairros: ${selectedNeighborhoods.join(', ')}`);
        if (selectedFaturamento.length > 0) filterParts.push(`faturamento: ${selectedFaturamento.join(', ')}`);
        
        if (filterParts.length > 0) {
          query = `Empresas com os seguintes filtros: ${filterParts.join('; ')}`;
        } else {
          query = "Empresas brasileiras de diversos setores";
        }
      }

      if (credits <= 0) {
        onNavigateToPlans();
        return;
      }

      const results = await searchLeadsWithAI(query);
      setLeads(results);
      setCredits(prev => Math.max(0, prev - 1));
      setShowResults(true);
    } catch (error) {
      console.error("Erro na busca IA:", error);
      // Fallback to mock data on error
      setLeads([
        { name: 'INCORPORADORA LISBOA', cnpj: '98.762.693/0001-54', status: 'ATIVA', capital: '1.005.800,00', faturamento: 'Até R$ 360 mil', cnae: '6810202', atividade: 'Aluguel de imóveis próprios', localizacao: 'VIAMAO, RS' },
        { name: 'LOGÍSTICA AVANÇADA LTDA', cnpj: '12.345.678/0001-90', status: 'ATIVA', capital: '5.200.000,00', faturamento: 'R$ 10m - R$ 300m', cnae: '4930202', atividade: 'Transporte rodoviário de carga', localizacao: 'SÃO PAULO, SP' },
        { name: 'TECNOLOGIA VERDE S.A.', cnpj: '45.678.901/0001-23', status: 'ATIVA', capital: '12.500.000,00', faturamento: 'Acima de R$ 300m', cnae: '6201501', atividade: 'Desenvolvimento de software sob encomenda', localizacao: 'CURITIBA, PR' },
      ]);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLeadSelection = (cnpj: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLeads(prev => {
      const next = new Set(prev);
      if (next.has(cnpj)) next.delete(cnpj);
      else next.add(cnpj);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === leads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(leads.map(l => l.cnpj)));
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg relative pt-16">
      <AnimatePresence>
        {selectedLead && (
          <LeadDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
        )}
      </AnimatePresence>

      {/* Sidebar de Filtros - Fixed on the LEFT */}
      <aside className="w-96 bg-brand-sidebar border-r border-brand-border flex flex-col h-[calc(100vh-4rem)] sticky top-16 z-10">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="py-2">
            <FilterItem 
              title="Opções de Pesquisa" 
              icon={Search} 
              active={openFilters.includes('opcoes')} 
              onClick={() => {
                const id = 'opcoes';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Quantidade</label>
                  <div className="relative group">
                    <input 
                      type="text"
                      value={resultsCount}
                      onChange={(e) => setResultsCount(e.target.value)}
                      className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-bold text-brand-text outline-none focus:border-brand-primary transition-all shadow-sm group-hover:border-brand-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-text-dim uppercase tracking-widest">Filtros salvos</label>
                  <div className="relative group" ref={dropdownRef}>
                    <div className="relative">
                      <input 
                        type="text"
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                        onFocus={() => setIsSavedSearchesOpen(true)}
                        placeholder="Selecione um filtro salvo..."
                        className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text outline-none focus:border-brand-primary transition-all shadow-sm group-hover:border-brand-primary/50 placeholder:text-brand-text-dim/30"
                      />
                      <button 
                        onClick={() => setIsSavedSearchesOpen(!isSavedSearchesOpen)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brand-hover rounded-lg transition-colors"
                      >
                        <ChevronDown className={cn("w-3 h-3 text-brand-text-dim transition-transform", isSavedSearchesOpen && "rotate-180")} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isSavedSearchesOpen && savedSearches.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden py-1"
                        >
                          {savedSearches.map((search, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setRazaoSocial(search);
                                setIsSavedSearchesOpen(false);
                              }}
                              className="w-full px-4 py-2 text-[11px] font-medium text-left text-brand-text-dim hover:bg-brand-hover hover:text-brand-text transition-all"
                            >
                              {search}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full py-3 bg-[#2c524d] text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#1f3a36] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                  Buscar agora
                </button>
              </div>
            </FilterItem>

            <FilterItem 
              title="Segmento de mercado" 
              icon={Building2} 
              active={openFilters.includes('segmento')} 
              onClick={() => {
                const id = 'segmento';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="relative mt-2">
                <button 
                  onClick={() => setIsSegmentOpen(!isSegmentOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text-dim hover:border-brand-primary transition-all"
                >
                  <span className={cn(selectedSegments.length > 0 && "text-brand-text")}>
                    {selectedSegments.length > 0 
                      ? `${selectedSegments.length} selecionados` 
                      : "Selecione um ou mais segmentos"}
                  </span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform", isSegmentOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isSegmentOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-2 border-b border-brand-border">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-text-dim/40" />
                          <input 
                            type="text"
                            placeholder="Buscar segmento..."
                            value={segmentSearch}
                            onChange={(e) => setSegmentSearch(e.target.value)}
                            className="w-full bg-brand-bg border border-brand-border rounded-lg pl-8 pr-3 py-2 text-[10px] font-medium text-brand-text outline-none focus:border-brand-primary"
                          />
                        </div>
                      </div>

                      <div className="max-h-60 overflow-y-auto no-scrollbar py-1">
                        {filteredSegments.map((segment) => (
                          <button
                            key={segment}
                            onClick={() => toggleSegment(segment)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-brand-text-dim hover:bg-brand-hover hover:text-brand-text transition-all text-left",
                              selectedSegments.includes(segment) && "bg-brand-primary/5 text-brand-primary"
                            )}
                          >
                            <div className={cn(
                              "w-3.5 h-3.5 rounded border border-brand-border flex items-center justify-center transition-all",
                              selectedSegments.includes(segment) && "bg-brand-primary border-brand-primary"
                            )}>
                              {selectedSegments.includes(segment) && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                            </div>
                            {segment}
                          </button>
                        ))}
                      </div>

                      <div className="p-3 bg-brand-bg/50 border-t border-brand-border space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">
                            Atividades selecionadas ({selectedSegments.length}/100)
                          </span>
                          <button 
                            onClick={() => setSelectedSegments([])}
                            className="text-[9px] font-black text-brand-text-dim uppercase tracking-widest hover:text-brand-text"
                          >
                            Limpar
                          </button>
                        </div>
                        <button 
                          onClick={() => setSelectedSegments([...segments])}
                          className="w-full py-2 text-[9px] font-black text-brand-primary uppercase tracking-widest border border-brand-primary/20 rounded-lg hover:bg-brand-primary/5 transition-all text-left px-3"
                        >
                          Selecionar todos
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FilterItem>

            <FilterItem 
              title="Atividade econômica (CNAEs)" 
              icon={Code} 
              active={openFilters.includes('atividade')} 
              onClick={() => {
                const id = 'atividade';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="relative mt-2">
                <div className="relative">
                  <input 
                    type="text"
                    value={cnaeSearch}
                    onChange={(e) => {
                      setCnaeSearch(e.target.value);
                      if (!isCnaeOpen) setIsCnaeOpen(true);
                    }}
                    onFocus={() => setIsCnaeOpen(true)}
                    placeholder={selectedCnaes.length > 0 
                      ? `${selectedCnaes.length} selecionados` 
                      : "Selecione uma opção ou digite..."}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text outline-none focus:border-brand-primary placeholder:text-brand-text-dim transition-all pr-10"
                  />
                  <button 
                    onClick={() => setIsCnaeOpen(!isCnaeOpen)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brand-hover rounded-lg transition-colors"
                  >
                    <ChevronDown className={cn("w-3 h-3 text-brand-text-dim transition-transform", isCnaeOpen && "rotate-180")} />
                  </button>
                </div>

                <AnimatePresence>
                  {isCnaeOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="max-h-80 overflow-y-auto no-scrollbar py-2">
                        {filteredCnaes.map((cnae) => (
                          <div key={cnae.id} className="flex flex-col">
                            <div className="flex items-center gap-2 px-4 py-2 hover:bg-brand-hover group transition-all">
                              {cnae.children ? (
                                <button 
                                  onClick={() => toggleExpandCnae(cnae.id)}
                                  className="w-4 h-4 flex items-center justify-center border border-brand-border rounded bg-brand-bg text-brand-text-dim hover:text-brand-primary"
                                >
                                  {expandedCnaes.includes(cnae.id) ? <Plus className="w-2.5 h-2.5 rotate-45" /> : <Plus className="w-2.5 h-2.5" />}
                                </button>
                              ) : (
                                <div className="w-4" />
                              )}
                              <button 
                                onClick={() => toggleCnae(cnae.id)}
                                className="flex items-center gap-3 flex-1 text-left"
                              >
                                <div className={cn(
                                  "w-3.5 h-3.5 rounded border border-brand-border flex items-center justify-center transition-all",
                                  selectedCnaes.includes(cnae.id) && "bg-brand-primary border-brand-primary"
                                )}>
                                  {selectedCnaes.includes(cnae.id) && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                                </div>
                                <span className={cn(
                                  "text-[10px] font-medium text-brand-text-dim group-hover:text-brand-text",
                                  selectedCnaes.includes(cnae.id) && "text-brand-primary"
                                )}>
                                  {cnae.label}
                                </span>
                              </button>
                            </div>
                            
                            {cnae.children && expandedCnaes.includes(cnae.id) && (
                              <div className="flex flex-col ml-6 border-l border-dashed border-brand-border/50">
                                {cnae.children.map((child) => (
                                  <div key={child.id} className="flex items-center gap-2 px-4 py-2 hover:bg-brand-hover group transition-all relative">
                                    <div className="absolute left-0 top-1/2 w-3 h-px border-t border-dashed border-brand-border/50" />
                                    <div className="w-4" />
                                    <button 
                                      onClick={() => toggleCnae(child.id)}
                                      className="flex items-center gap-3 flex-1 text-left"
                                    >
                                      <div className={cn(
                                        "w-3.5 h-3.5 rounded border border-brand-border flex items-center justify-center transition-all",
                                        selectedCnaes.includes(child.id) && "bg-brand-primary border-brand-primary"
                                      )}>
                                        {selectedCnaes.includes(child.id) && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                                      </div>
                                      <span className={cn(
                                        "text-[10px] font-medium text-brand-text-dim group-hover:text-brand-text",
                                        selectedCnaes.includes(child.id) && "text-brand-primary"
                                      )}>
                                        {child.label}
                                      </span>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-brand-bg/50 border-t border-brand-border space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">
                            Atividades econômicas selecionadas ({selectedCnaes.length}/150)
                          </span>
                        </div>
                        <button 
                          onClick={() => setSelectedCnaes(cnaes.map(c => c.id))}
                          className="w-full py-2 text-[9px] font-black text-brand-primary uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-all text-left px-3"
                        >
                          Selecionar todos
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FilterItem>

            <FilterItem 
              title="Localização" 
              icon={MapPin} 
              active={openFilters.includes('localizacao')} 
              onClick={() => {
                const id = 'localizacao';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="space-y-3 mt-2">
                {/* Regiões */}
                <div className="relative">
                  <button 
                    onClick={() => handleOpenLocationDropdown('region')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text-dim hover:border-brand-primary transition-all"
                  >
                    <span>{selectedRegions.length > 0 ? `${selectedRegions.length} regiões selecionadas` : "Regiões (Norte, Sul, etc.)"}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", isRegionOpen && "rotate-180")} />
                  </button>
                  
                  <AnimatePresence>
                    {isRegionOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        <div className="max-h-60 overflow-y-auto no-scrollbar py-1">
                          {Object.keys(regionsToStates).map((region) => (
                            <button
                              key={region}
                              onClick={() => {
                                setSelectedRegions(prev => {
                                  const isSelected = prev.includes(region);
                                  const next = isSelected ? prev.filter(r => r !== region) : [...prev, region];
                                  
                                  // Update states automatically
                                  const relatedStates = regionsToStates[region];
                                  if (!isSelected) {
                                    setSelectedStates(current => Array.from(new Set([...current, ...relatedStates])));
                                  } else {
                                    setSelectedStates(current => current.filter(s => !relatedStates.includes(s)));
                                  }
                                  
                                  return next;
                                });
                              }}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 text-[11px] font-medium text-brand-text-dim hover:bg-brand-hover hover:text-brand-text transition-all text-left",
                                selectedRegions.includes(region) && "text-brand-primary bg-brand-primary/5"
                              )}
                            >
                              <div className={cn(
                                "w-3 h-3 rounded-sm border border-brand-border flex items-center justify-center",
                                selectedRegions.includes(region) && "bg-brand-primary border-brand-primary"
                              )}>
                                {selectedRegions.includes(region) && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                              </div>
                              {region}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Estados */}
                <div className="relative">
                  <button 
                    onClick={() => handleOpenLocationDropdown('state')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text-dim hover:border-brand-primary transition-all"
                  >
                    <span>{selectedStates.length > 0 ? `${selectedStates.length} estados selecionados` : "Estados e Distrito Federal"}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", isStateOpen && "rotate-180")} />
                  </button>
                  
                  <AnimatePresence>
                    {isStateOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        <div className="max-h-60 overflow-y-auto no-scrollbar py-1">
                          {(selectedRegions.length > 0 
                            ? states.filter(s => selectedRegions.some(r => regionsToStates[r].includes(s)))
                            : states
                          ).map((state) => (
                            <button
                              key={state}
                              onClick={() => {
                                setSelectedStates(prev => prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]);
                              }}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 text-[11px] font-medium text-brand-text-dim hover:bg-brand-hover hover:text-brand-text transition-all text-left",
                                selectedStates.includes(state) && "text-brand-primary bg-brand-primary/5"
                              )}
                            >
                              <div className={cn(
                                "w-3 h-3 rounded-sm border border-brand-border flex items-center justify-center",
                                selectedStates.includes(state) && "bg-brand-primary border-brand-primary"
                              )}>
                                {selectedStates.includes(state) && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                              </div>
                              {state}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cidades */}
                <div className="relative">
                  <button 
                    onClick={() => handleOpenLocationDropdown('city')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text-dim hover:border-brand-primary transition-all"
                  >
                    <span>{selectedCities.length > 0 ? `${selectedCities.length} cidades selecionadas` : "Selecione uma ou mais cidades"}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", isCityOpen && "rotate-180")} />
                  </button>
                  
                  <AnimatePresence>
                    {isCityOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        <div className="p-2 border-b border-brand-border">
                          <input 
                            type="text"
                            placeholder="Buscar cidade..."
                            value={citySearch}
                            onChange={(e) => setCitySearch(e.target.value)}
                            className="w-full bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-[10px] font-medium text-brand-text outline-none focus:border-brand-primary"
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto no-scrollbar py-1">
                          {isCityLoading ? (
                            <div className="flex items-center justify-center py-4">
                              <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />
                            </div>
                          ) : availableCities.length > 0 ? (
                            availableCities
                              .filter(c => c.nome.toLowerCase().includes(citySearch.toLowerCase()))
                              .map((city) => (
                                <button
                                  key={city.id}
                                  onClick={() => {
                                    setSelectedCities(prev => prev.includes(city.nome) ? prev.filter(c => c !== city.nome) : [...prev, city.nome]);
                                  }}
                                  className={cn(
                                    "w-full flex items-center gap-3 px-4 py-2 text-[11px] font-medium text-brand-text-dim hover:bg-brand-hover hover:text-brand-text transition-all text-left",
                                    selectedCities.includes(city.nome) && "text-brand-primary bg-brand-primary/5"
                                  )}
                                >
                                  <div className={cn(
                                    "w-3 h-3 rounded-sm border border-brand-border flex items-center justify-center",
                                    selectedCities.includes(city.nome) && "bg-brand-primary border-brand-primary"
                                  )}>
                                    {selectedCities.includes(city.nome) && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                                  </div>
                                  {city.nome}
                                </button>
                              ))
                          ) : (
                            <div className="px-4 py-3 text-[10px] text-brand-text-dim italic">
                              {selectedStates.length > 0 ? "Buscando cidades..." : "Selecione um estado primeiro"}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <button 
                    onClick={() => handleOpenLocationDropdown('neighborhood')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text-dim hover:border-brand-primary transition-all"
                  >
                    <span>{selectedNeighborhoods.length > 0 ? `${selectedNeighborhoods.length} bairros selecionados` : "Selecione um ou mais bairros"}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", isNeighborhoodOpen && "rotate-180")} />
                  </button>
                  
                  <AnimatePresence>
                    {isNeighborhoodOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        <div className="p-2 border-b border-brand-border">
                          <input 
                            type="text"
                            placeholder="Buscar bairro..."
                            value={neighborhoodSearch}
                            onChange={(e) => setNeighborhoodSearch(e.target.value)}
                            className="w-full bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-[10px] font-medium text-brand-text outline-none focus:border-brand-primary"
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto no-scrollbar py-1">
                          {isNeighborhoodLoading ? (
                            <div className="flex items-center justify-center py-4">
                              <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />
                            </div>
                          ) : availableNeighborhoods.length > 0 ? (
                            availableNeighborhoods
                              .filter(n => n.toLowerCase().includes(neighborhoodSearch.toLowerCase()))
                              .map((n) => (
                                <button
                                  key={n}
                                  onClick={() => {
                                    setSelectedNeighborhoods(prev => prev.includes(n) ? prev.filter(b => b !== n) : [...prev, n]);
                                  }}
                                  className={cn(
                                    "w-full flex items-center gap-3 px-4 py-2 text-[11px] font-medium text-brand-text-dim hover:bg-brand-hover hover:text-brand-text transition-all text-left",
                                    selectedNeighborhoods.includes(n) && "text-brand-primary bg-brand-primary/5"
                                  )}
                                >
                                  <div className={cn(
                                    "w-3 h-3 rounded-sm border border-brand-border flex items-center justify-center",
                                    selectedNeighborhoods.includes(n) && "bg-brand-primary border-brand-primary"
                                  )}>
                                    {selectedNeighborhoods.includes(n) && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                                  </div>
                                  {n}
                                </button>
                              ))
                          ) : (
                            <div className="px-4 py-3 text-[10px] text-brand-text-dim italic">
                              {selectedCities.length > 0 ? "Buscando bairros..." : "Selecione uma cidade primeiro"}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Pesquise por CEPs"
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text outline-none focus:border-brand-primary placeholder:text-brand-text-dim"
                  />
                </div>
              </div>
            </FilterItem>
            {/* 
            <FilterItem 
              title="Funcionários" 
              icon={Users} 
              active={activeFilter === 'funcionarios'} 
              onClick={() => setActiveFilter(activeFilter === 'funcionarios' ? null : 'funcionarios')}
            />
            */}
            <FilterItem 
              title="Faturamento" 
              icon={DollarSign} 
              active={openFilters.includes('faturamento')} 
              onClick={() => {
                const id = 'faturamento';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="relative mt-2">
                <button 
                  onClick={() => setIsFaturamentoDropdownOpen(!isFaturamentoDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text-dim hover:border-brand-primary transition-all"
                >
                  <span className={cn(selectedFaturamento.length > 0 && "text-brand-text")}>
                    {selectedFaturamento.length > 0 
                      ? `${selectedFaturamento.length} selecionados` 
                      : "Selecione o faturamento"}
                  </span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform", isFaturamentoDropdownOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isFaturamentoDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden p-2 space-y-1"
                    >
                      {billingOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSelectedFaturamento(prev => 
                              prev.includes(opt.id) ? prev.filter(i => i !== opt.id) : [...prev, opt.id]
                            );
                          }}
                          className={cn(
                            "w-full px-4 py-2.5 rounded-lg text-left transition-all flex items-center justify-between group",
                            selectedFaturamento.includes(opt.id) 
                              ? "bg-brand-primary/10 text-brand-primary" 
                              : "text-brand-text-dim hover:bg-brand-hover hover:text-brand-text"
                          )}
                        >
                          <span className="text-[11px] font-medium">{opt.label}</span>
                          <div className={cn(
                            "w-3.5 h-3.5 rounded border flex items-center justify-center transition-all",
                            selectedFaturamento.includes(opt.id) ? "bg-brand-primary border-brand-primary" : "border-brand-border group-hover:border-brand-primary/50"
                          )}>
                            {selectedFaturamento.includes(opt.id) && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FilterItem>

            <FilterItem 
              title="Porte" 
              icon={TrendingUp} 
              active={openFilters.includes('porte')} 
              onClick={() => {
                const id = 'porte';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="relative mt-2">
                <button 
                  onClick={() => setIsPorteDropdownOpen(!isPorteDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text-dim hover:border-brand-primary transition-all"
                >
                  <span className={cn(selectedPorte.length > 0 && "text-brand-text")}>
                    {selectedPorte.length > 0 
                      ? `${selectedPorte.length} selecionados` 
                      : "Selecione o porte"}
                  </span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform", isPorteDropdownOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isPorteDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden p-2 space-y-1"
                    >
                      {sizeOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSelectedPorte(prev => 
                              prev.includes(opt.id) ? prev.filter(i => i !== opt.id) : [...prev, opt.id]
                            );
                          }}
                          className={cn(
                            "w-full px-4 py-2.5 rounded-lg text-left transition-all flex items-center justify-between group",
                            selectedPorte.includes(opt.id) 
                              ? "bg-brand-primary/10 text-brand-primary" 
                              : "text-brand-text-dim hover:bg-brand-hover hover:text-brand-text"
                          )}
                        >
                          <span className="text-[11px] font-medium">{opt.label}</span>
                          <div className={cn(
                            "w-3.5 h-3.5 rounded border flex items-center justify-center transition-all",
                            selectedPorte.includes(opt.id) ? "bg-brand-primary border-brand-primary" : "border-brand-border group-hover:border-brand-primary/50"
                          )}>
                            {selectedPorte.includes(opt.id) && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FilterItem>

            <FilterItem 
              title="Capital Social" 
              icon={DollarSign} 
              active={openFilters.includes('capital')} 
              onClick={() => {
                const id = 'capital';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-brand-text uppercase tracking-tight">Valor mínimo</label>
                  <input 
                    type="text"
                    placeholder="Pesquisa pelo capital social"
                    value={capitalMin}
                    onChange={(e) => setCapitalMin(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text outline-none focus:border-brand-primary placeholder:text-brand-text-dim"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-brand-text uppercase tracking-tight">Valor máximo</label>
                  <input 
                    type="text"
                    placeholder="Pesquisa pelo capital social"
                    value={capitalMax}
                    onChange={(e) => setCapitalMax(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text outline-none focus:border-brand-primary placeholder:text-brand-text-dim"
                  />
                </div>
              </div>
            </FilterItem>

            <FilterItem 
              title="Natureza jurídica" 
              icon={ShieldCheck} 
              active={openFilters.includes('natureza')} 
              onClick={() => {
                const id = 'natureza';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="relative mt-2">
                <div className="relative">
                  <input 
                    type="text"
                    value={naturezaSearch}
                    onChange={(e) => {
                      setNaturezaSearch(e.target.value);
                      if (!isNaturezaOpen) setIsNaturezaOpen(true);
                    }}
                    onFocus={() => setIsNaturezaOpen(true)}
                    placeholder={selectedNatureza.length > 0 
                      ? `${selectedNatureza.length} selecionados` 
                      : "Selecione a natureza jurídica"}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text outline-none focus:border-brand-primary placeholder:text-brand-text-dim transition-all pr-10"
                  />
                  <button 
                    onClick={() => setIsNaturezaOpen(!isNaturezaOpen)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brand-hover rounded-lg transition-colors"
                  >
                    <ChevronDown className={cn("w-3 h-3 text-brand-text-dim transition-transform", isNaturezaOpen && "rotate-180")} />
                  </button>
                </div>

                <AnimatePresence>
                  {isNaturezaOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="max-h-60 overflow-y-auto no-scrollbar py-1">
                        {filteredNatureza.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setSelectedNatureza(prev => 
                                prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]
                              );
                            }}
                            className={cn(
                              "w-full px-4 py-2.5 text-[10px] font-medium text-left transition-all flex items-center justify-between group",
                              selectedNatureza.includes(opt) 
                                ? "bg-brand-primary/10 text-brand-primary" 
                                : "text-brand-text-dim hover:bg-brand-hover hover:text-brand-text"
                            )}
                          >
                            <span className="flex-1 pr-4">{opt}</span>
                            {selectedNatureza.includes(opt) && <CheckSquare className="w-3 h-3 text-brand-primary" />}
                          </button>
                        ))}
                      </div>
                      <div className="p-3 bg-brand-bg/50 border-t border-brand-border">
                        <button 
                          onClick={() => setSelectedNatureza([...naturezaOptions])}
                          className="w-full py-2 text-[9px] font-black text-brand-primary uppercase tracking-widest border border-brand-primary/20 rounded-lg hover:bg-brand-primary/5 transition-all text-left px-3"
                        >
                          Selecionar todos ({naturezaOptions.length})
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FilterItem>

            <FilterItem 
              title="Data de abertura" 
              icon={Calendar} 
              active={openFilters.includes('abertura')} 
              onClick={() => {
                const id = 'abertura';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="space-y-2 mt-2">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                  <input 
                    type="text"
                    placeholder="De"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text outline-none focus:border-brand-primary placeholder:text-brand-text-dim"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                  <input 
                    type="text"
                    placeholder="Até"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-[11px] font-medium text-brand-text outline-none focus:border-brand-primary placeholder:text-brand-text-dim"
                  />
                </div>
              </div>
            </FilterItem>

            <FilterItem 
              title="Tipo" 
              icon={Database} 
              active={openFilters.includes('tipo')} 
              onClick={() => {
                const id = 'tipo';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="flex border border-brand-border rounded-xl overflow-hidden mt-2">
                {['Todos', 'Matriz', 'Filial'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "flex-1 py-2.5 text-[11px] font-bold transition-all",
                      selectedType === type 
                        ? "bg-brand-primary/10 text-brand-primary" 
                        : "bg-brand-bg text-brand-text-dim hover:text-brand-text"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </FilterItem>

            <FilterItem 
              title="Empresas com Website" 
              icon={Cloud} 
              active={openFilters.includes('website')} 
              onClick={() => {
                const id = 'website';
                setOpenFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
              }}
            >
              <div className="flex border border-brand-border rounded-xl overflow-hidden mt-2">
                {['Todas', 'Sim', 'Não'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedWebsite(opt)}
                    className={cn(
                      "flex-1 py-2.5 text-[11px] font-bold transition-all",
                      selectedWebsite === opt 
                        ? "bg-brand-primary/10 text-brand-primary" 
                        : "bg-brand-bg text-brand-text-dim hover:text-brand-text"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </FilterItem>
            {/* 
            <FilterItem 
              title="Sócios" 
              icon={Users} 
              active={activeFilter === 'socios'} 
              onClick={() => setActiveFilter(activeFilter === 'socios' ? null : 'socios')}
            />
            */}
            {/* 
            <FilterItem 
              title="Listas" 
              icon={FileText} 
              active={activeFilter === 'listas'} 
              onClick={() => setActiveFilter(activeFilter === 'listas' ? null : 'listas')}
            />
            */}
            {/* 
            <FilterItem 
              title="Simples Nacional" 
              icon={CheckCircle2} 
              active={activeFilter === 'simples'} 
              onClick={() => setActiveFilter(activeFilter === 'simples' ? null : 'simples')}
            />
            */}
          </div>
        </div>

        <div className="p-6 border-t border-brand-border bg-brand-bg/30">
          <button 
            onClick={() => setIsSaveModalOpen(true)}
            className="w-full py-4 bg-[#8fa9a5] text-white text-[13px] font-bold rounded-xl hover:bg-[#7a9490] transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center"
          >
            Salvar filtros
          </button>
        </div>
      </aside>

      {/* Save Search Modal */}
      <AnimatePresence>
        {isSaveModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSaveModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden p-8"
            >
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-bold text-gray-900">Salvar filtros</h2>
                <button 
                  onClick={() => setIsSaveModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-8">
                Salve sua pesquisa para facilitar a busca posteriormente
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">Nome</label>
                  <input 
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Digite o nome para esta pesquisa"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 transition-all placeholder:text-gray-400"
                    autoFocus
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => {
                      if (searchName.trim()) {
                        setSavedSearches(prev => [...prev, searchName.trim()]);
                        setRazaoSocial(searchName.trim());
                        setSearchName('');
                        setIsSaveModalOpen(false);
                      }
                    }}
                    className="w-full py-3.5 bg-[#2c524d] text-white text-[14px] font-bold rounded-lg hover:bg-[#1f3a36] transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Salvar
                  </button>
                  <button 
                    onClick={() => setIsSaveModalOpen(false)}
                    className="w-full py-2 text-[14px] font-bold text-[#2c524d] hover:text-[#1f3a36] transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area - Right Side */}
      <main className="flex-1 overflow-y-auto p-8 md:p-16">
        <AnimatePresence mode="wait">
          {!showResults && !isLoading ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto pt-8"
            >
              {/* Call to Action with Arrow pointing to the LEFT */}
              <div className="relative mb-16 text-center">
                {/* Removed Filtre aqui! annotation */}
                <h2 className="text-4xl font-black text-brand-text mb-4 tracking-tighter uppercase leading-[0.9] relative inline-block">
                  Comece sua busca de empresas <br />
                  <span className="text-brand-primary">utilizando os filtros ao lado!</span>
                  
                  {/* Curved Guiding Arrow */}
                  <div className="absolute -left-[420px] top-4 hidden xl:block w-[420px] h-32 pointer-events-none">
                    <motion.svg 
                      width="400" 
                      height="120" 
                      viewBox="0 0 400 120" 
                      fill="none"
                    >
                      <motion.path
                        d="M380 10 C 300 10, 50 20, 25 95"
                        stroke="url(#arrowGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: [0, 1, 1],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          times: [0, 0.6, 1],
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                      <motion.path
                        d="M12 85 L 25 95 L 38 85"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: [0, 0, 1, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          times: [0, 0.5, 0.6, 1],
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                      <defs>
                        <linearGradient id="arrowGradient" x1="380" y1="10" x2="25" y2="95" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </div>
                </h2>
                <p className="text-brand-text-dim text-sm font-medium max-w-2xl mx-auto">
                  Não sabe por onde começar? Use nossa Inteligência Artificial para descrever o que precisa ou explore os filtros manuais.
                </p>
              </div>

              {/* Central Search Bar - Compact Pop-up Style */}
              <div className="max-w-3xl mx-auto bg-brand-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-brand-border p-1.5 flex items-center gap-2 mb-20 transform hover:scale-[1.01] transition-all">
                <div className="flex-1 flex items-center gap-3 pl-6">
                  <Search className="w-5 h-5 text-brand-text-dim/40" />
                  <input 
                    type="text" 
                    placeholder="Descreva atividades ou nichos..." 
                    value={iaQuery}
                    onChange={(e) => setIaQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    className="w-full bg-transparent border-none outline-none text-sm font-medium text-brand-text placeholder:text-brand-text-dim/50"
                  />
                </div>
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="bg-brand-primary hover:bg-brand-accent text-white px-8 py-3 rounded-xl font-black tracking-widest uppercase text-[10px] flex items-center gap-2 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
                >
                  {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Buscar
                </button>
              </div>

            </motion.div>
          ) : isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-6"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-brand-primary animate-pulse" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">A IA está minerando leads...</h3>
                <p className="text-sm text-gray-500 font-medium">Cruzando dados de faturamento, CNAE e localização.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button onClick={() => setShowResults(false)} className="w-12 h-12 flex items-center justify-center hover:bg-brand-card rounded-2xl border border-brand-border transition-all shadow-sm">
                    <ChevronLeft className="w-6 h-6 text-brand-text-dim" />
                  </button>
                  <div className="flex items-center gap-8">
                    <div>
                      <h3 className="text-3xl font-black text-brand-text tracking-tighter uppercase">Resultados</h3>
                      <p className="text-xs font-bold text-brand-text-dim uppercase tracking-widest">Encontramos {leads.length} empresas</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={toggleSelectAll}
                    className="flex items-center gap-3 px-6 py-3.5 rounded-xl border border-brand-border hover:bg-brand-hover transition-all group"
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                      selectedLeads.size === leads.length && leads.length > 0
                        ? "bg-brand-primary border-brand-primary" 
                        : "border-brand-border group-hover:border-brand-primary"
                    )}>
                      {selectedLeads.size === leads.length && leads.length > 0 && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-brand-text-dim group-hover:text-brand-text">
                      Selecionar Todos ({selectedLeads.size})
                    </span>
                  </button>
                  <button className="px-8 py-3.5 rounded-2xl bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                    Exportar CSV
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {leads.map((lead, i) => (
                  <LeadCard 
                    key={i} 
                    company={lead} 
                    onClick={() => setSelectedLead(lead)}
                    isSelected={selectedLeads.has(lead.cnpj)}
                    onToggleSelect={toggleLeadSelection}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

