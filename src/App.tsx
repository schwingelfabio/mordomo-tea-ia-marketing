/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Video, Image as ImageIcon, MessageSquare, ShieldCheck, DollarSign, Target, Settings, Zap, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { AppConfig } from './types';
import { getConfig, saveConfig } from './lib/store';

export default function App() {
  const [activeTab, setActiveTab] = useState('Hoje');
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
    preferredTone: 'emocional'
  });

  useEffect(() => {
    saveConfig(config);
  }, [config]);

  const tabs = [
    { name: 'Hoje', icon: LayoutDashboard },
    { name: 'Posts', icon: FileText },
    { name: 'Vídeos', icon: Video },
    { name: 'Imagens', icon: ImageIcon },
    { name: 'Mensagens', icon: MessageSquare },
    { name: 'Confiança', icon: ShieldCheck },
    { name: 'Doações', icon: DollarSign },
    { name: 'Campanhas', icon: Target },
    { name: 'Configurações', icon: Settings },
  ];

  const renderTabContent = () => {
    if (activeTab === 'Configurações') {
      return (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
          <h3 className="font-bold text-lg mb-4">Preferências do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-400 mb-2">Idioma Preferido</label>
              <select 
                value={config.preferredLanguage}
                onChange={(e) => setConfig({...config, preferredLanguage: e.target.value as 'en' | 'pt'})}
                className="w-full bg-neutral-800 p-2 rounded"
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 mb-2">Tom Preferido</label>
              <select 
                value={config.preferredTone}
                onChange={(e) => setConfig({...config, preferredTone: e.target.value as any})}
                className="w-full bg-neutral-800 p-2 rounded"
              >
                <option value="emocional">Emocional</option>
                <option value="verdadeiro">Verdadeiro</option>
                <option value="direto">Direto</option>
                <option value="inspirador">Inspirador</option>
              </select>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl col-span-full">
          <h3 className="font-bold text-lg mb-2">Missão do Dia</h3>
          <p className="text-neutral-400 mb-4">Gerar visibilidade e confiança para o Conecta TEA.</p>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-900/30 text-teal-400 rounded-lg hover:bg-teal-900/50">
            <Zap size={16} /> Executar tudo automaticamente
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex font-sans">
      <nav className="w-64 border-r border-neutral-800 p-6 flex flex-col gap-8">
        <h1 className="text-xl font-bold text-teal-400 flex items-center gap-2">
          <Zap size={24} className="fill-teal-400" />
          Mordomo TEA IA
        </h1>
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.name ? 'bg-teal-900/30 text-teal-400' : 'hover:bg-neutral-900 text-neutral-400'
              }`}
            >
              <tab.icon size={20} />
              {tab.name}
            </button>
          ))}
        </div>
      </nav>
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold">{activeTab}</h2>
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 rounded-lg font-bold hover:bg-teal-500 transition-all">
            <Play size={20} /> GERAR RESULTADO HOJE
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
