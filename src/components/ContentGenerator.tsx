import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface Props {
  onGenerate: (data: any) => void;
}

export const ContentGenerator: React.FC<Props> = ({ onGenerate }) => {
  const [type, setType] = useState('Post');
  const [objective, setObjective] = useState('Doação');
  const [language, setLanguage] = useState('Português');
  const [networks, setNetworks] = useState<string[]>([]);

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
      <h3 className="font-bold text-lg mb-4">Gerar Conteúdo para Publicar</h3>
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
        <select value={language} onChange={e => setLanguage(e.target.value)} className="bg-neutral-800 p-3 rounded text-sm">
          <option>Português</option>
          <option>Inglês</option>
          <option>Ambos</option>
        </select>
      </div>
      <button 
        onClick={() => onGenerate({ type, objective, language, networks })}
        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-500 font-bold"
      >
        <Zap size={20} /> Gerar e preparar
      </button>
    </div>
  );
};
