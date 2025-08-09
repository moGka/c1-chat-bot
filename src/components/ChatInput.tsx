import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (message.trim() && !isLoading) {
      const messageToSend = message.trim();
      setMessage('');
      await onSendMessage(messageToSend);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const suggestions = [
    "How can I improve my productivity?",
    "Explain quantum computing in simple terms",
    "What's the best way to learn a new language?",
    "Help me write a professional email"
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Quick Suggestions */}
      {message === '' && !isLoading && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, window.innerWidth < 768 ? 1 : 2).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setMessage(suggestion)}
                className="px-3 py-2 text-sm bg-grok-surface border border-grok-border text-grok-text-secondary rounded-lg hover:bg-grok-border hover:text-grok-text transition-all duration-200 truncate max-w-[280px]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <div className={`flex items-end space-x-3 md:space-x-4 p-3 md:p-4 rounded-2xl border transition-all duration-200 ${
          isFocused 
            ? 'border-grok-accent bg-grok-surface/80 shadow-glow' 
            : 'border-grok-border bg-grok-surface/60 hover:bg-grok-surface/80'
        }`}>
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="w-full bg-transparent text-grok-text placeholder-grok-text-secondary resize-none border-0 outline-none min-h-[24px] max-h-[120px] leading-6 text-sm md:text-base"
              rows={1}
              style={{ height: 'auto' }}
            />
          </div>
          
          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className={`flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              message.trim() && !isLoading
                ? 'bg-grok-accent hover:bg-grok-accent-hover text-white shadow-glow transform hover:scale-105 active:scale-95'
                : 'bg-grok-border text-grok-text-secondary cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="md:w-[18px] md:h-[18px]"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            )}
          </button>
        </div>

        {/* Character Counter */}
        {message.length > 0 && (
          <div className="absolute -bottom-6 right-0 text-xs text-grok-text-secondary">
            {message.length}/2000
          </div>
        )}
      </div>

      {/* Keyboard Hint - Hidden on mobile */}
      <div className="mt-3 text-xs text-grok-text-secondary text-center hidden md:block">
        Press <kbd className="px-2 py-1 bg-grok-border rounded text-xs">Enter</kbd> to send, 
        <kbd className="px-2 py-1 bg-grok-border rounded text-xs ml-1">Shift + Enter</kbd> for new line
      </div>
    </div>
  );
};

export default ChatInput;