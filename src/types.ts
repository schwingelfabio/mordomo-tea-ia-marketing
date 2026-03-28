export interface AppConfig {
  name: string;
  shortStory: string;
  urgencyContext: string;
  currentFinancialSituation: string;
  website: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  youtube: string;
  paypalEmail: string;
  paypalLink: string;
  revolutDetails: string;
  pixKey: string;
  currentCampaignObjective: string;
  targetAudience: string;
  preferredLanguage: 'en' | 'pt';
  preferredTone: 'emocional' | 'verdadeiro' | 'direto' | 'inspirador';
}

export interface GeneratedContent {
  id: string;
  type: 'post' | 'video' | 'image' | 'dm' | 'reply' | 'trust' | 'donation' | 'campaign';
  title: string;
  content: string;
  platform?: string;
  language: 'pt';
  timestamp: number;
}

export interface DailyMission {
  date: string;
  mission: string;
  tasks: string[];
  priority: string;
}
