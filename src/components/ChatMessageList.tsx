import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from './Chatbot';

interface ChatMessageListProps {
  messages: Message[];
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className={`m-0 ${message.role === 'user' ? 'text-white' : 'text-gray-900'}`}>
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className={message.role === 'user' ? 'text-white' : 'text-gray-900'}>
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className={message.role === 'user' ? 'text-white' : 'text-gray-900'}>
                      {children}
                    </em>
                  ),
                  code: ({ children }) => (
                    <code className={`px-1 py-0.5 rounded text-xs ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className={`mt-2 p-2 rounded text-sm overflow-x-auto ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      {children}
                    </pre>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            <div className={`text-xs mt-2 ${
              message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
            }`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList;