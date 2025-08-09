import { MessageInput, ChatResponse } from './schema';

interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

export class DeepSeekAPI {
  private apiKey: string;
  private apiBase: string;

  constructor(apiKey: string, apiBase = 'https://api.deepseek.com/v1') {
    this.apiKey = apiKey;
    this.apiBase = apiBase;
  }

  async chat(message: string, conversationHistory?: MessageInput[]): Promise<ChatResponse> {
    try {
      const messages: DeepSeekMessage[] = [];

      // Add system message
      messages.push({
        role: 'system',
        content: 'You are a helpful AI assistant. Respond in a friendly and informative manner.'
      });

      // Add conversation history
      if (conversationHistory) {
        messages.push(...conversationHistory.map(msg => ({
          role: msg.role.toLowerCase() as 'user' | 'assistant',
          content: msg.content
        })));
      }

      // Add current user message
      messages.push({
        role: 'user',
        content: message
      });

      const response = await fetch(`${this.apiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
          stream: false
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('DeepSeek API error:', response.status, errorText);
        return {
          message: '',
          success: false,
          error: `DeepSeek API error: ${response.status} ${response.statusText}`
        };
      }

      const data: DeepSeekResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        return {
          message: '',
          success: false,
          error: 'No response from DeepSeek API'
        };
      }

      return {
        message: data.choices[0].message.content,
        success: true
      };

    } catch (error) {
      console.error('DeepSeek API error:', error);
      return {
        message: '',
        success: false,
        error: `Failed to communicate with DeepSeek API: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}