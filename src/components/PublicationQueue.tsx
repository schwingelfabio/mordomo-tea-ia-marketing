import React from 'react';
import { PublicationQueueItem } from '../types';
import { Play, Calendar, Edit, Copy, Trash2, ExternalLink } from 'lucide-react';

interface Props {
  queue: PublicationQueueItem[];
}

export const PublicationQueue: React.FC<Props> = ({ queue }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
      <h3 className="font-bold text-lg mb-4">Fila de Publicação</h3>
      <div className="space-y-4">
        {queue.map((item) => (
          <div key={item.id} className="bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold capitalize">{item.type} - {item.platform}</p>
              <p className="text-sm text-neutral-400 truncate max-w-xs">{item.content}</p>
              <span className={`text-xs uppercase px-2 py-1 rounded ${item.status === 'pronto' ? 'bg-teal-900/30 text-teal-400' : 'bg-neutral-700'}`}>
                {item.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-neutral-700 rounded"><Play size={16} /></button>
              <button className="p-2 hover:bg-neutral-700 rounded"><Calendar size={16} /></button>
              <button className="p-2 hover:bg-neutral-700 rounded"><Edit size={16} /></button>
              <button className="p-2 hover:bg-neutral-700 rounded"><Copy size={16} /></button>
              <button className="p-2 hover:bg-neutral-700 rounded text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
