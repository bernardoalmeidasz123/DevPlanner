
import { GoogleGenAI, Type } from "@google/genai";
import { Task, Job } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getAIAdvice(tasks: Task[], jobs: Job[], userPrompt: string) {
  const model = "gemini-3-flash-preview";
  
  const context = `
    Current context for the developer:
    Tasks: ${JSON.stringify(tasks.filter(t => t.status !== 'Completed'))}
    Active Job Applications: ${JSON.stringify(jobs.filter(j => j.status !== 'Rejected'))}
    
    You are DevPlanner AI, a helpful, professional assistant for software developers.
    Your tone is encouraging, concise, and focused on career growth.
    Help the user with their request based on their current tasks and jobs.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: `${context}\n\nUser Question: ${userPrompt}` }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Advice Error:", error);
    return "I'm sorry, I'm having trouble processing that right now. Please try again later.";
  }
}

export async function summarizeDay(tasks: Task[], jobs: Job[]) {
  const model = "gemini-3-flash-preview";
  
  const systemPrompt = `Summarize the day for a developer. 
    High priority tasks: ${tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length}
    Upcoming interviews: ${jobs.filter(j => j.status === 'Interview').length}
    Active projects: ${tasks.filter(t => t.category === 'Project').length}
    
    Provide a bulleted list of focus areas and one motivational tip. Keep it under 100 words.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ text: systemPrompt }],
    });
    return response.text;
  } catch (error) {
    return "Focus on your high-priority tasks and stay consistent with your job applications today!";
  }
}
