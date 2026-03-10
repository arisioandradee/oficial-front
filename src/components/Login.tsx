import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Download,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [email, setEmail] = React.useState('arisio@dibaisales.com.br');
  const [password, setPassword] = React.useState('**********');
  const [name, setName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="dark min-h-screen bg-[#05070a] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/10 blur-[120px] rounded-full" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ layout: { duration: 0.6, type: "spring", bounce: 0.2 } }}
        className={cn(
          "w-full max-w-5xl bg-brand-card rounded-[32px] overflow-hidden shadow-2xl flex flex-col relative z-10",
          isRegistering ? "md:flex-row-reverse" : "md:flex-row"
        )}
      >
        {/* Branding Side */}
        <motion.div 
          layout
          className="md:w-5/12 bg-brand-primary p-10 md:p-16 flex flex-col items-center justify-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-[80px] rounded-full -ml-32 -mb-32" />
          
          <motion.div layout className="relative z-10 flex flex-col items-center text-center">
            <img src="/logoDibai.png" alt="Dibai Sales Logo" className="w-64 md:w-72 mb-8 drop-shadow-2xl" />
          </motion.div>
        </motion.div>

        {/* Right Side - Forms */}
        <motion.div layout className="md:w-7/12 p-10 md:p-16 flex flex-col justify-center bg-[#0f131c]">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-10">
              <h3 className="text-3xl font-black text-white tracking-tight mb-2">
                {isRegistering ? 'Cadastre-se' : 'Acessar plataforma'}
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                {isRegistering 
                  ? 'Comece sua jornada de prospecção inteligente hoje.' 
                  : 'Insira suas credenciais para acessar sua conta.'}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <button 
                type="button"
                className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar com Google
              </button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <span className="relative px-4 bg-[#0f131c] text-[10px] font-black text-slate-500 uppercase tracking-widest">OU</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegistering && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">NOME COMPLETO</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-[#05070a] border border-white/10 rounded-2xl text-sm font-bold text-white outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                    placeholder="Seu nome"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">E-MAIL CORPORATIVO</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-[#05070a] border border-white/10 rounded-2xl text-sm font-bold text-white outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">SENHA DE ACESSO</label>
                  {!isRegistering && (
                    <button type="button" className="text-[10px] font-black text-brand-primary uppercase tracking-wider hover:underline">Esqueceu sua senha?</button>
                  )}
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-[#05070a] border border-white/10 rounded-2xl text-sm font-bold text-white outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-primary text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 group disabled:opacity-50 mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isRegistering ? 'CRIAR MINHA CONTA' : 'ENTRAR NA PLATAFORMA'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                {isRegistering ? 'Já possui uma conta?' : 'Não possui uma conta?'} {' '}
                <button 
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-brand-primary hover:text-brand-accent transition-colors"
                >
                  {isRegistering ? 'FAZER LOGIN' : 'CRIAR AGORA'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
