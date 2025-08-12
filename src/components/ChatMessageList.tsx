import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from './Chatbot';

interface ChatMessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 px-4 py-3">
      <div className="typing-indicator">
        <div className="typing-dot" style={{ '--delay': 0 } as React.CSSProperties}></div>
        <div className="typing-dot" style={{ '--delay': 1 } as React.CSSProperties}></div>
        <div className="typing-dot" style={{ '--delay': 2 } as React.CSSProperties}></div>
      </div>
      <span className="text-grok-text-secondary text-sm ml-2">thinking...</span>
    </div>
  );
};

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6 scroll-smooth">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 md:space-x-3 max-w-full w-full`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-2 md:ml-3' : 'mr-2 md:mr-3'}`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                message.role === 'user' 
                  ? 'bg-grok-user-bg text-white' 
                  : 'bg-grok-ai-bg text-white'
              }`}>
                {message.role === 'user' ? 'U' : 'G'}
              </div>
            </div>
            
            {/* Message Content */}
            <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`message-bubble inline-block px-4 md:px-6 py-3 md:py-4 rounded-2xl max-w-[90%] md:max-w-[85%] ${
                  message.role === 'user'
                    ? 'bg-grok-user-bg text-white rounded-br-lg'
                    : 'bg-grok-surface border border-grok-border text-grok-text rounded-bl-lg'
                } ${message.role === 'assistant' ? 'shadow-lg' : ''}`}
              >
                {message.isTyping ? (
                  <TypingIndicator />
                ) : (
                  <>
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className={`mb-2 last:mb-0 leading-relaxed ${
                              message.role === 'user' ? 'text-white' : 'text-grok-text'
                            }`}>
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className={`font-semibold ${
                              message.role === 'user' ? 'text-white' : 'text-grok-text'
                            }`}>
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className={message.role === 'user' ? 'text-white' : 'text-grok-text'}>
                              {children}
                            </em>
                          ),
                          ul: ({ children }) => (
                            <ul className={`list-disc list-inside space-y-1 ${
                              message.role === 'user' ? 'text-white' : 'text-grok-text'
                            }`}>
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className={`list-decimal list-inside space-y-1 ${
                              message.role === 'user' ? 'text-white' : 'text-grok-text'
                            }`}>
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="py-0.5">{children}</li>
                          ),
                          code: ({ children }) => (
                            <code className={`px-2 py-1 rounded text-xs font-mono ${
                              message.role === 'user' 
                                ? 'bg-blue-700 text-blue-100' 
                                : 'bg-grok-border text-grok-accent'
                            }`}>
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className={`mt-3 p-4 rounded-lg text-sm overflow-x-auto font-mono ${
                              message.role === 'user'
                                ? 'bg-blue-700 text-blue-100'
                                : 'bg-grok-bg border border-grok-border text-grok-text'
                            }`}>
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <div className={`text-xs mt-3 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-grok-text-secondary'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;