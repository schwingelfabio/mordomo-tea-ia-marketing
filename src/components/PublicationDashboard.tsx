import React, { useState } from 'react';
import { ContentGenerator } from './ContentGenerator';
import { PublicationQueue } from './PublicationQueue';
import { AppConfig, PublicationQueueItem } from '../types';
import { Zap, Copy, ExternalLink } from 'lucide-react';

interface Props {
  queue: PublicationQueueItem[];
  onGenerate: (data: any) => void;
  config: AppConfig;
  onSetConfig: (config: AppConfig) => void;
  onExecuteFull: () => void;
}

export const PublicationDashboard: React.FC<Props> = ({ queue, onGenerate, config, onSetConfig, onExecuteFull }) => {
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerate = (data: any) => {
    onGenerate(data);
    // Placeholder for actual generation logic
    setGeneratedContent({
      post: "Post gerado...",
      caption: data.isHighImpact ? "HISTÓRIA EMOCIONAL: " + config.shortStory : "Legenda gerada...",
      hashtags: "#hashtags #geradas",
      cta: data.mode === 'conversao' ? "DOAR AGORA: " + config.paypalLink : "CTA gerado...",
      script: "Roteiro gerado..."
    });
  };

  const networks = ['instagram', 'facebook', 'linkedin', 'tiktok', 'youtube'];

  return (
    <div className="space-y-6">
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-2">Melhor Ação do Dia</h3>
        <p className="text-neutral-400 text-sm">
          {config.generationMode === 'crescimento' 
            ? "Foco em engajamento: Responda a 5 comentários e compartilhe uma história de superação."
            : "Foco em conversão: Publique o post de doação com a história da família de hoje."}
        </p>
      </div>

      <ContentGenerator onGenerate={handleGenerate} config={config} />

      {generatedContent && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
          <h3 className="font-bold text-lg">Conteúdo Gerado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-800 p-4 rounded">
              <p className="text-xs text-neutral-400 mb-1">Legenda</p>
              <p className="text-sm">{generatedContent.caption}</p>
              <button onClick={() => navigator.clipboard.writeText(generatedContent.caption)} className="mt-2 text-xs flex items-center gap-1 text-teal-400"><Copy size={12}/> Copiar</button>
            </div>
            <div className="bg-neutral-800 p-4 rounded">
              <p className="text-xs text-neutral-400 mb-1">CTA</p>
              <p className="text-sm">{generatedContent.cta}</p>
              <button onClick={() => navigator.clipboard.writeText(generatedContent.cta)} className="mt-2 text-xs flex items-center gap-1 text-teal-400"><Copy size={12}/> Copiar</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {networks.map(network => (
              <button 
                key={network}
                onClick={() => window.open(`https://${network}.com`, '_blank')}
                className="px-3 py-2 bg-teal-900/30 hover:bg-teal-900/50 text-teal-400 rounded text-xs flex items-center gap-1"
              >
                <ExternalLink size={12} /> Abrir {network}
              </button>
            ))}
          </div>
        </div>
      )}

      <PublicationQueue queue={queue} />
    </div>
  );
};
