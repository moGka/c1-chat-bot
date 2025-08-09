#!/bin/bash

# DeepSeek Chat API Cloudflare Workers Deployment Script

echo "🚀 Deploying DeepSeek Chat API to Cloudflare Workers..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI is not installed. Please install it first:"
    echo "npm install -g wrangler"
    exit 1
fi

# Check if user is logged in to Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please login to Cloudflare first:"
    echo "wrangler login"
    exit 1
fi

# Deploy to production
echo "📦 Publishing to Cloudflare Workers..."
wrangler publish --env production

echo "✅ Deployment completed!"
echo ""
echo "📝 Next steps:"
echo "1. Copy your Worker URL from the output above"
echo "2. Update src/api/graphql.ts with your Worker URL"
echo "3. Deploy your frontend application"
echo ""
echo "🔧 To test your API:"
echo "curl -X POST https://deepseek-chat-api.YOUR_SUBDOMAIN.workers.dev \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"query\": \"query { health }\"}'"