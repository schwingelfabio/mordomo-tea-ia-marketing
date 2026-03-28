/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LayoutDashboard, FileText, Video, Image as ImageIcon, MessageSquare, ShieldCheck, DollarSign, Target, Settings, Zap, Plus, RefreshCw, Copy, Languages } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Today');
  const [isUrgentMode, setIsUrgentMode] = useState(false);

  const tabs = [
    { name: 'Today', icon: LayoutDashboard },
    { name: 'Posts', icon: FileText },
    { name: 'Videos', icon: Video },
    { name: 'Images', icon: ImageIcon },
    { name: 'DMs', icon: MessageSquare },
    { name: 'Trust', icon: ShieldCheck },
    { name: 'Donation', icon: DollarSign },
    { name: 'Campaigns', icon: Target },
    { name: 'Settings', icon: Settings },
  ];

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
        <button
          onClick={() => setIsUrgentMode(!isUrgentMode)}
          className={`mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all ${
            isUrgentMode ? 'bg-red-600 text-white animate-pulse' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
          }`}
        >
          <DollarSign size={20} />
          {isUrgentMode ? 'URGENT MODE ON' : 'GET MONEY TODAY'}
        </button>
      </nav>
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold">{activeTab}</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700">
              <Plus size={16} /> Create
            </button>
          </div>
        </header>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Example Card */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-2">Daily Mission</h3>
            <p className="text-neutral-400 mb-4">Your priority for today is to build trust with a transparency post.</p>
            <div className="flex gap-2">
              <button className="p-2 bg-neutral-800 rounded hover:bg-neutral-700"><Copy size={16} /></button>
              <button className="p-2 bg-neutral-800 rounded hover:bg-neutral-700"><RefreshCw size={16} /></button>
              <button className="p-2 bg-neutral-800 rounded hover:bg-neutral-700"><Languages size={16} /></button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
