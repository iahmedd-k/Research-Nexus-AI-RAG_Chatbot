import { embed, askGemini } from '@/lib/gemini'
import { getPineconeIndex } from '@/lib/pinecone'
import { supabase } from '@/lib/supabase-client'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json()

    if (!question?.trim()) {
      return Response.json({ error: 'Question is required' }, { status: 400 })
    }

    // Get the authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')

    // Verify the JWT token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      console.error('Auth error:', authError)
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Processing question for user:', user.id)

    // Embed the question
    const vector = await embed(question)
    const index = getPineconeIndex()

    // Query Pinecone for relevant chunks with user filter
    const queryRequest = {
      vector,
      topK: 5,
      includeMetadata: true,
      filter: { user_id: user.id }
    }

    console.log('Querying Pinecone with filter:', queryRequest.filter)
    const result = await index.query(queryRequest)

    if (!result.matches || result.matches.length === 0) {
      console.log('No matches found for user:', user.id)
      return Response.json({
        answer: "I couldn't find any relevant information in your uploaded documents. Please upload some research papers first, or try rephrasing your question.",
        citations: []
      })
    }

    console.log(`Found ${result.matches.length} matches`)

    // Extract context from matches
    const context = result.matches
      .map((match: any) => match.metadata?.text)
      .filter(Boolean)
      .join('\n\n')

    console.log('Context length:', context.length)

    // Generate answer using Gemini
    const answer = await askGemini(context, question)

    // Extract citations
    const citations = result.matches
      .slice(0, 3)
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