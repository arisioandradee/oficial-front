import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Busca } from './components/Busca';
import { Enriquecimento } from './components/Enriquecimento';
import { Gestao } from './components/Gestao';
import { Historico } from './components/Historico';
import { Planos } from './components/Planos';
import { Mensagens } from './components/Mensagens';
import { Account } from './components/Account';
import { VideoHelp } from './components/VideoHelp';
import { Login } from './components/Login';
import { PlaceholderPage } from './components/PlaceholderPage';
import { Building2, Users } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [theme, setTheme] = React.useState('dark');
  const [credits, setCredits] = React.useState(() => {
    const saved = localStorage.getItem('dibai_credits');
    return saved !== null ? parseInt(saved) : 10;
  });

  React.useEffect(() => {
    localStorage.setItem('dibai_credits', credits.toString());
  }, [credits]);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onStartSearch={() => setActiveTab('busca')} />;
      case 'busca':
        return <Busca credits={credits} setCredits={setCredits} onNavigateToPlans={() => setActiveTab('planos')} />;
      case 'enriquecimento':
        return <Enriquecimento />;
      case 'gestao':
        return <Gestao />;
      case 'historico':
        return <Historico />;
      case 'disparo-importar':
        return <Mensagens onBack={() => setActiveTab('dashboard')} />;
      case 'planos':
        return (
          <Planos 
            onBack={() => {
              setActiveTab('dashboard');
            }} 
            userCredits={credits}
            setUserCredits={setCredits}
          />
        );
      case 'account':
        return <Account />;
      default:
        return <Dashboard />;
    }
  };

  const getPageName = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'busca': return 'Busca de Leads';
      case 'enriquecimento': return 'Enriquecimento de Dados';
      case 'gestao': return 'Gestão';
      case 'historico': return 'Histórico';
      case 'disparo-importar': return 'Mensagens';
      case 'planos': return 'Planos';
      case 'account': return 'Minha Conta';
      default: return 'esta página';
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme as 'light' | 'dark'}
        toggleTheme={toggleTheme}
        onLogout={() => setIsLoggedIn(false)}
        credits={credits}
      />
      
      <main className="flex-1 overflow-y-auto transition-all duration-300">
        {renderContent()}
      </main>

      <VideoHelp pageName={getPageName()} />
    </div>
  );
}
