'use client';

import { FileText, Trash2, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">My Documents</h1>
          <p className="text-gray-400">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          My Documents
        </h1>
        <p className="text-gray-400">
          Manage and review all documents you’ve uploaded to ResearchNexus.
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-gray-900 border border-indigo-900/40 rounded-2xl p-5 shadow-lg hover:shadow-indigo-900/30 transition-shadow"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/20 mb-4">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>

            {/* Title */}
            <h3 className="text-white font-semibold truncate mb-1">
              {doc.name}
            </h3>

            {/* Meta */}
            <div className="text-sm text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {doc.pages} pages
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {doc.uploadedAt}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end">
              <button
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition-colors"
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
          <FileText className="w-14 h-14 mb-4 text-indigo-500" />
          <p className="text-lg font-medium">No documents uploaded</p>
          <p className="text-sm">
            Upload your first paper to start asking questions
          </p>
        </div>
      )}
    </div>
  );
}
