import React from 'react';
import { ConnectedAccount } from '../types';

interface Props {
  accounts: ConnectedAccount[];
  onConnect: (platform: ConnectedAccount['platform']) => void;
  onDisconnect: (platform: ConnectedAccount['platform']) => void;
}

export const ConnectedAccounts: React.FC<Props> = ({ accounts, onConnect, onDisconnect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts.map((account) => (
        <div key={account.platform} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-lg capitalize mb-2">{account.platform}</h3>
          <p className={`text-sm mb-4 ${account.connected ? 'text-teal-400' : 'text-neutral-500'}`}>
            {account.connected ? `Conectado: ${account.accountName}` : 'Não conectado'}
          </p>
          <div className="flex gap-2">
            {!account.connected ? (
              <button onClick={() => onConnect(account.platform)} className="px-4 py-2 bg-teal-600 rounded text-sm font-bold">Conectar</button>
            ) : (
              <>
                <button onClick={() => onConnect(account.platform)} className="px-4 py-2 bg-neutral-800 rounded text-sm">Reconectar</button>
                <button onClick={() => onDisconnect(account.platform)} className="px-4 py-2 bg-red-900/30 text-red-400 rounded text-sm">Desconectar</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
