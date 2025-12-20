'use client';

import { FileText, Trash2, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import Link from 'next/link';

type Document = {
  id: string;
  name: string;
  pages: number;
  uploadedAt: string;
};

export default function MyDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('status', 'indexed'); // Only show indexed documents

      if (error) {
        console.error('Error fetching documents:', error);
        return;
      }

      const mappedDocuments: Document[] = data.map((doc) => ({
        id: doc.id,
        name: doc.file_name,
        pages: 0, // TODO: store page count in DB
        uploadedAt: new Date(doc.created_at).toLocaleDateString(),
      }));

      setDocuments(mappedDocuments);
      setLoading(false);
    }

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My Documents</h1>
          <p className="text-gray-400 text-lg">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          My Documents
        </h1>
        <p className="text-gray-400 text-lg">
          Manage and review all documents you've uploaded to Research Nexus.
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 group"
          >
            {/* Icon */}
            <div className="bg-blue-600/20 p-4 rounded-xl w-fit mb-6 group-hover:bg-blue-600/30 transition-colors">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>

            {/* Title */}
            <h3 className="text-white font-semibold text-lg truncate mb-2">
              {doc.name}
            </h3>

            {/* Meta */}
            <div className="text-sm text-gray-400 space-y-2 mb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                {doc.pages} pages
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                {doc.uploadedAt}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-lg hover:bg-red-600/20"
                onClick={() => alert('Delete functionality coming soon')}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {documents.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <div className="bg-blue-600/20 p-6 rounded-full mb-6">
            <FileText className="w-16 h-16 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No documents uploaded</h3>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Upload your first paper to start asking questions and getting AI-powered insights.
          </p>
          <Link
            href="/dashboard/upload"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Upload Documents
          </Link>
        </div>
      )}
    </div>
  );
}
