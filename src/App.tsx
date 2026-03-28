/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Video, Image as ImageIcon, MessageSquare, ShieldCheck, DollarSign, Target, Settings, Zap, Play, History, Bot, Menu, X, Clipboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppConfig, DailyMission, QueueItem } from './types';
import { getConfig, saveConfig } from './lib/store';
import { runAutonomousEngine } from './lib/autonomousEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('Hoje');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mission, setMission] = useState<DailyMission | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [config, setConfig] = useState<AppConfig>(getConfig() || {
    name: 'Fabio',
    shortStory: '',
    urgencyContext: '',
    currentFinancialSituation: '',
    website: '',
    instagram: '',
    tiktok: '',
    facebook: '',
    youtube: '',
    paypalEmail: '',
    paypalLink: '',
    revolutDetails: '',
    pixKey: '',
    currentCampaignObjective: '',
    targetAudience: '',
    preferredLanguage: 'pt',
    preferredTone: 'emocional',
    daughterName: '',
    dailyGoal: ''
  });

  useEffect(() => {
    saveConfig(config);
  }, [config]);

  const tabs = [
    { name: 'Hoje', icon: LayoutDashboard },
    { name: 'Contas Conectadas', icon: ShieldCheck },
    { name: 'Central de Publicação', icon: FileText },
    { name: 'Campanhas', icon: Target },
    { name: 'Relatórios', icon: History },
    { name: 'Configurações', icon: Settings },
  ];

  const handleAutonomousExecution = async () => {
    const result = await runAutonomousEngine(config);
    setMission(result.mission);
    setQueue(result.queue);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para a área de transferência!');
  };

  const renderTabContent = () => {
    if (activeTab === 'Hoje') {
      // ... (keep existing code)
    }
    if (activeTab === 'Contas Conectadas') {
      return <div className="text-neutral-400 p-4">Painel de Contas Conectadas (OAuth em desenvolvimento).</div>;
    }
    if (activeTab === 'Central de Publicação') {
      return <div className="text-neutral-400 p-4">Central de Publicação e Fila.</div>;
    }
    if (activeTab === 'Campanhas') {
      return <div className="text-neutral-400 p-4">Gerenciamento de Campanhas.</div>;
    }
    if (activeTab === 'Relatórios') {
      return <div className="text-neutral-400 p-4">Relatórios de Desempenho.</div>;
    }
    if (activeTab === 'Configurações') {
      // ... (keep existing code)
    }
    return <div className="text-neutral-400 p-4">Conteúdo para {activeTab} em desenvolvimento.</div>;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex font-sans">
      {/* Sidebar Overlay */}
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

      {/* Sidebar */}
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
          <button className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-3 bg-teal-600 rounded-lg font-bold hover:bg-teal-500 transition-all text-sm md:text-base">
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
