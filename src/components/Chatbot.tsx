import React, { useState, useRef, useEffect } from 'react';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';

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
      content: 'Hello! I\'m Grok, your AI assistant. I\'m here to help you with anything you need. What would you like to know?',
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
              content: generateSmartResponse(content),
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

  const generateSmartResponse = (userInput: string): string => {
    const responses = [
      `That's an interesting question about "${userInput}". Let me think about this...

Based on what you're asking, I'd say this is a complex topic that deserves a thoughtful response. Here are a few key points to consider:

• The context of your question is important
• There are multiple perspectives to explore
• The implications can be quite broad

What specific aspect would you like me to dive deeper into?`,
      
      `Great question! Regarding "${userInput}", I think there's a lot we can explore here.

From my perspective, this touches on several important areas:

1. **Context matters**: Understanding the background is crucial
2. **Multiple approaches**: There are usually several ways to approach this
3. **Practical considerations**: Real-world application is key

Would you like me to elaborate on any of these points?`,
      
      `I find your question about "${userInput}" quite fascinating. This is exactly the kind of inquiry that makes our conversation meaningful.

Here's how I see it:
- There are both immediate and long-term considerations
- Different stakeholders might have varying perspectives  
- The devil is often in the details

What's driving your interest in this particular topic?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
    
    await simulateTypingResponse(content);
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
              <h1 className="text-lg md:text-xl font-semibold text-grok-text">Grok</h1>
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