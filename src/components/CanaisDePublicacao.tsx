import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Zap } from 'lucide-react';

const platforms = [
  { id: 'instagram', name: 'Instagram' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'tiktok', name: 'TikTok' },
];

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Zap,
};

export const CanaisDePublicacao: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {platforms.map((platform) => {
        const Icon = platformIcons[platform.id as keyof typeof platformIcons];
        return (
          <div key={platform.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Icon className="text-teal-400" size={24} />
              <h3 className="font-bold text-lg capitalize">{platform.name}</h3>
            </div>
            
            <div className="text-sm">
              <p className="text-neutral-400">Integração real ainda não configurada</p>
              <p className="text-teal-400">Modo manual disponível</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
