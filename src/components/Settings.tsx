import React from 'react';
import { AppConfig } from '../types';

interface Props {
  config: AppConfig;
  onSetConfig: (config: AppConfig) => void;
}

export const Settings: React.FC<Props> = ({ config, onSetConfig }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
      <h3 className="font-bold text-lg mb-4">Configurações</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Nome</label>
          <input 
            type="text" 
            value={config.name} 
            onChange={(e) => onSetConfig({ ...config, name: e.target.value })}
            className="w-full p-2 bg-neutral-800 rounded border border-neutral-700"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Idioma padrão</label>
          <select 
            value={config.preferredLanguage} 
            onChange={(e) => onSetConfig({ ...config, preferredLanguage: e.target.value })}
            className="w-full p-2 bg-neutral-800 rounded border border-neutral-700"
          >
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-neutral-400 mb-1">História curta</label>
          <textarea 
            value={config.shortStory} 
            onChange={(e) => onSetConfig({ ...config, shortStory: e.target.value })}
            className="w-full p-2 bg-neutral-800 rounded border border-neutral-700"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Link PayPal</label>
          <input 
            type="text" 
            value={config.paypalLink} 
            onChange={(e) => onSetConfig({ ...config, paypalLink: e.target.value })}
            className="w-full p-2 bg-neutral-800 rounded border border-neutral-700"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Dados de doação</label>
          <input 
            type="text" 
            value={config.pixKey} 
            onChange={(e) => onSetConfig({ ...config, pixKey: e.target.value })}
            className="w-full p-2 bg-neutral-800 rounded border border-neutral-700"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-neutral-400 mb-1">Objetivo principal</label>
          <input 
            type="text" 
            value={config.currentCampaignObjective} 
            onChange={(e) => onSetConfig({ ...config, currentCampaignObjective: e.target.value })}
            className="w-full p-2 bg-neutral-800 rounded border border-neutral-700"
          />
        </div>
      </div>
    </div>
  );
};
