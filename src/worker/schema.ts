export const typeDefs = `
  type Query {
    health: String
  }

  type Mutation {
    chat(input: ChatInput!): ChatResponse!
  }

  input ChatInput {
    message: String!
    conversationHistory: [MessageInput!]
  }

  input MessageInput {
    role: MessageRole!
    content: String!
  }

  enum MessageRole {
    USER
    ASSISTANT
  }

  type ChatResponse {
    message: String!
    success: Boolean!
    error: String
  }
`;

export interface ChatInput {
  message: string;
  conversationHistory?: MessageInput[];
}

export interface MessageInput {
  role: 'USER' | 'ASSISTANT';
  content: string;
}

export interface ChatResponse {
  message: string;
  success: boolean;
  error?: string;
}