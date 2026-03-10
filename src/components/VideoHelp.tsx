import React from 'react';
import { Play, X, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoHelpProps {
  pageName?: string;
}

export const VideoHelp: React.FC<VideoHelpProps> = ({ pageName = 'esta página' }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40 flex items-center gap-4">
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="bg-brand-card border border-brand-border px-4 py-2 rounded-xl shadow-xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-text whitespace-nowrap">
              Guia em vídeo: {pageName}
            </p>
          </div>
        </motion.div>

        <motion.button
          id="video-help-fab"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleModal}
          className="relative w-14 h-14 bg-brand-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-accent transition-colors group"
        >
          {/* Tooltip inside for mobile or as alternative */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden group-hover:block">
            <div className="bg-brand-card border border-brand-border px-4 py-2 rounded-xl shadow-xl whitespace-nowrap">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-text">
                Guia em vídeo: {pageName}
              </p>
            </div>
          </div>

          <Video className="w-6 h-6 group-hover:hidden" />
          <Play className="w-6 h-6 hidden group-hover:block fill-current" />
        </motion.button>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="video-help-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 md:p-8"
            onClick={toggleModal}
          >
            {/* Close Button (Top Right) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleModal();
              }}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/hfoVcOYi7m0?autoplay=1"
                title="Vídeo de Ajuda"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              
              {/* Alternative using local video tag if preferred */}
              {/* 
              <video 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video> 
              */}
            </motion.div>

            {/* Hint text */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="absolute bottom-10 text-white/40 text-xs font-bold tracking-widest uppercase"
            >
              Clique fora para fechar
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
