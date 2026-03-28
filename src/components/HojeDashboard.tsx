import React from 'react';
import { Copy, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { AppConfig } from '../types';

interface Props {
  config: AppConfig;
  isGenerating: boolean;
  generatedData: any;
  error: string | null;
  onGenerate: () => void;
}

export const HojeDashboard: React.FC<Props> = ({ config, isGenerating, generatedData, error, onGenerate }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optional: show a small toast or feedback
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4 text-neutral-400">
        <Loader2 size={48} className="animate-spin text-teal-500" />
        <p className="text-lg">Gerando conteúdo de hoje...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-900/50 p-6 rounded-xl flex flex-col items-center justify-center space-y-4 text-red-400">
        <AlertCircle size={48} />
        <p className="text-lg text-center">{error}</p>
        <button 
          onClick={onGenerate}
          className="flex items-center gap-2 px-6 py-3 bg-red-900/50 rounded-lg hover:bg-red-900/70 transition-all text-white"
        >
          <RefreshCw size={20} /> Tentar novamente
        </button>
      </div>
    );
  }

  if (!generatedData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4 text-neutral-400">
        <p className="text-lg text-center">Clique em "GERAR RESULTADO HOJE" para começar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Missão do Dia */}
      <div className="bg-teal-900/20 border border-teal-800/50 p-6 rounded-xl">
        <h3 className="font-bold text-xl text-teal-400 mb-2">Missão do Dia</h3>
        <p className="text-neutral-200">{generatedData.missao}</p>
      </div>

      {/* Post e Legenda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-neutral-200">Post Pronto</h3>
            <button onClick={() => handleCopy(generatedData.post)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
              <Copy size={14} /> Copiar
            </button>
          </div>
          <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {generatedData.post}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-neutral-200">Legenda Pronta</h3>
            <button onClick={() => handleCopy(generatedData.legenda)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
              <Copy size={14} /> Copiar
            </button>
          </div>
          <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {generatedData.legenda}
          </div>
        </div>
      </div>

      {/* CTA e Hashtags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-neutral-200">CTA Pronto</h3>
            <button onClick={() => handleCopy(generatedData.cta)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
              <Copy size={14} /> Copiar
            </button>
          </div>
          <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {generatedData.cta}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-neutral-200">Hashtags</h3>
            <button onClick={() => handleCopy(generatedData.hashtags)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
              <Copy size={14} /> Copiar
            </button>
          </div>
          <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {generatedData.hashtags}
          </div>
        </div>
      </div>

      {/* Sugestões de Story e Vídeo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-lg text-neutral-200 mb-4">Sugestão de Story</h3>
          <div className="text-neutral-300 whitespace-pre-wrap bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {generatedData.sugestaoStory}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-lg text-neutral-200 mb-4">Sugestão de Vídeo Curto</h3>
          <div className="text-neutral-300 whitespace-pre-wrap bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {generatedData.sugestaoVideo}
          </div>
        </div>
      </div>

      {/* Ações Finais */}
      <div className="flex justify-center pt-4">
        <button 
          onClick={onGenerate}
          className="flex items-center gap-2 px-6 py-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-all text-white font-bold"
        >
          <RefreshCw size={20} /> Gerar novamente
        </button>
      </div>
    </div>
  );
};
