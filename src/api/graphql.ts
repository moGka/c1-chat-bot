export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatInput {
  message: string;
  conversationHistory?: Message[];
}

export interface ChatResponse {
  message: string;
  success: boolean;
  error?: string;
}

export class GraphQLClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async chat(input: ChatInput): Promise<ChatResponse> {
    const query = `
      mutation Chat($input: ChatInput!) {
        chat(input: $input) {
          message
          success
          error
        }
      }
    `;

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            input: {
              message: input.message,
              conversationHistory: input.conversationHistory?.map(msg => ({
                role: msg.role.toUpperCase(),
                content: msg.content
              }))
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'GraphQL error');
      }

      return data.data.chat;
    } catch (error) {
      console.error('GraphQL request failed:', error);
      return {
        message: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async health(): Promise<string> {
    const query = `
      query {
        health
      }
    `;

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      return data.data?.health || 'Unknown';
    } catch (error) {
      console.error('Health check failed:', error);
      return 'Error';
    }
  }
}

// Default client - you'll need to replace this URL with your deployed Cloudflare Worker URL
export const graphqlClient = new GraphQLClient('https://deepseek-chat-api.YOUR_SUBDOMAIN.workers.dev');