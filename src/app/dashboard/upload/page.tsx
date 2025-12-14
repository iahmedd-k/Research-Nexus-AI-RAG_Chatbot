'use client';

import { UploadCloud, FileText } from 'lucide-react';
import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      setSuccess('Document uploaded and processed successfully!');
      setFile(null);
    } catch (err) {
      alert('Something went wrong while uploading.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-2">Upload Research Paper</h1>
      <p className="text-gray-400 mb-8">
        Upload PDFs or documents to build your personal AI research assistant.
      </p>

      {/* Upload Card */}
      <div className="bg-gray-900 border border-indigo-900/40 rounded-2xl p-8 shadow-xl">
        {/* Upload Area */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-700/50 rounded-xl p-10 cursor-pointer hover:border-indigo-500 transition">
          <UploadCloud className="w-12 h-12 text-indigo-400 mb-4" />
          <p className="text-gray-300 font-medium">
            Click to upload or drag & drop
          </p>
          <p className="text-sm text-gray-500 mt-1">
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
          <div className="mt-6 flex items-center justify-between bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span className="text-sm text-gray-200 truncate">
                {file.name}
              </span>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-sm text-red-400 hover:underline"
            >
              Remove
            </button>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-semibold transition"
        >
          {loading ? 'Processing Document...' : 'Upload & Process'}
        </button>

        {/* Success Message */}
        {success && (
          <p className="mt-4 text-green-400 text-sm font-medium">
            {success}
          </p>
        )}
      </div>
    </div>
  );
}
