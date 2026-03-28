import React from 'react';
import { ConnectedAccount } from '../types';
import { Facebook, Instagram, Linkedin, Youtube, Zap } from 'lucide-react';

interface Props {
  accounts: ConnectedAccount[];
  onConnect: (platform: ConnectedAccount['platform']) => void;
  onDisconnect: (platform: ConnectedAccount['platform']) => void;
}

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Zap,
};

export const ConnectedAccounts: React.FC<Props> = ({ accounts, onConnect, onDisconnect }) => {
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
                {account.connected ? `Status: Conectado` : 'Status: Não conectado'}
              </p>
              {account.connected && <p className="text-neutral-400">Conta: {account.accountName}</p>}
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              {!account.connected ? (
                <button onClick={() => onConnect(account.platform)} className="w-full px-4 py-3 bg-teal-600 rounded text-sm font-bold hover:bg-teal-500">Conectar com {account.platform}</button>
              ) : (
                <>
                  <button onClick={() => onConnect(account.platform)} className="w-full px-4 py-3 bg-neutral-800 rounded text-sm hover:bg-neutral-700">Reconectar</button>
                  <button onClick={() => onDisconnect(account.platform)} className="w-full px-4 py-3 bg-red-900/30 text-red-400 rounded text-sm hover:bg-red-900/50">Desconectar</button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
