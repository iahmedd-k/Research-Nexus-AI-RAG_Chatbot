'use client';

import { Send, FileText, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-client';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
};

export default function DashboardPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setAuthLoading(false);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAsk = async () => {
    if (!question.trim() || !user) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No active session')
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error('Failed to get response');

      const data = await res.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer || data.error || 'Sorry, I encountered an error.',
        citations: data.citations || []
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your question. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center">
          <div className="bg-blue-600/20 p-4 rounded-full w-fit mx-auto mb-6">
            <LogIn className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Sign In Required</h2>
          <p className="text-gray-400 mb-8">
            Please sign in to access the Research Nexus chatbot and upload your documents.
          </p>
          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="block w-full border-2 border-slate-600 hover:border-blue-400 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Research Assistant
        </h1>
        <p className="text-gray-400">
          Ask questions and get answers directly from your uploaded research documents.
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-xl p-6 overflow-y-auto space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
            <div className="bg-blue-600/20 p-4 rounded-full mb-6">
              <FileText className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Welcome to Research Nexus</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Upload your research papers and start asking questions to get AI-powered insights.
            </p>
            <Link
              href="/dashboard/upload"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Upload Documents
            </Link>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] px-6 py-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                  : 'bg-slate-700 text-gray-200 rounded-bl-md border border-slate-600'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-600">
                  <p className="text-xs text-gray-400 mb-2">Sources:</p>
                  <div className="space-y-1">
                    {msg.citations.map((citation, i) => (
                      <div key={i} className="text-xs text-blue-300 truncate">
                        {citation}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 border border-slate-600 px-6 py-4 rounded-2xl rounded-bl-md max-w-[80%]">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span className="text-gray-300 text-sm">Analyzing your documents...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask a question about your research documents..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleAsk()}
          disabled={loading}
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500 text-sm disabled:opacity-50"
        />

        <button
          onClick={handleAsk}
          disabled={!question.trim() || loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-xl text-white transition-all duration-300 hover:scale-105"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}