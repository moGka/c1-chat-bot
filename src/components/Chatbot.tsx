import React, { useState, useRef, useEffect } from 'react';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { graphqlClient, Message as APIMessage } from '../api/graphql';

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
      content: 'Hello! I\'m DeepSeek AI, your intelligent assistant. I\'m here to help you with questions, tasks, coding, writing, and much more. What would you like to explore today?',
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

  const getAIResponse = async (userMessage: string): Promise<void> => {
    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isTyping: true,
    };
    
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Prepare conversation history for API
      const conversationHistory: APIMessage[] = messages
        .filter(msg => !msg.isTyping && msg.role !== 'assistant' || msg.id === '1') // Include initial message and user messages
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Call DeepSeek API via Cloudflare Workers
      const response = await graphqlClient.chat({
        message: userMessage,
        conversationHistory
      });

      setMessages(prev => {
        const newMessages = prev.filter(msg => msg.id !== typingMessage.id);
        return [
          ...newMessages,
          {
            id: Date.now().toString(),
            content: response.success ? response.message : `Error: ${response.error || 'Failed to get response'}`,
            role: 'assistant',
            timestamp: new Date(),
          }
        ];
      });
    } catch (error) {
      console.error('Failed to get AI response:', error);
      setMessages(prev => {
        const newMessages = prev.filter(msg => msg.id !== typingMessage.id);
        return [
          ...newMessages,
          {
            id: Date.now().toString(),
            content: `Sorry, I'm having trouble connecting to the AI service. Please try again later.`,
            role: 'assistant',
            timestamp: new Date(),
          }
        ];
      });
    }

    setIsLoading(false);
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
    
    await getAIResponse(content);
  };

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
              <h1 className="text-lg md:text-xl font-semibold text-grok-text">DeepSeek Chat</h1>
              <p className="text-xs md:text-sm text-grok-text-secondary">Powered by DeepSeek AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm text-grok-text-secondary hidden sm:inline">Online</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto">
          <ChatMessageList messages={messages} />
          <div ref={messagesEndRef} />
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