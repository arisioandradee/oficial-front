import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState('arisio@dibaisales.com.br');
  const [password, setPassword] = React.useState('**********');
  const [name, setName] = React.useState('');
  const [cpfCnpj, setCpfCnpj] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = React.useState(1);
  const [recoveryEmail, setRecoveryEmail] = React.useState('');
  const [recoveryCode, setRecoveryCode] = React.useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);
  const [showTermsModal, setShowTermsModal] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isForgotPassword) {
      if (forgotPasswordStep === 1) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setForgotPasswordStep(2);
        }, 800);
        return;
      }
      if (forgotPasswordStep === 2) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          // Normally would go to reset password or back to login
          setIsForgotPassword(false);
          setForgotPasswordStep(1);
        }, 1000);
        return;
      }
    }

    if (isRegistering && !isTermsAccepted) {
      alert('Você precisa aceitar os termos de uso.');
      return;
    }

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
          className="md:w-5/12 bg-brand-primary p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-[80px] rounded-full -ml-32 -mb-32" />
          
          <motion.div layout className="relative z-10 flex flex-col items-center text-center">
            <img src="/logoDibai.png" alt="Dibai Sales Logo" className="w-56 md:w-64 mb-6 drop-shadow-2xl" />
          </motion.div>
        </motion.div>

        {/* Right Side - Forms */}
        <motion.div layout className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-[#0f131c]">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                {isForgotPassword 
                  ? (forgotPasswordStep === 1 ? 'Recuperar senha' : 'Verificar código')
                  : isRegistering ? 'Cadastre-se' : 'Acessar plataforma'}
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                {isForgotPassword
                  ? (forgotPasswordStep === 1 
                      ? 'Insira seu e-mail para receber o código de recuperação.' 
                      : `Enviamos um código de 6 dígitos para ${recoveryEmail}`)
                  : isRegistering 
                    ? 'Comece sua jornada de prospecção inteligente hoje.' 
                    : 'Insira suas credenciais para acessar sua conta.'}
              </p>
            </div>

            {!isForgotPassword && (
              <div className="space-y-3 mb-6">
                <button 
                  type="button"
                  className="w-full bg-white/5 border border-white/10 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
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
                  <span className="relative px-4 bg-[#0f131c] text-[9px] font-black text-slate-500 uppercase tracking-widest">OU</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {isForgotPassword && forgotPasswordStep === 1 && (
                  <motion.div 
                    key="forgot-step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">E-MAIL DE RECUPERAÇÃO</label>
                      <input 
                        type="email" 
                        required
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        className="w-full px-6 py-4 bg-[#05070a] border border-white/10 rounded-2xl text-sm font-bold text-white outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                    
                    <button 
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                    >
                      ← Voltar para login
                    </button>
                  </motion.div>
                )}

                {isForgotPassword && forgotPasswordStep === 2 && (
                  <motion.div 
                    key="forgot-step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between gap-2">
                      {recoveryCode.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newCode = [...recoveryCode];
                            newCode[index] = e.target.value.replace(/[^0-9]/g, '');
                            setRecoveryCode(newCode);
                            if (e.target.value && index < 5) {
                              const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                              nextInput?.focus();
                            }
                          }}
                          className="w-12 h-14 bg-[#05070a] border border-white/10 rounded-xl text-xl font-black text-white text-center outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                        />
                      ))}
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <button 
                        type="button"
                        onClick={() => setForgotPasswordStep(1)}
                        className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                      >
                        ← Alterar e-mail
                      </button>
                    </div>
                  </motion.div>
                )}

                {isRegistering && !isForgotPassword && (
                  <motion.div 
                    key="registration"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">NOME COMPLETO</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-5 py-3 bg-[#05070a] border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:border-brand-primary transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">E-MAIL</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3 bg-[#05070a] border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:border-brand-primary transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">CPF OU CNPJ</label>
                      <input 
                        type="text" 
                        required
                        value={cpfCnpj}
                        onChange={(e) => setCpfCnpj(e.target.value)}
                        className="w-full px-5 py-3 bg-[#05070a] border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:border-brand-primary transition-all"
                        placeholder="000.000.000-00"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">TELEFONE</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-5 py-3 bg-[#05070a] border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:border-brand-primary transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div className="flex items-start gap-3 pt-1">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          required
                          checked={isTermsAccepted}
                          onChange={(e) => setIsTermsAccepted(e.target.checked)}
                          className="h-4 w-4 rounded border-white/10 bg-[#05070a] text-brand-primary focus:ring-brand-primary/20 transition-all cursor-pointer"
                        />
                      </div>
                      <div className="text-xs">
                        <label htmlFor="terms" className="text-slate-400 font-medium">
                          Eu li e aceito os{' '}
                          <button
                            type="button"
                            onClick={() => setShowTermsModal(true)}
                            className="text-brand-primary hover:text-brand-accent transition-colors underline"
                          >
                            termos de uso
                          </button>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {!isRegistering && !isForgotPassword && (
                  <motion.div 
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
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
                        <button 
                          type="button" 
                          onClick={() => {
                            setIsForgotPassword(true);
                            setForgotPasswordStep(1);
                          }}
                          className="text-[10px] font-black text-brand-primary uppercase tracking-wider hover:underline"
                        >
                          Esqueceu sua senha?
                        </button>
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
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                disabled={isLoading || (isRegistering && !isTermsAccepted)}
                className="w-full bg-brand-primary text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 group disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isForgotPassword 
                      ? (forgotPasswordStep === 1 ? 'ENVIAR CÓDIGO' : 'VERIFICAR')
                      : isRegistering 
                        ? 'CONCLUIR CADASTRO'
                        : 'ENTRAR NA PLATAFORMA'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {!isForgotPassword && (
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  {isRegistering ? 'Já possui uma conta?' : 'Não possui uma conta?'} {' '}
                  <button 
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-brand-primary hover:text-brand-accent transition-colors"
                  >
                    {isRegistering ? 'FAZER LOGIN' : 'CRIAR AGORA'}
                  </button>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Terms Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTermsModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f131c] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-[#0f131c]">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Termos de Uso</h3>
                <button 
                  onClick={() => setShowTermsModal(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar space-y-6 text-slate-400 text-sm leading-relaxed">
                <section>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">1. Aceitação dos Termos</h4>
                  <p>Ao se cadastrar na plataforma Dibai Sales, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
                </section>
                <section>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">2. Uso de Dados</h4>
                  <p>A Dibai Sales utiliza inteligência artificial para otimizar processos de prospecção. Os dados fornecidos serão tratados de acordo com nossa Política de Privacidade e em conformidade com a LGPD (Lei Geral de Proteção de Dados).</p>
                </section>
                <section>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">3. Responsabilidades</h4>
                  <p>O usuário é inteiramente responsável pela veracidade das informações fornecidas e pelo uso ético das ferramentas de prospecção disponibilizadas, garantindo que não utilizará a plataforma para fins ilícitos ou abusivos.</p>
                </section>
                <section>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">4. Licença de Uso</h4>
                  <p>É concedida permissão para baixar temporariamente uma cópia dos materiais na plataforma para visualização transitória pessoal e não comercial apenas. Esta é a concessão de uma licença, não uma transferência de título.</p>
                </section>
                <section>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">5. Isenção de Responsabilidade</h4>
                  <p>Os materiais na plataforma da Dibai Sales são fornecidos 'como estão'. A Dibai Sales não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
                </section>
              </div>
              <div className="p-8 border-t border-white/10 bg-[#0f131c]">
                <button 
                  onClick={() => setShowTermsModal(false)}
                  className="w-full bg-brand-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20"
                >
                  Entendi e li os termos
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
