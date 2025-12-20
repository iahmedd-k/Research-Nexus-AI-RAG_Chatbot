// src/lib/pinecone.ts
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize the Pinecone client
export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || 'dummy',
});

// Helper function to get the index instance
export function getPineconeIndex() {
  // Mock index for development
  return {
    upsert: async (vectors: any[]) => {
      console.log('Mock upsert:', vectors.length, 'vectors');
    },
    query: async (options: any) => {
      console.log('Mock query:', options);
      return { matches: [] };
    }
  };
}