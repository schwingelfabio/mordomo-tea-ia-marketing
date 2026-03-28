import React, { useState } from 'react';
import { Zap, Star } from 'lucide-react';
import { AppConfig } from '../types';

interface Props {
  onGenerate: (data: any) => void;
  config: AppConfig;
}

export const ContentGenerator: React.FC<Props> = ({ onGenerate, config }) => {
  const [type, setType] = useState('Post');
  const [objective, setObjective] = useState('Doação');
  const [language, setLanguage] = useState('Português');

  const handleGenerate = (isHighImpact: boolean = false) => {
    onGenerate({ 
      type, 
      objective, 
      language, 
      isHighImpact,
      mode: config.generationMode 
    });
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
      <h3 className="font-bold text-lg">Gerar Conteúdo</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select value={type} onChange={e => setType(e.target.value)} className="bg-neutral-800 p-3 rounded text-sm">
          <option>Post</option>
          <option>Vídeo curto</option>
          <option>Story</option>
          <option>Campanha</option>
          <option>Mensagem de apoio</option>
          <option>Post de doação</option>
          <option>Post de confiança</option>
        </select>
        <select value={objective} onChange={e => setObjective(e.target.value)} className="bg-neutral-800 p-3 rounded text-sm">
          <option>Doação</option>
          <option>Engajamento</option>
          <option>Confiança</option>
          <option>Crescimento</option>
          <option>Alcance</option>
        </select>
      </div>
      <button 
        onClick={() => handleGenerate(false)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 font-bold"
      >
        <Zap size={20} /> Gerar e preparar
      </button>
      <button 
        onClick={() => handleGenerate(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-500 font-bold text-lg"
      >
        <Star size={24} /> GERAR CONTEÚDO DE ALTO IMPACTO
      </button>
    </div>
  );
};
