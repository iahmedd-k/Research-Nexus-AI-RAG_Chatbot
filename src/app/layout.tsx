// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Academic SEO: Keyword-rich and professional metadata
export const metadata: Metadata = {
  title: 'ResearchNexus AI | Semantic RAG for Academic Literature',
  description: 'An intelligent platform for researchers using Next.js, Gemini API, Pinecone, and Supabase for secure, cited context retrieval.',
  keywords: ['RAG chatbot', 'Gemini API', 'Next.js', 'Pinecone', 'Supabase', 'Academic Research', 'Semantic Search'],
};
import './globals.css'


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="bg-gradient-to-br from-slate-950 to-slate-900 text-white">
{children}
</body>
</html>
)
}