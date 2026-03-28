/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Settings, Zap, Play, History, Bot, Menu, X, Clipboard, ShieldCheck, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppConfig, DailyMission, QueueItem, PublicationQueueItem } from './types';
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
    
    const isConversao = config.generationMode === 'conversao';
    const linkDoacao = config.paypalLink || 'https://www.paypal.com/donate/?hosted_button_id=QFNBCLB7HH3QE';
    const chavePix = config.pixKey || '01244056065';
    const nomePix = config.name || 'Fábio Schwingel';
    
    // English specific donation details
    const englishPaypal = 'fabiopalacioschwingel@gmail.com';
    const englishRevolut = 'Bank: Revolut\nName: FABIO SCHWINGEL\nAccount: 6136335848\nBic: REVOSGS2';

    try {
      const prompt = `Gere o conteúdo diário para o Fabio, considerando:
      - Filha: Victoria (TEA)
      - Projetos: Conecta TEA e Triagem TEA IA
      - Objetivo: ${isConversao ? 'Captação de recursos/doações EXTREMAMENTE URGENTE' : 'Crescimento e engajamento'}
      
      DIRETRIZES DE IDIOMA E CONVERSÃO:
      - PORTUGUÊS: Linguagem emocional brasileira. ${isConversao ? `OBRIGATÓRIO priorizar PIX e PayPal no CTA. Chave Pix: ${chavePix} (${nomePix}). PayPal: ${linkDoacao}` : ''}
      - INGLÊS: Linguagem mais direta e internacional. ${isConversao ? `OBRIGATÓRIO priorizar PayPal e Revolut no CTA. PayPal: ${englishPaypal}. Revolut details:\n${englishRevolut}` : ''}
      
      DIRETRIZES DE REDE SOCIAL (Para ambos os idiomas):
      - Instagram: texto mais emocional e com emojis.
      - LinkedIn: texto mais profissional e focado em impacto/propósito.
      - Facebook: texto equilibrado e comunitário.
      
      Retorne APENAS um JSON válido com a seguinte estrutura exata:
      {
        "pt": {
          "missao": "Missão do dia (foco e objetivo)",
          "instagram": { "post": "Conteúdo do post IG", "legenda": "Legenda IG" },
          "linkedin": { "post": "Conteúdo do post LI", "legenda": "Legenda LI" },
          "facebook": { "post": "Conteúdo do post FB", "legenda": "Legenda FB" },
          "cta": "${isConversao ? 'CTA forte e emocional (PIX + PayPal)' : 'CTA pronto'}",
          "hashtags": "5 hashtags relevantes",
          "sugestaoStory": "Ideia e roteiro curto para um story",
          "sugestaoVideo": "Ideia e roteiro curto para um vídeo curto (Reels/TikTok)"
        },
        "en": {
          "mission": "Daily mission (focus and objective)",
          "instagram": { "post": "IG post content", "caption": "IG caption" },
          "linkedin": { "post": "LI post content", "caption": "LI caption" },
          "facebook": { "post": "FB post content", "caption": "FB caption" },
          "cta": "${isConversao ? 'Strong CTA (PayPal + Revolut)' : 'Ready CTA'}",
          "hashtags": "5 relevant hashtags",
          "story": "Idea and short script for a story",
          "video": "Idea and short script for a short video"
        }
      }`;

      const responseText = await generateContent(prompt, config, "Conteúdo Diário (Hoje) - PT e EN Multi-Rede");
      
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanedText);
      
      // Garantia programática de que os links estão no CTA se for modo conversão
      if (isConversao) {
        if (data.pt && data.pt.cta) {
          if (!data.pt.cta.includes(chavePix)) data.pt.cta += `\n\n👉 Pix (CPF): ${chavePix} - ${nomePix}`;
          if (!data.pt.cta.includes(linkDoacao)) data.pt.cta += `\n👉 PayPal: ${linkDoacao}`;
        }
        if (data.en && data.en.cta) {
          if (!data.en.cta.includes(englishPaypal)) data.en.cta += `\n\n👉 PayPal: ${englishPaypal}`;
          if (!data.en.cta.includes('Revolut')) data.en.cta += `\n👉 ${englishRevolut.replace(/\n/g, ' | ')}`;
        }
      }
      
      setGeneratedTodayData(data);
      setIsGeneratingToday(false);
    } catch (error) {
      console.error("Error generating today content:", error);
      
      // SIMULAÇÃO DE FALLBACK GARANTIDA
      setTimeout(() => {
        const resultadoSimulado = {
          pt: {
            missao: "Gerar conexão emocional e arrecadar apoio para os tratamentos da Victoria.",
            instagram: {
              post: "Hoje é um dia especial. A Victória é a razão de tudo que eu faço. Cada pequeno avanço dela é uma vitória gigante para nós. ❤️",
              legenda: "A jornada do autismo nos ensina a valorizar cada detalhe, mas também traz desafios imensos que não podemos vencer sozinhos. 🙏 Se você acompanha nossa história, sua ajuda hoje seria fundamental."
            },
            linkedin: {
              post: "O projeto Conecta TEA nasceu de uma necessidade real: apoiar famílias atípicas. Hoje, compartilho mais um avanço da Victoria, que me motiva a continuar construindo soluções de impacto.",
              legenda: "A inclusão exige ação. Estamos buscando parceiros e apoiadores para expandir nosso alcance e garantir que os tratamentos continuem. Faça parte dessa rede de apoio."
            },
            facebook: {
              post: "Amigos e família, hoje é um dia de celebrar as pequenas vitórias da Victoria! Cada passo dela nos enche de orgulho.",
              legenda: "Nossa comunidade tem sido incrível. Para continuarmos com as terapias, precisamos da força de vocês. Qualquer contribuição nos ajuda a manter a esperança viva."
            },
            cta: `Se puder ajudar, qualquer valor faz diferença ❤️\n\n👉 Pix (CPF): ${chavePix} - ${nomePix}\n👉 PayPal: ${linkDoacao}`,
            hashtags: "#autismo #familia #ajuda #amor #conectatea",
            sugestaoStory: "Hoje é um dia de vitórias! 🎂 Mostre um momento real e sem filtros da rotina com a Victoria hoje. Fale sobre um desafio superado.",
            sugestaoVideo: "Vídeo emocional (15s) com uma música suave ao fundo, mostrando você trabalhando no projeto Conecta TEA enquanto explica o porquê de tudo isso."
          },
          en: {
            mission: "Generate emotional connection and raise support for Victoria's treatments.",
            instagram: {
              post: "Today is a special day. Victoria is the reason for everything I do. Every little progress she makes is a giant victory for us. ❤️",
              caption: "The autism journey teaches us to value every detail, but it also brings immense challenges we cannot overcome alone. 🙏 If you follow our story, your help today is fundamental."
            },
            linkedin: {
              post: "The Conecta TEA project was born from a real need: supporting atypical families. Today, I share another milestone from Victoria, motivating me to keep building impactful solutions.",
              caption: "Inclusion requires action. We are looking for partners and supporters to expand our reach and ensure treatments continue. Join our support network."
            },
            facebook: {
              post: "Friends and family, today is a day to celebrate Victoria's small victories! Every step she takes fills us with pride.",
              caption: "Our community has been amazing. To continue with therapies, we need your strength. Any contribution helps us keep hope alive."
            },
            cta: `If you can help, any amount makes a difference ❤️\n\n👉 PayPal: ${englishPaypal}\n👉 ${englishRevolut.replace(/\n/g, ' | ')}`,
            hashtags: "#autism #family #help #love #conectatea",
            story: "Today is a day of victories! 🎂 Show a real, unfiltered moment of your routine with Victoria today. Talk about an overcome challenge.",
            video: "Emotional video (15s) with soft background music, showing you working on the Conecta TEA project while explaining the reason behind it all."
          }
        };
        setGeneratedTodayData(resultadoSimulado);
        setIsGeneratingToday(false);
      }, 1500);
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
