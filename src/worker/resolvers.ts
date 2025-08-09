import { DeepSeekAPI } from './deepseek';
import { ChatInput, ChatResponse } from './schema';

export interface Context {
  env: {
    DEEPSEEK_API_KEY: string;
    DEEPSEEK_API_BASE: string;
  };
}

export const resolvers = {
  Query: {
    health: () => 'OK'
  },
  
  Mutation: {
    chat: async (_: any, { input }: { input: ChatInput }, context: Context): Promise<ChatResponse> => {
      try {
        const deepseek = new DeepSeekAPI(
          context.env.DEEPSEEK_API_KEY,
          context.env.DEEPSEEK_API_BASE
        );

        return await deepseek.chat(input.message, input.conversationHistory);
      } catch (error) {
        console.error('Resolver error:', error);
        return {
          message: '',
          success: false,
          error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    }
  }
};