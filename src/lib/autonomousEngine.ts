import { AppConfig, DailyMission, QueueItem, Campaign } from "../types";
import { generateContent } from "./ai";

export const runAutonomousEngine = async (config: AppConfig): Promise<{ mission: DailyMission; queue: QueueItem[] }> => {
  // 1. Generate Daily Mission
  const missionPrompt = `Crie uma missão diária completa para o Fabio, pai de ${config.daughterName}, focado no projeto ${config.currentCampaignObjective}.
  Priorize: 1. Dinheiro rápido, 2. Confiança, 3. Crescimento, 4. Relacionamento.
  
  Retorne APENAS um JSON com os campos:
  mission, focus, tasks (array), recommendedAction, mainPost (object: title, content), commentStrategies (array: title, content), dmScripts (array: title, content), storySequence (array: title, content).`;
  
  const missionText = await generateContent(missionPrompt, config, "DailyMission");
  const mission: DailyMission = JSON.parse(missionText);
  mission.date = new Date().toISOString();

  // 2. Generate Campaign
  const campaignPrompt = `Crie uma campanha completa para o projeto ${config.currentCampaignObjective}.
  O objetivo é ${config.dailyGoal}.
  O público é ${config.targetAudience}.
  O tom deve ser ${config.preferredTone}.
  
  Retorne APENAS um JSON com os campos:
  name, objective, targetAudience, tone, narrative, feedPost, videoScript, storySequence (array), privateMessage, donationText, finalCTA.`;
  
  const campaignText = await generateContent(campaignPrompt, config, "Campaign");
  const campaign: Campaign = JSON.parse(campaignText);

  // 3. Generate Content Queue
  const queue: QueueItem[] = [
    {
      id: 'campaign',
      title: `Campanha: ${campaign.name}`,
      type: 'campaign',
      status: 'ready',
      content: JSON.stringify(campaign)
    },
    {
      id: '1',
      title: 'Post Emocional de Conversão',
      type: 'post',
      status: 'ready',
      content: campaign.feedPost
    },
    {
      id: '2',
      title: 'Vídeo de Confiança',
      type: 'video',
      status: 'ready',
      content: campaign.videoScript
    }
  ];

  return { mission, queue };
};
