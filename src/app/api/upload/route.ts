import { chunkText } from '@/lib/textchunker'
import { embed } from '@/lib/gemini'
import { getPineconeIndex } from '@/lib/pinecone'
import { extractText } from '@/utils/pdfparser'
import { supabase } from '@/lib/supabase-client'

export async function POST(req: Request) {
  try {
    // Get user from auth
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.formData()
    const file = data.get('file') as File

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: 'File size exceeds 10MB limit' }, { status: 400 })
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: 'Only PDF and DOCX files are allowed' }, { status: 400 })
    }

    console.log(`Processing file: ${file.name} for user: ${user.id}`)

    // Extract text from file
    const text = await extractText(file)
    if (!text || text.trim().length === 0) {
      return Response.json({ error: 'Could not extract text from file' }, { status: 400 })
    }

    // Chunk the text
    const chunks = chunkText(text)

    // Create vectors with user-specific metadata
    const vectors = await Promise.all(
      chunks.map(async (chunk: string, i: number) => ({
        id: `${user.id}_${file.name}_${i}_${Date.now()}`,
        values: await embed(chunk),
        metadata: {
          text: chunk,
          filename: file.name,
          user_id: user.id,
          chunk_index: i,
          total_chunks: chunks.length,
          uploaded_at: new Date().toISOString()
        }
      }))
    )

    // Store in Pinecone
    const index = getPineconeIndex()
    await index.upsert(vectors)

    // Store document metadata in Supabase
    const { error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_size: file.size,
        status: 'indexed',
        chunks_count: chunks.length
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Don't fail the upload if DB insert fails, but log it
    }

    console.log(`Successfully processed ${chunks.length} chunks for ${file.name}`)

    return Response.json({
      success: true,
      message: `Document "${file.name}" has been processed and ${chunks.length} text chunks have been indexed.`,
      chunksProcessed: chunks.length
    })

  } catch (error) {
    console.error('Upload error:', error)
    return Response.json({
      error: 'An error occurred while processing your document. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}