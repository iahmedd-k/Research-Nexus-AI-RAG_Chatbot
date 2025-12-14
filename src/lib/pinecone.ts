// src/lib/pinecone.ts
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize the Pinecone client
export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || 'dummy',
});

// Helper function to get the index instance
export function getPineconeIndex() {
    return pinecone.index('research-nexus-index'); // Use the name you defined in the Pinecone console
}