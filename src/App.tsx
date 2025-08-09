import React from 'react';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-grok-bg text-grok-text antialiased">
      <div className="absolute inset-0 bg-gradient-to-br from-grok-bg via-grok-surface/50 to-grok-bg"></div>
      <div className="relative z-10">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;