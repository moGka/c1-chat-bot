import { typeDefs } from './schema';
import { resolvers } from './resolvers';

// Simple GraphQL parser and executor
class SimpleGraphQL {
  private typeDefs: string;
  private resolvers: any;

  constructor(typeDefs: string, resolvers: any) {
    this.typeDefs = typeDefs;
    this.resolvers = resolvers;
  }

  async execute(query: string, variables: any = {}, context: any = {}): Promise<any> {
    // Simple query parsing - this is a minimal implementation
    const trimmedQuery = query.trim();
    
    if (trimmedQuery.includes('mutation') && trimmedQuery.includes('chat')) {
      // Parse chat mutation
      const messageMatch = trimmedQuery.match(/message:\s*"([^"]+)"/);
      const message = messageMatch ? messageMatch[1] : variables.input?.message || '';
      
      if (!message) {
        return {
          data: null,
          errors: [{ message: 'Message is required' }]
        };
      }

      try {
        const result = await this.resolvers.Mutation.chat(
          null, 
          { input: { message, conversationHistory: variables.input?.conversationHistory } }, 
          context
        );
        
        return {
          data: {
            chat: result
          }
        };
      } catch (error) {
        return {
          data: null,
          errors: [{ message: error instanceof Error ? error.message : 'Unknown error' }]
        };
      }
    }
    
    if (trimmedQuery.includes('query') && trimmedQuery.includes('health')) {
      return {
        data: {
          health: this.resolvers.Query.health()
        }
      };
    }

    return {
      data: null,
      errors: [{ message: 'Query not supported' }]
    };
  }
}

const graphql = new SimpleGraphQL(typeDefs, resolvers);

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // Handle CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only handle POST requests to /graphql
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      });
    }

    try {
      const { query, variables } = await request.json();
      
      if (!query) {
        return new Response(
          JSON.stringify({ errors: [{ message: 'Query is required' }] }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders 
            }
          }
        );
      }

      const context = { env };
      const result = await graphql.execute(query, variables, context);

      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({
          errors: [{ 
            message: error instanceof Error ? error.message : 'Internal server error' 
          }]
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }
  }
};