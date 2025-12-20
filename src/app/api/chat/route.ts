import { embed, askGemini } from '@/lib/gemini'
import { getPineconeIndex } from '@/lib/pinecone'
import { supabase } from '@/lib/supabase-client'

export async function POST(req: Request) {
  try {
    const { question } = await req.json()

    if (!question?.trim()) {
      return Response.json({ error: 'Question is required' }, { status: 400 })
    }

    // Get user from auth
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Embed the question
    const vector = await embed(question)
    const index = getPineconeIndex()

    // Query Pinecone for relevant chunks
    const result = await index.query({
      vector,
      topK: 5,
      includeMetadata: true,
      filter: { user_id: user.id } // Only get user's documents
    })

    if (!result.matches || result.matches.length === 0) {
      return Response.json({
        answer: "I couldn't find any relevant information in your uploaded documents. Please upload some research papers first, or try rephrasing your question.",
        citations: []
      })
    }

    // Extract context from matches
    const context = result.matches
      .map((match: any) => match.metadata?.text)
      .filter(Boolean)
      .join('\n\n')

    // Generate answer using Gemini
    const answer = await askGemini(context, question)

    // Extract citations (simplified - in production you'd want better citation extraction)
    const citations = result.matches
      .slice(0, 3) // Top 3 sources
      .map((match: any, index: number) => `Source ${index + 1}: ${match.metadata?.filename || 'Document'}`)

    return Response.json({ answer, citations })

  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json({
      error: 'An error occurred while processing your question. Please try again.',
      answer: 'Sorry, I encountered an error while processing your question. Please try again.',
      citations: []
    }, { status: 500 })
  }
}