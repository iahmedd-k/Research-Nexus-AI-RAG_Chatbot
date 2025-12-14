// src/lib/types.ts

// Define the shape of our database table rows
export interface Document {
    id: string;
    user_id: string;
    file_name: string;
    storage_path: string;
    status: 'pending' | 'processing' | 'indexed' | 'failed';
    created_at: string;
}

export interface Chunk {
    id: string;
    document_id: string;
    content: string;
    page_number: number;
    created_at: string;
}