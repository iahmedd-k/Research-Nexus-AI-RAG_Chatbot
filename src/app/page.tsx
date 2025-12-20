'use client';

import { Send, FileText } from 'lucide-react';
import { useState } from 'react';

export default function AskMyPapersPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: question },
    ]);

    setQuestion('');

    // TEMP: mock assistant reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'This is a placeholder answer. Once RAG is connected, this response will be generated from your uploaded documents.',
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Ask My Papers
        </h1>
        <p className="text-gray-400">
          Ask questions and get answers directly from your uploaded research documents.
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-gray-900 border border-indigo-900/40 rounded-2xl shadow-lg p-6 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
            <FileText className="w-12 h-12 mb-4 text-indigo-500" />
            <p className="text-lg font-medium">
              No questions asked yet
            </p>
            <p className="text-sm">
              Upload papers and start asking questions
            </p>
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
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-800 text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="mt-4 bg-gray-900 border border-indigo-900/40 rounded-xl p-3 flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask a question about your documents..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500 text-sm"
        />

        <button
          onClick={handleAsk}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors p-2 rounded-lg text-white"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
