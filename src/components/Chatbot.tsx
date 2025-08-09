import React, { useState } from 'react';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message: "${content}". This is a demo response from the AI chatbot.`,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-sm">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AI</span>
          </div>
          <h1 className="ml-3 text-xl font-medium text-gray-900">AI Chatbot</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <ChatMessageList messages={messages} />
      </div>

      {/* Chat Input */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chatbot;