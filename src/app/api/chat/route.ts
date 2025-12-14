import { embed, askGemini } from '@/lib/gemini'
import { getPineconeIndex } from '@/lib/pinecone'


export async function POST(req: Request) {
const { question } = await req.json()


const vector = await embed(question)
const index = getPineconeIndex()
const result = await index.query({ vector, topK: 5, includeMetadata: true })


const context = result.matches.map((m: { metadata?: { text?: string } }) => m.metadata?.text).join('\n')


const answer = await askGemini(context, question)


return Response.json({ answer })
}