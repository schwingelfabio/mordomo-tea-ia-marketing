import React from 'react';
import { ConnectedAccount } from '../types';
import { Facebook, Instagram, Linkedin, Youtube, Zap } from 'lucide-react';

interface Props {
  accounts: ConnectedAccount[];
  onToggleConnection: (platform: ConnectedAccount['platform']) => void;
}

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Zap,
};

export const ConnectedAccounts: React.FC<Props> = ({ accounts, onToggleConnection }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts.map((account) => {
        const Icon = platformIcons[account.platform];
        return (
          <div key={account.platform} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Icon className="text-teal-400" size={24} />
              <h3 className="font-bold text-lg capitalize">{account.platform}</h3>
            </div>
            
            <div className="text-sm">
              <p className={account.connected ? 'text-teal-400' : 'text-neutral-500'}>
                {account.connected ? 'Status: Conectado (simulado)' : 'Status: Não conectado (simulado)'}
              </p>
            </div>

            <button 
              onClick={() => onToggleConnection(account.platform)} 
              className={`w-full px-4 py-3 rounded text-sm font-bold ${account.connected ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-teal-600 hover:bg-teal-500'}`}
            >
              {account.connected ? 'Desconectar' : 'Marcar como conectada'}
            </button>
          </div>
        );
      })}
    </div>
  );
};
