// src/lib/pinecone.ts
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize the Pinecone client
export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
});

// Helper function to get the index instance
export function getPineconeIndex() {
  const indexName = process.env.PINECONE_INDEX_NAME || 'research-nexus';
  return pinecone.index(indexName);
}