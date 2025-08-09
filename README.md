# 🤖 AI Chatbot

A modern, responsive AI chatbot application built with React, TypeScript, and Tailwind CSS. This project provides a clean and intuitive interface for conversing with an AI assistant.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

## ✨ Features

- **Modern UI/UX**: Clean and responsive design with Tailwind CSS
- **Real-time Chat**: Interactive chat interface with message history
- **TypeScript Support**: Full type safety and enhanced development experience
- **Markdown Support**: Rich text formatting with React Markdown
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Message Timestamps**: Displays time for each message
- **Auto-scroll**: Automatically scrolls to latest messages
- **Keyboard Shortcuts**: Send messages with Enter key

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd c1-chat-bot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 📁 Project Structure

```
c1-chat-bot/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Chatbot.tsx     # Main chatbot component
│   │   ├── ChatInput.tsx   # Message input component
│   │   └── ChatMessageList.tsx # Message display component
│   ├── App.tsx             # Root application component
│   ├── index.tsx           # Application entry point
│   └── index.css           # Global styles
├── dist/                   # Build output directory
├── package.json            # Project dependencies and scripts
├── webpack.config.js       # Webpack configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start development server (alias for dev)

## 🏗️ Built With

### Core Technologies
- **React 18.2.0** - Frontend library
- **TypeScript 5.1.6** - Static type checking
- **Webpack 5** - Module bundler and dev server

### Styling & UI
- **Tailwind CSS 3.3.7** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **React Markdown 9.0.0** - Markdown rendering

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Webpack Dev Server** - Development server with hot reload

## 💡 Component Architecture

### Chatbot (`src/components/Chatbot.tsx`)
The main container component that:
- Manages chat state and message history
- Handles message sending logic
- Provides layout structure with header, message list, and input

### ChatMessageList (`src/components/ChatMessageList.tsx`)
Displays chat messages with:
- Markdown rendering support
- Role-based styling (user vs assistant)
- Timestamp display
- Responsive message bubbles

### ChatInput (`src/components/ChatInput.tsx`)
Input interface featuring:
- Auto-resizing textarea
- Send button with state management
- Enter key support (Shift+Enter for new line)
- Input validation

## 🎨 Styling & Theming

The application uses Tailwind CSS for styling with a modern design system:

- **Color Scheme**: Blue primary colors with gray neutrals
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Responsive**: Mobile-first responsive design
- **Interactive Elements**: Hover states and focus indicators

## 🔧 Configuration Files

- **webpack.config.js**: Custom Webpack setup for development and production
- **tailwind.config.js**: Tailwind CSS configuration
- **tsconfig.json**: TypeScript compiler options
- **postcss.config.js**: PostCSS plugins configuration

## 📱 Browser Compatibility

This application supports modern browsers that support:
- ES2017+ features
- CSS Grid and Flexbox
- Modern JavaScript APIs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Future Enhancements

- [ ] Integration with real AI APIs (OpenAI, Anthropic, etc.)
- [ ] Message persistence and chat history
- [ ] User authentication and profiles
- [ ] File upload and media support
- [ ] Chat export functionality
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Voice input/output capabilities

---

**Note**: This is currently a demo application with simulated AI responses. To connect to a real AI service, you'll need to implement API integration in the message handling logic.