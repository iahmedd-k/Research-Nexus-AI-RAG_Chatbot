'use client';

import { UploadCloud, FileText } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setSuccess('');

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No active session')
      }

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await res.json();
      setSuccess(data.message || 'Document uploaded and processed successfully!');
      setFile(null);
    } catch (err: any) {
      alert(err.message || 'Something went wrong while uploading.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Upload Research Paper</h1>
      <p className="text-gray-400 mb-10 text-lg">
        Upload PDFs and documents to build your personal AI research assistant.
      </p>

      {/* Upload Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-10 shadow-2xl">
        {/* Upload Area */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-600 hover:border-blue-500/50 rounded-2xl p-12 cursor-pointer hover:bg-slate-800/50 transition-all duration-300 group">
          <div className="bg-blue-600/20 p-4 rounded-full mb-6 group-hover:bg-blue-600/30 transition-colors">
            <UploadCloud className="w-12 h-12 text-blue-400" />
          </div>
          <p className="text-gray-300 font-semibold text-lg mb-2">
            Click to upload or drag & drop
          </p>
          <p className="text-sm text-gray-500">
            PDF, DOCX (Max 10MB)
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {/* Selected File */}
        {file && (
          <div className="mt-8 flex items-center justify-between bg-slate-700/50 p-6 rounded-xl border border-slate-600">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600/20 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-sm text-gray-200 font-medium truncate">
                {file.name}
              </span>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded-lg hover:bg-red-600/20"
            >
              Remove
            </button>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {loading ? 'Processing Document...' : 'Upload & Process'}
        </button>

        {/* Success Message */}
        {success && (
          <div className="mt-6 bg-green-600/20 border border-green-600/50 text-green-300 px-6 py-4 rounded-xl text-sm font-medium">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
