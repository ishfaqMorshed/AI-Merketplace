import { apiRequest } from '@/lib/queryClient';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  response: string;
  sessionId: string;
}

export async function sendChatMessage(message: string, sessionId?: string): Promise<ChatResponse> {
  try {
    const response = await apiRequest('POST', '/api/chat', {
      message,
      sessionId,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send chat message');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Chat service unavailable');
  }
}
