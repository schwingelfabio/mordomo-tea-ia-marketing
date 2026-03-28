import React from 'react';
import { Publication } from '../types';

interface Props {
  publications: Publication[];
  onManualPublish: (id: string) => void;
}

export const PublicationCentral: React.FC<Props> = ({ publications, onManualPublish }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
      <h3 className="font-bold text-lg mb-4">Fila de Publicação</h3>
      <div className="space-y-4">
        {publications.map((pub) => (
          <div key={pub.id} className="bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold capitalize">{pub.platform}</p>
              <p className="text-sm text-neutral-400 truncate max-w-xs">{pub.content}</p>
              <span className={`text-xs uppercase px-2 py-1 rounded ${pub.status === 'pronto' ? 'bg-teal-900/30 text-teal-400' : 'bg-neutral-700'}`}>
                {pub.status}
              </span>
            </div>
            {pub.status !== 'publicado' && (
              <button onClick={() => onManualPublish(pub.id)} className="px-4 py-2 bg-teal-600 rounded text-sm font-bold">Publicar Manualmente</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
