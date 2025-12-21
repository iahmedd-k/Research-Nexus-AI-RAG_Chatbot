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
# Research Nexus AI

![Research Nexus](https://img.shields.io/badge/Research-Nexus-blue?style=for-the-badge&logo=ai&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase)
![Pinecone](https://img.shields.io/badge/Pinecone-000000?style=flat&logo=pinecone)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=flat&logo=google)

Research Nexus is a cutting-edge AI-powered research assistant that transforms how researchers interact with their documents. Upload research papers, extract insights, and engage in intelligent conversations using advanced Retrieval-Augmented Generation (RAG) technology.

## ✨ Features

### 🔐 **Secure Authentication**
- User registration and login with Supabase Auth
- Protected routes and user-specific data isolation
- Secure API endpoints with JWT authentication

### 📄 **Smart Document Processing**
- Upload PDF and DOCX research papers (up to 10MB)
- Intelligent text extraction and chunking
- Automatic vector embeddings using Gemini AI
- Pinecone vector database for fast semantic search

### 🤖 **Conversational AI Assistant**
- Ask questions in natural language
- Context-aware responses grounded in your documents
- Citations and source references
- Real-time chat interface with typing indicators

### 🎨 **Modern UI/UX**
- Beautiful gradient-based design
- Responsive layout for all devices
- Dark theme optimized for research work
- Smooth animations and transitions
- Mobile-friendly sidebar navigation

### 📊 **Document Management**
- View all uploaded documents
- Track processing status
- Document metadata and statistics
- Secure cloud storage with Supabase

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Vector Database**: Pinecone
- **AI/ML**: Google Gemini AI
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS with custom gradients
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Pinecone account
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/research-nexus.git
   cd research-nexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your API keys:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Pinecone
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX_NAME=your_index_name

   # Google AI (Gemini)
   GOOGLE_AI_API_KEY=your_gemini_api_key
   ```

4. **Database Setup**
   Create a `documents` table in Supabase:
   ```sql
   CREATE TABLE documents (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     file_name TEXT NOT NULL,
     file_size BIGINT,
     status TEXT DEFAULT 'processing',
     chunks_count INTEGER,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
research-nexus/
├── app/
│   ├── api/
│   │   ├── chat/          # Chat API endpoint
│   │   └── upload/        # File upload API
│   ├── auth/
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── dashboard/         # Protected dashboard
│   │   ├── documents/     # Document management
│   │   ├── upload/        # File upload interface
│   │   └── layout.tsx     # Dashboard layout
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   └── Authform.tsx       # Authentication form
├── lib/
│   ├── gemini.ts          # Gemini AI integration
│   ├── pinecone.ts        # Pinecone client
│   ├── supabase-client.ts # Supabase client
│   └── textchunker.ts     # Text chunking utilities
└── utils/
    └── pdfparser.ts       # PDF text extraction
```

## 🔧 API Endpoints

### POST `/api/chat`
Processes user questions and returns AI-generated answers with citations.

**Request:**
```json
{
  "question": "What are the main findings of this paper?"
}
```

**Response:**
```json
{
  "answer": "The paper presents several key findings...",
  "citations": ["Source 1: paper.pdf", "Source 2: paper.pdf"]
}
```

### POST `/api/upload`
Uploads and processes research documents.

**Request:** FormData with `file` field
**Response:**
```json
{
  "success": true,
  "message": "Document processed successfully",
  "chunksProcessed": 45
}
```

## 🎯 Usage

1. **Sign Up/Login** - Create an account or sign in
2. **Upload Documents** - Add your research papers (PDF/DOCX)
3. **Ask Questions** - Use the chat interface to query your documents
4. **View Documents** - Manage your uploaded files in the dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Pinecone](https://pinecone.io/) - Vector database
- [Google Gemini AI](https://ai.google.dev/) - AI model
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

---

Built with ❤️ for researchers, by developers

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


#for any kind of queries:
ahmedkhanofficials@gmail.com
Thannk You