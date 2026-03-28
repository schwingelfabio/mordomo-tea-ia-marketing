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
  preferredTone: 'professional' | 'emotional' | 'urgent' | 'trust-building';
}

export interface GeneratedContent {
  id: string;
  type: 'post' | 'video' | 'image' | 'dm' | 'reply' | 'trust' | 'donation' | 'campaign';
  title: string;
  content: string;
  platform?: string;
  language: 'en' | 'pt';
  variation: 'strong' | 'soft' | 'viral' | 'short' | 'high-trust';
  timestamp: number;
}

export interface Campaign {
  id: string;
  name: string;
  emotionalAngle: string;
  message: string;
  contentPack: GeneratedContent[];
}

export interface DailyPlan {
  date: string;
  postIdea: string;
  videoIdea: string;
  storySequence: string;
  outreachTargets: string[];
  donationCTA: string;
  trustAngle: string;
  priority: string;
}
