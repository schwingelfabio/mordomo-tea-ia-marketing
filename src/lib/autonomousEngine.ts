import { AppConfig, DailyMission, QueueItem, Campaign } from "../types";
import { generateContent } from "./ai";

export const runAutonomousEngine = async (config: AppConfig): Promise<{ mission: DailyMission; queue: QueueItem[] }> => {
  // 1. Generate Daily Mission
  const missionPrompt = `Crie uma missão diária completa para o Fabio, pai de ${config.daughterName}, focado no projeto ${config.currentCampaignObjective}.
  Priorize: 1. Dinheiro rápido, 2. Confiança, 3. Crescimento, 4. Relacionamento.
  
  Retorne APENAS um JSON com os campos:
  mission, focus, tasks (array), recommendedAction, instagramPost (object: title, content), facebookPost (object: title, content), videoScript (object: title, content), youtubeShortScript (object: title, content), viralComments (array: title, content), dmScripts (array: title, content), storySequence (array: title, content), donationMessage (object: title, content).`;
  
  const missionText = await generateContent(missionPrompt, config, "DailyMission");
  
  let mission: DailyMission;
  try {
    mission = JSON.parse(missionText);
  } catch (e) {
    console.error("Failed to parse mission JSON:", missionText);
    throw new Error("Falha ao gerar missão diária. Tente novamente.");
  }
  mission.date = new Date().toISOString();

  // 2. Generate Content Queue
  const queue: QueueItem[] = [
    { id: '1', title: 'Post Instagram', type: 'post', status: 'ready', content: mission.instagramPost.content },
    { id: '2', title: 'Post Facebook', type: 'post', status: 'ready', content: mission.facebookPost.content },
    { id: '3', title: 'Roteiro Vídeo', type: 'video', status: 'ready', content: mission.videoScript.content },
    { id: '4', title: 'YouTube Short', type: 'video', status: 'ready', content: mission.youtubeShortScript.content },
    { id: '5', title: 'Mensagem Doação', type: 'donation', status: 'ready', content: mission.donationMessage.content }
  ];

  return { mission, queue };
};
