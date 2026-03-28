import React from 'react';
import { ConnectedAccount } from '../types';
import { Facebook, Instagram, Linkedin, Youtube, Zap, Settings, RefreshCw } from 'lucide-react';

interface Props {
  accounts: ConnectedAccount[];
}

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Zap,
};

export const NetworkStatus: React.FC<Props> = ({ accounts }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {accounts.map((account) => {
        const Icon = platformIcons[account.platform];
        return (
          <div key={account.platform} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Icon className={account.connected ? 'text-teal-400' : 'text-neutral-600'} size={20} />
              <div className={`w-2 h-2 rounded-full ${account.connected ? 'bg-teal-500' : 'bg-red-500'}`} />
            </div>
            <p className="font-bold text-sm capitalize">{account.platform}</p>
            <p className="text-xs text-neutral-500 truncate">{account.connected ? account.accountName : 'Desconectado'}</p>
            <div className="flex gap-1 mt-2">
              <button className="p-1 hover:bg-neutral-800 rounded"><Settings size={14} /></button>
              {!account.connected && <button className="p-1 hover:bg-neutral-800 rounded text-teal-400"><RefreshCw size={14} /></button>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
