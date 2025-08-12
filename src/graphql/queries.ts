import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
mutation Chat($input: ChatInput!) {
  chat(input: $input) {
    id
    message
    model
    usage {
      promptTokens
      completionTokens
      totalTokens
    }
    conversationId
    timestamp
    finishReason
  }
}`;

  export const GET_MODELS_QUERY = gql`
  query GetModels {
    modules
  }
  `
