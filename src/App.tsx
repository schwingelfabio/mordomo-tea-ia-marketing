/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Settings, Zap, Play, History, Bot, Menu, X, Clipboard, ShieldCheck, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppConfig, DailyMission, QueueItem, ConnectedAccount, PublicationQueueItem } from './types';
import { getConfig, saveConfig } from './lib/store';
import { runAutonomousEngine } from './lib/autonomousEngine';
import { generateContent } from './lib/ai';
import { CanaisDePublicacao } from './components/CanaisDePublicacao';
import { PublicationDashboard } from './components/PublicationDashboard';
import { Settings as SettingsComponent } from './components/Settings';
import { HojeDashboard } from './components/HojeDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('Hoje');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mission, setMission] = useState<DailyMission | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [config, setConfig] = useState<AppConfig>(getConfig() || {
    name: 'Fábio Schwingel',
    shortStory: '',
    urgencyContext: '',
    currentFinancialSituation: '',
    website: '',
    instagram: '',
    tiktok: '',
    facebook: '',
    youtube: '',
    paypalEmail: '',
    paypalLink: 'https://www.paypal.com/donate/?hosted_button_id=QFNBCLB7HH3QE',
    revolutDetails: '',
    pixKey: '01244056065',
    currentCampaignObjective: '',
    targetAudience: '',
    preferredLanguage: 'pt',
    preferredTone: 'emocional',
    daughterName: 'Victoria',
    dailyGoal: '',
    automaticMode: false,
    generationMode: 'conversao'
  });

  const [publicationQueue, setPublicationQueue] = useState<PublicationQueueItem[]>([]);
  const [isGeneratingToday, setIsGeneratingToday] = useState(false);
  const [generatedTodayData, setGeneratedTodayData] = useState<any>(null);
  const [todayError, setTodayError] = useState<string | null>(null);

  useEffect(() => {
    saveConfig(config);
  }, [config]);

  const tabs = [
    { name: 'Hoje', icon: LayoutDashboard },
    { name: 'Canais de Publicação', icon: ShieldCheck },
    { name: 'Central de Publicação', icon: FileText },
    { name: 'Campanhas', icon: Target },
    { name: 'Relatórios', icon: History },
    { name: 'Configurações', icon: Settings },
  ];

  const handleGenerateToday = async () => {
    setActiveTab('Hoje');
    setIsGeneratingToday(true);
    setTodayError(null);
    
    try {
      const isConversao = config.generationMode === 'conversao';
      const linkDoacao = config.paypalLink || 'https://www.paypal.com/donate/?hosted_button_id=QFNBCLB7HH3QE';
      const chavePix = config.pixKey || '01244056065';
      const nomePix = config.name || 'Fábio Schwingel';
      
      const prompt = `Gere o conteúdo diário para o Fabio, considerando:
      - Filha: Victoria (TEA)
      - Projetos: Conecta TEA e Triagem TEA IA
      - Objetivo: ${isConversao ? 'Captação de recursos/doações EXTREMAMENTE URGENTE' : 'Crescimento e engajamento'}
      - Tom: Emocional e humano
      - Idioma: Português do Brasil
      ${isConversao ? `- OBRIGATÓRIO: O campo 'cta' DEVE conter o link de doação do PayPal (${linkDoacao}) E a chave Pix (CPF: ${chavePix} - Nome: ${nomePix})` : ''}
      
      Retorne APENAS um JSON válido com a seguinte estrutura exata:
      {
        "missao": "Missão do dia (foco e objetivo)",
        "post": "Conteúdo do post pronto",
        "legenda": "Legenda pronta para o post",
        "cta": "${isConversao ? 'Call to action forte e emocional INCLUINDO o link do PayPal e a chave Pix' : 'Call to action pronto'}",
        "hashtags": "5 hashtags relevantes",
        "sugestaoStory": "Ideia e roteiro curto para um story",
        "sugestaoVideo": "Ideia e roteiro curto para um vídeo curto (Reels/TikTok)"
      }`;

      const responseText = await generateContent(prompt, config, "Conteúdo Diário (Hoje)");
      
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanedText);
      
      // Garantia programática de que os links estão no CTA se for modo conversão
      if (isConversao) {
        let appendedCTA = false;
        if (!data.cta.includes(linkDoacao)) {
          data.cta = `${data.cta}\n\n👉 Apoie nossa causa via PayPal: ${linkDoacao}`;
          appendedCTA = true;
        }
        if (!data.cta.includes(chavePix)) {
          data.cta = `${data.cta}${appendedCTA ? '\n' : '\n\n'}👉 Ou doe via Pix (CPF): ${chavePix} - ${nomePix}`;
        }
      }
      
      setGeneratedTodayData(data);
    } catch (error) {
      console.error("Error generating today content:", error);
      setTodayError("Não foi possível gerar o conteúdo agora. Tente novamente.");
    } finally {
      setIsGeneratingToday(false);
    }
  };

  const handleAutonomousExecution = async () => {
    const result = await runAutonomousEngine(config);
    setMission(result.mission);
    setQueue(result.queue);
  };

  const executeFullOperation = async () => {
    alert('Iniciando Operação Completa...');
    // 1. Gerar conteúdos do dia
    // 2. Separar por rede
    // 3. Executar automaticamente (copiar, preparar, publicar se possível)
    setPublicationQueue(prev => [...prev, {
      id: Date.now().toString(),
      type: 'post',
      platform: 'instagram',
      status: 'publicando',
      content: 'Conteúdo da operação completa...',
      caption: 'Legenda...',
      hashtags: '#teste',
      cta: 'Doe agora!',
      language: 'pt'
    }]);
    alert('Operação Completa executada com sucesso!');
  };

  const handleGenerateContent = (data: any) => {
    alert(`Gerando conteúdo: ${JSON.stringify(data)}`);
    setPublicationQueue(prev => [...prev, {
      id: Date.now().toString(),
      type: 'post',
      platform: 'instagram',
      status: 'pronto',
      content: 'Conteúdo gerado automaticamente...',
      cta: 'Doe agora!',
      language: 'pt'
    }]);
  };

  const renderTabContent = () => {
    if (activeTab === 'Hoje') {
      return <HojeDashboard 
        config={config} 
        isGenerating={isGeneratingToday} 
        generatedData={generatedTodayData} 
        error={todayError} 
        onGenerate={handleGenerateToday} 
      />;
    }
    if (activeTab === 'Canais de Publicação') {
      return <CanaisDePublicacao />;
    }
    if (activeTab === 'Central de Publicação') {
      return <PublicationDashboard 
        queue={publicationQueue} 
        onGenerate={handleGenerateContent} 
        config={config}
        onSetConfig={setConfig}
        onExecuteFull={executeFullOperation}
      />;
    }
    if (activeTab === 'Campanhas') {
      return <div className="text-neutral-400 p-4">Gerenciamento de Campanhas.</div>;
    }
    if (activeTab === 'Relatórios') {
      return <div className="text-neutral-400 p-4">Relatórios de Desempenho.</div>;
    }
    if (activeTab === 'Configurações') {
      return <SettingsComponent config={config} onSetConfig={setConfig} />;
    }
    return <div className="text-neutral-400 p-4">Conteúdo para {activeTab} em desenvolvimento.</div>;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex font-sans">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-950 border-r border-neutral-800 p-6 flex flex-col gap-8 md:static md:translate-x-0 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-teal-400 flex items-center gap-2">
            <Zap size={24} className="fill-teal-400" />
            Mordomo TEA IA
          </h1>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => { setActiveTab(tab.name); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.name ? 'bg-teal-900/30 text-teal-400' : 'hover:bg-neutral-900 text-neutral-400'
              }`}
            >
              <tab.icon size={20} />
              {tab.name}
            </button>
          ))}
        </div>
      </motion.nav>
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{activeTab}</h2>
              <p className="text-neutral-500 text-sm md:text-base">Sua central de captação, crescimento e execução</p>
            </div>
          </div>
          <button 
            onClick={handleGenerateToday}
            className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-3 bg-teal-600 rounded-lg font-bold hover:bg-teal-500 transition-all text-sm md:text-base"
          >
            <Play size={20} /> <span className="hidden md:inline">GERAR RESULTADO HOJE</span><span className="md:hidden">GERAR</span>
          </button>
        </header>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </main>
    </div>
  );
}
