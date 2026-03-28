import React, { useState } from 'react';
import { Copy, RefreshCw, AlertCircle, Loader2, Globe } from 'lucide-react';
import { AppConfig } from '../types';

interface Props {
  config: AppConfig;
  isGenerating: boolean;
  generatedData: any;
  error: string | null;
  onGenerate: () => void;
}

export const HojeDashboard: React.FC<Props> = ({ config, isGenerating, generatedData, error, onGenerate }) => {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

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

  // Fallback para dados antigos que não tinham a estrutura pt/en
  const hasLanguageStructure = generatedData.pt && generatedData.en;
  const currentData = hasLanguageStructure ? generatedData[language] : generatedData;

  // Mapeamento de chaves para suportar a estrutura antiga e a nova (en)
  const missao = currentData.missao || currentData.mission || '';
  const post = currentData.post || '';
  const legenda = currentData.legenda || currentData.caption || '';
  const cta = currentData.cta || '';
  const hashtags = currentData.hashtags || '';
  const sugestaoStory = currentData.sugestaoStory || currentData.story || '';
  const sugestaoVideo = currentData.sugestaoVideo || currentData.video || '';

  return (
    <div className="space-y-6 pb-20">
      {/* Seletor de Idioma */}
      {hasLanguageStructure && (
        <div className="flex justify-center mb-8">
          <div className="bg-neutral-900 p-1 rounded-lg inline-flex items-center border border-neutral-800">
            <button
              onClick={() => setLanguage('pt')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                language === 'pt' 
                  ? 'bg-teal-600 text-white shadow-sm' 
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              <Globe size={16} />
              Português
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                language === 'en' 
                  ? 'bg-teal-600 text-white shadow-sm' 
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              <Globe size={16} />
              English
            </button>
          </div>
        </div>
      )}

      {/* Missão do Dia */}
      <div className="bg-teal-900/20 border border-teal-800/50 p-6 rounded-xl">
        <h3 className="font-bold text-xl text-teal-400 mb-2">
          {language === 'pt' ? 'Missão do Dia' : 'Daily Mission'}
        </h3>
        <p className="text-neutral-200">{missao}</p>
      </div>

      {/* Post e Legenda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-neutral-200">
              {language === 'pt' ? 'Post Pronto' : 'Ready Post'}
            </h3>
            <button onClick={() => handleCopy(post)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
              <Copy size={14} /> {language === 'pt' ? 'Copiar' : 'Copy'}
            </button>
          </div>
          <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {post}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-neutral-200">
              {language === 'pt' ? 'Legenda Pronta' : 'Ready Caption'}
            </h3>
            <button onClick={() => handleCopy(legenda)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
              <Copy size={14} /> {language === 'pt' ? 'Copiar' : 'Copy'}
            </button>
          </div>
          <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {legenda}
          </div>
        </div>
      </div>

      {/* CTA e Hashtags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-neutral-200">
              {language === 'pt' ? 'CTA Pronto' : 'Ready CTA'}
            </h3>
            <button onClick={() => handleCopy(cta)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
              <Copy size={14} /> {language === 'pt' ? 'Copiar' : 'Copy'}
            </button>
          </div>
          <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {cta}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-neutral-200">Hashtags</h3>
            <button onClick={() => handleCopy(hashtags)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
              <Copy size={14} /> {language === 'pt' ? 'Copiar' : 'Copy'}
            </button>
          </div>
          <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {hashtags}
          </div>
        </div>
      </div>

      {/* Sugestões de Story e Vídeo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-lg text-neutral-200 mb-4">
            {language === 'pt' ? 'Sugestão de Story' : 'Story Suggestion'}
          </h3>
          <div className="text-neutral-300 whitespace-pre-wrap bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {sugestaoStory}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-lg text-neutral-200 mb-4">
            {language === 'pt' ? 'Sugestão de Vídeo Curto' : 'Short Video Suggestion'}
          </h3>
          <div className="text-neutral-300 whitespace-pre-wrap bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            {sugestaoVideo}
          </div>
        </div>
      </div>

      {/* Ações Finais */}
      <div className="flex justify-center pt-4">
        <button 
          onClick={onGenerate}
          className="flex items-center gap-2 px-6 py-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-all text-white font-bold"
        >
          <RefreshCw size={20} /> {language === 'pt' ? 'Gerar novamente' : 'Generate again'}
        </button>
      </div>
    </div>
  );
};
