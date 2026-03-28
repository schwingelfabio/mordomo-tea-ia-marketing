import { AppConfig, GeneratedContent } from '../types';

const CONFIG_KEY = 'mordomo_config';
const CONTENT_KEY = 'mordomo_content';

export const saveConfig = (config: AppConfig) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

export const getConfig = (): AppConfig | null => {
  const data = localStorage.getItem(CONFIG_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveContent = (content: GeneratedContent) => {
  const existing = getContent();
  localStorage.setItem(CONTENT_KEY, JSON.stringify([...existing, content]));
};

export const getContent = (): GeneratedContent[] => {
  const data = localStorage.getItem(CONTENT_KEY);
  return data ? JSON.parse(data) : [];
};
