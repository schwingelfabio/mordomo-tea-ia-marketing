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
  daughterName: string;
  dailyGoal: string;
}

export interface GeneratedContent {
  id: string;
  type: 'post' | 'video' | 'image' | 'dm' | 'campaign' | 'donation' | 'comment' | 'story';
  title: string;
  content: string;
  createdAt: string;
  category?: string;
  tone: string;
  language: 'en' | 'pt';
}

export interface DailyMission {
  date: string;
  mission: string;
  focus: string;
  tasks: string[];
  recommendedAction: string;
  instagramPost: GeneratedContent;
  facebookPost: GeneratedContent;
  videoScript: GeneratedContent;
  youtubeShortScript: GeneratedContent;
  viralComments: GeneratedContent[];
  dmScripts: GeneratedContent[];
  storySequence: GeneratedContent[];
  donationMessage: GeneratedContent;
}

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  targetAudience: string;
  tone: string;
  narrative: string;
  feedPost: string;
  videoScript: string;
  storySequence: string[];
  privateMessage: string;
  donationText: string;
  finalCTA: string;
  createdAt: string;
}

export interface QueueItem {
  id: string;
  title: string;
  type: 'post' | 'video' | 'image' | 'dm' | 'campaign' | 'donation';
  status: 'pending' | 'ready' | 'executed';
  content: string;
}
