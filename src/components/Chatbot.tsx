import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client'
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { SEND_MESSAGE, GET_MODELS_QUERY } from '../graphql/queries';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m ChatBot, your AI assistant. I\'m here to help you with anything you need. What would you like to know?',
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTypingResponse = (content: string): Promise<void> => {
    return new Promise((resolve) => {
      // Add typing indicator
      const typingMessage: Message = {
        id: `typing-${Date.now()}`,
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        isTyping: true,
      };
      
      setMessages(prev => [...prev, typingMessage]);
      
      // Simulate realistic response time
      const responseTime = Math.min(content.length * 50 + 1000, 3000);
      
      setTimeout(() => {
        setMessages(prev => {
          const newMessages = prev.filter(msg => msg.id !== typingMessage.id);
          return [
            ...newMessages,
            {
              id: Date.now().toString(),
              content: content,
              role: 'assistant',
              timestamp: new Date(),
            }
          ];
        });
        setIsLoading(false);
        resolve();
      }, responseTime);
    });
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    const resMessage = await sendMessage(content);

    setMessages(prev => {
      const newMessages = prev.filter(msg => msg.id !== typingMessage.id);
      return [
        ...newMessages,
        {
          id: Date.now().toString(),
          content: resMessage,
          role: 'assistant',
          timestamp: new Date(),
        }
      ];
    });
    setIsLoading(false);
  };

  interface Usage {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }

  interface ChatInput {
    inPut: {
      message: string
      model: string
      temperature: string
      maxTokens: string
      systemPrompt: string
    }
  }

  interface ChatResponse {
    chat: {
      id: string
      message: string
      model: string
      usage: Usage
      conversationId: string
      timestamp: string
      finishReason: string
    }
  }

  interface SendMessageVariables {
    content: string
    sessionId?: string
  }

  const [sendMessageMutation, { loading }] = useMutation<ChatResponse> (
    SEND_MESSAGE,
    {
      onError: (error) => {
        console.error('GraphQL Error:', error)
      }
    }
  )

  const sendMessage = async (content: string) => {
    console.log(`发送的消息: ${content}`)
    try {
      const { data } = await sendMessageMutation({
        variables: {
          input: {
            message: content,
            model: "deepseek-chat",
            temperature: 0.7,
            maxTokens: 2000,
            systemPrompt: "你是一个友好的AI助手"
          },
          sessionId: 'default-session-id' // Replace with actual session ID if needed
        }
      });
      console.log(data)
      
      if (data?.chat) {
        return data.chat.message
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    return ""
  }

  /*
  async function sendChatMessage(message: string): string {
    console.log(`发送的消息${message}`)
    try {
      const { data } = await sendMessageMutation({
        variables: {
          input: {
            message: message,
            model: "deepseek-chat",
            temperature: 0.7,
            maxTokens: 2000,
            systemPrompt: "你是一个友好的AI助手"
          },
          sessionId: 'default-session-id' // Replace with actual session ID if needed
        }
      });
      console.log(data)
      
      if (data?.chat) {
        await simulateTypingResponse(data.chat.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
    */

  

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-grok-border bg-grok-surface/80 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-grok-accent to-grok-accent-hover rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-base md:text-lg">G</span>
            </div>
            <div className="ml-3 md:ml-4">
              <h1 className="text-lg md:text-xl font-semibold text-grok-text">Chat Bot</h1>
              <p className="text-xs md:text-sm text-grok-text-secondary">AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm text-grok-text-secondary hidden sm:inline">Online</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col overflow-hidden">
          <ChatMessageList messages={messages} messagesEndRef={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex-shrink-0 border-t border-grok-border bg-grok-surface/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;