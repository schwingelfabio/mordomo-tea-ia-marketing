import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, AlertCircle, Loader2, Globe, CheckCircle2, Instagram, Linkedin, Facebook } from 'lucide-react';
import { AppConfig } from '../types';

interface Props {
  config: AppConfig;
  isGenerating: boolean;
  generatedData: any;
  error: string | null;
  onGenerate: () => void;
}

type LanguageMode = 'pt' | 'en' | 'both';
type NetworkMode = 'instagram' | 'linkedin' | 'facebook';

export const HojeDashboard: React.FC<Props> = ({ config, isGenerating, generatedData, error, onGenerate }) => {
  const [language, setLanguage] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem('mordomo_lang');
    if (saved === 'pt' || saved === 'en' || saved === 'both') return saved;
    return navigator.language.startsWith('pt') ? 'pt' : 'en';
  });
  const [network, setNetwork] = useState<NetworkMode>('instagram');
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    localStorage.setItem('mordomo_lang', language);
  }, [language]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCopyAll = (lang: 'pt' | 'en') => {
    if (!generatedData || !generatedData[lang]) return;
    
    const data = generatedData[lang];
    const netData = data[network] || { post: data.post || '', legenda: data.legenda || data.caption || '' };
    
    const fullText = `${netData.post}\n\n${netData.legenda || netData.caption}\n\n${data.cta}\n\n${data.hashtags}`;
    navigator.clipboard.writeText(fullText);
    
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
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

  const hasLanguageStructure = generatedData.pt && generatedData.en;

  const renderContent = (lang: 'pt' | 'en') => {
    const currentData = hasLanguageStructure ? generatedData[lang] : generatedData;
    if (!currentData) return null;

    const missao = currentData.missao || currentData.mission || '';
    const cta = currentData.cta || '';
    const hashtags = currentData.hashtags || '';
    const sugestaoStory = currentData.sugestaoStory || currentData.story || '';
    const sugestaoVideo = currentData.sugestaoVideo || currentData.video || '';
    
    // Fallback for older data structure
    const netData = currentData[network] || { post: currentData.post || '', legenda: currentData.legenda || currentData.caption || '' };
    const post = netData.post || '';
    const legenda = netData.legenda || netData.caption || '';

    return (
      <div className="space-y-6">
        {/* Header with Copy All */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {lang === 'pt' ? '🇧🇷 Português' : '🇺🇸 English'}
          </h2>
          <button 
            onClick={() => handleCopyAll(lang)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-all font-medium shadow-lg shadow-teal-900/20"
          >
            {copiedAll ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            {copiedAll ? (lang === 'pt' ? 'Copiado!' : 'Copied!') : (lang === 'pt' ? 'Copiar tudo (PT)' : 'Copy all (EN)')}
          </button>
        </div>

        {/* Missão do Dia */}
        <div className="bg-teal-900/20 border border-teal-800/50 p-6 rounded-xl">
          <h3 className="font-bold text-xl text-teal-400 mb-2">
            {lang === 'pt' ? 'Missão do Dia' : 'Daily Mission'}
          </h3>
          <p className="text-neutral-200">{missao}</p>
        </div>

        {/* Post e Legenda */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-neutral-200">
                {lang === 'pt' ? 'Post Pronto' : 'Ready Post'}
              </h3>
              <button onClick={() => handleCopy(post)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
                <Copy size={14} /> {lang === 'pt' ? 'Copiar' : 'Copy'}
              </button>
            </div>
            <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
              {post}
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-neutral-200">
                {lang === 'pt' ? 'Legenda Pronta' : 'Ready Caption'}
              </h3>
              <button onClick={() => handleCopy(legenda)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
                <Copy size={14} /> {lang === 'pt' ? 'Copiar' : 'Copy'}
              </button>
            </div>
            <div className="text-neutral-300 whitespace-pre-wrap flex-1 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
              {legenda}
            </div>
          </div>
        </div>

        {/* CTA e Hashtags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-teal-950/40 border-2 border-teal-800/60 p-6 rounded-xl flex flex-col shadow-lg shadow-teal-900/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-teal-300 flex items-center gap-2">
                {lang === 'pt' ? 'CTA (Foco em Doação)' : 'CTA (Donation Focus)'}
              </h3>
              <button onClick={() => handleCopy(cta)} className="text-teal-300 hover:text-white flex items-center gap-1 text-sm bg-teal-800/50 px-3 py-1.5 rounded transition-colors">
                <Copy size={14} /> {lang === 'pt' ? 'Copiar' : 'Copy'}
              </button>
            </div>
            <div className="text-teal-50 whitespace-pre-wrap flex-1 bg-teal-950/50 p-4 rounded-lg border border-teal-800/50 font-medium">
              {cta}
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-neutral-200">Hashtags</h3>
              <button onClick={() => handleCopy(hashtags)} className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm bg-teal-900/30 px-3 py-1.5 rounded">
                <Copy size={14} /> {lang === 'pt' ? 'Copiar' : 'Copy'}
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
              {lang === 'pt' ? 'Sugestão de Story' : 'Story Suggestion'}
            </h3>
            <div className="text-neutral-300 whitespace-pre-wrap bg-neutral-950 p-4 rounded-lg border border-neutral-800">
              {sugestaoStory}
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
            <h3 className="font-bold text-lg text-neutral-200 mb-4">
              {lang === 'pt' ? 'Sugestão de Vídeo Curto' : 'Short Video Suggestion'}
            </h3>
            <div className="text-neutral-300 whitespace-pre-wrap bg-neutral-950 p-4 rounded-lg border border-neutral-800">
              {sugestaoVideo}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Controles Superiores: Idioma e Rede */}
      {hasLanguageStructure && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-neutral-900 p-4 rounded-xl border border-neutral-800 sticky top-0 z-10 shadow-xl shadow-black/50">
          
          {/* Seletor de Rede Social */}
          <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setNetwork('instagram')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                network === 'instagram' ? 'bg-pink-600 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              <Instagram size={16} /> <span className="hidden sm:inline">Instagram</span>
            </button>
            <button
              onClick={() => setNetwork('linkedin')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                network === 'linkedin' ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              <Linkedin size={16} /> <span className="hidden sm:inline">LinkedIn</span>
            </button>
            <button
              onClick={() => setNetwork('facebook')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                network === 'facebook' ? 'bg-blue-500 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              <Facebook size={16} /> <span className="hidden sm:inline">Facebook</span>
            </button>
          </div>

          {/* Seletor de Idioma */}
          <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setLanguage('pt')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                language === 'pt' ? 'bg-teal-600 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              🇧🇷 <span className="hidden sm:inline">Português</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                language === 'en' ? 'bg-teal-600 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              🇺🇸 <span className="hidden sm:inline">English</span>
            </button>
            <button
              onClick={() => setLanguage('both')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                language === 'both' ? 'bg-teal-600 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              🌍 <span className="hidden sm:inline">Ambos</span>
            </button>
          </div>
        </div>
      )}

      {/* Renderização do Conteúdo */}
      <div className="space-y-12">
        {(language === 'pt' || language === 'both') && renderContent('pt')}
        {language === 'both' && <div className="h-px bg-neutral-800 w-full my-8" />}
        {(language === 'en' || language === 'both') && renderContent('en')}
      </div>

      {/* Ações Finais */}
      <div className="flex justify-center pt-8 border-t border-neutral-800">
        <button 
          onClick={onGenerate}
          className="flex items-center gap-2 px-8 py-4 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all text-white font-bold shadow-lg"
        >
          <RefreshCw size={20} /> {language === 'en' ? 'Generate again' : 'Gerar novamente'}
        </button>
      </div>
    </div>
  );
};
