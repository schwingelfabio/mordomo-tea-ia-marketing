import React from 'react';
import { NetworkStatus } from './NetworkStatus';
import { ContentGenerator } from './ContentGenerator';
import { PublicationQueue } from './PublicationQueue';
import { AppConfig, ConnectedAccount, PublicationQueueItem } from '../types';
import { Play, Calendar, Zap, FileText, Video, Image as ImageIcon, ToggleLeft, ToggleRight } from 'lucide-react';

interface Props {
  accounts: ConnectedAccount[];
  queue: PublicationQueueItem[];
  onGenerate: (data: any) => void;
  config: AppConfig;
  onSetConfig: (config: AppConfig) => void;
  onExecuteFull: () => void;
}

export const PublicationDashboard: React.FC<Props> = ({ accounts, queue, onGenerate, config, onSetConfig, onExecuteFull }) => {
  return (
    <div className="space-y-6">
      <NetworkStatus accounts={accounts} />
      
      <div className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
        <div className="flex items-center gap-2">
          {config.automaticMode ? <ToggleRight size={24} className="text-teal-400" /> : <ToggleLeft size={24} className="text-neutral-500" />}
          <span className="font-bold">Modo Automático</span>
        </div>
        <button 
          onClick={() => onSetConfig({ ...config, automaticMode: !config.automaticMode })}
          className="text-sm text-neutral-400 hover:text-white"
        >
          {config.automaticMode ? 'Desativar' : 'Ativar'}
        </button>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onExecuteFull}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 rounded-lg font-bold hover:bg-teal-500"
        >
          <Zap size={20} /> EXECUTAR OPERAÇÃO COMPLETA
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 rounded-lg font-bold hover:bg-neutral-700">
          <Calendar size={20} /> Agendar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentGenerator onGenerate={onGenerate} />
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-4">Ações do Dia</h3>
          <div className="space-y-3 text-sm text-neutral-400">
            <p>1. Publicar vídeo no TikTok (Engajamento)</p>
            <p>2. Publicar post emocional no Instagram (Doação)</p>
            <p>3. Publicar versão profissional no LinkedIn (Confiança)</p>
            <p>4. Publicar post mais longo no Facebook (Alcance)</p>
          </div>
        </div>
      </div>

      <PublicationQueue queue={queue} />
    </div>
  );
};
