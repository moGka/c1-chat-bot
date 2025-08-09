# 🤖 DeepSeek AI Chatbot

A modern, responsive AI chatbot application built with React, TypeScript, Tailwind CSS, and integrated with DeepSeek API via Cloudflare Workers and GraphQL. This project provides a clean and intuitive interface for conversing with DeepSeek AI.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

## ✨ Features

- **DeepSeek AI Integration**: Powered by DeepSeek's advanced language model
- **Cloudflare Workers Backend**: Serverless API with global edge deployment
- **GraphQL API**: Type-safe API with flexible querying capabilities
- **Modern UI/UX**: Clean and responsive design with Tailwind CSS
- **Real-time Chat**: Interactive chat interface with conversation history
- **TypeScript Support**: Full type safety and enhanced development experience
- **Markdown Support**: Rich text formatting with React Markdown
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Message Timestamps**: Displays time for each message
- **Auto-scroll**: Automatically scrolls to latest messages
- **Keyboard Shortcuts**: Send messages with Enter key
- **Error Handling**: Graceful error handling with user-friendly messages

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Cloudflare account (for Workers deployment)
- DeepSeek API key (sign up at [DeepSeek Platform](https://platform.deepseek.com/))

### Installation & Setup

#### 1. Clone the repository:
```bash
git clone <repository-url>
cd c1-chat-bot
```

#### 2. Install dependencies:
```bash
npm install
```

#### 3. Install Wrangler CLI (Cloudflare Workers):
```bash
npm install -g wrangler
```

#### 4. Login to Cloudflare:
```bash
wrangler login
```

#### 5. Configure your DeepSeek API key:
Update the `wrangler.toml` file with your actual DeepSeek API key:
```toml
[env.production.vars]
DEEPSEEK_API_KEY = "your_actual_deepseek_api_key_here"
```

#### 6. Deploy Cloudflare Worker:
```bash
./deploy.sh
```
Or manually:
```bash
wrangler publish --env production
```

#### 7. Update API endpoint:
Copy your Worker URL from the deployment output and update `src/api/graphql.ts`:
```typescript
export const graphqlClient = new GraphQLClient('https://your-worker-url.workers.dev');
```

#### 8. Start the development server:
```bash
npm run dev
```

#### 9. Open your browser and navigate to `http://localhost:8080`

## 📁 Project Structure

```
c1-chat-bot/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── api/
│   │   └── graphql.ts      # GraphQL client for Cloudflare Workers
│   ├── components/
│   │   ├── Chatbot.tsx     # Main chatbot component with DeepSeek integration
│   │   ├── ChatInput.tsx   # Message input component
│   │   └── ChatMessageList.tsx # Message display component
│   ├── worker/             # Cloudflare Workers backend
│   │   ├── index.ts        # Worker entry point with GraphQL server
│   │   ├── schema.ts       # GraphQL schema definitions
│   │   ├── resolvers.ts    # GraphQL resolvers
│   │   └── deepseek.ts     # DeepSeek API integration
│   ├── App.tsx             # Root application component
│   ├── index.tsx           # Application entry point
│   └── index.css           # Global styles
├── wrangler.toml           # Cloudflare Workers configuration
├── deploy.sh               # Deployment script
├── .env.example            # Environment variables template
├── dist/                   # Build output directory
├── package.json            # Project dependencies and scripts
├── webpack.config.js       # Webpack configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🛠️ Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start development server (alias for dev)

### Cloudflare Workers Scripts
- `./deploy.sh` - Deploy worker to Cloudflare
- `wrangler publish` - Manual deployment
- `wrangler dev` - Local development server for worker
- `wrangler tail` - View worker logs in real-time

## 🏗️ Built With

### Core Technologies
- **React 18.2.0** - Frontend library
- **TypeScript 5.1.6** - Static type checking
- **Webpack 5** - Module bundler and dev server
- **Cloudflare Workers** - Serverless edge computing platform
- **GraphQL** - API query language and runtime

### AI & Backend
- **DeepSeek API** - Advanced language model for chat responses
- **Custom GraphQL Server** - Lightweight GraphQL implementation for Workers

### Styling & UI
- **Tailwind CSS 3.3.7** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **React Markdown 9.0.0** - Markdown rendering

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Webpack Dev Server** - Development server with hot reload
- **Wrangler CLI** - Cloudflare Workers development and deployment tool

## 💡 Architecture Overview

### Frontend Components

#### Chatbot (`src/components/Chatbot.tsx`)
The main container component that:
- Manages chat state and conversation history
- Integrates with DeepSeek AI via GraphQL API
- Handles error states and loading indicators
- Provides layout structure with header, message list, and input

#### ChatMessageList (`src/components/ChatMessageList.tsx`)
Displays chat messages with:
- Markdown rendering support
- Role-based styling (user vs assistant)
- Timestamp display
- Responsive message bubbles
- Typing indicators

#### ChatInput (`src/components/ChatInput.tsx`)
Input interface featuring:
- Auto-resizing textarea
- Send button with state management
- Enter key support (Shift+Enter for new line)
- Input validation

### Backend (Cloudflare Workers)

#### GraphQL API (`src/worker/index.ts`)
Serverless API that:
- Handles CORS for cross-origin requests
- Processes GraphQL queries and mutations
- Provides type-safe API endpoints
- Manages error handling and validation

#### DeepSeek Integration (`src/worker/deepseek.ts`)
AI service integration that:
- Communicates with DeepSeek API
- Manages conversation context
- Handles API authentication
- Processes streaming responses

#### Schema & Resolvers (`src/worker/schema.ts`, `src/worker/resolvers.ts`)
GraphQL layer that:
- Defines type-safe API schema
- Implements query and mutation resolvers
- Manages data transformation
- Provides consistent error handling

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

## 🧪 Testing Your Setup

### 1. Test the Cloudflare Worker API
```bash
curl -X POST https://your-worker-url.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"query": "query { health }"}'
```

Expected response:
```json
{"data":{"health":"OK"}}
```

### 2. Test Chat Functionality
```bash
curl -X POST https://your-worker-url.workers.dev \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation Chat($input: ChatInput!) { chat(input: $input) { message success error } }",
    "variables": {
      "input": {
        "message": "Hello, how are you?"
      }
    }
  }'
```

## 🔧 Configuration

### Environment Variables
- `DEEPSEEK_API_KEY`: Your DeepSeek API key (configured in `wrangler.toml`)
- `DEEPSEEK_API_BASE`: DeepSeek API base URL (default: `https://api.deepseek.com/v1`)

### Customization
- Update `src/api/graphql.ts` with your Worker URL
- Modify `src/worker/deepseek.ts` to adjust AI parameters
- Customize UI styling in component files

## 🚀 Deployment

### Frontend Deployment
Deploy your frontend to any static hosting service:

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Monitoring
View your Worker logs and metrics in the Cloudflare dashboard:
- **Logs**: `wrangler tail`
- **Analytics**: Cloudflare Dashboard → Workers & Pages

## 🚀 Future Enhancements

- [x] **DeepSeek AI Integration** - Real AI responses via DeepSeek API
- [x] **Cloudflare Workers Backend** - Serverless API deployment
- [x] **GraphQL API** - Type-safe API layer
- [ ] Message persistence and chat history storage
- [ ] User authentication and profiles
- [ ] File upload and media support
- [ ] Chat export functionality (PDF, JSON)
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Voice input/output capabilities
- [ ] Streaming responses for real-time typing
- [ ] Rate limiting and usage analytics

## 📝 API Documentation

### GraphQL Schema
```graphql
type Query {
  health: String
}

type Mutation {
  chat(input: ChatInput!): ChatResponse!
}

input ChatInput {
  message: String!
  conversationHistory: [MessageInput!]
}

input MessageInput {
  role: MessageRole!
  content: String!
}

enum MessageRole {
  USER
  ASSISTANT
}

type ChatResponse {
  message: String!
  success: Boolean!
  error: String
}
```

---

**Note**: This application now features real AI integration with DeepSeek API through Cloudflare Workers, providing intelligent responses powered by advanced language models.