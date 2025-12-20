<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
📚 Research-Nexus AI

Research-Nexus is an AI-powered research assistant that allows users to upload documents (PDFs), extract knowledge, and ask intelligent questions using a Retrieval-Augmented Generation (RAG) pipeline.

Built with Next.js App Router, Supabase, Pinecone, and Gemini AI, this project demonstrates a production-grade AI document analysis system with a modern dashboard UI.

🚀 Features

🔐 Authentication (Supabase Auth)

📄 Upload research papers (PDF)

🧠 Text extraction & intelligent chunking

🔎 Vector search with Pinecone

💬 Ask questions across uploaded documents

⚡ RAG-based answer generation

🧪 Mock embeddings for development (quota-safe)

📱 Fully responsive dashboard UI

🧩 Pluggable AI providers (Gemini / OpenAI ready)

🧠 Architecture Overview
User Uploads PDF
        ↓
Supabase Storage (File)
        ↓
PDF Text Extraction (Server)
        ↓
Text Chunking
        ↓
Embedding Generation
   (Mock / Gemini)
        ↓
Pinecone Vector DB
        ↓
Semantic Search
        ↓
AI Answer Generation

🛠 Tech Stack
Frontend

Next.js 16 (App Router)

TypeScript

Tailwind CSS

Lucide Icons

Backend

Next.js API Routes

Supabase (Auth + Storage)

Pinecone (Vector Database)

AI / ML

Google Gemini API (Chat & Embeddings)

Mock Embeddings (Dev Mode)

RAG (Retrieval-Augmented Generation)

📂 Project Structure
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   │   ├── upload/
│   │   ├── documents/
│   │   └── layout.tsx
│   ├── api/
│   │   ├── upload/
│   │   │   └── route.ts
│   │   └── chat/
│   │       └── route.ts
│   └── page.tsx
│
├── lib/
│   ├── supabase-client.ts
│   ├── pinecone.ts
│   └── embeddings.ts
│
├── utils/
│   ├── pdfparser.ts
│   └── chunker.ts
│
└── styles/

🧪 Mock Embeddings (Development Mode)

To avoid API quota issues during development, the project uses deterministic mock embeddings:

if (process.env.NODE_ENV === 'development') {
  return createMockEmbedding(text);
}

Why?

Enables full RAG pipeline testing

Faster iteration

Zero API cost

Easy switch to production embeddings

🔁 Switching to Real Embeddings

Update environment variables:

NODE_ENV=production
GEMINI_API_KEY=your_key_here


No code changes required.

🔐 Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

PINECONE_API_KEY=
PINECONE_INDEX_NAME=

GEMINI_API_KEY=

▶️ Getting Started
# Install dependencies
npm install

# Run development server
npm run dev


Open:
👉 http://localhost:3000

🧠 RAG vs LangChain

This project uses custom RAG logic instead of LangChain.

Why?

Full control over data flow

Better debugging

Lower overhead

Cleaner architecture for Next.js

LangChain can be added later if needed.

🎯 Use Cases

Academic research assistant

Internal document QA

Knowledge base chatbots

AI SaaS MVP

Client demos / portfolios

📸 Screenshots
>>>>>>> 2f9afac9294125a216215be4822cf314eaf2bbe0
